import { game } from "./game.js";

const dom = (() => {
    // Cache dom
    const playerGrid = document.getElementById("player-board");
    const computerGrid = document.getElementById("computer-board");
    const modal = document.querySelector(".modal");
    const winnerMesg = modal.querySelector(".modal-container p");
    const playAgain = modal.querySelector(".modal-container button");

    // functions
    const renderGameboard = (gameboard, owner, enemy) => {
        const board = gameboard.getBoard();
        const domGrid = (owner.getName() === "Player") ? playerGrid : computerGrid;
        domGrid.innerHTML = '';

        for (let row = 0; row < board.length; row++) {
            for (let column = 0; column < board[row].length; column++) {
                const cellElement = document.createElement("div");
                cellElement.dataset.row = row;
                cellElement.dataset.column = column;
                cellElement.classList.add("default");

                if (board[row][column]) {
                    if (owner.getName() === "Player") cellElement.classList.replace("default", "ship");
                    if (enemy.hasAlreadyHit(row, column) && owner.getName() === "Player")
                        cellElement.classList.replace("ship", "hit");
                    if (enemy.hasAlreadyHit(row, column) && owner.getName() === "Computer")
                        cellElement.classList.replace("default", "hit");
                } else {
                    if (gameboard.getMissedShots()[row][column]) {
                        cellElement.classList.replace("default", "missed");
                        // console.log(gameboard.getMissedShots()[row][column]);
                    }
                }
                domGrid.appendChild(cellElement);
            }
        }
    }

    const renderWinner = (player) => {
        winnerMesg.textContent = (player.getName !== "Player") ? "You win" : "You lose";
    }

    const toggleEndGame = () => {
        modal.classList.toggle("show");
    }

    // Render boards
    renderGameboard(game.playerGameboard, game.player, game.computer);
    renderGameboard(game.computerGameboard, game.computer, game.player);
    
    // Event listeners
    computerGrid.addEventListener("click", game.playRound);
    playAgain.addEventListener("click", game.resetGame);

    return { renderGameboard, renderWinner, toggleEndGame };
})();

export { dom };

// Subscribe events
    // window.addEventListener('computerGameboardUpdate', () => {
    //     dom.renderGameboard(game.computerGameboard);
    // });

    // window.addEventListener('playerGameboardUpdate', () => {
    //     dom.renderGameboard(game.playerGameboard);
    // });