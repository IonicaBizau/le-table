var Table = require("../index");

var data = [
    ["Data 1.1", "Data 2.1\nNew line"]
  , ["Data 1.2", "Data 2.2loasdasd\nasd"]
];

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

var myTable = new Table({});

for (var i = 0; i < data.length; ++i) {
    myTable.addRow([i].concat(data[i]));
}

console.log(myTable.toString());
