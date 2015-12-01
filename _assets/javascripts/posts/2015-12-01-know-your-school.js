var width = 960,
    height = 700,
    radius = Math.min(width, height) / 2;

var x = d3.scale.linear()
    .range([0, 2 * Math.PI]);

var y = d3.scale.sqrt()
    .range([0, radius]);

var catColor = d3.scale.category20c();
var color = function(d) {
  if (d.children && d.children.length === 1)
    return color(d.children[0]);

  return catColor(d.name);
};

var svg = d3.select("#lakeshore-2015").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var tooltip = d3.select('#lakeshore-2015').append('div')
  .attr('class', 'tooltip')
  .style('opacity', 0);

var partition = d3.layout.partition()
    .value(function(d) { return d.actual; })
    .sort(function(a, b) {
      return d3.ascending(a.depth, b.depth);
    });

var arc = d3.svg.arc()
    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
    .innerRadius(function(d) { return Math.max(0, y(d.y)); })
    .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

var format = d3.format('$,');

var value = function(d, propertyName) {
    if (d.children) {
        return d3.sum(d.children, function(inner) { return value(inner, propertyName); });
    }

    return d[propertyName];
};

d3.json("/data/lakeshore/2015.json", function(error, root) {
  if (error) throw error;

  var path = svg.selectAll("path")
      .data(partition.nodes(root))
    .enter().append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d); })
      .attr('name', function(d) { return d.name; })
      .attr('actual', function(d) { return value(d, 'actual'); })
      .attr('originalBudget', function(d) { return value(d, 'originalBudget'); })
      .attr('finalBudget', function(d) { return value(d, 'finalBudget'); })
      .on("click", click)
      .on('mouseover', function(d) {
        tooltip.transition()
          .duration(200)
          .style('opacity', 0.9);
        tooltip.html('<strong>' + d.name + ':</strong> ' + format(value(d, 'actual')))
          .style('left', (d3.event.pageX) + 'px')
          .style('top', (d3.event.pageY - 28) + 'px');
      })
      .on('mouseout', function(d) {
        tooltip.transition()
          .duration(500)
          .style('opacity', 0);
      });

  function click(d) {
    path.transition()
      .duration(750)
      .attrTween("d", arcTween(d));
  }
});

d3.select(self.frameElement).style("height", height + "px");

// Interpolate the scales!
function arcTween(d) {
  var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
      yd = d3.interpolate(y.domain(), [d.y, 1]),
      yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
  return function(d, i) {
    return i
        ? function(t) { return arc(d); }
        : function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
  };
}
