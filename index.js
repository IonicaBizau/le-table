// Dependencies
var Overlap = require("overlap")
  , Box = require("cli-box")
  ;

var LeTable = module.exports = function (options) {
    var self = this;
    self.data = [];

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
                var cell = Box("1x1", {
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
