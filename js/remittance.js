var margin = {top: 0, right: 120, bottom: 55, left: 100};

	var width = 950 - margin.left - margin.right,
    	height = 500 - margin.top - margin.bottom;

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
		{year: "1975", africa: "0", asia: "135000", europe: "8158", latin_am: "3000"},
		{year: "1976", africa: "0", asia: "15000", europe: "9206", latin_am: "3000"},
		{year: "1977", africa: "0", asia: "7000", europe: "9946", latin_am: "3000"},
		{year: "1978", africa: "0", asia: "20574", europe: "12933", latin_am: "3000"},
		{year: "1979", africa: "0", asia: "76521", europe: "27842", latin_am: "7000"},
		{year: "1980", africa: "955", asia: "166030", europe: "33469", latin_am: "6662"},
		{year: "1981", africa: "2119", asia: "134968", europe: "20148", latin_am: "2017"},
		{year: "1982", africa: "3412", asia: "80235", europe: "13869", latin_am: "580"},
		{year: "1983", africa: "2645", asia: "44673", europe: "13209", latin_am: "691"},
		{year: "1984", africa: "2749", asia: "56677", europe: "10817", latin_am: "150"},
		{year: "1985", africa: "1951", asia: "55746", europe: "9856", latin_am: "151"},
		{year: "1986", africa: "1322", asia: "51391", europe: "9302", latin_am: "131"},
		{year: "1987", africa: "1990", asia: "50120", europe: "12095", latin_am: "323"},
		{year: "1988", africa: "1593", asia: "43739", europe: "27921", latin_am: "2497"},
		{year: "1989", africa: "1902", asia: "52660", europe: "48354", latin_am: "2604"},
		{year: "1990", africa: "3453", asia: "56577", europe: "56722", latin_am: "2305"},
		{year: "1991", africa: "4420", asia: "58864", europe: "46063", latin_am: "2253"},
		{year: "1992", africa: "5470", asia: "58802", europe: "64312", latin_am: "3065"},
		{year: "1993", africa: "6967", asia: "56804", europe: "51355", latin_am: "4071"},
		{year: "1994", africa: "5860", asia: "49404", europe: "51561", latin_am: "6156"},
		{year: "1995", africa: "4827", asia: "41497", europe: "46021", latin_am: "7629"},
		{year: "1996", africa: "7604", asia: "23288", europe: "41961", latin_am: "3550"},
		{year: "1997", africa: "6065", asia: "12695", europe: "48732", latin_am: "2996"},
		{year: "1998", africa: "6887", asia: "14167", europe: "54399", latin_am: "1627"},
		{year: "1999", africa: "13043", asia: "14304", europe: "41907", latin_am: "2110"},
		{year: "2000", africa: "17561", asia: "14690", europe: "37664", latin_am: "3232"},
		{year: "2001", africa: "19020", asia: "16119", europe: "31772", latin_am: "2975"},
		{year: "2002", africa: "2551", asia: "7218", europe: "15428", latin_am: "1934"},
		{year: "2003", africa: "10714", asia: "5984", europe: "11250", latin_am: "455"},
		{year: "2004", africa: "29104", asia: "10938", europe: "9254", latin_am: "3577"},
		{year: "2005", africa: "20745", asia: "15053", europe: "11316", latin_am: "6699"},
		{year: "2006", africa: "18126", asia: "9377", europe: "10456", latin_am: "3264"},
		{year: "2007", africa: "17483", asia: "23263", europe: "4560", latin_am: "2976"},
		{year: "2008", africa: "8935", asia: "44636", europe: "2343", latin_am: "4277"},
		{year: "2009", africa: "9670", asia: "58130", europe: "1997", latin_am: "4857"},
		{year: "2010", africa: "13305", asia: "53498", europe: "1526", latin_am: "4982"},
		{year: "2011", africa: "7685", asia: "44535", europe: "1228", latin_am: "2976"},
		{year: "2012", africa: "10608", asia: "44423", europe: "1129", latin_am: "2078"},
		{year: "2013", africa: "15980", asia: "48927", europe: "580", latin_am: "4439"},
		{year: "2014", africa: "17476", asia: "47234", europe: "959", latin_am: "4318"},
		{year: "2015", africa: "22472", asia: "43048", europe: "2363", latin_am: "2050"},
		{year: "2016", africa: "31624", asia: "48073", europe: "3957", latin_am: "1340"},
		{year: "2017", africa: "10462", asia: "12527", europe: "2039", latin_am: "643"},
		];

	var parse = d3.time.format("%Y").parse;

	// Transpose the data into layers
	var dataset = d3.layout.stack()(["africa", "asia", "europe", "latin_am"]
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

	var colors = ["#b33040", "#d25c4d", "#f2b447", "#d9d574"];

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
  		.style("opacity", 0.9);

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

	// Draw legend
	var legend = svg.selectAll(".legend")
  		.data(colors)
  		.enter().append("g")
  		.attr("class", "legend")
  		.attr("transform", function(d, i) { return "translate(30," + i * 19 + ")"; });
 
	legend.append("rect")
		.attr("x", width - 180)
		.attr("width", 18)
		.attr("height", 18)
		.style("fill", function(d, i) {return colors.slice().reverse()[i];})
		.style("opacity", 0.9);
 
	legend.append("text")
		.attr("x", width - 150)
		.attr("y", 9)
		.attr("dy", ".35em")
		.style("opacity", 0.7)
		.style("text-anchor", "start")
		.text(function(d, i) { 
		switch (i) {
		  case 0: return "Latin America";
		  case 1: return "Europe";
		  case 2: return "Asia";
		  case 3: return "Africa";
		}
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
		  .attr("x", -170)
		  .attr("dy", ".61em")
		  .style("text-anchor", "end")
		  .text("Refugees (in thousands)");

	svg.append("g") // Label on X axis
		  .attr("class", "barLabel")
		  .append("text")
		  .attr("transform", "translate(0," + height + ")")
		  .attr("y", 55)
		  .attr("x", 370)
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