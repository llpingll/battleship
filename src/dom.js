import { game } from "./game.js";

const dom = (() => {
    // Cache dom gameboards
    const playerGrid = document.getElementById("playerBoard");
    const computerGrid = document.getElementById("computerBoard");

    // functions


    // Subscribe events
    // window.addEventListener('computerGameboardUpdate', () => {
    //     dom.renderGameboard(game.computerGameboard);
    // });

    // window.addEventListener('playerGameboardUpdate', () => {
    //     dom.renderGameboard(game.playerGameboard);
    // });

    computerGrid.addEventListener("click", game.printHello);

})();

export { dom };

 // Example of creating grid programmatically
    // function renderGameboard() {
    //     for (let row = 0; row < numRows; row++) {
    //         for (let column = 0; column < numColumns; column++) {
    //             const cell = document.createElement('div');
    //             cell.classList.add('cell');
    //             cell.setAttribute('data-row', row);
    //             cell.setAttribute('data-column', column);
    //             grid.appendChild(cell);
    //          }
    //     }
    // }