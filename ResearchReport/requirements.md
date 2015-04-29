# Requirements

## Functional requirements

### Must haves:
* Be able to load a javascript file
* Code editor to view the contents of the javascript (**editor 1**)
* Be able to parse the javascript file
* Be able to debug the javascript file
* **Canvas element** to display a graphical **visualization** in
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
* Multifile javascript projects
* Code editor for initialisation of code
	* Example/Mock input
* Bundle a set of **visualizations** as a **narrative**
* Allow for sub **narratives**

### Should have:
* A visual tree representation of the **narrative** structure
* Animation for use in the **canvas element**
* Multiple visualisations/Visualisation tree
* Highlighting of code during execution
* Be able to export the project with its **narrative**
* GitHub support for projects
* Ability to small make changes in the project code without losing all of the visualization data


### Could have:
* Automatic code layout on import for visibility
* Default visualisations available in **editor 2** that the user can use to display commonly used datastructures
* Playback speed buttons to control how long each step of the algorithm lasts
* Video linking
* 3D objects for use in the **canvas element**
	* Relative object placement in the **canvas element**
* Documentation of basic javascript functions
* Async visualisation
* Support for more languages other than javascript
* Nth time at a particular statement
* Plot over time / plot delta over time
* Chose which particular graphics framework is used in **editor 2**


## Non-functional requirements
* Writen in javascript
* Completed withing 10 weeks starting from April 20th
* Must be supported in at least latest versions of the chrome webbrower
* Use of the git versioning system
