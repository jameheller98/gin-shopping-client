import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  cartManagerState,
  cartTotalState,
} from '../../../state/cart/cartSelectors';
import CartCheckout from './CartCheckout';
import CartList from './CartList';

export type TCart = {} & React.ComponentPropsWithoutRef<'div'>;

const Cart: React.FC<TCart> = ({ className, ...divProps }) => {
  const setCartManager = useSetRecoilState(cartManagerState);
  const cartTotal = useRecoilValue(cartTotalState);

  const handleRemoveAll = () => {
    setCartManager({ typeHandle: 'removeAll', cartList: [] });
  };
  return (
    <div
      {...divProps}
      className={`flex flex-col items-center relative ${className}`}
    >
      <h1 className="mb-2 text-xl tracking-wider">My cart</h1>
      {cartTotal > 0 && (
        <button
          className="absolute right-0 top-[5px] text-sm text-slate-600"
          onClick={handleRemoveAll}
        >
          Clear all
        </button>
      )}
      <CartList />
      <CartCheckout />
    </div>
  );
};

export default Cart;
