
var filesystemMock = {}

var narrativesJsonMock = {}


 var CastMock = {
  '/': {
    "name": "/",
    "type": "directory",
    "narratives":{
      "teststory":[
        {'type':'text','content':"some text"},
        {'type':'text','content':"more text"},
        {'type':'link','content':{'node':'/app/','id':'teststories2'}}
      ]
    },
    "children": {
      "app/": {
        "narratives":{
          "teststories2":[
            {'type':'text','content':"2 text"},
            {'type':'text','content':"more 2"},
          ]
        },
        "name": "app/",
        "type": "directory",
        "children":{
          "index.html":{
            "name":"index.html",
            "type": "file",
            "content" : "<html></html>"
          }, 
          "app.js": {
            "name": "app.js",
            "type": "file"
          },
          "narrator/":{
            "name": "narrator/",
            "type": "directory",
            "children": {
              "narrator.html": {
                "name": "narrator.html",
                "type": "file",
              }, 
              "narrator.js": {
                "name": "narrator.js",
                "type": "file"
              },
              "narrator.controller.js": {
                "name": "narrator.controller.js",
                "type": "file"
              },
              "narrative/": {
                "name": "narrative/",
                "type": "directory",
                "children": {
                  "narrative.controller.js": {
                    "name": "narrative.controller.js",
                    "type": "file"
                  },
                  "narrative.directive.js": {
                    "name": "narrative.directive.js",
                    "type": "file"
                  }
                }
              },
              "cast/": {
                "name": "cast/",
                "type": "directory",
                "children": {
                  "cast.html": {
                    "name": "cast.html",
                    "type": "file"
                  },
                  "cast.js": {
                    "name": "cast.js",
                    "type": "file"
                  },
                  "cast.css": {
                    "name": "cast.css",
                  "type": "file"
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}