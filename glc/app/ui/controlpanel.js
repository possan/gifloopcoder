define(["libs/quicksettings"], function(QuickSettings) {
	var panel = null,
		model,
		controller,
		fileInput = null;

	// controls:
	var chooseFile = "Open File",
		reload = "Reload",
		fileName = "File name",
		modeDropDown = "mode",
		durationSlider = "duration",
		fpsSlider = "fps",
		maxColorsSlider = "Max Colors",
		easingCheckbox = "easing",
		playOnceButton = "Play Once",
		loopButton = "Loop",
		stopButton = "Stop",
		makeAGifButton = "Make a gif",
		makeASpriteSheetButton = "Make a sprite sheet",
		captureStillButton = "Capture still",
		statusInfo = "status",
		about = "about",
		fullScreen = "Full Screen";


	function init(pModel, pController) {
		model = pModel;
		controller = pController;
		panel = QuickSettings.create(model.w + 50, 20, "Control Panel");

		// electron only.
		if(window.nodeRequire) {
			var remote = nodeRequire("remote");
			if(remote) {
				panel.addButton(fullScreen, function() {
					var win = remote.getCurrentWindow();
					if(win.isFullScreen()) {
						win.setFullScreen(false);
					}
					else {
						win.setFullScreen(true);
					}

				})
			}
		}

		fileInput = document.createElement("input");
		fileInput.type = "file";
		fileInput.addEventListener("change", controller.chooseFile);
		panel.addButton(chooseFile, function() {
			fileInput.click();
		});
		panel.addInfo(fileName, "");
		panel.addButton(reload, controller.reload);
		panel.disableControl(reload);
		panel.addRange(durationSlider, 0.5, 10, model.getDuration(), 0.5, model.setDuration);
		panel.addRange(fpsSlider, 1, 60, model.getFPS(), 1, model.setFPS);
		panel.addRange(maxColorsSlider, 2, 256, model.maxColors, 1, function(value) {
			model.maxColors = value;
		});
		panel.bindDropDown(modeDropDown, ["bounce", "single"], model.interpolation);
		panel.bindBoolean(easingCheckbox, model.interpolation.easing, model.interpolation);
		panel.addButton(playOnceButton, playOnce);
		panel.addButton(loopButton, loop);
		panel.addButton(stopButton, stop);
		panel.addButton(makeAGifButton, makeGif);
		panel.addButton(makeASpriteSheetButton, makeSpriteSheet);
		panel.addButton(captureStillButton, captureStill);
		panel.addInfo(statusInfo, "stopped");
		panel.addButton(about, function() {
			controller.showInfoPanel();
		})
	}

	function playOnce() {
		panel.setInfo(statusInfo, "playing");
		controller.playOnce();
		controller.disableControls();
	}

	function loop() {
		panel.setInfo(statusInfo, "playing");
		controller.loop();
		controller.disableControls();
	}

	function makeGif() {
		if(!model.getIsRunning()) {
			controller.clearOutput();
			model.capture = true;
			controller.startEncoder();
			playOnce();
		}
		else {
			panel.setInfo(statusInfo, "Animation already running");
		}
	}

	function makeSpriteSheet() {
		if(!model.getIsRunning()) {
			controller.clearOutput();
			model.captureSpriteSheet = true;
			controller.initSpriteSheet();
			playOnce();
		}
		else {
			panel.setInfo(statusInfo, "Animation already running");
		}
	}

	function captureStill() {
		controller.captureStill();
	}

	function stop() {
		setStatus("stopped");
		controller.stop();
		controller.enableControls();
	}

	function setPosition(x, y) {
		panel.setPosition(x, y);
	}

	function setStatus(status) {
		panel.setInfo(statusInfo, status);
	}

	function enableControls() {
		panel.enableControl(playOnceButton);
		panel.enableControl(loopButton);
		panel.enableControl(makeAGifButton);
		panel.enableControl(makeASpriteSheetButton);
	}

	function disableControls() {
		panel.disableControl(playOnceButton);
		panel.disableControl(loopButton);
		panel.disableControl(makeAGifButton);
		panel.disableControl(makeASpriteSheetButton);
	}

	function setFPS(value) {
		panel.setRangeValue(fpsSlider, value);
	}

	function setDuration(value) {
		panel.setRangeValue(durationSlider, value);
	}

	function setMode(mode) {
		panel.setDropDownIndex(modeDropDown, mode === "bounce" ? 0 : 1);
	}

	function setEasing(value) {
		panel.setBoolean(easingCheckbox, value);
	}

	function setMaxColors(value) {
		value = Math.max(2, value);
		value = Math.min(256, value);
		panel.setRangeValue(maxColorsSlider, value);
	}

	function setFileName(name) {
		panel.setInfo(fileName, name);
		panel.enableControl(reload);
	}

	function chooseFileDialog() {
		fileInput.click();
	}

	return {
		init: init,
		setPosition: setPosition,
		setStatus: setStatus,
		enableControls: enableControls,
		disableControls: disableControls,
		loop: loop,
		playOnce: playOnce,
		setFPS: setFPS,
		setDuration: setDuration,
		setMode: setMode,
		setEasing: setEasing,
		setMaxColors: setMaxColors,
		setFileName: setFileName,
		makeGif: makeGif,
		chooseFileDialog: chooseFileDialog
	};

});
