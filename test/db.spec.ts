import {addProduct, Cart, generateCartId, listProducts, newCart} from "../src/core";
import {getCart, saveCart} from "../src/db";

describe('db', () => {

    it('should get saved cart', async () => {
        const cart: Cart = newCart(generateCartId());
        await saveCart(cart);
        const savedCart = await getCart(cart.id);
        expect(cart).toEqual(savedCart);
    });

    it('should update saved cart', async () => {
        let cart: Cart = newCart(generateCartId());
        await saveCart(cart);
        cart = addProduct('foooo', cart);
        cart = addProduct('foooo', cart);
        await saveCart(cart);
        const savedCart = await getCart(cart.id);
        expect(listProducts(savedCart)).toEqual([{product: 'foooo', quantity: 2}]);
    });
});