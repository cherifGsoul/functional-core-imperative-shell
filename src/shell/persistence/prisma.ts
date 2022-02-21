import { Cart as CartModel } from '@prisma/client';
import { Cart, CartId } from '../../core/types';
import { generateCartId, listProducts, newCart } from '../../core/functions';
import { prisma } from '../../dependencies';

interface Product {
    product: string
    quantity: number
}

export const nextIdentity = (): CartId => generateCartId()

export const saveCart = async (cart: Cart): Promise<void> => {
    const { id } = cart;
    const data = {id, products: listProducts(cart)}
    await prisma.cart.upsert({ where: {id: cart.id},  create: data, update: data });
};

export const getCart = async (id: CartId): Promise<Cart> => {
    const record: CartModel | null = await prisma.cart.findUnique({where: {id}});
    if (!record) {
        new Error('Cart can not be found');
    }
    const cart: Cart = newCart(id);
    const products = record?.products as Array<any>;
    products.forEach((product: Product) => {
        cart.products.set(product.product, product.quantity);
    });
    return cart;
}