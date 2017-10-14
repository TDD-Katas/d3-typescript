module ole {
    export class chart {
        private _container: d3.Selection<any, any, any, any>;

        constructor(container: any) {
            this.init(container);
        }

        private init(container) {
            this._container = d3.select(container).selectAll("div");
        }

        // The explanation for this methods can be found here:
        // https://bost.ocks.org/mike/bar/
        public render(data) {

            // Determine the X scale
            let maxValue = d3.max(data as ArrayLike<number>);
            let scaleLinear = d3.scaleLinear()
                .domain([0, maxValue])
                .range([0, 420]);

            // Draw the bars
            this._container
                .data(data)
                .enter()
                .append("div")
                .style("width", function (d: number): string {
                    return scaleLinear(d) + "px";
                })
                .text(function (s: string): string {
                    return s
                });
        }

    }
}