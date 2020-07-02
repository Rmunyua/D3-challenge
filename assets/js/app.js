// @TODO: YOUR CODE HERE!
var svgWidth = 600;
var svgHeight = 600;

// Define chart margins 
var margin = {top: 20, right: 40, bottom: 70, left: 100};

// Define dimensions of the area
var chart_width = svgWidth - margin.left - margin.right;
var chart_height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper
var SVG = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Append SVG group
var chart_group = SVG.append("g")

// Pull csv data from CSV file
d3.csv("/assets/data/data.csv").then(function(Data) {

  // format data from csv file as numbers
  Data.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
  });
  console.log(Data);

// Create a scales for x & y and change domain
var xLinearScale=d3.scaleLinear().range([0, chart_width])
              .domain([8.1, d3.max(Data, d=> d.poverty)+2]);
            
var yLinearScale = d3.scaleLinear().range([chart_height,0])
              .domain([4.1, d3.max(Data, d => d.healthcare)+2]);

//Create axes
var yAxis = d3.axisLeft(yLinearScale); 
var xAxis = d3.axisBottom(xLinearScale).ticks();

//Set x & y respectively
chart_group.append("g")
  .attr("transform", `translate(0, ${chart_height})`)
  .call(xAxis);
chart_group.append("g")
  .call(yAxis);

//Set values as circles
chart_group
      .selectAll("circle")
      .data(Data)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d.poverty))
      .attr("cy", d => yLinearScale(d.healthcare))
      .attr("r",8)
      .style("fill", "#581845")
      .attr("opacity",'.7');

 //Set state info into each circle
  chart_group
    .selectAll("#scatter")
    .data(Data)
    .enter()
    .append("text")
    .text(d=>d.abbr)
    .attr("x", d => xLinearScale(d.poverty))
    .attr("y", d => yLinearScale(d.healthcare)) 
    .attr("font-size", "7px")
    .attr("text-anchor", "middle")
    .style("fill", "#00FFF7");

  //Append SVG group for x-axis
  chart_group.append("g")
    .attr("transform", `translate(${chart_width/2}, ${chart_height+20})`);

  chart_group.append("text")
    .attr("y", chart_height +1.5 *margin.bottom/2)
    .attr("x", chart_width/ 2)
    .classed("axis-text", true)
    .text("In Poverty (%)");

  //Append y-axis label
  chart_group.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0-margin.left)
    .attr("x", 0 - (chart_height / 2))
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("Lacks Healthcare (%)");
});




