import { game } from "./game.js";

const dom = (() => {
    // Cache dom gameboards
    const playerGrid = document.getElementById("playerBoard");
    const computerGrid = document.getElementById("computerBoard");

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
                    if (enemy.hasAlreadyHit(row, column)) {
                        cellElement.classList.remove("default");
                        cellElement.classList.add("hit");
                    }
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

    // Render boards
    renderGameboard(game.playerGameboard, game.player, game.computer);
    renderGameboard(game.computerGameboard, game.computer, game.player);
    // Event listeners
    computerGrid.addEventListener("click", game.playRound);

    return { renderGameboard };
})();

export { dom };

// Subscribe events
    // window.addEventListener('computerGameboardUpdate', () => {
    //     dom.renderGameboard(game.computerGameboard);
    // });

    // window.addEventListener('playerGameboardUpdate', () => {
    //     dom.renderGameboard(game.playerGameboard);
    // });