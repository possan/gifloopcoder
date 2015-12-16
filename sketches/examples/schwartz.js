function onGLC(glc) {
	glc.loop();
	glc.size(400, 400);
	glc.setDuration(4);
	glc.setMaxColors(32);
	glc.setFPS(60);
	glc.setMode("single");
	glc.setEasing(false);
	glc.styles.backgroundColor = "#111";

	var list = glc.renderList,
		width = glc.w,
		height = glc.h,
		color = glc.color;

	var text = ["a short time ago",
				"in a web browser",
				"far far away ...",
				"",
				"#gifloopcoder",
				"#25daysofgifmas"];

	for(var i = 0; i < 1500; i++) {
		(function(i) {
			var bx = (Math.random() * 400) - 200;
			var by = (Math.random() * 400) - 200;
			var bz = (Math.random() * 400) - 200;

			function xyz(t2) {
				var z = (bz - (400 * t2 * 2.0));
				while (z < -200)
					z += 400;

				var x = 200 + bx * 400 / (z + 250);// + Math.random() * 200;
				var y = 200 + by * 400 / (z + 250);;
				var r = 1.5 / (1.0 + ((z + 250) / 300));
				var a = 1.0 - (z / 220);

				return {
					x: x,
					y: y,
					r: r,
					a: a,
				}
			}

			list.addCircle({
				x: function(t2) { return xyz(t2).x; },
				y: function(t2) { return xyz(t2).y; },
				radius: function(t2) { return xyz(t2).r; },
				globalAlpha: function(t2) { return xyz(t2).a; },
				fillStyle: "#fff",
			});
		})(i);
	}

	for(var i = 0; i < text.length; i++) {

		(function(i) {
			var t = text[i];

			function xyz(t2) {
				var z = 0 - 20 * i - 500 + 200*t2;

				if (z < -500) {
					return {
						a: 0,
						y: 0,
						s: 1,
					}
				}

				var scale = 1.0 / ((z + 500) / 50.0);

				var y = 150 + 30.0 * scale;

				var s = 10 + 10.0 * scale;

				var a = (scale - 0.5) * 1.0;
				if (a < 0.0)
					a = 0.0;

				return {
					y: y,
					s: s,
					a: a,
				}
			}

			list.addText({
				x: [200, 200],
				y: function(t2) { return xyz(t2).y; },
				fontSize: function(t2) { return xyz(t2).s; },
				globalAlpha: function(t2) { return xyz(t2).a; },
				fillStyle: "#ffcc44",
				rotationX: 30,
				rotationY: [-30, 30],
				text: text[i]
			});
		})(i);
	}



}