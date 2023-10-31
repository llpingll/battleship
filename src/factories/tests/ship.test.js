import Ship from '../ship'

// Describe creates a block that groups together several related tests.
describe('Ship', () => {

    const ship = Ship(3)
    
    test('creates and initializes a ship', () => {
        expect(ship).toEqual({ length: 3, hits: 0 });
    });

})