module stacked_barchart {
    export function render() {

        let svg = d3.select("svg"),
            margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = +svg.attr("width") - margin.left - margin.right,
            g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");



        d3.csv("data.csv", function (d: any, i, columns) {
            let t = 0;
            let dataColumns = columns.slice(1);
            for (let dataColumn of dataColumns) {
                t += +d[dataColumn];
            }
            d.total = t;
            return d;
        }, function (error, data) {
            if (error) throw error;

            let keys = data.columns.slice(1);

            data.sort(function (a, b) {
                return b.total - a.total;
            });

            let x = d3.scaleLinear().rangeRound([0, width]);
            x.domain([0, d3.max(data, d => d.total)]).nice();

            let height = 20 * data.length + margin.top;
            svg.attr("height", height);
            let y = d3.scaleBand()
                .rangeRound([height, 0])
                .paddingInner(0.05)
                .align(0.1);
            y.domain(data.map(d => d.State));

            let z = d3.scaleOrdinal()
                .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
            z.domain(keys);

            g.append("g")
                .selectAll("g")
                .data(d3.stack().keys(keys)(data))
                .enter().append("g")
                .attr("fill", d => z(d.key) as string)
                .selectAll("rect")
                .data(d => d)
                .enter().append("rect")
                .attr("x", function (d) {
                    return x(d[0]);
                })
                .attr("y", function (d: any) {
                    return y(d.data.State);
                })
                .attr("width", function (d) {
                    return x(d[1]) - x(d[0]);
                })
                .attr("height", y.bandwidth());


            g.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(0, 0)")
                .call(d3.axisLeft(y));

            g.append("g")
                .attr("class", "axis")
                .call(d3.axisTop(x).ticks(null, "s"))
                .append("text")
                .attr("x", width/2 - 60)
                .attr("y", 2)
                .attr("dy", "0.32em")
                .attr("fill", "#000")
                .attr("font-weight", "bold")
                .attr("text-anchor", "start")
                .text("Population");

            let legend = g.append("g")
                .attr("font-family", "sans-serif")
                .attr("font-size", 10)
                .attr("text-anchor", "end")
                .attr("transform", "translate(0, 20)")
                .selectAll("g")
                .data(keys.slice().reverse())
                .enter().append("g")
                .attr("transform", function (d, i) {
                    return "translate(0," + i * 20 + ")";
                });

            legend.append("rect")
                .attr("x", width - 24)
                .attr("width", 19)
                .attr("height", 19)
                .attr("fill", d => z(d) as string);

            legend.append("text")
                .attr("x", width - 40)
                .attr("y", 9.5)
                .attr("dx", "0.32em")
                .text(d => d);
        });
    }

}