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
        // If cant place ship return false

        // if isVertical place ship in each board cell vertically else horizontally
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

    // Initialize _board & _missedShots on Gameboard instantiation
    initialize();

    return { initialize, getBoard, getMissedShots, placeShip}
}

export { Gameboard };

//   [
//     [null, null, null, null, null],
//     [null, null, null, null, null],
//     [null, null, null, null, null],
//     [null, null, null, null, null]
//   ]
  
  // missedShots property (initialized to false for each cell)
//   [
//     [false, false, false],
//     [false, false, false],
//     [false, false, false]
//   ]