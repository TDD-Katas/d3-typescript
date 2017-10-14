
module ole {
    export class chart {
        private _container: d3.Selection<any, any, any, any>;

        constructor(container: any) {
            this.init(container);
        }

        private init(container) {
            this._container = d3.select(container);
        }

        // The explanation for this methods can be found here:
        // https://bost.ocks.org/mike/bar/
        public render(dataLocation, width: number, barHeight: number) {

            // 1. Code here runs first, before the download starts.
            let scaleLinear = d3.scaleLinear()
                .range([0, 420]);

            let chart = this._container
                .attr("width", width);

            d3.tsv(dataLocation, function (d: any) {
                d.value = +d.value;
                console.log(d);
                return d;
            }, function (error, data) {
                // 3. Code here runs last, after the download finishes.
                scaleLinear.domain([0, d3.max(data, function (d: any) {
                    return d.value;
                })]);

                chart.attr("height", barHeight * data.length);

                let bar = chart.selectAll("g")
                    .data(data)
                    .enter().append("g")
                    .attr("transform", function (d: any, i: number) {
                        return "translate(0," + i * barHeight + ")";
                    });

                bar.append("rect")
                    .attr("width", function (d: any) {
                        return scaleLinear(d.value);
                    })
                    .attr("height", barHeight - 1);

                bar.append("text")
                    .attr("x", function (d: any) {
                        return scaleLinear(d.value) - 3;
                    })
                    .attr("y", barHeight / 2)
                    .attr("dy", ".35em")
                    .text(function (d) {
                        return d.value;
                    });
            });

            // 2. Code here runs second, while the file is downloading.

        }

    }
}