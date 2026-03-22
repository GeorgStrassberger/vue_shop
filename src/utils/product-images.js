const DEFAULT_IMAGE_WIDTH = 600
const DEFAULT_IMAGE_HEIGHT = 400
const DEFAULT_IMAGE_SEED = 'vue-shop'

export const buildProductImageUrl = (
  seed = DEFAULT_IMAGE_SEED,
  width = DEFAULT_IMAGE_WIDTH,
  height = DEFAULT_IMAGE_HEIGHT,
) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed || DEFAULT_IMAGE_SEED)}/${width}/${height}`

export const createRandomProductImage = (
  width = DEFAULT_IMAGE_WIDTH,
  height = DEFAULT_IMAGE_HEIGHT,
) =>
  buildProductImageUrl(
    `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
    width,
    height,
  )

export const resolveProductImage = (
  product,
  width = DEFAULT_IMAGE_WIDTH,
  height = DEFAULT_IMAGE_HEIGHT,
) => {
  const explicitImageUrl = product?.imageUrl?.trim()

  if (explicitImageUrl) {
    return explicitImageUrl
  }

  return buildProductImageUrl(
    product?.id || product?.title?.trim() || DEFAULT_IMAGE_SEED,
    width,
    height,
  )
}
