# Requirements

## Functional requirements

### Must haves:
* Be able to load a javascript project
* Project navigator to view the files in the project
* **Code editor** to view the contents of a file
* Ability to select a file and have it displayed in the **code editor**
* Be able to parse the javascript files in the project to create ASTs
* Be able to debug javascript
* Be able to attach a narrative to either a file, folder or node in a AST
* Be able to view all narratives attached to a file, folder or node in AST
* An element to display a narrative in a **story panel**
* Be able to add narrative elements to a narrative, examples:
	* Text
	* Video
	* Images
* Be able to edit **narrative elements** of a narrative 
* Editor to input, write and edit **narrative elements**
* **Visualization**: A narrative element to create animations that can make use of:
	* A graphics framework
	* Ability to access program scope
* Control buttons for debugging
	* play
	* pause
	* stop
	* next/previous statement
	* next/previous visualisation
* Convex hull example
* Code editor for initialisation of code
	* Example/Mock input

### Should have:
* Be able to export the project with its **narrative**
* Be able to share the project with **narrative** to another user (that user can't edit the narratives)
* A visual tree representation of the **narrative** structure
* Highlighting of code during execution
* GitHub support for projects
* Ability to make small changes in the project code without losing all of the visualization data


### Could have:
* Automatic code layout on import for visibility
* Default visualisations available in  that the user can use to display commonly used datastructures
* Playback speed buttons to control how long each step of the algorithm lasts
* Documentation of basic javascript functions
* Plot over time / plot delta over time
* Chose which particular graphics framework is used in **visualization**

### Won't have:
* Support for more languages other than javascript
* 3D objects for use in the **visualization**
* Relative object placement in the **visualization**
* Async visualisation

## Non-functional requirements
* Writen in javascript
* Completed withing 10 weeks starting from April 20th
* Must be supported in at least latest versions of the chrome webbrower
* Use of the git versioning system
