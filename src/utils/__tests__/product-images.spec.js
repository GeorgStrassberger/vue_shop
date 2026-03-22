import { describe, expect, it } from 'vitest'
import {
  buildProductImageUrl,
  createRandomProductImage,
  resolveProductImage,
} from '../product-images'

describe('product image helpers', () => {
  it('builds a seeded picsum url', () => {
    expect(buildProductImageUrl('Mein Produkt')).toBe(
      'https://picsum.photos/seed/Mein%20Produkt/600/400',
    )
  })

  it('keeps explicit image urls', () => {
    expect(
      resolveProductImage({
        id: 'product-1',
        imageUrl: ' https://example.com/product.jpg ',
      }),
    ).toBe('https://example.com/product.jpg')
  })

  it('falls back to a seeded image when no image is stored', () => {
    expect(
      resolveProductImage({
        id: 'product-1',
        title: 'Testprodukt',
      }),
    ).toBe('https://picsum.photos/seed/product-1/600/400')
  })

  it('creates a random fallback image url', () => {
    expect(createRandomProductImage()).toMatch(
      /^https:\/\/picsum\.photos\/seed\/.+\/600\/400$/,
    )
  })
})
