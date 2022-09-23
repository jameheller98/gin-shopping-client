import { ReactNode } from 'react';
import { IProductData } from '../../../libs/product/interfaces';
import ProductGalleryGrid from './ProductGalleryGrid';

export type TProductGallery = {
  products: IProductData[];
  options?: {
    left?: ReactNode;
    right?: ReactNode;
  };
} & React.ComponentPropsWithoutRef<'div'>;

const ProductGallery: React.FC<TProductGallery> = ({
  className,
  products,
  options,
  ...divProps
}) => {
  return (
    <div
      {...divProps}
      className={`p-3 md:px-20 sm:px-10 lg:px-32 ${className}`}
    >
      <ProductGalleryGrid products={products} options={options} />
    </div>
  );
};

export default ProductGallery;
