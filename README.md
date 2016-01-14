[![le-table](http://i.imgur.com/BKXaFAa.png)](#)

# le-table [![PayPal](https://img.shields.io/badge/%24-paypal-f39c12.svg)][paypal-donations] [![Travis](https://img.shields.io/travis/IonicaBizau/node-le-table.svg)](https://travis-ci.org/IonicaBizau/node-le-table/) [![Version](https://img.shields.io/npm/v/le-table.svg)](https://www.npmjs.com/package/le-table) [![Downloads](https://img.shields.io/npm/dt/le-table.svg)](https://www.npmjs.com/package/le-table) [![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/johnnyb?utm_source=github&utm_medium=button&utm_term=johnnyb&utm_campaign=github)

> Another NodeJS module for creating ASCII tables.

[![le-table](http://i.imgur.com/DwyCfWo.png)](#)

## Installation

```sh
$ npm i --save le-table
```

## Example

```js
// Dependencies
var Table = require("le-table");

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
var myTable = new Table();

// Push data
for (var i = 0; i < data.length; ++i) {
    myTable.addRow([i].concat(data[i]), {
        hAlign: i > 2 ? "left": "right"
    });
}

// Output table
console.log(myTable.toString());
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

#### Return
- **LeTable** The `LeTable` instance.

### `addRow(columns, ops)`
Adds a new row in table.

#### Params
- **Array** `columns`: Row data (as array)
- **Object** `ops`: Options for cell content

#### Return
- **LeTable** The `LeTable` instance.

### `toString()`
Stringifies the table.

#### Return
- **String** The stringified table

## How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

## Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:

 - [`ascii-github`](https://npmjs.com/package/ascii-github)

 - [`bible`](https://github.com/BibleJS/BibleApp)

 - [`birthday`](https://github.com/IonicaBizau/birthday)

 - [`cli-github`](https://github.com/IonicaBizau/cli-github)

 - [`clp`](https://github.com/IonicaBizau/node-clp)

 - [`git-issues`](https://github.com/softwarescales/git-issues) by Gabriel Petrovay

 - [`git-issues1`](https://github.com/softwarescales/git-issues) by Gabriel Petrovay

 - [`idea`](https://github.com/IonicaBizau/idea)

 - [`tithe`](https://github.com/IonicaBizau/tithe)

## License

[MIT][license] © [Ionică Bizău][website]

[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(http%3A%2F%2Fionicabizau.net)&year=2014#license-mit
[website]: http://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md