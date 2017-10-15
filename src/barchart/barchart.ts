module barchart {
    export function render(dataLocation) {

        let svg = d3.select("svg");
        let margin = {top: 20, right: 20, bottom: 30, left: 40};
        let width = +svg.attr("width") - margin.left - margin.right;
        let height = +svg.attr("height") - margin.top - margin.bottom;

        let x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
        let y = d3.scaleLinear().rangeRound([height, 0]);

        let g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        d3.tsv(dataLocation, function (d: any) {
            d.frequency = +d.frequency;
            console.log(d);
            return d;
        }, function (error, data) {
            if (error) throw error;

            x.domain(data.map(function (d) {
                return d.letter;
            }));
            y.domain([0, d3.max(data as ArrayLike<any>, function (d) {
                return d.frequency;
            })]);

            g.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            g.append("g")
                .attr("class", "axis axis--y")
                .call(d3.axisLeft(y).ticks(10, "%"))
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("fill", "#000")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .text("Frequency");

            g.selectAll(".bar")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function (d) {
                    return x(d.letter);
                })
                .attr("y", function (d) {
                    return y(d.frequency);
                })
                .attr("width", x.bandwidth())
                .attr("height", function (d) {
                    return height - y(d.frequency);
                });
        });

    }

}