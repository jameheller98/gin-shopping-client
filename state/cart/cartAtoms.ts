import { atom } from 'recoil';
import { IProductData, IProductSize } from '../../libs/product/interfaces';

export type TCartState = { size: IProductSize; amount: number } & Omit<
  IProductData,
  'sizeIds'
>;

const cartState = atom<TCartState[]>({
  key: 'CartState',
  default: [],
});

export { cartState };
