import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/outline';
import { useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { TCartState } from '../../../state/cart/cartAtoms';
import { cartManagerState } from '../../../state/cart/cartSelectors';

export type TCartCardContent = {
  cart: TCartState;
} & React.ComponentPropsWithoutRef<'section'>;

const CartCardContent: React.FC<TCartCardContent> = ({
  cart,
  className,
  ...sectionProps
}) => {
  const formatCurrency = useRef(
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      currencyDisplay: 'narrowSymbol',
    })
  );
  const { amount, name, price, size } = cart;
  const setCartManager = useSetRecoilState(cartManagerState);

  const handleIncreaseAmount = () => {
    setCartManager({
      typeHandle: 'addOne',
      cartList: [{ ...cart, amount: 1 }],
    });
  };

  const handleDecreaseAmount = () => {
    setCartManager({
      typeHandle: 'removeOne',
      cartList: [{ ...cart, amount: 1 }],
    });
  };

  const handleRemoveItem = () => {
    setCartManager({
      typeHandle: 'removeItem',
      cartList: [cart],
    });
  };

  return (
    <section
      {...sectionProps}
      className={`flex flex-col gap-2 tracking-wide ${className}`}
    >
      <h1 className="text-slate-800 font-bold text-lg">{name}</h1>
      <span className="text-slate-400 font-semibold">Size: {size.value}</span>
      <h2 className="text-slate-800 font-bold text-lg">
        {formatCurrency.current.format(price)}
      </h2>
      <div className="flex justify-center items-center gap-4 font-bold text-lg mt-3 self-start">
        <button
          className="w-5 h-5 border-2 border-slate-600 rounded-md"
          aria-label="increment"
          onClick={handleDecreaseAmount}
        >
          <MinusIcon className="w-[14px] text-slate-700 m-auto" />
        </button>
        <span>{amount}</span>
        <button
          className="w-5 h-5 border-2 border-slate-600 rounded-md"
          aria-label="decrement"
          onClick={handleIncreaseAmount}
        >
          <PlusIcon className="w-[14px] text-slate-700 m-auto" />
        </button>
        <button aria-label="trash" onClick={handleRemoveItem}>
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default CartCardContent;
