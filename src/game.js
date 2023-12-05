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

    // Publish events
    // const createComputerGameboardUpdateEvent = () => new Event('computerGameboardUpdated');
    // const createPlayerGameboardUpdateEvent = () => new Event('playerGameboardUpdated');
    
    // Function definitions
    const resetGame = () => {
        // Reset gameboard & players
        player = Player("Player");
        computer = Player("Computer");
        computerGameboard = Gameboard();
        playerGameboard = Gameboard();
        // display placement modal (ignore until modal is completed)
        playerGameboard.placeShipsRandomly();// Place player ships (first do random placement then include click events for player placements)
        computerGameboard.placeShipsRandomly(); // Randomly place computer ships
        // hide placement modal (ignore for now until modal is completed)
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

    // Game logic
    const playRound = (event) => {
        // Get domBoard co-ordinates
        const cell = event.target;
        const row = cell.getAttribute('data-row');
        const column = cell.getAttribute('data-column');

        if (player.hasAlreadyHit(row, column)) return;
        player.attack(row, column, computerGameboard);
        dom.renderGameboard(computerGameboard);
        // window.dispatchEvent(createComputerGameboardUpdateEvent());
        if (computerGameboard.isGameOver()) endGame(); // Bring up winner/draw message with reset button
        computer.randomAttack(playerGameboard);
        dom.renderGameboard(playerGameboard);
        // window.dispatchEvent(createPlayerGameboardUpdateEvent());
        if (playerGameboard.isGameOver()) endGame(); // Bring up winner/draw message with reset button
    }

    const printHello = () => {
        console.log("Hello");
    }

    return { playRound, computerGameboard, playerGameboard, resetGame, printHello }
})();

export { game };