import { useRecoilValue } from 'recoil';
import { cartManagerState } from '../../../state/cart/cartSelectors';
import CartCard from '../../cards/cartCard/CartCard';

export type TCartList = {} & React.ComponentPropsWithoutRef<'div'>;

const CartList: React.FC<TCartList> = ({ className, ...divProps }) => {
  const { cartList } = useRecoilValue(cartManagerState);

  return (
    <div {...divProps} className={`h-[55vh] overflow-auto ${className}`}>
      {cartList.map((cart, index) => (
        <CartCard key={index} cart={cart} className="my-4" />
      ))}
    </div>
  );
};

export default CartList;
