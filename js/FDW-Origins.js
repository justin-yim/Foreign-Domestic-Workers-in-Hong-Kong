// JavaScript Document

//Based on alanz09's bar chart: https://alanz09.github.io/project2/total_countries

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
		{year: "1992", Philippines: "89140", Indonesia: "3541", India: "963", Thailand: "6718", SriLanka: "517", Bangladesh: "10", Nepal:"58", Myanmar:"91", Pakistan:"75", Malaysia:"61", Singapore:"8"},
		{year: "1993", Philippines: "105410", Indonesia: "6148", India: "1027", Thailand: "6999", SriLanka: "632", Bangladesh: "16", Nepal:"104", Myanmar:"122", Pakistan:"78", Malaysia:"58", Singapore:"8"},
		{year: "1994", Philippines: "121178", Indonesia: "10716", India: "1145", Thailand: "7098", SriLanka: "749", Bangladesh: "19", Nepal:"150", Myanmar:"152", Pakistan:"86", Malaysia:"62", Singapore:"8"},
		{year: "1995", Philippines: "131176", Indonesia: "16357", India: "1228", Thailand: "6708", SriLanka: "831", Bangladesh: "29", Nepal:"318", Myanmar:"118", Pakistan:"95", Malaysia:"61", Singapore:"8"},
		{year: "1996", Philippines: "134713", Indonesia: "20960", India: "1204", Thailand: "5770", SriLanka: "950", Bangladesh: "31", Nepal:"426", Myanmar:"63", Pakistan:"82", Malaysia:"55", Singapore:"5"},
		{year: "1997", Philippines: "138085", Indonesia: "24706", India: "1157", Thailand: "5142", SriLanka: "1089", Bangladesh: "35", Nepal:"528", Myanmar:"43", Pakistan:"70", Malaysia:"50", Singapore:"6"},
		{year: "1998", Philippines: "140357", Indonesia: "31762", India: "1192", Thailand: "5335", SriLanka: "1172", Bangladesh: "26", Nepal:"557", Myanmar:"35", Pakistan:"58", Malaysia:"44", Singapore:"3"},
		{year: "1999", Philippines: "143206", Indonesia: "41397", India: "1244", Thailand: "5755", SriLanka: "1232", Bangladesh: "28", Nepal:"640", Myanmar:"36", Pakistan:"54", Malaysia:"41", Singapore:"5"},
		{year: "2000", Philippines: "151485", Indonesia: "55174", India: "1364", Thailand: "6451", SriLanka: "1317", Bangladesh: "27", Nepal:"746", Myanmar:"33", Pakistan:"61", Malaysia:"44", Singapore:"3"},
		{year: "2001", Philippines: "155445", Indonesia: "68880", India: "1406", Thailand: "6996", SriLanka: "1407", Bangladesh: "31", Nepal:"883", Myanmar:"30", Pakistan:"62", Malaysia:"47", Singapore:"3"},
		{year: "2002", Philippines: "148389", Indonesia: "78165", India: "1372", Thailand: "6669", SriLanka: "1269", Bangladesh: "43", Nepal:"1015", Myanmar:"28", Pakistan:"56", Malaysia:"43", Singapore:"3"},
		{year: "2003", Philippines: "126557", Indonesia: "81030", India: "1269", Thailand: "5495", SriLanka: "1025", Bangladesh: "46", Nepal:"1289", Myanmar:"28", Pakistan:"50", Malaysia:"35", Singapore:"3"},
		{year: "2004", Philippines: "119711", Indonesia: "90045", India: "1294", Thailand: "4922", SriLanka: "885", Bangladesh: "42", Nepal:"1398", Myanmar:"27", Pakistan:"43", Malaysia:"29", Singapore:"3"},
		{year: "2005", Philippines: "118032", Indonesia: "96904", India: "1368", Thailand: "4511", SriLanka: "876", Bangladesh: "42", Nepal:"1349", Myanmar:"29", Pakistan:"38", Malaysia:"30", Singapore:"2"},
		{year: "2006", Philippines: "120788", Indonesia: "104129", India: "1381", Thailand: "4292", SriLanka: "877", Bangladesh: "50", Nepal:"1144", Myanmar:"26", Pakistan:"39", Malaysia:"26", Singapore:"2"},
		{year: "2007", Philippines: "123545", Indonesia: "114411", India: "1457", Thailand: "4072", SriLanka: "900", Bangladesh: "48", Nepal:"957", Myanmar:"27", Pakistan:"49", Malaysia:"30", Singapore:"2"},
		{year: "2008", Philippines: "125943", Indonesia: "123341", India: "1582", Thailand: "3820", SriLanka: "878", Bangladesh: "56", Nepal:"820", Myanmar:"26", Pakistan:"63", Malaysia:"28", Singapore:"3"},
		{year: "2009", Philippines: "129875", Indonesia: "130448", India: "1814", Thailand: "3858", SriLanka: "883", Bangladesh: "62", Nepal:"677", Myanmar:"23", Pakistan:"67", Malaysia:"31", Singapore:"3"},
		{year: "2010", Philippines: "137313", Indonesia: "140941", India: "2058", Thailand: "3695", SriLanka: "890", Bangladesh: "65", Nepal:"542", Myanmar:"27", Pakistan:"70", Malaysia:"31", Singapore:"3"},
		{year: "2011", Philippines: "144553", Indonesia: "148153", India: "2306", Thailand: "3323", SriLanka: "909", Bangladesh: "67", Nepal:"452", Myanmar:"37", Pakistan:"77", Malaysia:"33", Singapore:"3"},
		{year: "2012", Philippines: "155969", Indonesia: "149236", India: "2520", Thailand: "2990", SriLanka: "1040", Bangladesh: "70", Nepal:"389", Myanmar:"41", Pakistan:"62", Malaysia:"29", Singapore:"3"},
		{year: "2013", Philippines: "164628", Indonesia: "149034", India: "2702", Thailand: "2710", SriLanka: "1118", Bangladesh: "275", Nepal:"342", Myanmar:"45", Pakistan:"68", Malaysia:"24", Singapore:"2"},
		{year: "2014", Philippines: "172779", Indonesia: "149837", India: "2959", Thailand: "2650", SriLanka: "1171", Bangladesh: "594", Nepal:"310", Myanmar:"177", Pakistan:"70", Malaysia:"24", Singapore:"1"},
		{year: "2015", Philippines: "181861", Indonesia: "150239", India: "3275", Thailand: "2560", SriLanka: "1148", Bangladesh: "650", Nepal:"299", Myanmar:"147", Pakistan:"77", Malaysia:"22", Singapore:"2"},
		];

	var parse = d3.time.format("%Y").parse;

	// Transpose the data into layers
	var dataset = d3.layout.stack()(["Philippines", "Indonesia", "India", "Thailand", "SriLanka", "Bangladesh", "Nepal", "Myanmar", "Pakistan", "Malaysia", "Singapore", "Other"]
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

	var colors = ["#34495E", "#E26A6A", "#fff159", "#ffbf59", "#f498cb", "#c9966f", "#62b8dd", "#98ea92", "#913d88", "#336e7b", "#c5eff7"];

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
		.attr("x", width - 530)
		.attr("width", 18)
		.attr("height", 18)
		.style("fill", function(d, i) {return colors.slice().reverse()[i];})
		.style("opacity", 0.9);
 
	legend.append("text")
		.attr("x", width - 500)
		.attr("y", 9)
		.attr("dy", ".35em")
		.style("opacity", 0.7)
		.attr("font-size", "12px")
		.style("text-anchor", "start")
		.text(function(d, i) { 
		switch (i) {
		  case 0: return "Singapore";
		  case 1: return "Malaysia";
		  case 2: return "Pakistan"
		  case 3: return "Myanmar"
		  case 4: return "Nepal"
		  case 5: return "Bangladesh"
		  case 6: return "Sri Lanka"
		  case 7: return "Thailand"
		  case 8: return "India"
		  case 9: return "Indonesia"
		  case 10: return "Philippines";
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
		  .attr("x", -100)
		  .attr("dy", ".61em")
		  .style("text-anchor", "end")
		  .text("Refugees (in thousands)");

	svg.append("g") // Label on X axis
		  .attr("class", "barLabel")
		  .append("text")
		  .attr("transform", "translate(0," + height + ")")
		  .attr("y", 55)
		  .attr("x", 270)
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