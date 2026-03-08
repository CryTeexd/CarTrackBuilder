const types = ["grass", "road", "water"];

function setType(cell, newType) {
    for (const t of types) {
        cell.classList.remove(t);
    }

    if (newType) {
        cell.classList.add(newType);
    }
}

export function renderGrid(gridElement, map) {
    gridElement.innerHTML = "";

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");

            if (map[y][x]) {
                cell.classList.add(map[y][x]);
            }

            cell.dataset.x = String(x);
            cell.dataset.y = String(y);

            gridElement.appendChild(cell);
        }
    }
}

export function attachGridEvents(gridElement, onCellClick) {
    gridElement.addEventListener("click", (event) => {
        const cell = event.target.closest(".cell");
        if (!cell) return;

        const x = Number(cell.dataset.x);
        const y = Number(cell.dataset.y);

        const newType = onCellClick(x, y);
        setType(cell, newType);
    });
}