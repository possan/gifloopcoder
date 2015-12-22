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

    glc.styles.backgroundColor = "#666666";

    list.addCube({
        x: width / 2,
        y: height / 2,
        size: 100,
        rotationX: 30,
        rotationY: [-60, 60],
        strokeStyle: "white"
    });

    var context = glc.context;

    var heightmap = null;

    // gets executed prior to rendering shapes in renderList
    glc.onEnterFrame = function(t) {
        if (heightmap == null) {
            // first frame renders the bumpmap data and stores it.

            context.fillStyle = '#000';
            context.fillRect(0, 0, 300, 300);

            context.fillStyle = '#fff';
            context.font="170px Verdana";
            context.fillText('\u2744', 170, 130);
            context.font="130px Verdana";
            context.fillText('\u2744', 70, 260);
            // context.fillText('\u2744', 150, 290);
            context.font="60px Verdana";
            context.fillText('\u2744', 20, 70);
            context.fillText('\u2744', 250, 220);
            context.fillText('\u2744', 10, 270);

            context.font="30px Helvetica";
            context.fillText('Merry Christmas!', 40, 160);

            heightmap = context.getImageData(0, 0, 300, 300)

            for(var j=0; j<300; j++) {
                for(var i=0; i<300; i++) {
                    var oo = (j * 300 + i) * 4;
                    heightmap.data[oo] *= 0.9;
                    heightmap.data[oo] += Math.random() * 16;
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

    // gets executed after rendering renderList
    glc.onExitFrame = function(t) {
        var din = context.getImageData(0, 0, 300, 300);
        var dout = context.getImageData(0, 0, 300, 300);

        var cx = 150 + 80 * Math.cos(t * Math.PI * 2);
        var cy = 150 + 40 * Math.sin(t * Math.PI * 2);

        for(var j=0; j<300; j++) {
            for(var i=0; i<300; i++) {
                var oo = (j * 300 + i) * 4;

                var zl = heightmap.data[oo - 4];
                var zr = heightmap.data[oo + 4];
                var zu = heightmap.data[oo - 1200];
                var zd = heightmap.data[oo + 1200];

                var dx = cx - i;
                var dy = cy - j;

                var d = 0;

                if (dx < 0) {
                    d += (zr - zl) * -dx / 200;
                } else if (dx > 0) {
                    d += (zl - zr) * dx / 200;
                }

                if (dy < 0) {
                    d += (zd - zu) * -dy / 200;
                } else if (dy > 0) {
                    d += (zu - zd) * dy / 200;
                }

                var l = 150 - Math.sqrt(dx*dx + dy*dy);

                l += d;

                dout.data[oo + 0] = lerp(l, 0, 50, 205, 255); // zr - zl;
                dout.data[oo + 1] = lerp(l, 20, 150, 0, 255); // += dx - dy;
                dout.data[oo + 2] = lerp(l, 50, 250, 10, 255); // zr - zl;
            }

        }

        context.putImageData(dout, 0, 0);
    }
}