import * as types from './mutation-types'
export const mutations = {
  [types.ADD_CART_ITEM](state, payload) {
    const existingCartItem = state.cartItems.find(
      (cartItem) => cartItem.productId === payload.productId,
    )

    if (existingCartItem) {
      existingCartItem.quantity += 1
      return
    }

    state.cartItems.push({
      productId: payload.productId,
      quantity: 1,
    })
  },
}
