const Ship = (size) => {
    // Private variables
    const _length = size;
    const _hits = [];

    // getters (Public)
    const getLength = () => {
        return _length;
    }

    const getHits = () => {
        return _hits;
    }

    // Methods (Public)
    const hit = (position) => {
        if (_hits.includes(position) || position < 0 || position >= _length) {
            return;
        }
        _hits.push(position);
    }

    const isSunk = () => {
        return (_hits.length === _length);
    }

    return { hit, isSunk, getLength, getHits, }
}

export default Ship;