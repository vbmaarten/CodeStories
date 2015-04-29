
AST: Abstract syntax tree. Parsed code
File/Folder tree. Basic file and folder structure
CAST: Context abstract syntax tree.  Combination of File/Folder & AST tree.

Project&Text View: Navigator and file content view. 
Tree View: A tree representation of the CAST.

A CAST node selection is the same for tree View <-> project & text View


Narrative: A Sequence of NarativePrimitives attached to a node in the CAST.

Code Narrative: A Narrative that is located in an AST node. 
  * Has access to the scope
  * Final Narrative Primitive is the next narrative node reached by execution.

Narrative Primitives: A step in a Narrative Node that user can step through with next/(prev). 
  * Text
  * Video 
  * Image
  * Link to a narrative
  * Visualization call

Visualization: Object with functions to animate/update a graphic. examples: Graph, table , pie-chart



Viewer: A person that follows Narrative Nodes or selects a Project Node to gain more insight about that node

Writer: A person that writes Narrative Nodes for nodes attached to the CAST.

Narrative tree: A tree of related Naratives when selecting a node in the CAST.



ExampleScope: 



//root folder
""" blah blah cool story bro """

PlayVideo("youtublebkabka");

StepIn("/js/main.js/f_inc/Beginners-Maarten", 5);

//js/main.js/f_inc/body/Biginners-Maarten
(










