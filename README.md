













![le-table](http://i.imgur.com/BKXaFAa.png)




# le-table

Another NodeJS module for creating ASCII tables.


![le-table](http://i.imgur.com/DwyCfWo.png)



## Installation

```sh
$ npm i le-table
```









## Example






```js
"use strict";

const Table = require("le-table");

// Table data
const data = [
    ["Cell 1.1", "Cell 2.1", "Cell 3.1"],
    ["Cell 1.2", {
        text: "Multi\nline\n\u001b[34mcell\ncontent that\u001b[0m is\n left aligned.",
        data: {
            hAlign: "left",
        }
    }, "Cell 3.2"],
    ["Cell 1.3", "Cell 2.3", "Cell 3.3"],
    ["Cell 1.4", "Cell 2.4", "Cell 3.4"]
];

// Create table instance
const myTable = new Table({
    cell: {
        padding: { left: 4, right: 4} // adds 2 spaces to both sides of every cell
    }
});

// Push data
for (let i = 0; i < data.length; ++i) {
    myTable.addRow([i].concat(data[i]), {
        hAlign: i > 2 ? "left": "right"
    });
}

// Output table
console.log(myTable.stringify());

```






## Documentation





### `LeTable(options)`
Creates a new instance of `LeTable`.

#### Params
- **Object** `options`: An object containing the table configuration:
  - `cell`: object containing
    - `hAlign` (default: `"center"`): One of the following values: `"left"`, `"center"` and `"right"`
    - `vAlign` (default: `"middle"`): One of the following values: `"top"`, `"middle"` and `"bottom"`
    - `autoEOL` (default: `true`): if true, the lines are wrapped inside of the cell
    - `stretch` (default: `true`): if true, the size of the box will not be fixed
  - `marks`: object containing the mark characters (see example)
  - `noAnsi` (Boolean): If you want to disable ANSI characters in the output.

#### Return
- **LeTable** The `LeTable` instance.

### `addRow(columns, ops)`
Adds a new row in table.

#### Params
- **Array** `columns`: Row data (as array)
- **Object** `ops`: Options for cell content

#### Return
- **LeTable** The `LeTable` instance.

### `stringify()`
Stringifies the table.

#### Return
- **String** The stringified table






## How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].



## License
See the [LICENSE][license] file.


[license]: /LICENSE
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
