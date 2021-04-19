// JavaScript code for Homework Assignment number 13: D3 Animated Scatter Plot

// Scatter Plot Container Box Parameters
let width = parseInt(d3.select("#scatter").style("width"));
let height = width - width / 4.0;
let margin = 20;
let labelArea = 110;
let tPadBot = 40;
let tPadLeft = 40;

// Scatter Plot SVG Setup
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "chart");

// Define Function for Plot Icons
var circRadius;
function crGet() {
    if (width <= 530) {
        circRadius = 5;
    }
    else {
        circRadius = 10;
    }
}
crGet();
