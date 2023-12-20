import { Player } from "./factories/player.js";
import { Gameboard } from "./factories/gameBoard.js";
import Ship from "./factories/ship.js";
import { dom } from "./dom.js";

var game = (() => {
    // Instantiate objects
    let player = Player("Player");
    let computer = Player("Computer");
    let computerGameboard = Gameboard();
    let playerGameboard = Gameboard();

    // Initialize ships for placement
    const ships = [
        Ship(5),
        Ship(4),
        Ship(3),
        Ship(3),
        Ship(2),
    ];

    const shipNames = [
        'Carrier',
        'Battleship',
        'Destroyer',
        'Submarine',
        'Patrol Boat',
    ];

    let _isVertical = false;
    let currentShipIndex = 0;
    let _currentShip = ships[0];
    let _currentShipName = shipNames[0];

    // Create functions to get ship variables
    const getIsVertical = () => {
        return _isVertical;
    }

    const getCurrentShip = () => {
        return _currentShip;
    }

    // Function definitions
    // Start grid 
    const placementBoardOnClick = (event) => {
        const cell = event.target;
        const row = Number(cell.getAttribute('data-row'));
        const col = Number(cell.getAttribute('data-column'));
        console.log(row, col);
        if (playerGameboard.placeShip(ships[currentShipIndex], row, col, _isVertical)) {
            console.log("Ship placed");
            currentShipIndex++;
            _currentShip = ships[currentShipIndex];
            _currentShipName = shipNames[currentShipIndex];
            console.log(playerGameboard.getBoard());
        } else {
            console.log("Returned");
            return;
        }

        dom.updateShipName(_currentShipName);
        dom.updateHoverLength(_currentShip.getLength(), _isVertical);

        if (currentShipIndex > 5) {
            dom.toggleStartModal();
        }
    }

    const toggleRotate = () => {
        _isVertical = !_isVertical;
    }

    const resetGame = () => {
        // Reset gameboard & players
        player = Player("Player");
        computer = Player("Computer");
        computerGameboard = Gameboard();
        playerGameboard = Gameboard();
        // toggle placement modal (ignore until modal is completed)
        playerGameboard.placeShipsRandomly();// Place player ships (first do random placement then include click events for player placements)
        computerGameboard.placeShipsRandomly(); // Randomly place computer ships
        dom.renderGameboard(computerGameboard, computer, player);
        dom.renderGameboard(playerGameboard, player, computer);
        dom.toggleEndGame();
    }

    const endGame = (player) => {
        dom.renderWinner(player);
        dom.toggleEndModal();
    }

    // Game logic
    const playRound = (event) => {
        // Get domBoard co-ordinates
        const cell = event.target;
        const row = Number(cell.getAttribute('data-row'));
        const column = Number(cell.getAttribute('data-column'));
        if (player.hasAlreadyHit(row, column)) return;
        player.attack(row, column, computerGameboard);
        dom.renderGameboard(computerGameboard, computer, player);
        // window.dispatchEvent(createComputerGameboardUpdateEvent());
        if (computerGameboard.isGameOver()) endGame(player); // Bring up winner/draw message with reset button
        computer.randomAttack(playerGameboard);
        dom.renderGameboard(playerGameboard, player, computer);
        // window.dispatchEvent(createPlayerGameboardUpdateEvent());
        if (playerGameboard.isGameOver()) endGame(computer); // Bring up winner/draw message with reset button
    }

    // Place ships
    // playerGameboard.placeShipsRandomly();
    computerGameboard.placeShipsRandomly();

    return {
        computerGameboard,
        playerGameboard,
        player,
        computer,
        getIsVertical,
        getCurrentShip,
        placementBoardOnClick,
        toggleRotate,
        playRound,
        resetGame,
    }
})();

export { game };

// Publish events
// const createComputerGameboardUpdateEvent = () => new Event('computerGameboardUpdated');
// const createPlayerGameboardUpdateEvent = () => new Event('playerGameboardUpdated');