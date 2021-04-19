// JavaScript code for Homework Assignment number 13: D3 Animated Scatter Plot

// SCATTER PLOT PARAMETERS

// Scatter plot container box parameters
let width = parseInt(d3.select("#scatter").style("width"));
let height = width - width / 4.0;
let margin = 20;
let labelArea = 110;
let tPadBot = 40;
let tPadLeft = 40;

// Scatter plot SVG setup
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "chart");

// Define function for plot icons
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

// SCATTER PLOT LABELS

// X Axis: Poverty, Age and Income
// Group X axis labels
svg.append("g").attr("class", "xText");
// D3.select x axis group
var xText = d3.select(".xText");
// Place group at bottom of chart with window scalability
function xTextRefresh() {
    xText.attr(
        "transform",
        "translate(" +
            ((width - labelArea) / 2 + labelArea) +
            ", " +
            (heigt - margin - tPadBot) +
            ")"
    );
}
xTextRefresh();
// Append labels, define axis and set spacing
// Poverty
xText
    .append("text")
    .attr("y", -26)
    .attr("data-name", "poverty")
    .attr("data-axis", "x")
    .attr("class", "aText active x")
    .text("Percent In Poverty");
// Age
xText
    .append("text")
    .attr("y", 0)
    .attr("data-name", "age")
    .attr("data-axis", "x")
    .attr("class", "aText inactive x")
    .text("Median Age");
// Income
    .append("text")
    .attr("y", 26)
    .attr("data-name", "income")
    .attr("data-axis", "x")
    .attr("class", "aText inactive x")
    .text("Median Household Income")

// Y axis: Obesity, Smoker and Has Healthcare
// Additional X/Y axis spacing
var leftTextX = margin + tPadLeft;
var leftTextY = (height + labelArea) / 2 - labelArea;
// Group Y axis labels
svg.append("g").attr("class", "yText");
// D3.select y axis group
var yText = d3.select(".yText");
// Place group at left of chart with window scalability
function yTextRefresh() {
    yText.attr(
        "transform",
        "translate(" + leftTextX + ", " + leftTextY + ")rotate(-90)"
    );
}
yTextRefresh();
// Append labels, define axis and set spacing
// Obesity
yText 
    .append("text")
    .attr("y", -26)
    .attr("data-name", "obesity")
    .attr("data-axis", "y")
    .attr("class", "aText active y")
    .text("Percent Obese");
// Smoker
yText
    .append("text")
    .attr("x", 0)
    .attr("data-name", "smokes")
    .attr("data-axis", "y")
    .attr("class", "aText inactive y")
    .text("Percent Smokes");
yText
    .append("text")
    .attr("y", 26)
    .attr("data-name", "healthcare")
    .attr("data-axis", "y")
    .attr("class", "aText inactive y")
    .text("Percentage Without Healthcare");

