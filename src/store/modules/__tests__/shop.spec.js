import { describe, expect, it } from 'vitest'
import shopModule, { toProductsList } from '../shop'

describe('shop helpers', () => {
  it('returns an empty array for empty firebase payloads', () => {
    expect(toProductsList(null)).toEqual([])
  })

  it('maps firebase objects to product arrays with ids', () => {
    const products = toProductsList({
      abc: {
        title: 'Erstes Produkt',
        description: 'Beschreibung',
        price: 12,
        imageUrl: 'https://example.com/a.jpg',
      },
      def: { title: 'Zweites Produkt', description: 'Noch eine Beschreibung', price: 24 },
    })

    expect(products).toEqual([
      {
        id: 'abc',
        title: 'Erstes Produkt',
        description: 'Beschreibung',
        price: 12,
        imageUrl: 'https://example.com/a.jpg',
      },
      {
        id: 'def',
        title: 'Zweites Produkt',
        description: 'Noch eine Beschreibung',
        price: 24,
      },
    ])
  })

  it('fails early when no auth token is available', async () => {
    await expect(
      shopModule.actions.fetchProducts(
        {
          commit: () => {},
          state: {
            isLoading: false,
            products: [],
          },
          rootState: {
            auth: {
              token: null,
            },
          },
        },
      ),
    ).rejects.toThrow('Du bist nicht angemeldet.')
  })
})
