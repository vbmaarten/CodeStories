'use strict';
/**
 * @ngdoc service
 * @name VCodeInterpreter.factory:VObjectFactory
 * @description
 *
 * factory for the Vobjects
 */

function PointCloud(data) {
"use strict";
   var c =  this.center;
  var domEl = document.createElement('div');
  var chart = d3.select(domEl).append('svg');
  var height = this.height, width = this.width;
    var connections = [] , points;

  function getY(d,i){
      return c.y+d.y
  }
  function getX(d,i){
      return c.x+d.x;
  }
  var pointGroup;
  function update(newData) {
      points = newData;
    pointGroup = chart.selectAll('g').data(newData);
    var pointGroupEnter = pointGroup.enter().append('g');
    pointGroupEnter.attr('transform', function (d, i) {
        console.log(d);
      return 'translate(' +  getX(d) + ','+ getY(d) +')';
    })
    pointGroupEnter.append('circle').attr('fill', 'green')
    .attr('r', 4)
    pointGroupEnter.append('text');
    
    pointGroup.select('text')
    /*.attr('dy', '.75em').text(function (d) {
      return '' + d.x + ':'+d.y;
    });*/
  }
  update(data);
  
  function hasPoint(list,p){
      for(var i in list){
          if(list[i].x == p.x && list[i].y == p.y)
            return true
      }
      return false;
  }
  
  function highlight(list, color) {
      color = color || 'red';
     list = list.length ? list : [list]
      
    pointGroup.selectAll('circle').attr('fill', function (d, i) {
      return hasPoint(list,d) ? color : 'green';
    });
  }
  
  function showConnection(){
     var list = arguments[0].length ? arguments[0] : [].slice.call(arguments);

     chart.selectAll('line').data(list).enter().append('line').attr('x1',function(d){
        return getX( d );
    }).attr('y1',function(d){
       return  getY( d );
    })
    .attr('x2', function(d,i){
        return getX( list[(i+1)%list.length]);
    }).attr('y2',function(d,i){
        return getY( list[(i+1)%list.length])
    }).style('stroke-width','2px')
    .style('stroke','black')
      
  
  }
  
  return {
    domEl: domEl,
    update: update,
    showConnection:showConnection,
    highlight: highlight
  };
}

function List(data) {
  var domEl = document.createElement('div');
  var svg = d3.select(domEl).append('svg');
  function update(newData) {
    var boxWidth = 100;
    var boxHeight = 25;
    svg.selectAll('rect').data(newData).enter().append('svg:rect').attr('width', boxWidth).attr('height', boxHeight).attr('stroke', 'black').attr('fill', 'rgba(0,0,0,0)').attr('y', function (d, i) {
      return boxHeight * i;
    });
    svg.selectAll('text').data(newData).enter().append('svg:text').attr('y', function (d, i) {
      return boxHeight * i + 15;
    }).attr('x', 15).attr('fill', 'black');
    svg.selectAll('text').data(newData).text(function (d) {
      return d;
    });
  }
  update(data);
  return {
    domEl: domEl,
    update: update
  };
}
function VArray(data, vertical) {
  var domEl = document.createElement('div');
  var svg = d3.select(domEl).append('svg');
  function update(newData) {
    var boxSize = 20;
    svg.selectAll('rect').data(newData).enter().append('svg:rect').attr('width', boxSize).attr('height', boxSize).attr('stroke', 'black').attr('fill', 'rgba(0,0,0,0)').attr('x', function (d, i) {
      return boxSize * i;
    });
    svg.selectAll('text').data(newData).enter().append('svg:text').attr('x', function (d, i) {
      return boxSize * i + 5;
    }).attr('y', 15).attr('fill', 'black');
    svg.selectAll('text').data(newData).text(function (d) {
      return d;
    });
  }
  update(data);
  return {
    domEl: domEl,
    update: function (data) {
      update(data);
    }
  };
}
function BarChart(data) {
"use strict";

  var domEl = document.createElement('div');
  var chart = d3.select(domEl).append('svg');
  var height = this.height, width = this.width;
  
  var barGroup;
  function update(newData) {
    var barWidth = width / newData.length;
    var yScale = d3.scale.linear().range([
        height,
        0
      ]);
      yScale.domain([
        0,
        d3.max(newData)
      ]);
      
        barGroup = chart.selectAll('g').data(newData);
    barGroup.exit().remove();
    var barGroupEnter = barGroup.enter().append('g'); 
    barGroupEnter.append('rect').attr('width', barWidth - 1);
    barGroupEnter.append('text');
    
    barGroup.attr('transform', function (d, i) {
      return 'translate(' + barWidth * i + ',0)';
    });
    
    barGroup.select('rect').transition().attr('height', function (d) {
      return height - yScale(d);
    }).attr('y', function (d) {
      return yScale(d);
    }).attr('fill', 'green')
    
    barGroup.select('text').attr('y', function (d) {
      return yScale(d) + 3;
    }).attr('dy', '.75em').text(function (d) {
      return '' + d;
    });
  }
  update(data);
  function highlight(toHighlight, color) {
    barGroup.select('rect').attr('fill', function (d, i) {
      return toHighlight.indexOf(i) > -1 ? color : 'green';
    });
  }
  return {
    domEl: domEl,
    update: update,
    highlight: highlight
  };
}

angular.module('VCodeInterpreter').factory('VObjectFactory', function () {
  var VObjects = {};
  VObjects.VArray = VArray;
  VObjects.BarChart = BarChart;
  VObjects.List = List;
  VObjects.PointCloud = PointCloud;
  var height = 186, width = 354;
  var center = {
    x: width/2,
    y: height/2
  }
  function setSizeInfo(name) {
    VObjects[name].prototype.width = width;
    VObjects[name].prototype.height = height;
    VObjects[name].prototype.center = center;
  }
  for (var vobj in VObjects) {
    setSizeInfo(vobj);
  }
  return {
    DomEl: function () {
      return document.createElement('div');
    },
    setVObject: function (name, func) {
      this.VObjects[name] = eval('(' + func + ')');
      setSizeInfo(name);
    },
    VObjects: VObjects
  };
});
