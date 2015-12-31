function onGLC(glc) {
	glc.loop();

	glc.size(400, 400);
	glc.setDuration(5);
	glc.setFPS(60);
	glc.setMode("single");
	glc.setEasing(false);
	glc.setMaxColors(256);
	glc.styles.backgroundColor = "#8F3D99";

	var list = glc.renderList;
	var width = glc.w;
	var height = glc.h;
	var context = glc.context;

	function lerp(i, in0, in1, out0, out1, clip) {
		var f = (i - in0) / (in1 - in0);
		if (clip) {
			if (f < 0.0)
				f = 0.0;
			if (f > 1.0)
				f = 1.0;
		}
		f = (f * (out1 - out0)) + out0;
		return f;
	}

	function FWK(opt) {
		this.draw = function(t, opacity) {
			var localtime = lerp(t, opt.delay, opt.delay+opt.time, 0.0, 1.0);
			var risetime = lerp(localtime, 0.0, 0.51, 0.0, 1.0);
			var exptime = lerp(localtime, 0.5, 1.0, 0.0, 1.0);

			if (risetime >= 0.0 && risetime <= 1.0) {
				// render rise
				var et = Math.sin(risetime * Math.PI / 2.0);
				var x = lerp(et, 0.0, 1.0, opt.x, opt.x + opt.dx);
				var y = lerp(et, 0.0, 1.0, opt.oy, opt.ty);
				var d = 2;
				context.globalAlpha = opacity * (0.5 + risetime / 2.0);
				context.strokeStyle = '';
				context.fillStyle = '#FFE140';
				context.beginPath();
				context.ellipse(x, y, d, d, 0, 0, Math.PI * 2);
				context.fill();
			}

			if (exptime >= 0.0 && exptime <= 1.0) {
				for(var j=0; j<18; j++) {
					var radius = exptime * opt.r;
					// render explosition
					var x = opt.x + opt.dx + radius * Math.cos(j * Math.PI / 9);// lerp(localtime, 0.0, 1.0, 20, 220);
					var y = opt.ty + radius * Math.sin(j * Math.PI / 9);// 40;
					var d = 2;
					context.globalAlpha = opacity * (1 - exptime);
					context.strokeStyle = '';
					context.fillStyle = '#fff';
					context.beginPath();
					context.ellipse(x, y, d, d, 0, 0, Math.PI * 2);
					context.fill();
				}
			}
		}
	}

	var fwks = [
		new FWK({ delay:0.12, time:0.21, x:90,  oy:400, ty:70,  r:80,  dx:-10 }),
		new FWK({ delay:0.61, time:0.33, x:100, oy:440, ty:130, r:70,  dx:20  }),
		new FWK({ delay:0.28, time:0.16, x:130, oy:400, ty:100, r:70,  dx:5   }),
		new FWK({ delay:0.24, time:0.26, x:150, oy:415, ty:150, r:80,  dx:-5  }),
		new FWK({ delay:0.57, time:0.25, x:200, oy:420, ty:120, r:30,  dx:-10 }),
		new FWK({ delay:0.32, time:0.33, x:250, oy:400, ty:90,  r:40,  dx:15  }),
		new FWK({ delay:0.52, time:0.21, x:220, oy:410, ty:110, r:80,  dx:5   }),
		new FWK({ delay:0.31, time:0.37, x:240, oy:440, ty:90,  r:110, dx:15  }),
		new FWK({ delay:0.77, time:0.21, x:320, oy:450, ty:70,  r:50,  dx:-15 }),
		new FWK({ delay:0.65, time:0.24, x:350, oy:430, ty:100, r:70,  dx:5   }),
		new FWK({ delay:0.71, time:0.29, x:320, oy:400, ty:110, r:50,  dx:-15 }),
		new FWK({ delay:0.65, time:0.21, x:290, oy:460, ty:130, r:70,  dx:5   }),
	];

	glc.onExitFrame = function(t) {
		context.globalAlpha = 1.0;
		for(var i=0; i<1; i++) {
			var t2 = t - (i / (5.0 * 10));
			var opa = 1.0 - (i / 5.0);
			fwks.forEach(function(fwk) {
				fwk.draw(t2, opa);
			});
		}
		context.globalAlpha = 1.0;
	}

}