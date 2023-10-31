const Ship = (size) => {
    const length = size;
    const hits = 0;
    let sunk = false;

    const hit = () => {
        if (hits < length) {
            hits++;
        }
    }

    const isSunk = () => {
        if (length == hits) {
            sunk = true;
        }
    }

    return { hit, isSunk, }
}

export { Ship };