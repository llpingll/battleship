import Ship from "../ship"

// Describe creates a block that groups together several related tests.
describe("Ship", () => {

    let ship; // Declare ship variable here to make it accessible to all tests

    beforeEach(() => {
        // Create a new instance of Ship before each test
        ship = Ship(4);
    });
    
    test("Creates and initializes a ship", () => {
        expect(ship).toBeInstanceOf(Object);
        expect(ship.getLength()).toEqual(4);
        expect(ship.getHits()).toEqual([]);
    });

    test("Takes a hit", () => {
        ship.hit(2);
        expect(ship.getHits()).toContain(2);
    });

    test("Sinks", () => {
        for (let i = 0; i < ship.getLength(); i++) {
            ship.hit(i);
        }
        expect(ship.isSunk()).toBeTruthy();
    });

    test("prevent multiple hits at the same spot", () => {
        ship.hit(1);
        ship.hit(1);
        ship.hit(1);
        expect(ship.getHits().length).toBe(1);
    });
})