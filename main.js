import { renderGrid, attachGridEvents } from "./grid.js";
import { createMap, getMap, setMap, cycleTile, clearMap } from "./model.js";
import { saveMap, loadMap, getMapNames, exportMap, importMapFromFile } from "./storage.js";

const menu = document.getElementById("menu");
const editor = document.getElementById("editor");
const gridElement = document.getElementById("grid");

const newMapBtn = document.getElementById("newMapBtn");
const loadMapBtn = document.getElementById("loadMapBtn");
const saveBtn = document.getElementById("saveBtn");
const clearBtn = document.getElementById("clearBtn");
const importBtn = document.getElementById("importBtn");
const exportBtn = document.getElementById("exportBtn");

function showMenu() {
    menu.style.display = "block";
    editor.style.display = "none";
}

function showEditor() {
    menu.style.display = "block";
    editor.style.display = "block";
}

function refreshGrid() {
    renderGrid(gridElement, getMap());
}

function startNewMap() {
    createMap(20);
    refreshGrid();
    showEditor();
}

newMapBtn.addEventListener("click", () => {
    startNewMap();
});

loadMapBtn.addEventListener("click", () => {
    const names = getMapNames();

    if (names.length === 0) {
        alert("Žádné uložené mapy.");
        return;
    }

    const selectedName = prompt(
        "Zadej název mapy k načtení:\n\n" + names.join("\n")
    );

    if (!selectedName) return;

    const loaded = loadMap(selectedName);

    if (!loaded) {
        alert("Mapa s tímto názvem neexistuje.");
        return;
    }

    setMap(loaded);
    refreshGrid();
    showEditor();
});

saveBtn.addEventListener("click", () => {
    const mapName = prompt("Zadej název mapy:");

    if (!mapName || mapName.trim() === "") {
        alert("Uložení zrušeno.");
        return;
    }

    saveMap(mapName.trim(), getMap());
    alert("Mapa byla uložena.");
});

clearBtn.addEventListener("click", () => {
    clearMap();
    refreshGrid();
});

exportBtn.addEventListener("click", () => {
    const fileName = prompt("Zadej název exportovaného souboru:", "map.json");

    if (!fileName) return;

    exportMap(getMap(), fileName.endsWith(".json") ? fileName : `${fileName}.json`);
});

importBtn.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";

    input.addEventListener("change", async () => {
        const file = input.files[0];
        if (!file) return;

        try {
            const importedMap = await importMapFromFile(file);
            setMap(importedMap);
            refreshGrid();
            showEditor();
        } catch (error) {
            alert(error.message);
        }
    });

    input.click();
});

createMap(20);
refreshGrid();
showEditor();
attachGridEvents(gridElement, cycleTile);