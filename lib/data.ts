export const images = [
  {
    id: '01',
    src: 'https://www.logitech.com/content/dam/logitech/en/products/keyboards/mx-keys/gallery/deu-mx-keys-gallery-npr-graphite-front.png',
    alt: 'MX Keys',
  },
  {
    id: '02',
    src: 'https://images.unsplash.com/photo-1451290337906-ac938fc89bce?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1777&q=80',
    alt: 'Awesome watch',
  },
]

export const products = [
  {
    id: '1',
    name: 'Logitech MX Keys',
    currency: 'GBP',
    price: 119,
    salePrice: 0,
    flag: 'new',
    imageUrl:
      'https://www.logitech.com/content/dam/logitech/en/products/keyboards/mx-keys/gallery/deu-mx-keys-gallery-npr-graphite-front.png',
    rating: 4,
    ratingCount: 1,
    description:
      'With a sleek design and a captivating essence, this is a modern Classic made for every occasion.',
    images,
    buyUrl: 'https://www.amazon.co.uk/Logitech-Advanced-Illuminated-Bluetooth-Responsive/dp/B07W6HXZ5J?th=1',
    marketplace: 'Amazon',
    verifiedColorMatch: true
  },
  {
    id: '2',
    name: 'Argon one case',
    currency: 'GBP',
    price: 24,
    imageUrl:
      'https://www.argon40.com/media/catalog/product/cache/d7d910e7f6926dd872bf6562e2701fb7/a/r/ar1_m.2_03.jpg',
    rating: 4,
    ratingCount: 12,
    description:
      'With a sleek design and a captivating essence, this is a modern Classic made for every occasion.',
    images,
    buyUrl: 'https://shop.pimoroni.com/products/argon-one-m-2-case-for-raspberry-pi-4',
    marketplace: 'Pimoroni',
    verifiedColorMatch: true
  }
]

export type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<
  infer ElementType
>
  ? ElementType
  : never

export type Product = ElementType<typeof products>
export type ProductImage = ElementType<typeof images>