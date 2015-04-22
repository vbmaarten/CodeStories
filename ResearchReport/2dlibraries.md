##2D libraries

It is important for the visualization framework to give the user an intuitaive and quick way to edit some state of the some display element. For the purpose of animating some object we would like the ability to jump to the end when a user decides they want to jump to the next step. Additionally it would be nice to have the ability to chain animations

List of Options:

Canvas Based
* Basic Canvas 
* Pixijs: http://www.pixijs.com/
* Ivank: http://lib.ivank.net/
* two.js: https://jonobr1.github.io/two.js/
* fabricjs:  http://fabricjs.com/
* infovis: http://philogb.github.io/jit/

Vector Graphic Based
* Basic SVG
* raphael: http://raphaeljs.com/
* D3 : http://d3js.org/t

An intresting question is if it is usefull to allow the user to choose.

#HTML5 canvas
The standardt HTML5 canvas is very low level. It will only allow the user to draw on top of what is already there and it does not have standardt utilities for manipulating some object relative to another object. 


Pro:
* Fast
* Excelent support 
* Well known

Cons:
* not trivial to bind an object to a visualization object
* not trivial to place objects relative to one another
* Any new functions must also be documentend

#SVG DOM elements
The default SVG elements are another possibility. 
It is XML based and lives inside the DOM. 

Pros:
* CSS interface

Cons:
* no prefab elements






