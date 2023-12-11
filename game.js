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

    // Place ships
    playerGameboard.placeShipsRandomly();
    computerGameboard.placeShipsRandomly();

    // Function definitions
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

    const placePlayerShips = () => {
        // Initialize ships
        const ships = [];
        const carrier = Ship(5);
        const battleship = Ship(4);
        const destroyer = Ship(3);
        const submarine = Ship(3);
        const patrolBoat = Ship(2);
        ships.push(carrier, battleship, destroyer, submarine, patrolBoat);
        let shipsPlaced = 0;

        while (shipsPlaced < 5) {
            if (player.placeShip(ships[shipsPlaced], row, column, isVertical)) {
                shipsPlaced++;
            }
        }
    }

    const endGame = (player) => {
        dom.renderWinner(player);
        dom.toggleEndGame();
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

    return { computerGameboard, playerGameboard, player, computer, playRound, resetGame }
})();

export { game };

// Publish events
// const createComputerGameboardUpdateEvent = () => new Event('computerGameboardUpdated');
// const createPlayerGameboardUpdateEvent = () => new Event('playerGameboardUpdated');