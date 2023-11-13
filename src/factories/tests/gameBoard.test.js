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

    test("Hit ship receives attack", () => {
        gameboard.placeShip(ship, 1, 2, true);
        gameboard.receiveAttack(3, 2);
        expect(gameboard.getBoard()[3][2].getHits().includes(2)).toBe(true);
    });

    test("Keeps track of missed shots", () => {
        gameboard.placeShip(ship, 1, 1, true);
        gameboard.receiveAttack(2, 2);
        expect(gameboard.getMissedShots()[2][2]).toBe(true);
    });

    test("Determines if game over", () => {
        expect(gameboard.isGameOver()).toBe(false);

        gameboard.placeShip(ship, 1, 1, true);
        expect(gameboard.isGameOver()).toBe(false);
        gameboard.receiveAttack(1, 1);
        gameboard.receiveAttack(2, 1);
        gameboard.receiveAttack(3, 1);
        expect(gameboard.isGameOver()).toBe(true);

        gameboard.placeShip(Ship(4), 6, 2, false);
        gameboard.receiveAttack(6, 2);
        gameboard.receiveAttack(6, 3);
        gameboard.receiveAttack(6, 4);
        gameboard.receiveAttack(6, 5);
        expect(gameboard.isGameOver()).toBe(true);
    });

    test("Place ships randomly", () => {
        expect(gameboard.getEmptyFeildsQty()).toEqual(100);
        gameboard.placeShipsRandomly();
        expect(gameboard.getEmptyFeildsQty()).toEqual(100-17);
    })
});