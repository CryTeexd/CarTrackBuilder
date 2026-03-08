const storage = "carTrackBuilderMaps";

function getAllMaps() {
    const data = localStorage.getItem(storage);
    return data ? JSON.parse(data) : {};
}

function saveAllMaps(allMaps) {
    localStorage.setItem(storage, JSON.stringify(allMaps));
}

export function saveMap(name, map) {
    const allMaps = getAllMaps();
    allMaps[name] = map;
    saveAllMaps(allMaps);
}

export function loadMap(name) {
    const allMaps = getAllMaps();
    return allMaps[name] || null;
}

export function getMapNames() {
    return Object.keys(getAllMaps());
}

export function exportMap(map, fileName = "map.json") {
    const dataStr = JSON.stringify(map, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();

    URL.revokeObjectURL(url);
}

export function importMapFromFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            try {
                const parsed = JSON.parse(reader.result);
                resolve(parsed);
            } catch {
                reject(new Error("Soubor není validní JSON."));
            }
        };

        reader.onerror = () => {
            reject(new Error("Soubor se nepodařilo načíst."));
        };

        reader.readAsText(file);
    });
}