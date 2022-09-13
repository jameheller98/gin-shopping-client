import { TProductCard } from './ProductCard';

const base: TProductCard = {
  product: {
    id: '1',
    name: 'T-shirt a',
    imgSrc: ['/product/gallery/product-1.jpg'],
    sex: 'unisex',
    cat: 't-shirts',
    price: 200000,
    sizeIds: ['1', '2', '3'],
  },
  productSizes: [
    {
      id: '1',
      value: 30,
      sex: 'male',
      avgHeight: 165,
      avgWeight: 5000,
    },
    {
      id: '2',
      value: 31,
      sex: 'male',
      avgHeight: 175,
      avgWeight: 5500,
    },
    {
      id: '3',
      value: 32,
      sex: 'male',
      avgHeight: 175,
      avgWeight: 6200,
    },
  ],
};

export const mockProductCardProps = {
  base,
};
