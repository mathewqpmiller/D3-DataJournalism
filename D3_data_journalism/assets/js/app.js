// JavaScript code for Homework Assignment number 13: D3 Animated Scatter Plot

// SCATTER PLOT PARAMETERS

// Scatter plot container box parameters
let width = parseInt(d3.select("#scatter").style("width"));
let height = width - width / 3.9;
let margin = 20;
let labelArea = 110;
let tPadBot = 40;
let tPadLeft = 40;
// Scatter plot SVG setup
let svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("class", "chart");
// Define function for plot icons
var iconRadius;
function crGet() {
  if (width <= 540) {
    iconRadius = 4;
  }
  else {
    iconRadius = 10;
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
      (height - margin - tPadBot) +
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
  .text("Percent in Poverty");
// Age
xText
  .append("text")
  .attr("y", 0)
  .attr("data-name", "age")
  .attr("data-axis", "x")
  .attr("class", "aText inactive x")
  .text("Median Age");
// Income
xText
  .append("text")
  .attr("y", 26)
  .attr("data-name", "income")
  .attr("data-axis", "x")
  .attr("class", "aText inactive x")
  .text("Median Household Income");
// Y axis: Obesity, Smoker and Has Healthcare
// Additional X/Y axis spacing
var XTextLeft = margin + tPadLeft;
var YTextLeft = (height + labelArea) / 2 - labelArea;
// Group Y axis labels
svg.append("g").attr("class", "yText");
// D3.select y axis group
var yText = d3.select(".yText");
// Place group at left of chart with window scalability
function yTextRefresh() {
  yText.attr(
    "transform",
    "translate(" + XTextLeft + ", " + YTextLeft + ")rotate(-90)"
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
  .text("Percent Obesity");
// Smoker
yText
  .append("text")
  .attr("x", 0)
  .attr("data-name", "smokes")
  .attr("data-axis", "y")
  .attr("class", "aText inactive y")
  .text("Percent who Smoke");
// Healthcare
yText
  .append("text")
  .attr("y", 26)
  .attr("data-name", "healthcare")
  .attr("data-axis", "y")
  .attr("class", "aText inactive y")
  .text("Percent w/o Healthcare");

// IMPORT FILE

// D3.csv file path location
d3.csv("D3_data_journalism/assets/data/data.csv").then(function(data) {
  visualize(data);
});

// CREATE VISUALIZATION

// Create visualization manipulation function
function visualize(theData) {
  // Default visualizatioin
  let curX = "poverty";
  let curY = "obesity";
  // Create empty min/max variables
  let xMin;
  let xMax;
  let yMin;
  let yMax;
  // Set up tooltip rules function
  let toolTip = d3
    .tip()
    .attr("class", "d3-tip")
    .offset([40, -60])
    .html(function(d) {
      // X Selector
      let theX;
      // Select the state
      var theState = "<div>" + d.state + "</div>";
      // Select y key and value
      var theY = "<div>" + curY + ": " + d[curY] + "%</div>";
      // If statement: if x equals poverty then
      if (curX === "poverty") {
        // grab value formatted to show percentage
        theX = "<div>" + curX + ": " + d[curX] + "%</div>";
      }
      else {
        // Else grab value formatted to show delimiter
        theX = "<div>" +
          curX +
          ": " +
          parseFloat(d[curX]).toLocaleString("en") +
          "</div>";
      }
      // Display return data
      return theState + theX + theY;
    });
  // Call tooltip function
  svg.call(toolTip);

  // REMOVE REPETATIVE CODE

  // Change the min and max for x
  function xMinMax() {
    // Select smallest data from column
    xMin = d3.min(theData, function(d) {
      return parseFloat(d[curX]) * 0.90;
    });
    // Select largest data from the column
    xMax = d3.max(theData, function(d) {
      return parseFloat(d[curX]) * 1.10;
    });
  }
  // Change the min and max for y
  function yMinMax() {
    // Select smallest data from the column
    yMin = d3.min(theData, function(d) {
      return parseFloat(d[curY]) * 0.90;
    });
    // Select largest data from the column
    yMax = d3.max(theData, function(d) {
      return parseFloat(d[curY]) * 1.10;
    });
  }

  // CHANGE LABEL APPEARANCE

  // Create label select change function
  function labelChange(axis, clickedText) {
    // Change from active to inactive
    d3
      .selectAll(".aText")
      .filter("." + axis)
      .filter(".active")
      .classed("active", false)
      .classed("inactive", true);
    // Switch selected label to active
    clickedText.classed("inactive", false).classed("active", true);
  }

  // CREATE THE SCATTER PLOT

  // Select min and max values
  xMinMax();
  yMinMax();
  // Assign icon placement on plot
  let xScale = d3
    .scaleLinear()
    .domain([xMin, xMax])
    .range([margin + labelArea, width - margin]);
  let yScale = d3
    .scaleLinear()
    .domain([yMin, yMax])
    .range([height - margin - labelArea, margin]);
  // Create the axis
  var xAxis = d3.axisBottom(xScale);
  var yAxis = d3.axisLeft(yScale);
  // Create x / y tick count function
  function tickCount() {
    if (width <= 500) {
      xAxis.ticks(5);
      yAxis.ticks(5);
    }
    else {
      xAxis.ticks(10);
      yAxis.ticks(10);
    }
  }
  tickCount();
  // Append x/y axis plots in groups
  svg
    .append("g")
    .call(xAxis)
    .attr("class", "xAxis")
    .attr("transform", "translate(0," + (height - margin - labelArea) + ")");
  svg
    .append("g")
    .call(yAxis)
    .attr("class", "yAxis")
    .attr("transform", "translate(" + (margin + labelArea) + ", 0)");
  // Group the labels to the dots
  var theCircles = svg.selectAll("g theCircles").data(theData).enter();
  // Iterate through rows and append data to icons
  theCircles
    .append("circle")
    // Set size, class and location attributes
    .attr("cx", function(d) {
      return xScale(d[curX]);
    })
    .attr("cy", function(d) {
      return yScale(d[curY]);
    })
    .attr("r", iconRadius)
    .attr("class", function(d) {
      return "stateCircle " + d.abbr;
    })

    // CREATE MOUSEOVER EVENT

    // Create hover function
    .on("mouseover", function(d) {
      // Show the tooltip
      toolTip.show(d, this);
      // Highlight border
      d3.select(this).style("stroke", "#323232");
    })
    .on("mouseout", function(d) {
      // Hide the tooltip
      toolTip.hide(d);
      // Remove highlighted border
      d3.select(this).style("stroke", "#e3e3e3");
    });

  // LABEL ICONS

  // Match state abbreviations with labels dataset
  theCircles
    .append("text")
    // Abbreviate text
    .text(function(d) {
      return d.abbr;
    })
    // Place abbreviation to icon
    .attr("dx", function(d) {
      return xScale(d[curX]);
    })
    .attr("dy", function(d) {
      return yScale(d[curY]) + iconRadius / 2.5;
    })
    .attr("font-size", iconRadius)
    .attr("class", "stateText")
    // Additional hover rules
    .on("mouseover", function(d) {
      // Show tooltip
      toolTip.show(d);
      // Highlight circle
      d3.select("." + d.abbr).style("stroke", "#323232");
    })
    .on("mouseout", function(d) {
      // Hide tooltip
      toolTip.hide(d);
      // Hide highlight
      d3.select("." + d.abbr).style("stroke", "#e3e3e3");
    });

  // INITIATE GRAPH DYNAMICS

  // Create label select event
  d3.selectAll(".aText").on("click", function() {
    var self = d3.select(this);
    // If selected statement
    if (self.classed("inactive")) {
      // Grab label axis and name
      var axis = self.attr("data-axis");
      var name = self.attr("data-name");
      // When x
      if (axis === "x") {
        // Parse info into name
        curX = name;
        // Adjust min and max values
        xMinMax();
        // Update x
        xScale.domain([xMin, xMax]);
        // Use transition
        svg.select(".xAxis").transition().duration(300).call(xAxis);
        // Update state circle location
        d3.selectAll("circle").each(function() {
          // Motion tween from original location to new
          d3
            .select(this)
            .transition()
            .attr("cx", function(d) {
              return xScale(d[curX]);
            })
            .duration(300);
        });
        // Change state texts locations
        d3.selectAll(".stateText").each(function() {
          // Duplicate motion tween for state text
          d3
            .select(this)
            .transition()
            .attr("dx", function(d) {
              return xScale(d[curX]);
            })
            .duration(300);
        });
        // Change active label class
        labelChange(axis, self);
      }
      else {
        // When y parse info
        curY = name;
        // Adjust min and max values
        yMinMax();
        // Update y
        yScale.domain([yMin, yMax]);
        // Use transition
        svg.select(".yAxis").transition().duration(300).call(yAxis);
        // Update location
        d3.selectAll("circle").each(function() {
          // Apply another motion tween
          d3
            .select(this)
            .transition()
            .attr("cy", function(d) {
              return yScale(d[curY]);
            })
            .duration(300);
        });
        // Again, change state texts locations
        d3.selectAll(".stateText").each(function() {
          // Apply motion tween
          d3
            .select(this)
            .transition()
            .attr("dy", function(d) {
              return yScale(d[curY]) + iconRadius / 3;
            })
            .duration(300);
        });
        // Finally, change the classes of the last active label and the clicked label.
        labelChange(axis, self);
      }
    }
  });

  //  CREATE WINDOW RESIZE CAPABILITIES

  // d3 window resize event
  d3.select(window).on("resize", resize);
  // Specify which parts to resize
  function resize() {
    // Redifine window dependent variables
    width = parseInt(d3.select("#scatter").style("width"));
    height = width - width / 3.9;
    leftTextY = (height + labelArea) / 2 - labelArea;
    // Apply width and height
    svg.attr("width", width).attr("height", height);
    // Adjust x and y scale range
    xScale.range([margin + labelArea, width - margin]);
    yScale.range([height - margin - labelArea, margin]);
    // Update the axes
    svg
      .select(".xAxis")
      .call(xAxis)
      .attr("transform", "translate(0," + (height - margin - labelArea) + ")");
    svg.select(".yAxis").call(yAxis);
    //  Udate ticks, labels and icons
    tickCount();
    xTextRefresh();
    yTextRefresh();
    crGet();
    // Update location / radius of icons
    d3
      .selectAll("circle")
      .attr("cy", function(d) {
        return yScale(d[curY]);
      })
      .attr("cx", function(d) {
        return xScale(d[curX]);
      })
      .attr("r", function() {
        return iconRadius;
      });
    // Change size / location of state texts
    d3
      .selectAll(".stateText")
      .attr("dy", function(d) {
        return yScale(d[curY]) + iconRadius / 3;
      })
      .attr("dx", function(d) {
        return xScale(d[curX]);
      })
      .attr("r", iconRadius / 3);
  }
}
