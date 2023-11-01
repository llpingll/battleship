import Ship from '../ship'

// Describe creates a block that groups together several related tests.
describe('Ship', () => {

    let ship = Ship(3);

    // console.log(ship);
    
    test('Creates and initializes a ship', () => {
        expect(ship).toBeInstanceOf(Object);
        expect(ship.getLength()).toEqual(3);
        expect(ship.getHits()).toEqual([]);
    });

    test('Takes a hit', () => {
        ship.hit(2);
        expect(ship.getHits()).toContain(2)
    });

})