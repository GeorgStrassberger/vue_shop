import { describe, expect, it } from 'vitest'
import router from '../index'

describe('router', () => {
  it('uses hash history so static hosting works without server rewrites', () => {
    expect(router.resolve('/shop').href).toContain('#')
  })

  it('resolves unknown routes to the not-found page', () => {
    expect(router.resolve('/gibt-es-nicht').name).toBe('NotFound')
  })
})
