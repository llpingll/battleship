const Ship = (size) => {
    const length = size;
    const hits = [];

    const hit = (position) => {
        if (hits.includes(position) || position < 0 || position >= length) {
            return;
        }
        hits.push(position);
    }

    const isSunk = () => {
        return (hits.length === length);
    }

    return { hit, isSunk, }
}

export { Ship };