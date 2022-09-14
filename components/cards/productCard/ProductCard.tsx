import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { TProductDetail } from '../../../pages/product/[sex]/[cat]/[productId]';
import { cartManagerState } from '../../../state/cart/cartSelectors';
import { stockOrderIdState } from '../../../state/product/productAtoms';
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
    <div {...divProps} className={`flex flex-col items-center ${className}`}>
      <ProductCardTitle name={name} price={price} />
      <div className="flex mt-4 rounded-3xl overflow-hidden">
        <Image src={imgSrc[0]} alt={imgSrc[0]} width="350" height="525" />
      </div>
      <ProductCardSize
        productId={id}
        productSizes={productSizes}
        productStock={productStock}
        handleOrderSize={handleOrderSize}
        className="self-start"
      />
      <button
        className={`self-end py-4 px-10 mt-10 text-slate-50 rounded-xl tracking-wide flex flex-row gap-2 items-center justify-center ${
          stockOrderId ? 'opacity-100 bg-slate-800' : 'opacity-30 bg-slate-400'
        }`}
        disabled={!stockOrderId}
        onClick={handleAddProduct}
      >
        <span>Add to cart</span>
        <ShoppingCartIcon className="w-5 inline-block" />
      </button>
    </div>
  );
};

export default ProductCard;
