module nested_selections {
    export function render(matrix: number[][]) {

        // Bind two dimensional data
        let tbody = d3.select("table tbody");
        let tr = tbody
            .selectAll("tr")
            .data(matrix);
        let td = tr
            .selectAll("td")
            .data((d, i) => d);


        // Remove unbound data
        td.exit().remove();
        tr.exit().remove();

        // Update existing
        tr.attr("class", "update-row");
        td.attr("class", "update-cell");

        // Register new rows
        let newTr = tr.enter().append("tr")
            .attr("class", "create-row");
        let allTr = tr.merge(newTr).selectAll("td")
            .data((d, i) => d);

        // Register new cells
        let altTd = allTr.enter()
            .append("td")
            .attr("class", "create-cell");

        // Update visible cells
        altTd.merge(td).text(d => d);
    }

}