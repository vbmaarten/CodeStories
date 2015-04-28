# Requirements

## Functional requirements

### Must haves:
* Be able to load a javascript file
* Code editor to view the contents of the javascript (**editor 1**)
* Be able to parse the javascript file
* Be able to debug the javascript file
* **Canvas element** to display visualizations in
* Code editor to input, write and edit code for manipulation of the **canvas element** (**editor 2**)
* Ability to mark a statement in **editor 1** and write code in **editor 2** that executes when the marked statement is reached during debugging
* Access to a graphics framework in **editor 2**
* Ability to access variables in **editor 2** that are in scope in the selected statement in **editor 1**
* Control buttons for debugging
	* play
	* pause
	* stop
	* next/previous statement
	* next/previous visualisation 
* Convex hull example

### Should have:
* Code editor for initialisation of code
	* Example/Mock input
* Automatic code layout on import for visibility
* Animation for use in the **canvas element**
* Playback speed buttons to control how long each step of the algorithm lasts
* Default visualisations available in **editor 2** that the user can use to display commonly used datastructures
* Multifile javascript projects
* Multiple visualisations/Visualisation tree
* Video linking
* Highlighting of code during execution


### Could have:
* 3D objects for use in the **canvas element**
	* Relative object placement in the **canvas element**
* Documentation of basic javascript functions
* Async visualisation
* Support for more languages other than javascript
* Nth time at a particular statement
* Plot over time / plot delta over time
* Ability to edit the code other than the code to manipulate the visualisation
* Chose which particular graphics framework is used in **editor 2**

## Non-functional requirements
* Writen in javascript
* Completed withing 10 weeks starting from April 20th
* Must be supported in at least latest versions of the chrome webbrower
* Use of the git versioning system
