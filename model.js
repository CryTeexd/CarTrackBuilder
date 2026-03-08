const types = ["grass", "road", "water"];

let map = [];
let size = 20;

export function createMap(gridSize = 20) {
    size = gridSize;
    map = [];

    for (let y = 0; y < size; y++) {
        const row = [];
        for (let x = 0; x < size; x++) {
            row.push("grass");
        }
        map.push(row);
    }

    return map;
}

export function getMap() {
    return map;
}

export function setMap(newMap) {
    map = newMap;
    size = newMap.length;
}

export function cycleTile(x, y) {
    const currentType = map[y][x];
    const index = types.indexOf(currentType);
    const nextIndex = (index + 1) % types.length;
    map[y][x] = types[nextIndex];
    return map[y][x];
}

export function clearMap() {
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            map[y][x] = "grass";
        }
    }
}