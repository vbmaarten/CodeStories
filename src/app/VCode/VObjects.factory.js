angular.module('VCodeInterpreter')
.factory('VObjectFactory', function() {
   




	return {
		d3SVG : newSVG,
		BarChart:BarChart
	}
		
});

function newSVG(){
	return d3.select(document.createElement('div')).append("svg");

}

function BarChart(data){
				var svg = newSVG();

				function update(data) {

		  			// DATA JOIN
				  // Join new data with old elements, if any.
				  var text = svg.selectAll("rect")
				      .data(data, function(d) { return d; });

				  // UPDATE
				  // Update old elements as needed.
				  text.transition()
				      .duration(750)
				      .attr("x", function(d, i) { return i * 32; });

				  // ENTER
				  // Create new elements as needed.
				  text.enter().append("rect")
				      .attr("fill", "green")
				      .attr("width","20")
				      .attr("height",function(d){return d*4;})
				      .attr("dy", ".35em")
				      .attr("y", -29)
				      .attr("x", function(d, i) { return i * 32; })
				      .style("fill-opacity", 1e-6)
				    .transition()
				      .duration(750)
				      .attr("y", 20)
				      .style("fill-opacity", 1);

				  // EXIT
				  // Remove old elements as needed.
				  text.exit()
				    .transition()
				      .duration(750)
				      .attr("y", 60)
				      .style("fill-opacity", 1e-6)
				      .remove();
				}
				update(data);

				return {
					domEl : svg,
					update : function(data){

						//var svgDOM = svg[0][0].cloneNode();
						//svg = d3.select(svgDOM)
						update( data );
						//return svgDOM;
					}
				}


			}






