# Code Stories : A glorified debugger

## What

Code Stories allows developers to create a 'live' introduction to their (javascript) code and allow newcommer to quickly gain an overview of the project without risking the possiblity that they might miss an important aspect of the system. 
Narrative items can be added on nodes in the project (folder,files and ast nodes) and can be linked together to create a Narrative.
Narrative items on ast nodes are pressented in the order they are processed by running the code, and CodeNarrative items can use/display the content of the variables in their scope. 


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

Opening a browser at localhost on the given port will run the test suite and build a coverage report with istanbul, located in the coverage folder.

## Documentation

```sh
$ grunt ngdocs
```

Running `grunt ngdocs` will generate a documentation web page in the docs folder.

Set up a quick server at the docs/ directory to view the documentation.

## Examples

The directory `/app/stories` contains some example projects that already have some narration.