###Graphic Options
At a CodeNarative of the Reader, the CodeNarative code gets passed the scope at the moment the interpreter passes the AST Node and a VScope object containing the visualizations that are active within the narative. 

It is important for the visualization framework to give the Writer an intuitaive and quick way to initiate or edit some state of the some visualization. 
The main question is the paradigm the Writer should initiate and edit an animation. On the one end of the spectrum there is the possiblility to 
give the Writer access to a raw HTML5 canvas context. On the other end of the spectrum is some framework that has built in objects like PieChart that the Writer can 
call with an element of the scope to update the visual. The first option forces the Writer to write much more code. The second might lock in the Writer to the framework and restrict the Writer in its creativity. 

Additionally, for the purpose of visualizing a some transition it would be nice to have the ability to animate the visualizations.
When running a visualization we would like the ability to jump to the end when a user decides they want to jump to the next step. 
The list of options that have been considered

##Canvas Based
* Basic Canvas 
* [Pixijs](http://www.pixijs.com/)
* [fabricjs](http://fabricjs.com/)
* [infovis](http://philogb.github.io/jit/)

### HTML5 Canvas
The standardt HTML5 canvas is very low level. It will only allow the Writer to draw on top of what is already there and it does not have standardt utilities for manipulating some object relative to another object. 
Pros:
* Fast
* Excelent support 
* Well known

Cons:
* not trivial to bind an object to a visualization object
* not trivial to place objects relative to one another
* Any new functions must also be documentend


### Pixijs
A Canvas type framework that enables easy loading and has some built in features for attaching visualizations and the animation loop
Pros:
* Anchor points
* Image loading


Cons:
* No self contained visualization object. 

### Fabricjs
The main features of Fabricjs seem to be aimed toward interacting with the canvas. This is not a feature that is particularly usefull to our project

### InfoVis
A high level data visualization framework. It has many standardt visualization objects. 

Pros:
* Standardt visualization objects
* Decent documentation & demo's


##Vector Graphic Based
* Basic SVG
* [raphael](http://raphaeljs.com/)
* [D3](http://d3js.org/t)

### HTML5 SVG DOM elements
The default SVG elements are another possibility. 
It is XML based and lives inside the DOM. 

Pros:
* CSS / DOM API

Cons:
* No prefab visualizations

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

An open question at this moment is: is it usefull to allow the Writer to choose from multiple options?

## Conclusion
The InfoVis and D3 option are both very promissing. We will aim toward modularity to at least give both of them a try in the testing phase and might end up allowing a Writer to make the choice.
