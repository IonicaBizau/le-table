// Dependencies
var Overlap = require("overlap")
  , Box = require("cli-box")
  , Ul = require("ul")
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
    var marks = null
      , cellOps = null
      ;

    marks = self.marks = Ul.merge(options.marks, LeTable.defaults.marks);
    cellOps = self.cell = Ul.merge(options.marks, LeTable.defaults.cell);

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
        var computedColumns = []
          , i = 0
          , cColumn = null
          , comCol = null
          , op = null
          ;

        for (i = 0; i < columns.length; ++i) {
            cColumn = columns[i];
            comCol = {
                text: (cColumn.text || cColumn).toString()
              , data: {
                    stretch: cellOps.stretch
                  , autoEOL: cellOps.autoEOL
                  , vAlign:  cellOps.vAlign
                  , hAlign:  cellOps.hAlign
                }
            };

            // Override with ops
            for (op in ops) {
                comCol.data[op] = ops[op];
            }

            // Override with cell data
            for (op in cColumn.data) {
                comCol.data[op] = cColumn.data[op];
            }

            computedColumns.push(comCol);
        }

        self.data.push(computedColumns);
        return self;
    };

    function createCell(cColumn, wMax, hMax, marks) {
        return Box({
            w: cColumn.data.w || cColumn.data.width || wMax
          , h: cColumn.data.h || cColumn.data.height || hMax
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
          , cellSizes = []
          , i = 0
          , ii = 0
          , cRow = null
          , cColumn =  null
          , cell = null
          , cCell = null
          , splits = null
          , wMax = null
          , hMax = null
          , mrks = null
          ;

        // Compute cell sizes internally
        for (i = 0; i < self.data.length; ++i) {
            cRow = self.data[i];
            cellSizes.push([]);
            for (ii = 0; ii < cRow.length; ++ii) {
                cColumn =  cRow[ii];
                cell = createCell(cColumn, 1, 1, {});
                splits = cell.split("\n");
                cCell = {
                    w: splits[0].trim().length
                  , h: splits.length - 2
                };
                cellSizes[i].push(cCell);
            }
        }

        // Each row
        for (i = 0; i < self.data.length; ++i) {

            // Compute row
            cRow = self.data[i];
            wMax = -1;
            hMax = -1;

            for (iii = 0; iii < cellSizes[i].length; ++iii) {
                cCell = cellSizes[i][iii];
                if (cCell.h > hMax) { hMax = cCell.h; }
            }

            // Each column from current row
            for (ii = 0; ii < cRow.length; ++ii) {

                cColumn = cRow[ii];

                // Compute current column
                for (iii = 0; iii < cellSizes.length; ++iii) {
                    cCell = cellSizes[iii][ii];
                    if (cCell.w > wMax) { wMax = cCell.w; }
                }

                mrks = {
                    nw: ((!i && !ii)
                        ? marks.nw : (!i && ii < cRow.length)
                        ? marks.mt : (!ii && i < self.data.length)
                        ? marks.ml : marks.mm)
                  , n:  marks.n
                  , ne: (!i && ii === cRow.length - 1)
                        ? marks.ne : marks.mr
                  , e:  marks.e
                  , se: marks.se
                  , s:  marks.s
                  , sw: (i === self.data.length - 1 && !ii)
                        ? marks.sw : marks.mb
                  , w:  marks.w
                  , b: " "
                };

                // Add stringified cell to output
                output = Overlap({
                    who: output
                  , with: createCell(cColumn, wMax, hMax, mrks)
                  , where: offset
                });

                offset.x += wMax + mrks.w.length - 2;
            }

            offset.x = 0;
            offset.y += hMax + 1;
        }

        return output.trim();
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
