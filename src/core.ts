import { v4 } from 'uuid';

export type Cart = Readonly<{
    id: CartId,
    products: Products
}>

export type CartId = Readonly<string>;
type Products = Readonly<Map<string, number>>;

export const generateCartId = (): CartId => v4();

export const newCart = (id: CartId): Cart => ({ id, products: new Map<string, number>() });

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