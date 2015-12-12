---
layout: post
title: "Know Your School"
date: 2015-12-01 12:03:00
permalink: "/know-your-school"
linkImage: links/2015-12-01-know-your-school
---
<div class="row">
	<div class="col-sm-9">
		<section id="introduction">
			<h2 class="text-center">Introduction</h2>
			<!-- todo -->
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ligula ex, accumsan sed arcu nec, malesuada tristique orci. In pellentesque nisi eget nisl vulputate, at facilisis enim luctus. Sed consequat odio eleifend elit posuere sodales. Proin sollicitudin leo et dictum dapibus. Integer aliquet nisi sed dolor pretium, sed fringilla mauris vestibulum. Donec non elit nibh. Vestibulum tincidunt odio turpis, id iaculis odio porttitor vulputate. Donec cursus lacus in consequat mollis. Sed massa dui, tincidunt vel pretium at, blandit a nisl. Nullam velit neque, sodales sit amet sodales et, porta quis turpis. Suspendisse in lacus mauris. Nunc facilisis a mauris at lacinia. Mauris sem dolor, rutrum vel varius mattis, consectetur sagittis velit.</p>
			<p>Cras malesuada diam id sapien iaculis bibendum. Sed dapibus pharetra urna at viverra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Maecenas convallis urna id purus pretium tempor. Duis aliquam pellentesque tincidunt. Mauris pretium diam sit amet odio mollis porttitor. Sed ex ante, rhoncus a consectetur et, consectetur vel erat. Integer massa libero, aliquet sed leo a, vulputate interdum metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis sed suscipit eros, sed aliquet augue.</p>
		</section>

		<hr />

		<section id="expenses">
			<h2 class="text-center">Expenses</h2>
			<div class="row">
				<div id="lakeshore-2015" class="chart-container col-xs-12 col-sm-6 col-md-4 text-center">
					<h3>
						Lakeshore Public Schools
						<small>2015</small>
					</h3>
					<div class="sunburst-chart"></div>
				</div>
				<div id="benton-harbor-2014" class="chart-container col-xs-12 col-sm-6 col-md-4 text-center">
					<h3>
						Benton Harbor Area Schools
						<small>2014</small>
					</h3>
					<div class="sunburst-chart"></div>
				</div>
				<div id="saint-joseph-2015" class="chart-container col-xs-12 col-sm-6 col-md-4 text-center">
					<h3>
						St. Joseph Public Schools
						<small>2015</small>
					</h3>
					<div class="sunburst-chart"></div>
				</div>
			</div>
		</section>

		<hr />

		<section id="revenues">
			<h2 class="text-center">Revenues</h2>
			<div class="row">
				<div id="lakeshore-2015-Revenue" class="chart-container col-xs-12 col-sm-6 col-md-4 text-center">
					<h3>
						Lakeshore Public Schools
						<small>2015</small>
					</h3>
					<h4>$30,559,383</h4>
					<div class="doughnut-chart"></div>
				</div>
				<div id="benton-harbor-2015-Revenue" class="chart-container col-xs-12 col-sm-6 col-md-4 text-center">
					<h3>
						Benton Harbor Area Schools
						<small>2015</small>
					</h3>
					<h4>$34,323,951</h4>
					<div class="doughnut-chart"></div>
				</div>
				<div id="saint-joseph-2015-Revenue" class="chart-container col-xs-12 col-sm-6 col-md-4 text-center">
					<h3>
						St. Joseph Public Schools
						<small>2015</small>
					</h3>
					<h4>$31,456,234</h4>
					<div class="doughnut-chart"></div>
				</div>
			</div>
		</section>

		<section id="revTimeSeries">
			<h2 class="text-center">Revenue Time Series</h2>
			<div class="row">
				<div id="benton-harbor-2015-RevTimeSeries" class="chart-container col-md-1 text-center" style="width: 50%;
    margin: 0 auto;">
					<h3>
						Revenue 2011-2015
						<small>2015</small>
					</h3>
					<div class="revTimeSeries-chart"></div>
				</div>
			</div>
		</section>
	</div>

	<div class="col-sm-3">
		<nav class="hidden-print hidden-sm hidden-xs scrollspy" data-spy="affix" data-offset-top="120" data-offset-bottom="300">
			<ul class="nav">
				<li><a href="#introduction">Introduction</a></li>
				<li><a href="#expenses">Expenses</a></li>
				<li><a href="#revenues">Revenues</a></li>
			</ul>
		</nav>
	</div>
</div>

{% js vendor/d3-3.5.10/d3 %}
{% js posts/2015-12-01-know-your-school/SunburstChart %}
{% js posts/2015-12-01-know-your-school/SunburstChartGroup %}
{% js posts/2015-12-01-know-your-school %}
{% css posts/2015-12-01-know-your-school %}
