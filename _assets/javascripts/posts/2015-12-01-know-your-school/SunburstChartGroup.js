function SunburstChartGroup(config) {
	// default values
	this.chartHeight = (config && config.chartHeight) || 300;
	this.chartWidth = (config && config.chartWidth) || 300;
	this.chartRadius = Math.min(this.chartHeight, this.chartWidth) / 2;
	this.currentProperty = (config && config.currentProperty) || 'actual';

	this.x = d3.scale.linear()
		.range([0, 2 * Math.PI]);

	this.y = d3.scale.sqrt()
		.range([0, this.chartRadius]);

	this.format = d3.format('$,');
	this.categoryColor = d3.scale.category20c();

	this.charts = [];
}

SunburstChartGroup.prototype.getColor = function(el) {
	return this.categoryColor(el.name);
};

SunburstChartGroup.prototype.getValue = function(el, propertyName) {
	propertyName = propertyName || this.currentProperty;
	var group = this;
	if (el.children) {
		return d3.sum(el.children, function(inner) {
			return group.getValue(inner, propertyName);
		});
	}

	return el[propertyName];
};

SunburstChartGroup.prototype.createChart = function(selector, dataUrl) {
	var config = {
		height: this.chartHeight,
		width: this.chartWidth,
		selector: selector,
		dataUrl: dataUrl
	};

	this.charts.push(new SunburstChart(this, config));
};

SunburstChartGroup.prototype.initialize = function(charts) {
	for (var i = 0; i < charts.length; i++) {
		this.createChart(charts[i].selector, charts[i].dataUrl);
	}
};

SunburstChartGroup.prototype.elementSelected = function(el) {
	for (var i = 0; i < this.charts.length; i++) {
		this.charts[i].selectElementByName(el.name);
	}
};