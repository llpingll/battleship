const Player = (name) => {

    const _name = name;
    const _alreadyHitCoOrds = [];

    // Getters
    const getName = () => {
        return _name;
    }

    const getAlreadyHitCoOrds = () => {
        return _alreadyHitCoOrds;
    }

    const attack = (row, column, gameboard) => {
        if (hasAlreadyHit(row, column)) return;

        _alreadyHitCoOrds.push([row, column]);
        gameboard.receiveAttack(row, column);
    }

    const randomAttack = (gameboard) => {
        if (_alreadyHitCoOrds.length === 100) return;

        let row = Math.floor(Math.random() * 10);
        let column = Math.floor(Math.random() * 10);

        while (hasAlreadyHit(row, column)) {
            row = Math.floor(Math.random() * 10);
            column = Math.floor(Math.random() * 10);
        }

        _alreadyHitCoOrds.push([row, column]);
        gameboard.receiveAttack(row, column);
    }

    const hasAlreadyHit = (row, column) => {
        for (let i = 0; i < _alreadyHitCoOrds.length; i++) {
            if (_alreadyHitCoOrds[i][0] === row && _alreadyHitCoOrds[i][1] === column) {
                return true;
            }
        }
        return false;
    }

    return { attack, randomAttack, hasAlreadyHit, getName, getAlreadyHitCoOrds}
}

export { Player }