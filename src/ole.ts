module ole {
    export class chart {
        private _container: d3.Selection<any, any, any, any>;

        constructor(container: any) {
            this.init(container);
        }

        private init(container) {
            this._container = d3.select(container).selectAll("div");
        }

        public render(data) {
            this._container
                .data(data)
                .enter()
                .append("div")
                .style("width", function (d) {
                    return d + "px";
                })
                .text(function (s: string): string {
                    return s
                });
        }

    }
}