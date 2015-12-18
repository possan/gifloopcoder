function onGLC(glc) {
    glc.loop();
    glc.setDuration(1);
    glc.setFPS(60);
     glc.setMode("single");
     glc.setEasing(false);
    glc.styles.backgroundColor = "#4a6";
     glc.setMaxColors(128);
    var list = glc.renderList,
        width = glc.w,
        height = glc.h;


    glc.size(250, 250);
    var list = glc.renderList;

    var context = glc.context;

    context.imageSmoothingEnabled = false;

    var img1 = new Image();
    // curl "http://vignette2.wikia.nocookie.net/fantendo/images/2/27/Mario_Walking.gif/revision/latest?cb=20091121195044" | base64
    img1.src = 'data:image/gif;base64,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';

    for(var k=0; k<24; k++) {
        (function(k) {
            list.addLine({
                x0: 125,
                y0: 125,
                x1: function(t) {
                    return 125 + 200.0 * Math.cos(t * Math.PI / 4 + k * Math.PI / 12);
                },
                y1: function(t) {
                    return 125 + 200.0 * Math.sin(t * Math.PI / 4 + k * Math.PI / 12);
                },
                strokeStyle: '#3c5',
                lineWidth: 2,
            });
        })(k);
    }

    list.addSpiral({
        x: glc.w/2,
        y: glc.h/2,
        innerRadius: 10,
        outerRadius: 250,
        turns: 8,
        rotation: [360*3,0],
        stroke: true,
        fill: false,
        lineWidth: 2,
        strokeStyle: "#3c5",
    });

    glc.onExitFrame = function(t) {
        for(var j=0; j<125; j++) {
            for(var i=0; i<125; i++) {

                var bx = i * 2;
                var by = j * 2;
                var bx2 = i * 3 - 20;
                var by2 = j * 3 - 20;

                bx2 += 15.0 * Math.sin( (i / 75.0 + j / 50.0 + t * 6.0) * Math.PI );
                by2 += 15.0 * Math.cos( (j / 85.0 + t * 4.0) * Math.PI );

                bx2 += 15.0 * Math.sin( (j / 70.0 + t * 6.0) * Math.PI );
                by2 += 15.0 * Math.cos( (i / 60.0 + i / 75.0 + t * 4.0) * Math.PI );

                bx2 /= 10.0;
                by2 /= 10.0;

                context.drawImage(img1, bx2, by2, 1, 1, bx, by, 2, 2);
            }
        }
    }
}