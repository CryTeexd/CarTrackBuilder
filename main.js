import { renderGrid, attachGridEvents } from "./grid.js";
import { createMap, getMap, cycleTile, clearMap } from "./model.js";

const gridElement = document.getElementById("grid");
const clearBtn = document.getElementById("clearBtn");

createMap(20);
renderGrid(gridElement, getMap());
attachGridEvents(gridElement, cycleTile);

clearBtn.addEventListener("click", () => {
    clearMap();
    renderGrid(gridElement, getMap());
});