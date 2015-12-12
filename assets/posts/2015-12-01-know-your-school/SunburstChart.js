function SunburstChart(container, config) {
	this.container = container;

	// defaults
	this.height = (config && config.height) || 300;
	this.width = (config && config.width) || 300;
	this.maxRadius = Math.min(this.height, this.width) / 2;

	this.selector = config.selector;
	this.dataUrl = config.dataUrl;

	this.getColor = this.container.getColor.bind(this.container);
	this.getValue = this.container.getValue.bind(this.container);
	this.format = this.container.format;

    this.x = this.container.x;
    this.y = this.container.y;

    var chart = this;
	this.partition = d3.layout.partition()
		.value(function(el) { return el[chart.container.currentProperty]; });

	this.arc = d3.svg.arc()
        .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, chart.x(d.x))); })
        .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, chart.x(d.x + d.dx))); })
        .innerRadius(function(d) { return Math.max(0, chart.y(d.y)); }) // todo: make these radii depend on data
        .outerRadius(function(d) { return Math.max(0, chart.y(d.y + d.dy)); });

    this.arcTween = function(el, maxValue) {
    	var radius = chart.maxRadius;
    	if (maxValue) {
    		var val = this.getValue(el);
    		radius = radius * Math.sqrt(val) / Math.sqrt(maxValue);
    	}

    	var xd = d3.interpolate(chart.x.domain(), [el.x, el.x + el.dx]),
            yd = d3.interpolate(chart.y.domain(), [el.y, 1]),
            yr = d3.interpolate(chart.y.range(), [el.y ? 20 : 0, radius]);

        return function(d, i) {
            return i
                ? function(t) { return chart.arc(d); }
                : function(t) { chart.x.domain(xd(t)); chart.y.domain(yd(t)).range(yr(t)); return chart.arc(d); };
        };
    };

	this.createDomElements();
	this.createChart();
}

SunburstChart.prototype.createDomElements = function() {
	this.svg = d3.select(this.selector).append('svg')
		.attr('width', this.width)
		.attr('height', this.height)
		.append('g')
		.attr('transform', 'translate(' + this.width / 2 + ', ' + this.height / 2 + ')');

	// todo: the tooltip is all fucked up
	// this.tooltip = d3.select(this.selector).append('div')
	// 	.attr('class', 'sunburst-tooltip')
	// 	.style('opacity', 0);
};

SunburstChart.prototype.createChart = function() {
	var chart = this;
	d3.json(this.dataUrl, function(error, root) {
        if (error) throw error;

        chart.path = chart.svg.selectAll("path")
            .data(chart.partition.nodes(root))
            .enter().append("path")
            .attr("d", chart.arc)
            .style("fill", function(d) { return chart.getColor(d); })
            .attr('name', function(d) { return d.name; })
            .on("click", chart.click.bind(chart))
            .on('mouseover', chart.onMouseover.bind(chart))
            .on('mouseout', chart.onMouseout.bind(chart));
    });
};

SunburstChart.prototype.getElementByName = function(name) {
	var elements = this.svg.selectAll("path")
		.filter(function(el) {
			return el.name === name;
		});

	if (!elements)
		return;

	return elements.datum();
};

SunburstChart.prototype.selectElement = function(el, maxValue) {
	maxValue = maxValue || this.getValue(el);

	this.path.transition()
        .duration(750)
        .attrTween("d", this.arcTween(el, maxValue));
};

// chart event handlers
SunburstChart.prototype.onMouseover = function(el) {
	// todo: the tooltip is all fucked up
	// we need to figure out a better way of displaying the values in the chart
	// this.tooltip.transition()
 //        .duration(200)
 //        .style('opacity', 0.9);

 //    this.tooltip.html('<strong>' + el.name + ':</strong> ' + this.format(this.getValue(el)))
 //        .style('left', (d3.event.pageX) + 'px')
 //        .style('top', (d3.event.pageY - 28) + 'px');
};

SunburstChart.prototype.onMouseout = function(el) {
	// this.tooltip.transition()
 //        .duration(500)
 //        .style('opacity', 0);
};

SunburstChart.prototype.click = function(el) {
	this.selectElement(el);
	this.container.elementSelected(el);
	// this.trigger('element.selected');
};
