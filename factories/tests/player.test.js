import { Player } from "../player";
import { Gameboard } from "../gameBoard";
import Ship from "../ship";

describe("Player", () => {

    let ship;
    let player;
    let gameboard;

    beforeEach(() => {
        ship = Ship(4);
        player = Player("Player");
        gameboard = Gameboard();
    });

    test("Creates and initializes a player object", () => {
        expect(player).toBeInstanceOf(Object);
        expect(player).toHaveProperty("attack", expect.any(Function));
        expect(player).toHaveProperty("randomAttack", expect.any(Function));
        expect(player).toHaveProperty("hasAlreadyHit", expect.any(Function));
    });

    test("Attacks successfully & prevents double hits", () => {
        player.attack(0, 0, gameboard);
        expect(player.hasAlreadyHit(0, 0)).toBe(true);

        player.attack(0, 0, gameboard);
        expect(player.getAlreadyHitCoOrds().length).toEqual(1);
    });

    test("Randomly attacks successfully & prevents double hits", () => {
        gameboard.placeShip(ship, 1, 3, true);
        while (player.getAlreadyHitCoOrds().length < 100) {
            player.randomAttack(gameboard);
        }

        expect(gameboard.isGameOver()).toEqual(true);
        expect(gameboard.getEmptyFeildsQty()).toEqual(100 - 4);
    });
});