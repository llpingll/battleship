import { playRound } from './game';

const dom = (() => {
    // Cache dom gameboards
    const playerGrid = document.getElementById('playerGrid');
    const computerGrid = document.getElementById('computerGrid');
    console.log("hello");
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

    computerGrid.addEventListener("click", playRound);

})();