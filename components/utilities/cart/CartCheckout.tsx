import { useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { cartTotalPriceState } from '../../../state/cart/cartSelectors';
import CommonButton from '../../buttons/commonButton/CommonButton';

export type TCartCheckout = {} & React.ComponentPropsWithoutRef<'div'>;

const CartCheckout: React.FC<TCartCheckout> = ({ className, ...divProps }) => {
  const formatCurrency = useRef(
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      currencyDisplay: 'narrowSymbol',
    })
  );
  const cartTotalPrice = useRecoilValue(cartTotalPriceState);
  const shippingPrice = cartTotalPrice ? 10.5 : 0;

  return (
    <div
      {...divProps}
      className={`flex flex-col justify-between w-full h-[29vh] mt-3 ${className}`}
    >
      <div className="flex flex-col text-slate-500 font-medium gap-2">
        <div className="flex justify-between items-center">
          <h2 className="text-sm">Sub Total</h2>
          <span className="text-xl font-bold text-slate-900">
            {formatCurrency.current.format(cartTotalPrice)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <h3 className="text-sm">Shipping</h3>
          <span className="text-xl font-bold text-slate-900">
            {formatCurrency.current.format(shippingPrice)}
          </span>
        </div>
        <div className="flex justify-between items-center mt-3">
          <h1 className="text-sm">Total</h1>
          <span className="text-xl font-bold text-slate-900">
            {formatCurrency.current.format(cartTotalPrice + shippingPrice)}
          </span>
        </div>
      </div>
      <CommonButton className="w-full py-4 px-10" disabled={!cartTotalPrice}>
        Checkout
      </CommonButton>
    </div>
  );
};

export default CartCheckout;
