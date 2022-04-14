import { NextIdentity, SaveCart } from "../../core/cart-repository"
import { Cart } from "../../core/types"

export const newCart = (nextIdentity: NextIdentity, saveCart: SaveCart) => {
    return async () => {
        const cart = Cart.newCart(nextIdentity())
        await saveCart(cart)
        return cart;
    }
}