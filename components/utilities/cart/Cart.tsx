import CartCheckout from './CartCheckout';
import CartList from './CartList';

export type TCart = {} & React.ComponentPropsWithoutRef<'div'>;

const Cart: React.FC<TCart> = ({ className, ...divProps }) => {
  return (
    <div {...divProps} className={`flex flex-col items-center ${className}`}>
      <h1 className="mb-2 text-xl tracking-wider">My cart</h1>
      <CartList />
      <CartCheckout />
    </div>
  );
};

export default Cart;
