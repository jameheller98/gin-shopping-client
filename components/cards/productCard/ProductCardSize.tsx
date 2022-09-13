import { IProductData } from '../../../libs/product/interfaces';
import { TProductDetail } from '../../../pages/product/[sex]/[cat]/[productId]';
import ProductCardSizeList from './ProductCardSizeList';

export type TProductCardSize = {
  productId: IProductData['id'];
  handleOrderSize: (_sizeId: string) => void;
} & Omit<TProductDetail, 'product'> &
  React.ComponentPropsWithoutRef<'section'>;

const ProductCardSize: React.FC<TProductCardSize> = ({
  productId,
  productSizes,
  productStock,
  handleOrderSize,
  className,
  ...sectionProps
}) => {
  return (
    <section {...sectionProps} className={`text-center ${className}`}>
      <h2 className="text-base text-left mt-6 mb-3 font-bold">Select size:</h2>
      <ProductCardSizeList
        productId={productId}
        productSizes={productSizes}
        productStock={productStock}
        handleOrderSize={handleOrderSize}
      />
    </section>
  );
};

export default ProductCardSize;
