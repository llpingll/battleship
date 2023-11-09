import { Gameboard } from "../gameBoard";
import Ship from "../ship";

describe("Gameboard", () => {
    // Initialize variables
    const SIZE = 10;
    let ship;
    let gameboard;
    let testBoard;
    let testMissedShots;

    beforeEach(() => {
        // Create new instances of test objects
        ship = Ship(3);
        gameboard = Gameboard();
        testBoard = [];
        testMissedShots = [];
        // Initialize test boards
        for (let i = 0; i < SIZE; i++) {
            testBoard[i] = [];
            testMissedShots[i] = [];
            for (let j = 0; j < SIZE; j++) {
                testBoard[i][j] = null;
                testMissedShots[i][j] = false;
            }
        }
    });

    test("Creates and initializes a gameboard", () => {
        expect(gameboard.getBoard()).toEqual(testBoard);
        expect(gameboard.getMissedShots()).toEqual(testMissedShots);
    });

    test("Places ship", () => {
        gameboard.placeShip(ship, 1, 1, true);
        testBoard[1][1] = ship;
        testBoard[2][1] = ship;
        testBoard[3][1] = ship;
        expect(gameboard.getBoard()).toEqual(testBoard);
    });

    test("Prevents ship placement outside gameboard", () => {
        gameboard.placeShip(ship, 1, 1, true);
        expect(gameboard.isPlacementPossible(ship, 8, 8, true)).toBe(false);
        expect(gameboard.isPlacementPossible(ship, 10, 10, true)).toBe(false);
    });

    test("Prevents ship placement on taken fields", () => {
        gameboard.placeShip(ship, 1, 1, true);
        expect(gameboard.isPlacementPossible(ship, 1, 1, true)).toBe(false);
    });
    
    test("Prevents ship placement on direct neighbouring taken fields", () => {
        gameboard.placeShip(ship, 2, 2, true);
        expect(gameboard.isPlacementPossible(ship, 1, 1, true)).toBe(false);        
        expect(gameboard.isPlacementPossible(ship, 1, 1, false)).toBe(false);
        expect(gameboard.isPlacementPossible(ship, 4, 3, true)).toBe(false);
        expect(gameboard.isPlacementPossible(ship, 4, 3, false)).toBe(false);
        expect(gameboard.isPlacementPossible(ship, 1, 4, true)).toBe(true);
    });
});