angular.module('VCodeInterpreter')
.factory('VObjectFactory', function() {


	var height = 150 , width = 300 ;


	return {
		DomEl :function(){
			return document.createElement('div');
		},

		Canvas : function(){
			var dom = document.createElement('div')
			var canvas = document.createElement('canvas');
			dom.width = width;
			dom.height = height;
			dom.appendChild(canvas);
			canvas.width = width;
			canvas.height = height;
			return {
				domEl: dom,
				canvas: canvas,
				ctx: canvas.getContext('2d'),
				center:{'x':width/2,'y':height/2}
			}
		},

		
		BarChart:BarChart
	}

});


function Grid(data){
	var domEl = document.createElement('div')
	var svg = d3.select(domEl).append("svg");

	var data;



//Create the Scale we will use for the Axis



	var grid;
	

	function update(newData) {

		data = newData || data;
		var height = 150 ||   parseInt(domEl.clientHeight) , width = 300 || parseInt(domEl.clientWidth) ;

		 var axisScale = d3.scale.linear()
		                          .domain([0, 100])
		                          .range([0, width-10]);

		//Create the Axis
		var xAxis = d3.svg.axis()
		                   .scale(axisScale);


		//Create an SVG group Element for the Axis elements and call the xAxis function
		var xAxisGroup = svg.append("g")
		                              .call(xAxis);

		 yScale.domain([0, d3.max(data) ]);
	}
	update(data);

	function highlight(toHighlight,color){
		console.log(toHighlight);
	}

	return {
		domEl : domEl,
		update : function(data){
				update( data );
			},
		highlight: highlight

		}
		

	}


function BarChart(data){
	var domEl = document.createElement('div')
	var chart = d3.select(domEl).append("svg");

	

	

	var height = 150 ||   parseInt(domEl.clientHeight) , width = 300 || parseInt(domEl.clientWidth) ;
	
	var barWidth = width / data.length;
	var yScale = d3.scale.linear()
		.range([height, 0]);
		yScale.domain([0, d3.max(data) ]);
	var barGroup;
	function update(newData) {

		barGroup = chart.selectAll("g").data(newData);
		


		var barGroupEnter = barGroup.enter().append("g");

		barGroupEnter.attr("transform", function(d,i) { console.log(arguments);  return "translate(" + (barWidth*i)+ ",0)"; });


		barGroupEnter.append("rect")
		.attr('fill',"green")
		.attr("y", height)
		.attr("height", function(d) { return height - yScale(d); })
		.attr("width", barWidth-1)
		barGroupEnter.append("text")

		barGroup.select('rect')
		.transition()
		.attr("height", function(d) { return height - yScale(d); })
		.attr("y", function(d) { return yScale(d); });

		barGroup.select('text')
		.attr("y", function(d) { return yScale(d) + 3; })
		.attr("dy", ".75em")
		.text(function(d) { return ""+d; });
	}
	update(data);


	function highlight(toHighlight,color){
		console.log(toHighlight);
		barGroup.select('rect').attr("fill",function(d,i) {return toHighlight.indexOf(i) > -1 ? color : "green" ;});
	}

	return {
		domEl : domEl,
		update : function(data){

				//var svgDOM = svg[0][0].cloneNode();
				//svg = d3.select(svgDOM)
				update( data );
				//return svgDOM;
			},
		highlight: highlight

		}
		

	}






