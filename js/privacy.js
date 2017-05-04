var data = [{"value":39, "label":"No own bedroom"}, 
  	{"value":35, "label":"Shared room w/ child/ elderly"}, 
  	{"value":2, "label":"At kitchen or communal space"},
	{"value":24, "label":"Own bedroom"}];
	
var r = 50;

var color = d3.scale.ordinal()
	.range(["#3498DB","#2574A9","#3A539B","#e8eaeb"]);

var canvas = d3.select("div#chart")
	.append("svg")
	.attr("width", 300)
	.attr("height", 200)

var group = canvas.append("g")
	.attr("transform", "translate(150,100)");

var arc = d3.svg.arc()
	.innerRadius(100)
	.outerRadius(r);

var pie = d3.layout.pie()
	.value (function(d){return d.value; });

var arcs = group.selectAll("arc")
	.data(pie(data))
	.enter()
	.append("g")
	.attr("class", "arc");

arcs.append("path")
	.attr("d", arc)
	.attr("fill", function (d){return color(d.value); });

arcs.append("text")
	.attr("transform", function (d){return "translate(" + arc.centroid(d)+")";})
	.attr("text-anchor", "middle")
	.attr("font-size", "1em")
	.text(function (d){return d.value;})+(function (d){return d.label;});// JavaScript Document