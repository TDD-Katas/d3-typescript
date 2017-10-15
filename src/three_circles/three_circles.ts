module three_circles {
    export function render(dataLocation) {
        let svg = d3.select("svg");

        let circles = svg.selectAll("circle")
            .data([32, 57, 112, 293], function(d: any) { return d; });

        circles
            .enter()
            .append("circle")
            .attr("cy", 60)
            .attr("cx", function (d, i) {
                return i * 100 + 30;
            })
            .attr("r", function (d: number) {
                return Math.sqrt(d);
            });

        circles
            .exit()
            .remove();
    }

}