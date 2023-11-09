const Gameboard = () => {
    // Private variables
    const SIZE = 10;
    let _board = [];
    let _missedShots = [];
    
    // Getters (Public)
    const getBoard = () => {
        return _board;
    }

    const getMissedShots = () => {
        return _missedShots;
    }

    // Methods (Public)
    const initialize = () => {
        for (let i = 0; i < SIZE; i++) {
            _board[i] = []; // Initialize an empty array for each row in the board
            _missedShots[i] = []; // Initialize an empty array for each row in the missedShots
            for (let j = 0; j < SIZE; j++) {
                _board[i][j] = null; // Set each cell in the board to null initially
                _missedShots[i][j] = false; // Set each cell in missedShots to false initially
            }
        }
    }

    const placeShip = (ship, row, column, isVertical) => {
        // Check if placement is possible
        if (!isPlacementPossible(ship, row, column, isVertical)) return false;

        // If isVertical place ship in each board cell vertically else horizontally
        if (isVertical) {
            for (let i = 0; i < ship.getLength(); i++) {
                _board[row + i][column] = ship;
            }
        } else {
            for (let i = 0; i < ship.getLength(); i++) {
                _board[row][column + i] = ship;
            }
        }
        return true;
    }

    const isPlacementPossible = (ship, row, column, isVertical) => {
        // Case position/index is out of gameboard
        if (row < 0 || row > SIZE - 1 || column < 0 || column > SIZE - 1) return false;

        // Case ship doesn't fit in gameboard
        if (isVertical) {
            if (row + ship.getLength() > SIZE) return false;
        } else {
            if (column + ship.getLength() > SIZE) return false;
        }

        // Case any of the fields is already taken
        if (isVertical) {
            for (let i = 0; i < ship.getLength(); i++) {
                if (_board[row + i][column] !== null) return false;
            }
        } else {
            for (let i = 0; i < ship.getLength(); i++) {
                if (_board[row][column + i] !== null) return false;
            }
        }

        // Case any of the neighbour fields are already taken
        // Case open cells around position
        if (row > 0 && row < SIZE - 1) {
            if (isVertical) {
                if (_board[row - 1][column]) return false; // Check top feild
                if (_board[row + ship.getLength()][column]) return false; // Check rigth cell
                for (let i = -1; i < ship.getLength() + 2; i++) {
                    if (_board[row + i][column + 1]) return false; // Check right column (+ top & bottom of right column)
                    if (_board[row + i][column - 1]) return false; // Check left column (+ top & bottom of left column)
                }
            } else {
                if (_board[row][column - 1]) return false; // Check left cell
                if (_board[row][column + ship.getLength()]) return false; // Check right cell
                for (let i = -1; i < ship.getLength() + 2; i++) {
                    if (_board[row + 1][column + i]) return false; // Check bottom row (+ left & right of bottom row)
                    if (_board[row - 1][column + i]) return false; // Check top row (+ left & right of top row)
                }
            }
        }

        return true;
    }

    // Initialize _board & _missedShots on Gameboard instantiation
    initialize();

    return { initialize, getBoard, getMissedShots, placeShip, isPlacementPossible}
}

export { Gameboard };