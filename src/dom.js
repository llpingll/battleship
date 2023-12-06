import { game } from "./game.js";

const dom = (() => {
    // Cache dom gameboards
    const playerGrid = document.getElementById("playerBoard");
    const computerGrid = document.getElementById("computerBoard");

    // functions
    const renderInitialGameboards = () => {
        const grids = [playerGrid, computerGrid];

        grids.forEach(grid => {
            for (let row = 0; row < 10; row++) {
                const rowElement = document.createElement("div");
                rowElement.classList.add('row');
                for (let column = 0; column < 10; column++) {
                    const cellElement = document.createElement("div");
                    cellElement.dataset.row = row;
                    cellElement.dataset.column = column;
                    cellElement.classList.add("default");
                    rowElement.appendChild(cellElement);
                }
                grid.appendChild(rowElement);
            }
        });
    }

    const renderGameboard = (gameboard, owner, enemy) => {
        const board = gameboard.getBoard();
        const domGrid = (owner.getName() === "Player") ? playerGrid : computerGrid;
        domGrid.innerHTML = '';

        for (let row = 0; row < board.length; row++) {
            const rowElement = document.createElement("div");
            rowElement.classList.add('row');
            for (let column = 0; column < board[row].length; column++) {
                const cellElement = document.createElement("div");
                cellElement.dataset.row = row;
                cellElement.dataset.column = column;

                if (board[row][column]) {
                    if (enemy !== "Computer") {
                        if (board[row][column] !== null && !enemy.hasAlreadyHit(row, column)) cellElement.classList.add("ship");
                    }
                    if (enemy.hasAlreadyHit(row, column)) cellElement.classList.add("hit");
                } else if (gameboard.getMissedShots()[row][column]) {
                    cellElement.classList.add("missed");
                } else {
                    cellElement.classList.add("default");
                }
                rowElement.appendChild(cellElement);
            }
            domGrid.appendChild(rowElement);
        }
    }

    // Render boards
    renderInitialGameboards();
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