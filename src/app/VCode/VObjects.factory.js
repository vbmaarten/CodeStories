angular.module('VCodeInterpreter')
.factory('VObjectFactory', function() {





	return {
		
		BarChart:BarChart
	}

});


function BarChart(data){
	var domEl = document.createElement('div')
	var chart = d3.select(domEl).append("svg");

	var data;


	var barChart;
	

	function update(newData) {

		data = newData || data;
		console.log(data);
		var height = 150 ||   parseInt(domEl.clientHeight) , width = 300 || parseInt(domEl.clientWidth) ;



		var yScale = d3.scale.linear()
		.range([height, 0]);
		yScale.domain([0, d3.max(data) ]);

		var barWidth = width / data.length;

		barChart = chart.selectAll("g").data(data);

		barChart.selectAll('rect')
		.attr("height", function(d) { return height - yScale(d); })
		.attr("y", function(d) { return yScale(d); });
		

		var bar = barChart.enter().append("g")
		.attr("transform", function(d,i) { return "translate(" + (barWidth*i)+ ",0)"; });

		bar.append("rect")
		.attr('fill',"green")
		.attr("y", height)
		.attr("height", function(d) { return height - yScale(d); })
		.attr("width", barWidth-1)
		.transition()
		.attr("y", function(d) { return yScale(d); });

		bar.append("text")
		.attr("y", function(d) { return yScale(d) + 3; })
		.attr("dy", ".75em")
		.text(function(d) { return ""+d; });


		barChart.exit()
		.transition()
		.duration(750)
		.attr("y", 60)
		.style("fill-opacity", 1e-6)
		.remove();
	}
	update(data);

	function highlight(toHighlight,color){
		console.log(toHighlight);
		barChart.select('rect').attr("fill",function(d,i) {return toHighlight.indexOf(i) > -1 ? color : "green" ;});
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






