![](http://i.imgur.com/BKXaFAa.png)

Another NodeJS module for creating ASCII tables.

# Installation
Run the following commands to download and install the application:

```sh
$ git clone git@github.com:IonicaBizau/node-le-table.git le-table
$ cd le-table
$ npm install
```

# Documentation
## `new Table(options)`
Creates a new instance of *`LeTable`*.

### Params:
* **Object|undefined** *options* An object containing the table configuration (if it's `undefined`, default values will be used):
  - `cell`: object containing
    - `hAlign` (default: `"center"`): One of the following values: `"left"`, `"center"` and `"right"`
    - `vAlign` (default: `"middle"`): One of the following values: `"top"`, `"middle"` and `"bottom"`
    - `autoEOL` (default: `true`): if true, the lines are wrapped inside of the cell
    - `stretch` (default: `true`): if true, the size of the box will not be fixed
  - `marks`: object containing the mark characters (see example)

### Return:
* **LeTable** LeTable instance

## `addRow(columns, ops)`
Adds a new row in table.

### Params:
* **Array** *columns* Row data (as array)
* **Object** *ops* Options for cell content

### Return:
* **LeTable** LeTable instance

## `toString()`
Stringifies the table

### Return:
* **String** Stringified table

# Example

```js
// Dependencies
var Table = require("le-table");

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
```

# How to contribute

1. File an issue in the repository, using the bug tracker, describing the
   contribution you'd like to make. This will help us to get you started on the
   right foot.
2. Fork the project in your account and create a new branch:
   `your-great-feature`.
3. Commit your changes in that branch.
4. Open a pull request, and reference the initial issue in the pull request
   message.

# License
See the [LICENSE](./LICENSE) file.
