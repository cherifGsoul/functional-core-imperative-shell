import { v4 } from "uuid";
import {addProduct, listProducts, newCart} from "../src/core";

describe('Cart core', () => {
    it('should add products to an empty cart', () => {
        const cart = newCart();
        const product = v4();
        const cartWithProducts = addProduct(product, cart);
        const expected = [{product, quantity: 1}];
        expect(listProducts(cartWithProducts)).toEqual(expected);
    });

    it('should aggregate products quantities', () => {
        const cart = newCart();
        const product = v4();
        addProduct(product, cart);
        const cartWithProducts = addProduct(product, cart);
        const expected = [{product, quantity: 2}];
        expect(listProducts(cartWithProducts)).toEqual(expected);
    });
});