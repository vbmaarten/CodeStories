#Code editor

In the application the goal is to enhance the readabilty and the understandability of some code. This code has to be able to be viewed by the user so that he can make these enhancements with the use of the application. For this purpose we need to have a way to display the code in a comprehensable way to be viewed by the user. Since there already are conventions for how code is formated we can look for some existing solutions to use for our application.

Requirements:
* Easy to use
* Easy to edit
* Lightweight
* Simple (not to full featured)
* Open source

List of Options:
* Ace: http://ace.c9.io/
* Code Mirror: http://codemirror.net
* ICE Coder: https://icecoder.net/
* Codiad: http://codiad.com/

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

The question now is, which of these two approaches is optimal for use in our solution. On the one hand we have the smaller code editors Ace and Code mirror who we can use to embed into an evironment we make. And on the other hand we have the larger ICE coder and Codiad which we would add our features onto. 

For the purpose of our application the smarter option would be to use either Ace or Code mirror because it requires minimal setup and minimal time to learn. The features it gives should be adequate for what we need it to do. This also allows us to have more freedom when designing the rest of the system as we do not have to implement it into the Code Editor but allows us to have a more modular design.



