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
    options.cell = Object(options.cell);

    // Create marks
    var marks = self.marks = {};
    for (var m in LeTable.defaults.marks) {
        marks[m] = options.marks[m] || LeTable.defaults.marks[m];
    }

    // Create cell options
    var cellOps = self.cell = {};
    for (var m in LeTable.defaults.cell) {
        cellOps[m] = options.marks[m] !== undefined
                     ? options.marks[m] : LeTable.defaults.cell[m];
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
        var computedColumns = [];

        for (var i = 0; i < columns.length; ++i) {
            var cColumn = columns[i]
              , comCol = {
                    text: (cColumn.text || cColumn).toString()
                  , data: {
                        stretch: cellOps.stretch
                      , autoEOL: cellOps.autoEOL
                      , vAlign:  cellOps.vAlign
                      , hAlign:  cellOps.hAlign
                    }
                }
              ;

            for (var op in ops) {
                comCol.data[op] = ops[op];
            }

            computedColumns.push(comCol);
        }

        self.data.push(computedColumns);
        return self;
    };

    function createCell(cColumn, wMax, hMax, marks) {
        return Box({
            w: wMax
          , h: hMax
          , marks: marks
        }, {
            text: cColumn.text
          , stretch: cColumn.data.stretch
          , autoEOL: cColumn.data.autoEOL
          , vAlign: cColumn.data.vAlign
          , hAlign: cColumn.data.hAlign
        }).toString();
    }

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
            for (var ii = 0; ii < cRow.length; ++ii) {
                var cColumn =  cRow[ii]
                  , cell = createCell(cColumn, 1, 1, {})
                  , splits = cell.split("\n")
                  , cCell = {
                        w: (ii !== cRow.length - 1)
                           ? splits[0].length - 2 : splits[0].length
                      , h: splits.length - 2
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
            for (var ii = 0; ii < cRow.length; ++ii) {

                var cColumn = cRow[ii];

                // Compute current column
                for (var iii = 0; iii < cellSizes.length; ++iii) {
                    var cCell = cellSizes[iii][ii];
                    if (cCell.w > wMax) { wMax = cCell.w; }
                }

                var mrks = {
                    nw: ((!i && !ii) ? marks.nw
                        : (!i && ii < cRow.length) ? marks.mt
                        : (!ii && i < self.data.length) ? marks.ml
                        : marks.mm)
                  , n:  marks.n
                  , ne: (!i && ii === cRow.length - 1) ? marks.ne
                        : marks.mr
                  , e:  marks.e
                  , se: marks.se
                  , s:  marks.s
                  , sw: (i === self.data.length - 1 && !ii) ? marks.sw
                        : marks.mb
                  , w:  marks.w
                  , b: " "
                };

                // Add stringified cell to output
                output = Overlap({
                    who: output
                  , with: createCell(cColumn, wMax, hMax, mrks)
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
  , cell: {
        vAlign: "top"
      , hAlign: "left"
      , autoEOL: true
      , stretch: true
    }
};
