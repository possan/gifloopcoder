
function onGLC(glc) {
    glc.loop();
    glc.size(256, 256);
    glc.setDuration(2);
    glc.setFPS(60);
    glc.setMaxColors(128);
    glc.setMode("single");
    glc.setEasing(false);
    glc.styles.backgroundColor = "#222";
    var list = glc.renderList;

    function baseinfo(t2, i2, side) {
      var bx = Math.sin(i2 / 75.0) + Math.cos((t2 - i2 / 2000.0) * 6.0 * Math.PI);

      var rot1 = 0.0;
      rot1 += 0.5 * Math.sin(t2 * 4.0 * Math.PI + i2 / 95.0);
      rot1 += i2 / 100.0;

      var r = 50 + 10.0 * Math.cos(i2 / 90.0 + t2 * 6.0 * Math.PI);

      var ret = {
        bx: bx - 0.5,
        rot: (rot1 - 0.5) / 11.0,
        radii: r,
      }

      var aa = (t2 * 1.0 + ret.rot) * Math.PI * 2.0 + (side + 1) * Math.PI / 2.0;

      ret.x = 128 + ret.bx * 10.0 + ret.radii * Math.sin(aa);

        // console.log('baseX', t2, i2);
      return ret;
    }





    for(var i = 0; i < 20; i++) {
      list.addLine(
        (function(i) {
          var yy = i;
          return {
            x0: function(t) { return i * 16 - 8; /* + t * 32.0;*/ },
            x1: function(t) { return i * 16 + 5; /* + t * 32.0;*/ },
            y0: function(t) { return 0; },
            y1: function(t) { return 256; },
            strokeStyle: '#111',
            lineWidth: 1.0
          };
        })(i)
      );
      list.addLine(
        (function(i) {
          var yy = i;
          return {
            x0: function(t) { return 0; },
            x1: function(t) { return 256; },
            y0: function(t) { return i * 16 + 8 - t * 64.0 + 16; },
            y1: function(t) { return i * 16 - 5 - t * 64.0 + 16; },
            strokeStyle: '#111',
            lineWidth: 1.0
          };
        })(i)
      );
    }





    var sidecolors = [ '#fff', '#f00', '#0f0', '#00f' ];

    for(var i = 0; i < 256; i+=2) {
      for(var s=0; s<4; s++) {
        list.addLine(
          (function(i, side) {
            var yy = i;
            return {
              x0: function(t) {
                var bi = baseinfo(t, i, side);
                return bi.x;
              },
              x1: function(t) {
                var bi = baseinfo(t, i, side + 1);
                return bi.x;
              },
              y0: yy+2,
              y1: yy+2,
              // phase: t Math.random(),
              globalAlpha: function(t) {
                var b0 = baseinfo(t, i, side);
                var b1 = baseinfo(t, i, side + 1);
                var dx = b1.x - b0.x;
                if (dx < 0.0)
                  return 0.0;
                if (dx < 100)
                  return 0.25 + dx / 75.0;
                return 1.0;
              },
              strokeStyle: function(t) {
                return sidecolors[side];
              },
              lineWidth: 2.0
            };
          })(i, s)
        );
      }
    }

}