![](http://i.imgur.com/BKXaFAa.png)

Another NodeJS module for creating ASCII tables.

# Example

```js
// Dependencies
var Table = require("../index");

// Table data
var data = [
    ["Cell 1.1", "Cell 2.1", "Cell 3.1"]
  , ["Cell 1.2", {
        text: "Multi\nline\n\u001b[34mcell\ncontent that\u001b[0m is\n left aligned."
      , data: {
            hAlign: "left"
        }
    }, "Cell 3.2"]
  , ["Cell 1.3", "Cell 2.3", "Cell 3.3"]
  , ["Cell 1.4", "Cell 2.4", "Cell 3.4"]
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

The output will be:

![](http://i.imgur.com/vC3U1ZD.png)

# Installation

```sh
$ npm install le-table
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

# Changelog
## `2.0.0`
 - Upgraded to `overlap@1.4.0`.

## `1.0.1`
 - Fixed offset calculation.

## `1.0.0`
 - Initial stable release.

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
