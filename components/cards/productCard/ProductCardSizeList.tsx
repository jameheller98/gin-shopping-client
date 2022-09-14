import { IProductData } from '../../../libs/product/interfaces';
import { TProductDetail } from '../../../pages/product/[sex]/[cat]/[productId]';
import ProductCardSizeItem from './ProductCardSizeItem';

export type TProductCardSizeList = {
  productId: IProductData['id'];
  handleOrderSize: (_sizeId: string) => void;
} & Omit<TProductDetail, 'product'> &
  React.ComponentPropsWithoutRef<'ul'>;

const ProductCardSizeList: React.FC<TProductCardSizeList> = ({
  productId,
  productSizes,
  productStock,
  handleOrderSize,
  className,
  ...ulProps
}) => {
  return (
    <ul {...ulProps} className={`flex flex-row gap-3 mt-4 ${className}`}>
      {productSizes.map(({ value, id }) => {
        const stockDetail = productStock.find(
          (stock) => stock.productSizeId === id
        );

        return (
          stockDetail && (
            <ProductCardSizeItem
              key={id}
              value={value}
              productId={productId}
              stockDetail={stockDetail}
              handleOrderSize={handleOrderSize}
            />
          )
        );
      })}
    </ul>
  );
};

export default ProductCardSizeList;
