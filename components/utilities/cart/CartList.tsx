import Link from 'next/link';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { cartManagerState } from '../../../state/cart/cartSelectors';
import { openDrawerState } from '../../../state/drawer/drawerAtoms';
import CartCard from '../../cards/cartCard/CartCard';

export type TCartList = {} & React.ComponentPropsWithoutRef<'div'>;

const CartList: React.FC<TCartList> = ({ className, ...divProps }) => {
  const { cartList } = useRecoilValue(cartManagerState);
  const setOpenDrawerCart = useSetRecoilState(openDrawerState('cartSideBar'));

  return (
    <div {...divProps} className={`h-[55vh] overflow-auto ${className}`}>
      {cartList?.map((cart, index) => (
        <CartCard key={index} cart={cart} className="my-4" />
      ))}
      {cartList.length === 0 && (
        <div className="text-3xl h-full flex items-center p-5 text-center">
          <h1>
            <span> No item available</span>
            <br />
            <Link href="/product">
              <a
                className="block mt-5 text-lg w-[fit-content] m-auto text-blue-300"
                onClick={() => setOpenDrawerCart(false)}
              >
                Shopping now
              </a>
            </Link>
          </h1>
        </div>
      )}
    </div>
  );
};

export default CartList;
