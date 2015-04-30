## Product definition

Consider the following user story:

Bob is a professor at the university in Delft specializing in algorithmics. 
Next to his work in this field he also teaches students the fundamentals, theory and science behind algorithms. 
For this reason he often needs to write simple programs to demonstrate these algorithms in class. 
However he found that often there is confusion when explaining code to his students as the code and the execution are disjoint. 
For this reason he wants to be able to go through his code in a step by step manner and display the effects of each step.

Ever been completely lost in the code of someone else? 
Or you wished that someone would have provided you with more information about the functioning, pitfalls and more of the code? 
In many cases you will have to go over each line, think about example executions and consider various cases. 
This process is time consuming and in the end, it is either unsuccessful or finishes often with "Oh, of course! ..... Well I wish somebody had told me sooner".
This scenario can be limited the evolution of projects.

The following application serves as a way to help developers illustrate their projects in a more comprehensive and 
detailed manner.

For convenience we will call the developer who wants to illustrate his project and or code the Writer and 
the user who would want to see the explenation we will call the Viewer

With the aid of this application, a developer which we will call the Writer can create a narrative for his or her project. 
They can create these narratives by adding elements called narrative primitives to a part of a project. 
An example of a narrative primitive could be a textual explenation, an illustrative image or a video presentation. 
On top of this, parts of the code itself can be narrated in this manner.
The Writer can select a step in the code provide it with some explenation in the form of these narrative primitives.
Much like a debugger, the Viewer can then go through the code in a step by step manner. 
However this time the Writer can not only use text or images but can also access the variables in the code to provide the Viewer
with an animation based on the state of the variables during execution.
