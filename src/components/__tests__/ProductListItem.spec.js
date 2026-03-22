import { RouterLinkStub, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ProductListItem from '../shop/ProductListItem.vue'
import { buildProductImageUrl } from '@/utils/product-images'

const product = {
  id: 'product-1',
  title: 'Testprodukt',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod magna ut sem suscipit.',
  price: 49,
}

describe('ProductListItem', () => {
  it('truncates long descriptions in the card', () => {
    const wrapper = mount(ProductListItem, {
      props: { product },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    expect(wrapper.text()).toContain(`${product.description.slice(0, 80)}...`)
  })

  it('links to the detail route by route name', () => {
    const wrapper = mount(ProductListItem, {
      props: { product },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    expect(wrapper.getComponent(RouterLinkStub).props('to')).toEqual({
      name: 'ReadProduct',
      params: { id: product.id },
    })
  })

  it('emits an add-to-cart event with the product id', async () => {
    const wrapper = mount(ProductListItem, {
      props: { product },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    await wrapper.get('button').trigger('click')

    expect(wrapper.emitted('add-to-cart')).toEqual([[product.id]])
  })

  it('uses the stored product image when available', () => {
    const wrapper = mount(ProductListItem, {
      props: {
        product: {
          ...product,
          imageUrl: 'https://example.com/product.jpg',
        },
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    expect(wrapper.get('img').attributes('src')).toBe('https://example.com/product.jpg')
  })

  it('falls back to a seeded image when no image was stored', () => {
    const wrapper = mount(ProductListItem, {
      props: { product },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    expect(wrapper.get('img').attributes('src')).toBe(buildProductImageUrl(product.id))
  })
})
