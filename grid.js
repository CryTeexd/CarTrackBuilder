const type = ["grass", "road", "water"];

function getRandomType(cell) {
    for (const t of type) {
        if (cell.classList.contains(t)) {
            return t;
        }
    }
    return null;
}

function setType(cell, newType) {
    for (const t of type) cell.classList.remove(t);
    if(newType) cell.classList.add(newType);
}

function getNextType(currentType) {
    if(currentType === null) return "grass";
    const index = type.indexOf(currentType);
    const nextIndex = (index + 1) % type.length;
    return type[nextIndex];
} 

export function createGrid(gridElement, gridSize = 20) {
    gridElement.innerHTML = "";
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell", "grass");
        cell.dataset.x = String(i % gridSize);
        cell.dataset.y = String(Math.floor(i / gridSize));
        gridElement.appendChild(cell);
    }

    gridElement.addEventListener("click", (event) => {
        if (event.target.classList.contains("cell")) {
            const currentType = getRandomType(event.target);
            const nextType = getNextType(currentType);
            setType(event.target, nextType);
        }
    });
}