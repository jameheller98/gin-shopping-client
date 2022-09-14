import { TProductGallery } from './ProductGallery';

const base: TProductGallery = {
  products: [
    {
      id: '1',
      name: 'shirt',
      imgSrc: ['/product/gallery/product-1.jpg'],
      sex: 'unisex',
      cat: 't-shirts',
      price: 200000,
      sizeIds: ['1', '2', '3'],
    },
  ],
};

export const mockProductGalleryProps = {
  base,
};
