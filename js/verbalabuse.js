var data = [42,58];
				
var r = 50;

var color = d3.scale.ordinal()
	.range(["#e8eaeb","#674172"]);

var canvas = d3.select("div#chart")
	.append("svg")
	.attr("width", 200)
	.attr("height", 200)

var group = canvas.append("g")
	.attr("transform", "translate(100,100)");

var arc = d3.svg.arc()
	.innerRadius(100)
	.outerRadius(r);

var pie = d3.layout.pie()
	.value (function(d){return d; });

var arcs = group.selectAll("arc")
	.data(pie(data))
	.enter()
	.append("g")
	.attr("class", "arc");

arcs.append("path")
	.attr("d", arc)
	.attr("fill", function (d){return color(d.data); });

arcs.append("text")
	.attr("transform", function (d){return "translate(" + arc.centroid(d)+")";})
	.attr("text-anchor", "middle")
	.attr("font-size", "1em")
	.text(function (d){return d.data;});// JavaScript Document