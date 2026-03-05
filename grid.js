const gridSize = 20;
const grid = document.getElementById("grid")

function getGrid() {
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-x", i % gridSize);
        cell.setAttribute("data-y", Math.floor(i / gridSize));
        grid.appendChild(cell);
    }
}

getGrid();