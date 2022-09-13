import { atomFamily } from 'recoil';
import { IProductSize } from '../../libs/product/interfaces';

const productOrderState = atomFamily<
  { sizeId: IProductSize['id'] } | null,
  string
>({
  key: 'ProductOrderState',
  default: null,
});

export { productOrderState };
