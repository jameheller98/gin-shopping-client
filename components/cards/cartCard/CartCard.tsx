import Image from 'next/image';
import { TCartState } from '../../../state/cart/cartAtoms';
import CartCardContent from './CartCardContent';

export type TCartCard = {
  cart: TCartState;
} & React.ComponentPropsWithoutRef<'section'>;

const CartCard: React.FC<TCartCard> = ({
  cart,
  className,
  ...sectionProps
}) => {
  const { imgSrc } = cart;
  return (
    <section {...sectionProps} className={`flex flex-row gap-5 ${className}`}>
      <div className="rounded-xl overflow-hidden w-1/2 h-[24vh] md:h-[20vh] md:w-[150px]">
        <Image src={imgSrc[0]} alt={imgSrc[0]} width="350" height="525" />
      </div>
      <CartCardContent className="w-1/2" cart={cart} />
    </section>
  );
};

export default CartCard;
