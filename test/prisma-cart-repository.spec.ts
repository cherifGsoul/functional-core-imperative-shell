import {addProduct, generateCartId, listProducts, newCart} from "../src/core/functions";
import { getCart, saveCart } from "../src/shell/persistence/prisma-cart-repository";
import {Cart} from "../src/core/types";

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