module three_circles {
    export function render(data: number[]) {

        // Bind data to existing nodes, using the hash key
        let circles = d3.select("svg")
            .selectAll("circle")
            .data(data, d => d + "")
            .style("fill", "blue");

        // Remove nodes that are not bound to data
        circles.exit().remove();

        // Add nodes
        let circlesEnter = circles.enter()
            .append("circle")
            .style("fill", "red");

        // Update attributes of visible nodes (existing + added)
        circlesEnter
            .merge(circles)
            .style("stroke", "black")
            .attr("cy", 60)
            .attr("cx", (d, i) => i * 100 + 30)
            .attr("r", d => Math.sqrt(d));

    }

}