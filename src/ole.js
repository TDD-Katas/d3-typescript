var ole;
(function (ole) {
    var chart = /** @class */ (function () {
        function chart(container) {
            this.init(container);
        }
        chart.prototype.init = function (container) {
            this._container = d3.select(container).selectAll("div");
        };
        chart.prototype.render = function (data) {
            this._container
                .data(data)
                .enter()
                .append("div")
                .style("width", function (d) {
                return d + "px";
            })
                .text(function (s) {
                return s;
            });
        };
        return chart;
    }());
    ole.chart = chart;
})(ole || (ole = {}));
