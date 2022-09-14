import { TCartCard } from './CartCard';

const base: TCartCard = {
  cart: {
    stockId: '1',
    name: 'T-shirt a',
    imgSrc: ['/product/gallery/product-1.jpg'],
    sex: 'unisex',
    cat: 't-shirts',
    price: 200000,
    size: {
      id: '1',
      value: 30,
      sex: 'male',
      avgHeight: 165,
      avgWeight: 5000,
    },
    amount: 1,
    productId: '1',
  },
};

export const mockCartCardProps = {
  base,
};
