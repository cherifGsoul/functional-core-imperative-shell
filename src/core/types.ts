import { validate } from "uuid";

export namespace Cart {
    export type Cart = Readonly<{
        id: CartId.CartId,
        products: Products
    }>

    export type Product = Readonly<string>
    type Products = Readonly<Map<Product, number>>;

    export const newCart = (id: CartId.CartId): Cart => ({ id, products: new Map<Product, number>() });

    export const addProduct = (product: string, cart: Cart) : Cart => {
        const { id, products } = cart;
        let quantity: number = products.get(product) || 0;
        quantity += 1;
        products.set(product, quantity);
        return { id, products }
    };

    export const listProducts = (cart: Cart): Array<{ product: string, quantity: number }> => {
        return Array.from(cart.products, ([product, quantity]) => ({product, quantity}));
    };
}

export namespace CartId {
    export type CartId = Readonly<string>;

    export const fromString = (s: string) => {
        if (!validate(s)) {
            throw Error('Invalid UUID for cart id')
        }
        return s;
    }
}