import { GetCart, SaveCart } from "../../core/cart-repository";
import { Cart } from "../../core/types";

export const addProduct = (getCart: GetCart, saveCart: SaveCart) => {
    return async (cartId: string, product: string) => {
        let cart = await getCart(cartId)
        cart = Cart.addProduct(product, cart)
        await saveCart(cart)
    }
}