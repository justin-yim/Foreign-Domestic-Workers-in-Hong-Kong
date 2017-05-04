var margin = {top: 0, right: 0, bottom: 55, left: 100};

	var width = 620 - margin.left - margin.right,
    	height = 422 - margin.top - margin.bottom;

	var svg = d3.select("div#chart")
 		.append("svg")
      	.attr("width", width + margin.left + margin.right)
      	.attr("height", height + margin.top + margin.bottom)
  		.append("g")
      	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		/*  .append("div")
		.classed("svg-container", true) //container class to make it responsive
		.append("svg")
		//responsive SVG needs these 2 attributes and no width and height attr
		.attr("preserveAspectRatio", "xMinYMin meet")
		.attr("viewBox", "0 0 500 300")
		//class to make it responsive
		.classed("svg-content-responsive", true);  */

	var data = [
		{year: "1982", FDWnumber: "21517"},
		{year: "1987", FDWnumber: "36831"},
		{year: "1992", FDWnumber: "101182"},
		{year: "1993", FDWnumber: "120604"},
		{year: "1994", FDWnumber: "141368"},
		{year: "1995", FDWnumber: "157026"},
		{year: "1996", FDWnumber: "164299"},
		{year: "1997", FDWnumber: "170971"},
		{year: "1998", FDWnumber: "180604"},
		{year: "1999", FDWnumber: "193700"},
		{year: "2000", FDWnumber: "216790"},
		{year: "2001", FDWnumber: "235274"},
		{year: "2002", FDWnumber: "237104"},
		{year: "2003", FDWnumber: "216863"},
		{year: "2004", FDWnumber: "218430"},
		{year: "2005", FDWnumber: "223204"},
		{year: "2006", FDWnumber: "232781"},
		{year: "2007", FDWnumber: "245531"},
		{year: "2008", FDWnumber: "256597"},
		{year: "2009", FDWnumber: "267778"},
		{year: "2010", FDWnumber: "285681"},
		{year: "2011", FDWnumber: "299961"},
		{year: "2012", FDWnumber: "312395"},
		{year: "2013", FDWnumber: "320988"},
		{year: "2014", FDWnumber: "330650"},
		{year: "2015", FDWnumber: "340380"},
		];

	var parse = d3.time.format("%Y").parse;

	// Transpose the data into layers
	var dataset = d3.layout.stack()(["FDWnumber"]
		.map(function(fruit) {
			return data.map(function(d) {
			return {x: parse(d.year), y: +d[fruit]};
  		});
	}));

	// Set x, y and colors
	var x = d3.scale.ordinal()
  		.domain(dataset[0].map(function(d) { return d.x; }))
  		.rangeRoundBands([10, width-10], 0.06);

	var y = d3.scale.linear()
  		.domain([0, d3.max(dataset, function(d) {  return d3.max(d, function(d) { return d.y0 + d.y; });  })])
  		.range([height, 0]);

	var colors = ["#34495E"];

	// Define and draw axes
	var yAxis = d3.svg.axis()
  		.scale(y)
  		.orient("left")
  		.ticks(5)
  		.tickSize(-width, 0, 0)
  		.tickFormat( function(d) { return d } );

	var xAxis = d3.svg.axis()
  		.scale(x)
	  	.orient("bottom")
	  	.ticks(5)
  		.tickFormat(d3.time.format("%Y"));

	svg.append("g")
  		.attr("class", "y axis")
  		.call(yAxis);

	svg.append("g")
  		.attr("class", "x axis")
  		.attr("transform", "translate(0," + height + ")")
  		.call(xAxis)
  		.selectAll("text")
      	.style("text-anchor", "end")
      	.attr("dx", "-.8em")
		.attr("dy", ".15em")
      	.attr("transform", "rotate(-65)");

	// Create groups for each series, rects for each segment 
	var groups = svg.selectAll("g.cost")
  		.data(dataset)
  		.enter().append("g")
  		.attr("class", "cost")
  		.style("fill", function(d, i) { return colors[i]; })
  		.style("opacity", 0.7);

	var rect = groups.selectAll("rect")
  		.data(function(d) { return d; })
  		.enter()
  		.append("rect")
  		.attr("x", function(d) { return x(d.x); })
  		.attr("y", function(d) { return y(d.y0 + d.y); })
  		.attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
  		.attr("width", x.rangeBand())
  		.on("mouseover", function() { tooltip.style("display", null); })
  		.on("mouseout", function() { tooltip.style("display", "none"); })
  		.on("mousemove", function(d) {
    
	var xPosition = d3.mouse(this)[0] - 15;
    var yPosition = d3.mouse(this)[1] - 25;
    
	tooltip
		.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
			
    tooltip
		.select("text")
		.text(d.y);
		});

// Prep the tooltip bits, initial display is hidden
	var tooltip = svg.append("g")
		  .attr("class", "tooltip")
		  .style("display", "none");
    
	tooltip.append("rect")
		  .attr("width", 50)
		  .attr("height", 20)
		  .attr("fill", "white")
		  .style("opacity", 0.5);

	tooltip.append("text")
		  .attr("x", 25)
		  .attr("dy", "1.2em")
		  .style("text-anchor", "middle")
		  .attr("font-size", "12px")
		  .attr("font-weight", "bold");

// Styling text 
	svg.append("g") // Label on Y axis
		  .attr("class", "barLabel")
		  .call(yAxis)
		  .append("text")
		  .attr("transform", "rotate(-90)")
		  .attr("y", -70)
		  .attr("x", -100)
		  .attr("dy", ".61em")
		  .style("text-anchor", "end")
		  .text("Foreign Domestic Workers");

	svg.append("g") // Label on X axis
		  .attr("class", "barLabel")
		  .append("text")
		  .attr("transform", "translate(0," + height + ")")
		  .attr("y", 55)
		  .attr("x", 240)
		  .style("text-anchor", "end")
		  .text("Year");

	// Add fade-in text element 
	/*  svg.append("g") // Label for 1951
		  .attr("class", "animated fadeIn first")
		  .append("text")
		  .attr("transform", "translate(0," + height + ")")
		  .attr("y", -300)
		  .attr("x", 480)
		  .style("text-anchor", "end")
		  .html("&#x2190 The 1951 Refugee Convention first defined the term 'refugee'");

	  svg.append("g")
		  .attr("class", "animated fadeIn first")
		  .append("text")
		  .attr("transform", "translate(0," + height + ")")
		  .attr("y", -280)
		  .attr("x", 480)
		  .style("text-anchor", "end")
		  .html(" as well as the rights of individuals"); */// JavaScript Document