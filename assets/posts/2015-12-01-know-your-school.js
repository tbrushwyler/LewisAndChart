var createRevChart = function(selector, url) {

  var width = 300,
      height = 300,
      radius = Math.min(width, height) / 2;

  var color2 = d3.scale.ordinal()
      .range(["#ff0038", "#ff4800", "#ffc800", "#b7ff00", "#38ff00", "#d0743c", "#ff8c00"]);

  var arc = d3.svg.arc()
      .outerRadius(radius - 10)
      .innerRadius(radius - 70);

  var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d.amount; });


  var svg = d3.select(selector).append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  d3.csv(url, type, function(error, data) {
    if (error) throw error;

    var g = svg.selectAll(".arc")
        .data(pie(data))
      .enter().append("g")
        .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return color2(d.data.source); });

    g.append("text")
        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .text(function(d) { return d.data.source; });
  });

  function type(d) {
    d.amount = +d.amount;
    return d;
  }
};

d3.select(self.frameElement).style("height", 300 + "px");

var expenditureGroup = new SunburstChartGroup({ chartWidth: 250 });
expenditureGroup.initialize([
    {
        selector: '#lakeshore-2015 .sunburst-chart',
        dataUrl: '/data/lakeshore/2015.json'
    },
    {
        selector: '#benton-harbor-2014 .sunburst-chart',
        dataUrl: '/data/benton-harbor/2014.json'
    },
    {
        selector: '#saint-joseph-2015 .sunburst-chart',
        dataUrl: '/data/saint-joseph/2015.json'
    }
]);

createRevChart('#saint-joseph-2015-Revenue .doughnut-chart', '/data/saint-joseph/2015revenue.csv');
createRevChart('#benton-harbor-2015-Revenue .doughnut-chart', '/data/benton-harbor/2015revenue.csv');
createRevChart('#lakeshore-2015-Revenue .doughnut-chart', '/data/lakeshore/2015revenue.csv');
