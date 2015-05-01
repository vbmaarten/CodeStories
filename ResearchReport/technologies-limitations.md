# Technologies and Limitations

The project is based in the browser. Therefore the browser API is very important to the project. Apart from that we have defined 3 parts for which we will use existing solutions. These are:
* Code Editor
* JS Interpreter
* Visualization libraries
* Storage Interface*

This section contains our assessment of the options and some limitations created by these technologies or time constraints. The conclusion states our selection. 

## Technologies and Libraries
###Code editor

In the application the goal is to enhance the readability and the understandability of some code. This code has to be able to be viewed by the user so that he can make these enhancements with use of visualizations. The code for the visualizations must also be able to be viewed, but also written and edited. For this purpose we need to have a way to display code in a comprehensible way to be viewed and in some cases edited by the user. Since there already are conventions for how code is formatted we can look for some existing solutions to use in our application.

Requirements:
* Easy to use
* Easy to edit
* Lightweight (not a lot of code)
* Simple (not to full featured)
* Open source

List of Options:
* [Ace](http://ace.c9.io/)
* [Code Mirror](http://codemirror.net)
* [ICE Coder](https://icecoder.net/)
* [Codiad](http://codiad.com/)

These options are the commonly used code editors for the web. Ace and Code mirror are popular in use with services like web based development platforms like c9.io and jsfiddle.net. Ace and Code mirror are the most simple with only having the minimal most common features you would expect in a code editor like syntax highlighting, automatic indent and outdent and code folding. On top of that they allow to be embedded into html document, which gives more freedom for how the document is structured. 

Pros:
* Very lightweight
* Easy to embed
* Lot of freedom

Cons: 
* Have to implement features we need that are missing

The two later options, ICE Coder and Codiad are not meant for embedding but rather are to be adjusted to fit our needs. They are full web based IDEs and among other things feature support for a multitude of languages, can be used online or locally, has its own file manager on top of all the common features the previous two code editors have.

Pros:
* Already feature heavy
* No need to embed
* Can be accessed online and offline

Cons:
* Requires more setup
* Takes more time to learn how it works
* Requires to implement the graphical tool into the IDE

The question now is, which of these two approaches is optimal for use in our solution. On the one hand we have the smaller code editors Ace and Code mirror who we can use to embed into an environment we make. And on the other hand we have the larger ICE coder and Codiad which we would add our features onto. 

For the purpose of our application the smarter option would be to use either Ace or Code mirror because it requires minimal setup and minimal time to learn. The features it gives should be adequate for what we need it to do. This also allows us to have more freedom when designing the rest of the system as we do not have to implement it into the Code Editor but allows us to have a more modular design.

Both of these editors are widely supported and the most actively used in their field. Ace is used and supported by c9.io and also supported by Mozilla, code mirror is used by jsfiddle.net and codepen.io, so both editors do not lack in support. Code mirror is smaller in size and is historically more stable and has better browser compatibility. Ace however has a couple more useful features and is overall more polished. Lastly the documentation of Ace is comprehensible and overall easier to use than the documentation of Code mirror. 

###Interpreter 

To add meta code to specific statements in a piece of javascript code we need to break it down in it's logical components. Than we need to step through these components, and as we execute them we also execute the meta code that is linked to it. This behavior is very similar to an interpreter, with the addition that some extra code can be linked to a statement which is executed when the statement is executed. 

Requirements:
* Written in javascript, so we can use it in the browser
* Easy access to the scope, so it can be used in the meta code
* Simple, so that we can easily extend it to fit our needs

####[JS-Interpreter](https://neil.fraser.name/software/JS-Interpreter/)
A simple javascript interpreter which allows stepping through the code. It uses [acorn](https://github.com/marijnh/acorn) for parsing. 

######Pro's
* Written in javascript
* Support stepping
* Small (about 2000 lines of code)

######Con's
* Supports a limited form of javascript (no try/catch for example)

### Visualization Libraries
At a CodeNarative of the Reader, the CodeNarative code gets passed the scope at the moment the interpreter passes the AST Node and a VScope object containing the visualizations that are active within the narative. 

It is important for the visualization framework to give the Writer an intuitaive and quick way to initiate or edit some state of the some visualization. 
The main question is the paradigm the Writer should initiate and edit an animation. On the one end of the spectrum there is the possib ility to 
give the Writer access to a raw HTML5 canvas context. On the other end of the spectrum is some framework that has built in objects like PieChart that the Writer can 
call with an element of the scope to update the visual. The first option forces the Writer to write much more code. The second might lock in the Writer to the framework and restrict the Writer in its creativity. 

Additionally, for the purpose of visualizing a some transition it would be nice to have the ability to animate the visualizations.
When running a visualization we would like the ability to jump to the end when a user decides they want to jump to the next step. 
The list of options that have been considered

####Canvas Based
* Basic Canvas 
* [Pixijs](http://www.pixijs.com/)
* [fabricjs](http://fabricjs.com/)
* [infovis](http://philogb.github.io/jit/)

###### HTML5 Canvas
The standard HTML5 canvas is very low level. It will only allow the Writer to draw on top of what is already there and it does not have standard utilities for manipulating some object relative to another object. 
Pros:
* Fast
* Excelent support 
* Well known

Cons:
* not trivial to bind an object to a visualization object
* not trivial to place objects relative to one another
* Any new functions must also be documented


###### Pixijs
A Canvas type framework that enables easy loading and has some built in features for attaching visualizations and the animation loop
Pros:
* Anchor points
* Image loading


Cons:
* No self contained visualization object. 

###### Fabricjs
The main features of Fabricjs seem to be aimed toward interacting with the canvas. This is not a feature that is particularly useful to our project

###### InfoVis
A high level data visualization framework. It has many standard visualization objects. 

Pros:
* Standard visualization objects
* Decent documentation & demo's


##### Vector Graphic Based
* Basic SVG
* [raphael](http://raphaeljs.com/)
* [D3](http://d3js.org/t)

###### HTML5 SVG DOM elements
The default SVG elements are another possibility. 
It is XML based and lives inside the DOM. 

Pros:
* CSS / DOM API

Cons:
* No prefab visualizations

###### D3

Pros:
* Visualization based on updating data.
* Build in support for tree/graph layout
* Large community 

Cons:
* Bloated with data import functions.

###### infovis

Pros: 
* Visualization based on updating data.
* Build in support for tree/graph layout



An open question at this moment is: is it useful to allow the Writer to choose from multiple options?


### Storage

The storage options are either local or remote. The types considered are the basic file system, git , some SQL db. 

Both local and remote are desired features. We will likely begin with the local option and extend it to include remote
import and export later on. 

Naratives are indexed by their CAST path.
A collection of naratives will be linked to a specific git commit. This ensures that naratives are linked to code that will not change. The SQL option would require an additional db setup. This would give us more options for querying. The simplicity of file system option, where naratives are simply saved to their CAST path, and the ability to change this into a git repository are the reasons we will most likely chose a simple file system. 

## Conclusion 
For the editor we will settle on Ace. The Interpreter leaves us little choice but we have yet to encounter major obstacles. The visualizations pose more problematic choices. The InfoVis and D3 option are both very promising. We will aim toward modularity to at least give both of them a try in the testing phase and might end up allowing a Writer to make the choice.


# Limitations


### JS Only
We do not presume we will have the time to add another parser for a another language. Nevertheless we will aim to create a design that would allow this in a fairly straightforward way. 

### HTML5 required
We will only be testing on the latest versions of Firefox and Chrome. 

### Code change and Narative reuse. 
Narative files are appended to a specific git commit. We are not sure if we will have the time to create a user friendly process for updating the naritive files. 


