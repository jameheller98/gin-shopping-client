import { atom } from 'recoil';
import { IProductData, IProductSize } from '../../libs/product/interfaces';

export type TCartState = {
  size: IProductSize;
  amount: number;
  stockId: string;
  productId: string;
} & Omit<IProductData, 'sizeIds' | 'id'>;

const cartState = atom<TCartState[]>({
  key: 'CartState',
  default: [],
  effects: [
    ({ onSet, setSelf }) => {
      const cart = localStorage.getItem('cart');

      if (cart) {
        setSelf(JSON.parse(cart));
      }

      onSet((newCartState, _, isReset) => {
        isReset
          ? localStorage.removeItem('cart')
          : localStorage.setItem('cart', JSON.stringify(newCartState));
      });
    },
  ],
});

export { cartState };
