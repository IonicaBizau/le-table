// Dependencies
var Overlap = require("overlap")
  , Box = require("cli-box")
  ;

var LeTable = module.exports = function (options) {
    var self = this;
    self.data = [];


    options = Object(options);
    options.marks = Object(options.marks);


    var marks = {};
    for (var m in LeTable.defaults.marks) {
        marks[m] = options.marks[m] || LeTable.defaults.marks[m];
    }

    self.addRow = function (columns, ops) {
        self.data.push({
            d: columns
          , o: Object(ops)
        });
    };

    self.toString = function () {
        var output = ""
          , offset = {
                x: 0
              , y: 0
            }
          ;

        for (var i = 0; i < self.data.length; ++i) {
            var cRow = self.data[i]
            for (var ii = 0; ii < cRow.d.length; ++ii) {
                var cell = Box({
                    w: 1
                  , h: 1
                  , marks: {
                        nw: ((!i && !ii) ? marks.nw
                            : (!i && ii < cRow.d.length) ? marks.mt
                            : (!ii && i < self.data.length) ? marks.ml
                            : marks.mm)
                      , n:  marks.n
                      , ne: (!i && ii === cRow.d.length - 1) ? marks.ne
                            : marks.mr
                      , e:  marks.e
                      , se: marks.se
                      , s:  marks.s
                      , sw: (i === self.data.length - 1 && !ii) ? marks.sw
                            : marks.mb
                      , w:  marks.w
                      , b: " "
                    }
                }, {
                    text: cRow.d[ii].toString()
                  , stretch: true
                  , autoEOL: true
                }).toString();
                output = Overlap({
                    who: output
                  , with: cell
                  , where: offset
                });
                offset.x += cell.split("\n")[0].length - 1
            }
            offset.x = 0;
            offset.y += cell.split("\n").length - 1
        }
        return output;
    };
};

LeTable.defaults = {
    marks: {
        nw: "+"
      , n:  "-"
      , ne: "+"
      , e:  "|"
      , se: "+"
      , s:  "-"
      , sw: "+"
      , w:  "|"
      , b: " "
      , mt: "+"
      , ml: "+"
      , mr: "+"
      , mb: "+"
      , mm: "+"
    }
};
