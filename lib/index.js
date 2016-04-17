"use strict";

const Overlap = require("overlap")
    , Box = require("cli-box")
    , Ul = require("ul")
    ;

class LeTable {
    /**
     * LeTable
     * Creates a new instance of `LeTable`.
     *
     * @name LeTable
     * @function
     * @param {Object} options An object containing the table configuration:
     *
     *   - `cell`: object containing
     *     - `hAlign` (default: `"center"`): One of the following values: `"left"`, `"center"` and `"right"`
     *     - `vAlign` (default: `"middle"`): One of the following values: `"top"`, `"middle"` and `"bottom"`
     *     - `autoEOL` (default: `true`): if true, the lines are wrapped inside of the cell
     *     - `stretch` (default: `true`): if true, the size of the box will not be fixed
     *   - `marks`: object containing the mark characters (see example)
     *
     * @return {LeTable} The `LeTable` instance.
     */
    constructor (options) {
        this.data = [];

        options = Ul.deepMerge(options, {
            marks: LeTable.defaults.marks
          , cell: LeTable.defaults.cell
        });

        this.cell_ops = options.cell;
        this.marks = options.marks;
    }

    /**
     * addRow
     * Adds a new row in table.
     *
     * @name addRow
     * @function
     * @param {Array} columns Row data (as array)
     * @param {Object} ops Options for cell content
     * @return {LeTable} The `LeTable` instance.
     */
    addRow (columns, ops) {

        let computedColumns = []
          , cColumn = null
          , comCol = null
          , cellOps = this.cell_ops
          ;

        columns.forEach(cColumn => {
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
            comCol.data = Ul.deepMerge(cColumn.data, ops, comCol.data);
            computedColumns.push(comCol);
        });

        this.data.push(computedColumns);
        return this;
    }

    /**
     * stringify
     * Stringifies the table.
     *
     * @name stringify
     * @function
     * @return {String} The stringified table
     */
    stringify () {

        let output = ""
          , offset = {
                x: 0
              , y: 0
            }
          , cellSizes = []
          , cRow = null
          , cColumn =  null
          , cell = null
          , cCell = null
          , splits = null
          , wMax = null
          , hMax = null
          , mrks = null
          , marks = this.marks
          ;

        let createCell = (cColumn, wMax, hMax, marks) => {
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

        // Compute cell sizes internally
        this.data.forEach((cRow, i) => {
            cellSizes.push([]);
            cRow.forEach(cColumn => {
                cell = createCell(cColumn, 1, 1, {});
                splits = cell.split("\n");
                cCell = {
                    w: splits[0].trim().length
                  , h: splits.length - 2
                };
                cellSizes[i].push(cCell);
            });
        });

        // Each row
        this.data.forEach((cRow, i) => {

            // Compute row
            wMax = -1;
            hMax = -1;

            cellSizes[i].forEach(cCell => {
                if (cCell.h > hMax) { hMax = cCell.h; }
            });

            // Each column from current row
            cRow.forEach((cColumn, ii) => {

                // Compute current column
                cellSizes.forEach((cCell, iii) => {
                    cCell = cellSizes[iii][ii];
                    if (cCell.w > wMax) { wMax = cCell.w; }
                });

                mrks = {
                    nw: ((!i && !ii)
                        ? marks.nw : (!i && ii < cRow.length)
                        ? marks.mt : (!ii && i < this.data.length)
                        ? marks.ml : marks.mm)
                  , n:  marks.n
                  , ne: (!i && ii === cRow.length - 1)
                        ? marks.ne : marks.mr
                  , e:  marks.e
                  , se: marks.se
                  , s:  marks.s
                  , sw: (i === this.data.length - 1 && !ii)
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
            });

            offset.x = 0;
            offset.y += hMax + 1;
        });

        return output.trim();
    }
}

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

module.exports = LeTable;
