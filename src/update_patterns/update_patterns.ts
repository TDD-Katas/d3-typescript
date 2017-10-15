module update_patterns {
    export function render(data: string[]) {

        // Prepare the container
        let svg = d3.select("svg");
        let width = +svg.attr("width");
        let height = +svg.attr("height");
        let g = svg.append("g")
            .attr("transform", "translate(32," + (height / 2) + ")");

        redraw(data);


        // Grab a random sample of letters from the alphabet, in alphabetical order.
        // d3.timeout(function() {
        //     redraw(d3.shuffle(data)
        //         .slice(0, Math.floor(Math.random() * 26))
        //         .sort());
        // }, 1500);

        // d3.timeout(function() {
        //     redraw(d3.shuffle(data)
        //         .slice(0, Math.floor(Math.random() * 26))
        //         .sort());
        // }, 3000);
    }


    export function redraw(data) {
        let t = d3.transition("all")
            .duration(750);

        // DATA JOIN
        // Join new data with old elements, if any.
        let text = d3.select("svg").select("g").selectAll("text")
            .data(data, d => d as string);

        // EXIT
        // Remove old elements by transitioning down
        text.exit()
            .attr("class", "exit")
            .transition(t)
            .attr("y", 60)
            .style("fill-opacity", 1e-6)
            .remove();

        // UPDATE
        // Update old elements sliding them in place
        text.attr("class", "update")
            .attr("y", 0)
            .style("fill-opacity", 1)
            .transition(t)
            .attr("x", (d, i) => i * 32);

        // ENTER
        // Create new elements by sliding them from above
        let entered = text.enter().append("text")
            .attr("class", "enter")
            .attr("dy", ".35em")
            .attr("y", -60)
            .attr("x", (d, i) => i * 32)
            .style("fill-opacity", 1e-6)
            .text(d => d as string)
            .transition(t)
            .attr("y", 0)
            .style("fill-opacity", 1);
    }

}