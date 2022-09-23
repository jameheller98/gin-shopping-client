import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { TProductDetail } from '../../../pages/product/[sex]/[cat]/[productId]';
import { cartManagerState } from '../../../state/cart/cartSelectors';
import { stockOrderIdState } from '../../../state/product/productAtoms';
import CommonButton from '../../buttons/commonButton/CommonButton';
import ProductCardSize from './ProductCardSize';
import ProductCardTitle from './ProductCardTitle';

export type TProductCard = {} & Required<TProductDetail> &
  React.ComponentPropsWithoutRef<'div'>;

const ProductCard: React.FC<TProductCard> = ({
  product,
  productSizes,
  productStock,
  className,
  ...divProps
}) => {
  const { id, name, price, imgSrc } = product;
  const [stockOrderId, setStockOrderId] = useRecoilState(stockOrderIdState(id));
  const setCartManager = useSetRecoilState(cartManagerState);

  const handleOrderSize = (stockId: string) => {
    setStockOrderId(stockId);
  };

  const handleAddProduct = () => {
    // eslint-disable-next-line no-unused-vars
    const { sizeIds, id, ...restProduct } = product;
    const stock = productStock.find((stock) => stock.id === stockOrderId);
    const size = productSizes.find((size) => size.id === stock?.productSizeId);

    if (size && stock) {
      const productOrderOne = [
        {
          ...restProduct,
          size,
          amount: 1,
          stockId: stock.id,
          productId: id,
        },
      ];

      setCartManager({ typeHandle: 'addOne', cartList: productOrderOne });
      setStockOrderId('');
    }
  };

  return (
    <div
      {...divProps}
      className={`flex flex-col items-center md:grid md:grid-cols-2 md:grid-rows-[80px_100px_auto] md:gap-10 ${className}`}
    >
      <ProductCardTitle className="order-2" name={name} price={price} />
      <div className="flex mt-4 order-1 justify-center row-span-3">
        <div className="flex rounded-3xl overflow-hidden">
          <Image src={imgSrc[0]} alt={imgSrc[0]} width="350" height="525" />
        </div>
      </div>
      <ProductCardSize
        productId={id}
        productSizes={productSizes}
        productStock={productStock}
        handleOrderSize={handleOrderSize}
        className="self-start order-3"
      />
      <CommonButton
        className="self-end py-4 px-10 mt-10 order-4"
        disabled={!stockOrderId}
        onClick={handleAddProduct}
      >
        <span>Add to cart</span>
        <ShoppingCartIcon className="w-5 inline-block" />
      </CommonButton>
    </div>
  );
};

export default ProductCard;
