import { v4 } from 'uuid';
import {AddProduct, CartId, GenerateCartId, ListProducts, NewCart} from './types';
import { Cart, Product } from './types';

export const generateCartId: GenerateCartId = (): CartId => v4();

export const newCart: NewCart = (id: CartId): Cart => ({ id, products: new Map<Product, number>() });

export const addProduct: AddProduct = (product: string, cart: Cart) : Cart => {
    const { id, products } = cart;
    let quantity: number = products.get(product) || 0;
    quantity += 1;
    products.set(product, quantity);
    return { id, products }
};

export const listProducts: ListProducts = (cart: Cart): Array<{ product: string, quantity: number }> => {
    return Array.from(cart.products, ([product, quantity]) => ({product, quantity}));
};