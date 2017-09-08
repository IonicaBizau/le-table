## Documentation

You can see below the API reference of this module.

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

