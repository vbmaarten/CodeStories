
AST: Abstract syntax tree . Parsed code
File/Folder tree. Basic file and folder structure
CAST: Context&AST .  Combination of File/Folder & AST tree.

Project&Text View: Navigator and file content view. 
Tree View: A tree representation of the CAST.

A CAST node selection is the same for tree View <-> project&Text View


  
Narative: A Sequence of NarativePrimitives attached to a node inn the CAST.

NarativePrimitives: A step in a Narative Node that user can step through with next/(prev). 
  * Text
  * Video 
  * Narative Link 
  * Visualization call
  
Visualization: Object with functions to animate/update a graphic. examples: Graph , table  , pie-chart

CodeNarative: A Narative that is located in a AST node. 
  * Has access to the scope 
  * Final Narative Node is the next narative node reached by execution.
  

Viewer: A person that follows Narative Nodes or selects a Project Node to gain more insight about that node
Writer: A person that writes narative nodes for nodes attached to the CAST.



Narative tree: A tree of related Naratives when selecting a node in the CAST.

ExampleScope: 











//root folder
""" blah blah cool story bro """

PlayVideo("youtublebkabka");

StepIn("/js/main.js/f_inc/Beginners-Maarten", 5);

//js/main.js/f_inc/body/Biginners-Maarten
(










