#Interpreter research

To add meta code to to specific statements in a piece of javascript code we need to break it down in it's logical components. Than we need to step through these components, and as we execute them we also execute the meta code that is linked to it. This behaviour is very similar to an interpreter, with the addition that some extra code can be linked to a statement which is executed when the statement is executed. 

Requirements:
* Written in javascript, so we can use it in the browser
* Easy access to the scope, so it can be used in the meta code
* Simple, so that we can easily extend it to fit our needs

##[JS-Interpreter](https://neil.fraser.name/software/JS-Interpreter/)
A simple javascript interpreter which allows stepping through the code. It uses [acorn](https://github.com/marijnh/acorn) for parsing. 

###Pro's
* Written in javascript
* Support stepping
* Small (about 2000 lines of code)

###Con's
* Supports a limited form of javascript (no try/catch for example)
