var narrativesMock = {
  '/folderNode': [
    {
      "name": "hello world narrative",
      "type": "FS",
      "items": [
          {
              "type": "text",
              "content": "HelloWorld!"
          },
          {
              "type": "text",
              "content": "Thisisastoryallabouthow...."
          },
          {
              "type": "link",
              "content": {"id":"hello world narrative 2","node":"/folderNode/fileNode.js"}
          },
      ]
    }
  ],
  '/folderNode/fileNode.js': [
    {
      "name": "hello world narrative 2",
      "type": "FS",
      "items": []
    }
  ],
  '/folderNode/fileNode.js/program': [
    {
      "name": "hello world narrative 3",
      "type": "Code",
      "narrativeHooks":{
        "/Body/0FunctionDeclaration/Block/Body/0VariableDeclaration":{
          "path":"/Body/0FunctionDeclaration/Block/Body/0VariableDeclaration",
          "items":[
            {
              "type":"text",
              "content":"This is some code"
            },
            {
              "type":"vcode",
              "content":"var barchart = new BarChart(); "
            }
          ]
        },
      }
    }
  ]
}