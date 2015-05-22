# code-stories

## Build & development

Install node & grunt

```sh
$ npm install
```

Run `npm install` to get the necessary modules

```sh
$ grunt
$ grunt serve
```

Run `grunt` for building and `grunt serve` for preview.

## Testing

```sh
$ grunt test
```

Running `grunt test` will run the unit tests with karma.

Opening the a browser at the given url will run the test suite and build a coverage report with istanbul, located in the coverage folder.
