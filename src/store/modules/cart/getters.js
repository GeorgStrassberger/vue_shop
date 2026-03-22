export const getters = {
  cartItems: (state) => state.cartItems,
  cartCount: (state) =>
    state.cartItems.reduce((count, cartItem) => count + cartItem.quantity, 0),
  cartTotal: (_, getters, ___, rootGetters) => {
    const cartItems = getters.cartItems

    return cartItems.reduce((sum, cartItem) => {
      const product = rootGetters.product(cartItem.productId)
      return sum + (product?.price || 0) * cartItem.quantity
    }, 0)
  },
}
