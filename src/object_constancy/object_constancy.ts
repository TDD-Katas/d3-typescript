
module object_constancy {

    export class chart {
        private states: any;
        private svg: d3.Selection<any, any, any, any>;
        private menu: d3.Selection<any, any, any, any>;
        private isSlowMotion: boolean;
        private x: d3.ScaleContinuousNumeric<number, any>;
        private y: d3.ScaleBand<string>;
        private xAxis;
        private format;
        private width: number;
        private height: number;
        private currentSelectedAge: string;

        constructor(chartSelector: string, menuSelector: string) {
            let chart = this;

            // Prepare the boundaries
            let margin = {top: 20, right: 40, bottom: 10, left: 40};
            chart.width = 960;
            chart.height = 250 - margin.top - margin.bottom;

            // Prepare the scales
            chart.format = d3.format(".1%");
            chart.x = d3.scaleLinear().range([0, chart.width]);
            chart.y = d3.scaleBand().rangeRound([0, chart.height]).padding(0.1);

            // Prepare Axis
            chart.xAxis = d3.axisTop(this.x)
                .tickSize(-chart.height - margin.bottom)
                .tickFormat(chart.format);

            // Prepare the menu
            chart.menu = d3.select(menuSelector);

            // Render container
            chart.svg = d3.select(chartSelector).append("svg")
                .attr("width", chart.width + margin.left + margin.right)
                .attr("height", chart.height + margin.top + margin.bottom)
                .style("margin-left", -margin.left + "px")
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            chart.svg.append("g")
                .attr("class", "x axis");

            chart.svg.append("g")
                .attr("class", "y axis")
                .append("line")
                .attr("class", "domain")
                .attr("y2", chart.height);


            // Holding the altKey will trigger slowMotion
            d3.select(window)
                .on("keydown", function () {
                    chart.isSlowMotion = d3.event.altKey;
                })
                .on("keyup", function () {
                    chart.isSlowMotion = false;
                });
        }

        public render(dataLocation) {
            d3.csv(dataLocation, (d) => this.dataLoaded(d));
        }

        private dataLoaded(data) {
            let chart = this;
            chart.states = data;

            let ages = d3.keys(data[0]).filter(function (key) {
                return key != "State" && key != "Total";
            });

            // Derive data points
            data.forEach(function (state) {
                ages.forEach(function (age) {
                    state[age] = state[age] / state.Total;
                });
            });

            chart.menu.selectAll("option")
                .data(ages)
                .enter().append("option")
                .text(function (d) {
                    return d;
                });


            chart.menu.property("value", "18 to 24 Years");
            chart.menu.on("change", () => chart.redraw(chart.smoothTransition()));

            chart.redraw(object_constancy.chart.immediateTransition());
        }

        private static immediateTransition() {
            return d3.transition("immediate").duration(0);
        }


        private smoothTransition() {
            let chart = this;
            return d3.transition("smooth")
                .duration(chart.isSlowMotion ? 7500 : 750);
        }

        private redraw(t) {
            let chart = this;
            console.log("redraw!!!");

            let newSelectedAge = chart.menu.property("value");
            let firstTen = chart.states.sort((a, b) => b[newSelectedAge] - a[newSelectedAge]).slice(0, 10);

            chart.y.domain(firstTen.map(d => d.State));

            let bar = chart.svg.selectAll(".bar")
                .data(firstTen, d => d["State"] as string);

            let barEnter = bar.enter()
                .insert("g", ".axis")
                .attr("class", "bar")
                .attr("transform", function (d:any) {
                    return "translate(0," + (chart.y(d.State) + chart.height) + ")";
                })
                .style("fill-opacity", 0);

            barEnter.append("rect")
                .attr("width", chart.currentSelectedAge && function(d) { return chart.x(d[chart.currentSelectedAge]); })
                .attr("height", chart.y.bandwidth());

            barEnter.append("text")
                .attr("class", "label")
                .attr("x", -3)
                .attr("y", chart.y.bandwidth() / 2)
                .attr("dy", ".35em")
                .attr("text-anchor", "end")
                .text(function(d:any) { return d.State; });

            barEnter.append("text")
                .attr("class", "value")
                .attr("x", chart.currentSelectedAge && function(d) { return chart.x(d[chart.currentSelectedAge]) - 3; })
                .attr("y", chart.y.bandwidth() / 2)
                .attr("dy", ".35em")
                .attr("text-anchor", "end");


            chart.currentSelectedAge = newSelectedAge;

            chart.x.domain([0, firstTen[0][chart.currentSelectedAge]]);

            let barUpdate = barEnter.merge(bar).transition(t)
                .attr("transform", function (d: any) {
                    return "translate(1," + (d.y0 = chart.y(d.State)) + ")";
                })
                .style("fill-opacity", 1);

            barUpdate.select("rect")
                .attr("width", function(d) { return chart.x(d[chart.currentSelectedAge]); });

            barUpdate.select(".value")
                .attr("x", function(d) { return chart.x(d[chart.currentSelectedAge]) - 3; })
                .text(function(d) { return chart.format(d[chart.currentSelectedAge]); });

            let barExit = bar.exit().transition(t)
                .attr("transform", function (d: any) {
                    return "translate(2," + (d.y0 + chart.height) + ")";
                })
                .style("fill-opacity", 0)
                .remove();

            barExit.select("rect")
                .attr("width", function(d) { return chart.x(d[chart.currentSelectedAge]); });

            barExit.select(".value")
                .attr("x", function(d) { return chart.x(d[chart.currentSelectedAge]) - 3; })
                .text(function(d) { return chart.format(d[chart.currentSelectedAge]); });


            chart.svg.transition(t).select(".x.axis")
                .call(chart.xAxis);
        }

    }


}