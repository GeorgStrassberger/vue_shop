import { describe, expect, it } from 'vitest'
import { getters } from '../cart/getters'
import { mutations } from '../cart/mutations'

describe('cart store', () => {
  it('increments quantity when the same product is added twice', () => {
    const state = {
      cartItems: [],
    }

    mutations.addCartItem(state, { productId: 'product-1' })
    mutations.addCartItem(state, { productId: 'product-1' })

    expect(state.cartItems).toEqual([{ productId: 'product-1', quantity: 2 }])
  })

  it('calculates cart count and total from quantities', () => {
    const state = {
      cartItems: [
        { productId: 'product-1', quantity: 2 },
        { productId: 'product-2', quantity: 1 },
      ],
    }

    expect(getters.cartCount(state)).toBe(3)
    expect(
      getters.cartTotal(
        state,
        { cartItems: state.cartItems },
        null,
        {
          product: (productId) =>
            ({
              'product-1': { price: 10 },
              'product-2': { price: 5 },
            })[productId],
        },
      ),
    ).toBe(25)
  })
})
