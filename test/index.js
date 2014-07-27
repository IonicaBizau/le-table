// Dependencies
var Table = require("../index");

// Table data
var data = [
    ["Data 1.1", "Data 2.1\nNew line"]
  , ["Data 1.2", {
        text: "Multi\nline\ncell\ncontent that is\n left aligned."
      , data: {
            hAlign: "left"
        }
    }]
];

// Table defaults
Table.defaults.marks = {
    nw: "┌"
  , n:  "─"
  , ne: "┐"
  , e:  "│"
  , se: "┘"
  , s:  "─"
  , sw: "└"
  , w:  "│"
  , b: " "
  , mt: "┬"
  , ml: "├"
  , mr: "┤"
  , mb: "┴"
  , mm: "┼"
};

// Create table instance
var myTable = new Table({});

// Push data
for (var i = 0; i < data.length; ++i) {
    myTable.addRow([i].concat(data[i]), {
        hAlign: i > 2 ? "left": "right"
    });
}

// Output table
console.log(myTable.toString());
