var ole;
(function (ole) {
    var chart = /** @class */ (function () {
        function chart(container) {
            this.init(container);
        }
        chart.prototype.init = function (container) {
            this._container = d3.select(container).selectAll("div");
        };
        // The explanation for this methods can be found here:
        // https://bost.ocks.org/mike/bar/
        chart.prototype.render = function (data) {
            // Determine the X scale
            var maxValue = d3.max(data);
            var scaleLinear = d3.scaleLinear()
                .domain([0, maxValue])
                .range([0, 420]);
            // Draw the bars
            this._container
                .data(data)
                .enter()
                .append("div")
                .style("width", function (d) {
                return scaleLinear(d) + "px";
            })
                .text(function (s) {
                return s;
            });
        };
        return chart;
    }());
    ole.chart = chart;
})(ole || (ole = {}));
