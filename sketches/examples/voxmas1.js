function onGLC(glc) {
    glc.size(300, 300);
    glc.setDuration(2);
    glc.setFPS(60);
    glc.setMode("single");
    glc.setEasing(false);
    glc.setMaxColors(64);

    glc.loop();
    var list = glc.renderList,
        width = glc.w,
        height = glc.h,
        color = glc.color;

    glc.styles.backgroundColor = "#797470";

    var tmpcanvas1 = document.createElement('canvas');
    tmpcanvas1.width = 100;
    tmpcanvas1.height = 100;
    var tmpcontext1 = tmpcanvas1.getContext('2d');

    var tmpcanvas2 = document.createElement('canvas');
    tmpcanvas2.width = 50;
    tmpcanvas2.height = 50;
    var tmpcontext2 = tmpcanvas2.getContext('2d');

    var tmpcanvas3 = document.createElement('canvas');
    tmpcanvas3.width = 30;
    tmpcanvas3.height = 30;
    var tmpcontext3 = tmpcanvas3.getContext('2d');

    /*
    list.addCube({
        x: width / 2,
        y: height / 2,
        size: 100,
        rotationX: 30,
        rotationY: [0, 360],
        strokeStyle: "white"
    });
	*/

    var colors = {
    	'X': [ '#853', '#642' ],
    	'y': [ '#ee7', '#aa3' ],
    	'g': [ '#081', '#060' ],
    	'G': [ '#093', '#071' ],
    	'r': [ '#c00', '#a00' ],
    	'b': [ '#37f', '#16d' ],
    	'w': [ '#cc2', '#bb2' ],
    	'a': [ '#0ab', '#09a' ],
    	'P': [ '#fec', '#fec' ],
    }

    var model = [
    	[ // 0
    		'...bwb.',
    		'...bwb.',
    		'...X...',
    		'..XXX..',
    		'...XGa.',
    		'ryr..a.',
    		'ryr....',
    	],
    	[ // 1
    		'...www.',
    		'...www.',
    		'.......',
    		'...X...',
    		'.....a.',
    		'ryr..a.',
    		'ryr....',
    	],
    	[ // 2
    		'..gbwb.',
    		'.Ggbwb.',
    		'gGGbg..',
    		'GgGXGgG',
    		'.ggGgGg',
    		'.PgGG .',
    		'...g...',
    	],
    	[ // 3
    		'...g...',
    		'..gGG..',
    		'GPGggg.',
    		'.GgXgGg',
    		'.ggGgG.',
    		'..gGg..',
    		'...g...',
    	],
    	[ // 4
    		'.......',
    		'..ggP..',
    		'.gGgGg.',
    		'.ggXgg.',
    		'.gGgGg.',
    		'..gPg..',
    		'.......',
    	],
    	[ // 5
    		'.......',
    		'..gGg..',
    		'.GGgGg.',
    		'.ggXgG.',
    		'..gGgP.',
    		'...g...',
    		'.......',
    	],
    	[ // 6
    		'.......',
    		'.g..g..',
    		'..gGg..',
    		'..gXGg.',
    		'..PGg..',
    		'.......',
    		'.......',
    	],
    	[ // 7
    		'.......',
    		'.......',
    		'..gPGg.',
    		'..GXg..',
    		'..ggG..',
    		'.......',
    		'.......',
    	],
    	[ // 8
    		'.......',
    		'.......',
    		'...Gg..',
    		'..gXG..',
    		'..GP.,.',
    		'.......',
    		'.......',
    	],
    	[ // 9
    		'.......',
    		'.......',
    		'...P...',
    		'..gXg..',
    		'..Gg...',
    		'.......',
    		'.......',
    	],
    	[ // 10
    		'.......',
    		'.......',
    		'...g...',
    		'..GXg..',
    		'...P...',
    		'.......',
    		'.......',
    	],
    	[ // 11
    		'.......',
    		'.......',
    		'.......',
    		'...y...',
    		'.......',
    		'.......',
    		'.......',
    	],
    	[ // 12
    		'.......',
    		'.......',
    		'.......',
    		'..yyy..',
    		'.......',
    		'.......',
    		'.......',
    	],
    	[ // 13
    		'.......',
    		'.......',
    		'.......',
    		'...y...',
    		'.......',
    		'.......',
    		'.......',
    	]
    ];



	// Based on http://stackoverflow.com/a/17411276/96664
	function rotate2d(x, y, angle) {
	    var radians = (Math.PI / 180) * angle,
	        cos = Math.cos(radians),
	        sin = Math.sin(radians),
	        nx = (cos * x) + (sin * y),
	        ny = (cos * y) - (sin * x);
	    return [nx, ny];
	}

    var context = glc.context;

    var heightmap = null;

    // gets executed prior to rendering shapes in renderList
    glc.onEnterFrame = function(t) {

    	var rotation = t * 360;

    	for(var l=0; l<model.length; l++) {

    		var line_y = 270 - (20 * l);

	    	var lines = [];
			var layer = model[l];
			for(var j=0; j<layer.length; j++) {
				var row = layer[j];
				for(var i=0; i<row.length; i++) {
					var ch = row.substring(i, i+1);
					var col = colors[ch];
					var cx = ((row.length - 0) / 2) * 20;
					var cy = ((layer.length - 0) / 2) * 20;
					// console.log(ch, col);
					if (typeof(col) !== 'undefined') {
	    	    	    // context.fillStyle = col[0];
		        	    // context.fillRect(j * 20, i * 20, 20, 20);

		        	    // clockwise ordering

		        	    // TL -> TR
		        	    lines.push({
		        	    	a: [ i * 20      - cx, j * 20 - cy ],
		        	    	b: [ i * 20 + 20 - cx, j * 20 - cy ],
		        	    	c: col[0]
		        	    });

		        	    // TR -> BR
		        	    lines.push({
		        	    	a: [ i * 20 - cx + 20, j * 20 - cy ],
		        	    	b: [ i * 20 - cx + 20, j * 20 - cy + 20 ],
		        	    	c: col[1]
		        	    });

		        	    // BR -> BL
		        	    lines.push({
		        	    	a: [ i * 20 + 20 - cx, j * 20 + 20 - cy ],
		        	    	b: [ i * 20      - cx, j * 20 + 20 - cy ],
		        	    	c: col[0]
		        	    });

		        	    // BL -> TL
		        	    lines.push({
		        	    	a: [ i * 20 - cx, j * 20 - cy + 20 ],
		        	    	b: [ i * 20 - cx, j * 20 - cy ],
		        	    	c: col[1]
		        	    });

					}
				}
			}

			// rotate lines
			for(var i=0; i<lines.length; i++) {
				var line = lines[i];
				line.a = rotate2d( line.a[0], line.a[1], rotation );
				line.b = rotate2d( line.b[0], line.b[1], rotation );
				line.v = false;
				if (line.b[0] < line.a[0]) // clockwise, so b < a
	 				line.v = true;
			}

			// debug draw lines
			for(var i=0; i<lines.length; i++) {
				var line = lines[i];

				/*
				if (line.v) {
					context.beginPath();
					context.strokeStyle = line.c;
					context.moveTo(line.a[0] + 150, line.a[1] + 150);
					context.lineTo(line.b[0] + 150, line.b[1] + 150);
					context.stroke();
				}
				*/
			}

			// draw output lines
			for(var c=-100; c<100; c++) {
				var col = c;//  - 100;
				var hits = 0;
				var closest_z = 9999;
				var closest_idx = -1;
				for(var i=0; i<lines.length; i++) {
					var line = lines[i];
					if (!line.v) {
						line.z = 9999;
						continue;
					}
					if (line.b[0] > col || line.a[0] < col) {
						line.z = 9999;
						continue;
					}
					line.z = -(line.b[1] + line.a[1]) / 2.0;
					if (line.z < closest_z) {
						closest_z = line.z;
						closest_idx = i;
					}
				}

				if (closest_idx != -1) {
					var line = lines[closest_idx];
					context.beginPath();
					context.strokeStyle = line.c;
					context.moveTo(col + 150, line_y);
					context.lineTo(col + 150, line_y + 20);
					context.stroke();
				}

				for(var i=0; i<lines.length; i++) {
				}

			}

		}
    }

    function lerp(i, in0, in1, out0, out1) {
        var f = (i - in0) / (in1 - in0);
        if (f < 0.0)
            f = 0.0;
        if (f > 1.0)
            f = 1.0;
        f = (f * (out1 - out0)) + out0;
        return f;
    }

    function vignette(i, m) {
    	i = (i * i / 120) * m;
    	if (i < 0)
    		i = 0;
    	if (i > 255)
    		i = 255;
    	return Math.floor(i);
    }

    function finalgamma(i, m) {
    	i = (i * i / 80) * m;
    	i -= 10;
    	if (i < 0)
    		i = 0;
    	if (i > 255)
    		i = 255;
    	return Math.floor(i);
    }

    function blurgamma(i, m) {
    	i = (i * i / 200) * m;
    	i -= 160;
    	if (i < 0)
    		i = 0;
    	if (i > 255)
    		i = 255;
    	return Math.floor(i);
    }

    // gets executed after rendering renderList
    glc.onExitFrame = function(t) {

    	tmpcontext1.drawImage(glc.canvas, 0, 0, tmpcanvas1.width, tmpcanvas1.height);

        var dout = tmpcontext1.getImageData(0, 0, 300, 300);
        for(var j=0; j<300; j++) {
            for(var i=0; i<300; i++) {
                var oo = (j * 300 + i) * 4;
                dout.data[oo + 0] = blurgamma(dout.data[oo + 0], 1.0);
                dout.data[oo + 1] = blurgamma(dout.data[oo + 1], 1.0);
                dout.data[oo + 2] = blurgamma(dout.data[oo + 2], 1.0);
            }
        }
        tmpcontext1.putImageData(dout, 0, 0);

    	tmpcontext2.drawImage(tmpcanvas1, 0, 0, tmpcanvas2.width, tmpcanvas2.height);
    	tmpcontext3.drawImage(tmpcanvas2, 0, 0, tmpcanvas3.width, tmpcanvas3.height);

    	context.globalAlpha = 1.0;

        // var din = context.getImageData(0, 0, 300, 300);

        var flicker = Math.random() * 10;

        context.globalCompositeOperation = 'screen';
    	context.globalAlpha = 0.9 + 0.6 * Math.cos(t * Math.PI * 8);
		context.drawImage(tmpcanvas3, 0, 0, 300, 300);

        context.globalCompositeOperation = 'screen';
    	context.globalAlpha = 0.9 + 0.6 * Math.cos(t * Math.PI * 10);
		context.drawImage(tmpcanvas2, 0, 0, 300, 300);

        context.globalCompositeOperation = 'screen';

    	context.globalAlpha = 0.07;

    	for(var i=0; i<9; i++) {
    		var dx = 20 * Math.cos(i * Math.PI / 4.50);
    		var dy = 5 * Math.sin(i * Math.PI / 4.50);
    		context.drawImage(tmpcanvas2, dx, dy, 300, 300);
		}

    	context.globalAlpha = 0.07;
    	for(var i=0; i<9; i++) {
    		var dx = 20 * Math.cos(i * Math.PI / 4.50);
    		var dy = 10 * Math.sin(i * Math.PI / 4.50);
    		context.drawImage(tmpcanvas1, dx, dy, 300, 300);
		}

    	context.globalAlpha = 1.0;
        context.globalCompositeOperation = 'source-over';

        var dout = context.getImageData(0, 0, 300, 300);
        for(var j=0; j<300; j++) {
            for(var i=0; i<300; i++) {
                var oo = (j * 300 + i) * 4;

                var dx = 150 - i;
                var dy = 150 - j;

                var zz = 128 - Math.sqrt(dx*dx + dy*dy) / 3.0;
                zz -= Math.random() * 5;

                zz -= flicker;

                var mult = zz / 138;

                dout.data[oo + 0] = vignette(dout.data[oo + 0], mult);
                dout.data[oo + 1] = vignette(dout.data[oo + 1], mult);
                dout.data[oo + 2] = vignette(dout.data[oo + 2], mult);
            }
        }
        context.putImageData(dout, 0, 0);

        var dout = context.getImageData(0, 0, 300, 300);
        for(var j=0; j<300; j++) {
            for(var i=0; i<300; i++) {
                var oo = (j * 300 + i) * 4;
                dout.data[oo + 0] = finalgamma(dout.data[oo + 0], 0.9);
                dout.data[oo + 1] = finalgamma(dout.data[oo + 1], 0.99);
                dout.data[oo + 2] = finalgamma(dout.data[oo + 2], 0.96);
            }
        }
        context.putImageData(dout, 0, 0);
    }
}