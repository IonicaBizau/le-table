// Dependencies
var Overlap = require("overlap")
  , Box = require("cli-box")
  ;

/**
 * LeTable
 * Another NodeJS module for creating ASCII tables.
 *
 * @name exports
 * @function
 * @param {Object} options An object containing the table configuration.
 * @return {LeTable} LeTable instance
 */
var LeTable = module.exports = function (options) {

    var self = this;
    self.data = [];

    // Handle options
    options = Object(options);
    options.marks = Object(options.marks);

    // Create marks
    var marks = self.marks = {};
    for (var m in LeTable.defaults.marks) {
        marks[m] = options.marks[m] || LeTable.defaults.marks[m];
    }

    /**
     * addRow
     * Adds a new row in table.
     *
     * @name addRow
     * @function
     * @param {Array} columns Row data (as array)
     * @param {Object} ops Options for cell content
     * @return {LeTable} LeTable instance
     */
    self.addRow = function (columns, ops) {
        self.data.push({
            d: columns
          , o: Object(ops)
        });
        return self;
    };

    /**
     * toString
     * Stringifies the table
     *
     * @name toString
     * @function
     * @return {String} Stringified table
     */
    self.toString = function () {

        var output = ""
          , offset = {
                x: 0
              , y: 0
            }
          ;

        // Compute cell sizes internally
        var cellSizes = [];
        for (var i = 0; i < self.data.length; ++i) {
            var cRow = self.data[i]
            cellSizes.push([]);
            for (var ii = 0; ii < cRow.d.length; ++ii) {
                var cell = Box({w:1,h:1, marks: {}}, {
                        text: cRow.d[ii].toString()
                      , stretch: true
                      , autoEOL: true
                    }).toString()
                  , cCell = {
                        w: (ii !== cRow.d.length - 1) ?
                            cell.split("\n")[0].length - 2 : cell.split("\n")[0].length
                      , h: cell.split("\n").length - 2
                    }
                  ;

                cellSizes[i].push(cCell);
            }
        }

        // Each row
        for (var i = 0; i < self.data.length; ++i) {

            // Compute row
            var cRow = self.data[i]
              , wMax = -1
              , hMax = -1
              ;

            for (var iii = 0; iii < cellSizes[i].length; ++iii) {
                var cCell = cellSizes[i][iii];
                if (cCell.h > hMax) { hMax = cCell.h; }
            }

            // Each column from current row
            for (var ii = 0; ii < cRow.d.length; ++ii) {

                // Compute current column
                for (var iii = 0; iii < cellSizes.length; ++iii) {
                    var cCell = cellSizes[iii][ii];
                    if (cCell.w > wMax) { wMax = cCell.w; }
                }

                // Create cell box
                var cell = Box({
                    w: wMax
                  , h: hMax
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

                // Add stringified cell to output
                output = Overlap({
                    who: output
                  , with: cell
                  , where: offset
                });

                offset.x += wMax + 1;
            }

            offset.x = 0;
            offset.y += hMax + 1;
        }
        return output;
    };
};

// Defaults
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
