function onGLC(glc) {
    glc.loop();
    glc.size(300, 300);
    glc.setDuration(5);
    glc.setFPS(60);
    glc.setMaxColors(32);
    glc.setMode("single");
    glc.setEasing(false);
    glc.styles.backgroundColor = "black";
    var list = glc.renderList,
        width = glc.w,
        height = glc.h;

    var context = glc.context;

    function lerp(i, in0, in1, out0, out1) {
    	var f = (i - in0) / (in1 - in0);
    	if (f < 0.0)
    		f = 0.0;
    	if (f > 1.0)
    		f = 1.0;
    	f = (f * (out1 - out0)) + out0;
    	return f;
    }

    glc.onEnterFrame = function(t) {
		var bx0 = 150
			+ (80 * Math.cos(t * Math.PI * 10))
			// + (50 * Math.cos(3 + t * Math.PI * 4))
			;

		var by0 = 150
			+ (80 * Math.sin(2 + t * Math.PI * 2))
	    	// + (50 * Math.sin(t * Math.PI * 10))
	    	;

		var bx1 = 150
			+ (80 * Math.cos(1 + t * Math.PI * 4))
			// + (30 * Math.cos(t * Math.PI * 6))
			;

		var by1 = 150
			+ (80 * Math.sin(3 + t * Math.PI * 6))
			// + (10 * Math.cos(t * Math.PI * 4))
			;

/*
		var bx2 = 150
			+ (80 * Math.sin(5 + t * Math.PI * 4))
			// + (30 * Math.cos(4 + t * Math.PI * 2))
			;

		var by2 = 150
			+ (80 * Math.cos(t * Math.PI * 6))
			// + (30 * Math.sin(t * Math.PI * 2))
			;
*/
			/*
bx0 = 150 + 150 * Math.sin(t * Math.PI * 2);
			by0 = 150;
bx1 = 150 + 150 * Math.cos(t * Math.PI * 2);
			by1 = 150;
			bx2 = 150;
			by2 = 50;
			*/

		for(var j=1; j<13; j++) {
			for(var i=1; i<14; i++) {
				var x = i * 20 + 10;
				var y = j * 22 + 10;
				if (i % 2 == 0) y += 10;

				var dx = Math.abs(bx0 - x);
				var dy = Math.abs(by0 - y);
				var d1 = Math.sqrt(dx*dx + dy*dy) / 100.0;
				d1 = 1.0 / d1; //- lerp(d1, 0, 2.0, 0.0, 1.0);

				dx = Math.abs(bx1 - x);
				dy = Math.abs(by1 - y);
				var d2 = Math.sqrt(dx*dx + dy*dy) / 100.0;
				d2 = 1.0 / d2; // - lerp(d2, 0, 2.0, 0.0, 1.0);

				/*
				dx = Math.abs(bx2 - x);
				dy = Math.abs(by2 - y);
				var d3 = Math.sqrt(dx*dx + dy*dy) / 100.0;
				d3 = 1.0 / d3;// - lerp(d3, 0, 2.0, 0.0, 1.0);
				*/

				var d3 = 0;
				var d = (d1 + d2 + d3);//(d1 * d1) - (d2 * d2) - (d3 * d3); // - d3; // Math.min(d1, Math.min(d2, d3));

				// d = 10.0 - d * 40.0;//1.0 - (1 + (d / 1.0));

				// d = Math.sin(d * 7.0);

				d = lerp(d - 1.4, 1.0, 2.0, 0.0, 12.0);

				if (d > 15)
					d = 15;

				if (d > 0) {
					context.beginPath();
		            // context.ellipse(x, y, d, d, 0, 0, Math.PI * 2);

		            var radius = d;
		            var sides = 6;
		            context.moveTo(x + radius, y);
					for(var k = 1; k < sides; k ++) {
						var angle = Math.PI * 2 / sides * k;
						context.lineTo(x + Math.cos(angle) * radius, y + Math.sin(angle) * radius);
					}
			        context.fillStyle = "#ffffff";
			        context.fill();
				}
			}
		}
	}

    // gets executed after rendering renderList
    glc.onExitFrame = function(t) {
    	var din = context.getImageData(0, 0, 300, 300);
		var dout = context.getImageData(0, 0, 300, 300);

		for(var j=0; j<300; j++) {

			var rx = -1 + Math.round(Math.sin(t * Math.PI * 14 + j / 35.0) * 2);
			var rx2 = -1 + Math.round(Math.cos(t * Math.PI * 16 + j / 53.0) * 5);
			var rx3 = -1 + Math.round(Math.cos(t * Math.PI * 26 + j / 43.0) * 8);
			var bx = 1 + Math.round(Math.cos(t * Math.PI * 16 + j / 67.0) * 2);
			var bx2 = 1 + Math.round(Math.cos(t * Math.PI * 20 + j / 57.0) * 5);
			var bx3 = 1 + Math.round(Math.cos(t * Math.PI * 24 + j / 47.0) * 18);

			for(var i=0; i<300; i++) {
				var oo = (j * 300 + i) * 4;

				dout.data[oo + 0] = (0
					+ din.data[oo + rx*4]
					+ din.data[oo + rx2*4]
					+ din.data[oo + rx3*4]) / 3;

				dout.data[oo + 2] = (0
					+ din.data[oo + bx*4 + 2]
					+ din.data[oo + bx2*4 + 2]
					+ din.data[oo + bx3*4 + 2]) / 4
					- Math.random() * 50;

				dout.data[oo + 2] += 50;
			}
		}

    	context.putImageData(dout, 0, 0);
	}
}