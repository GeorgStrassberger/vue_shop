export const actions = {
  addItemToCart({ commit }, payload) {
    commit('addCartItem', {
      productId: payload.productId,
    })
  },
}
