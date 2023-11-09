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
        if (isVertical) {
            for (let i = 0; i < ship.getLength(); i++) {
              for (let x = -1; x <= 1; x++) { 
                for (let y = -1; y <= 1; y++) {
                  if ( // If any true (out of bounds), continue(skip) cell being checked and throwing out of bounds error
                    row + x + i < 0 || // Check top boundry
                    row + x + i >= SIZE || // Check bottom boundry
                    column + y < 0 || // Check left boundry
                    column + y >= SIZE // Check right boundry
                  )
                    continue // This immediately stops the current iteration of the loop and jumps to the next iteration.
                  if (_board[row + x + i][column + y]) return false
                }
              }
            }
          } else {
            for (let i = 0; i < ship.getLength(); i++) {
              for (let x = -1; x <= 1; x++) {
                for (let y = -1; y <= 1; y++) {
                  if (
                    row + x < 0 ||
                    row + x >= SIZE ||
                    column + y + i < 0 ||
                    column + y + i >= SIZE
                  )
                    continue
                  if (_board[row + x][column + y + i]) return false
                }
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