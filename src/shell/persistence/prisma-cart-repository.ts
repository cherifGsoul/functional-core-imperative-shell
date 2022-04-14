import { Cart as CartModel } from '@prisma/client';
import { Cart, CartId } from '../../core/types';
import { prisma } from '../../dependencies';
import { GetCart, NextIdentity, SaveCart } from '../../core/cart-repository';
import { v4 } from 'uuid';

interface Product {
    product: string
    quantity: number
}

export const nextIdentity: NextIdentity = (): CartId.CartId => v4()

export const saveCart: SaveCart = async (cart: Cart.Cart): Promise<void> => {
    const { id } = cart;
    const data = {id, products: Cart.listProducts(cart)};
    await prisma.cart.upsert({ where: {id: cart.id},  create: data, update: data });
};

export const getCart: GetCart = async (id: CartId.CartId): Promise<Cart.Cart> => {
    const record: CartModel | null = await prisma.cart.findUnique({where: {id}});
    if (!record) {
        new Error('Cart can not be found');
    }
    const cart: Cart.Cart = Cart.newCart(id);
    const products = record?.products as Array<any>;
    products.forEach((product: Product) => {
        cart.products.set(product.product, product.quantity);
    });
    return cart;
}