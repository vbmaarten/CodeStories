###Graphic Options

It is important for the visualization framework to give the user an intuitaive and quick way to edit some state of the some display element. 
For the purpose of visualizing a some transition it would be nice to have the ability to animate some object.
When animating some object we would like the ability to jump to the end when a user decides they want to jump to the next step. 
Additionally it would be nice to have the ability to chain animations.

List of Options:

###Canvas Based
* Basic Canvas 
* [Pixijs](http://www.pixijs.com/)
* [fabricjs](http://fabricjs.com/)
* [infovis](http://philogb.github.io/jit/)
* 
##### 3D
* [Threejs](http://threejs.org)/
* [Ivank](http://lib.ivank.net/)

###Vector Graphic Based
* Basic SVG
* [raphael](http://raphaeljs.com/)
* [D3](http://d3js.org/t)

### Canvas & Vector based
* [two.js](https://jonobr1.github.io/two.js/)

An open question at this moment is: is itusefull to allow the user to choose from multiple options?

###HTML5 canvas
The standardt HTML5 canvas is very low level. It will only allow the user to draw on top of what is already there and it does not have standardt utilities for manipulating some object relative to another object. 


Pros:
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
* No prefab visualizations


####Threejs
A 3D library. 

Pros: 
* 3D features.

Cons: 
* Required knowledge of 3D manipulations.

####D3

Pros:
* Visualization based on updating data.
* Build in support for tree/graph layout
* Large community 

Cons:
* Bloated with data import functions.
* 

####infovis

Pros: 
* Visualization based on updating data.
* Build in support for tree/graph layout



