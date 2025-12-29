import { game } from "./game.js";

const dom = (() => {
    // Cache dom
    const modalStart = document.querySelector(".modal.start");
    const shipName = modalStart.querySelector(".modal-container.start span");
    const IsVerticalBtn = modalStart.querySelector(".modal-container.start button");
    const placementGrid = document.getElementById("placement-board");
    const playerGrid = document.getElementById("player-board");
    const computerGrid = document.getElementById("computer-board");
    const modalEnd = document.querySelector(".modal.end");
    const winnerMesg = modalEnd.querySelector(".modal-container.end p");
    const playAgainBtn = modalEnd.querySelector(".modal-container.end button");

    // functions
    // Start modal
    const updateShipName = (currentShipName) => {
        shipName.textContent = `${currentShipName}`;
    }

    const toggleStartModal = () => {
        modalStart.classList.toggle("show");
    }
    
    // Placementboard
    const renderPlacementBoard = (gameboard) => {
        const playerBoard = gameboard.getBoard();
        const DOMboard = placementGrid;
        DOMboard.innerHTML = '';
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                const cellElement = document.createElement("div");
                cellElement.className = "cell";
                if (playerBoard[row][col]) cellElement.classList.add("ship");

                const cellHover = document.createElement("div");
                cellHover.dataset.row = row;
                cellHover.dataset.column = col;
                cellHover.className = "cell-hover";
                cellElement.appendChild(cellHover);

                DOMboard.appendChild(cellElement);
            }
        }
    }

    const updateHoverLength = (shipLength, isVertical) => {
    const placementBoard = document.getElementById("placement-board");
    const cellWidth = (placementBoard.clientWidth - 2) / 10;
    const cellHeight = (placementBoard.clientHeight - 2) / 10;
    
    const cellHovers = document.querySelectorAll(".cell-hover");
    cellHovers.forEach(cellHover => {
        cellHover.style.setProperty("--width","100%");
        cellHover.style.setProperty("--height","100%");
        if (!isVertical) {
            cellHover.style.setProperty("--width",`calc(${cellWidth}px + ${cellWidth}px * ${shipLength - 1})`);
        } else {
            cellHover.style.setProperty("--height",`calc(${cellHeight}px + ${cellHeight}px * ${shipLength - 1})`);
        }
    });
}

    // Gameboards
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
                    }
                }
                domGrid.appendChild(cellElement);
            }
        }
    }

    // End modal
    const renderWinner = (player) => {
        winnerMesg.textContent = (player.getName !== "Player") ? "You win" : "You lose";
    }

    const toggleEndModal = () => {
        modalEnd.classList.toggle("show");
    }

    // Render boards on dom load
    renderPlacementBoard(game.playerGameboard);
    updateShipName("Carrier");
    updateHoverLength(game.getCurrentShip().getLength(), false);
    renderGameboard(game.playerGameboard, game.player, game.computer);
    renderGameboard(game.computerGameboard, game.computer, game.player);
    
    // Event listeners
    IsVerticalBtn.addEventListener("click", () => {
        game.toggleRotate();
        updateHoverLength(game.getCurrentShip().getLength(), game.getIsVertical());
    });
    placementGrid.addEventListener("click", game.placementBoardOnClick);
    computerGrid.addEventListener("click", game.playRound);
    playAgainBtn.addEventListener("click", game.resetGame);

    return {
        renderPlacementBoard,
        renderGameboard,
        renderWinner,
        toggleStartModal,
        toggleEndModal,
        updateShipName,
        updateHoverLength,
    };
})();

export { dom };
