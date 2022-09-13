import { TSexGallery } from './SexGallery';

const base: TSexGallery = {
  listProduct: [
    {
      id: '1',
      name: 'T-shirt a',
      imgSrc: ['/product/gallery/product-1.jpg'],
      sex: 'unisex',
      cat: 't-shirts',
      price: 200000,
      sizeIds: ['1', '2', '3'],
    },
    {
      id: '2',
      name: 'Shirt a',
      imgSrc: ['/product/gallery/product-2.jpg'],
      sex: 'men',
      cat: 'shirts',
      price: 180000,
      sizeIds: ['1', '2'],
    },
  ],
};

export const mockSexGalleryProps = {
  base,
};
