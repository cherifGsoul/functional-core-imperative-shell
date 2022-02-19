import {Cart, listProducts, newCart} from "./core";
import {Cart as CartModel, Prisma} from "@prisma/client";
import prisma from "./prisma";

export const saveCart = async (cart: Cart): Promise<void> => {
    const { id } = cart;
    const data = {id, products: listProducts(cart)}
    await prisma.cart.upsert({ where: {id: cart.id},  create: data, update: data });
};

export const getCart = async (id: string): Promise<Cart> => {
    const record: CartModel | null = await prisma.cart.findUnique({where: {id}});
    if (!record) {
        new Error('Cart can not be found');
    }
    const cart: Cart = newCart();
    cart.id = id;
    const products = record?.products as Array<any>;
    products.forEach((product: any) => {
        cart.products.set(product.product, product.quantity);
    });
    return cart;
}