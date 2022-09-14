import { atomFamily } from 'recoil';

const stockOrderIdState = atomFamily<string, string>({
  key: 'StockOrderIdState',
  default: '',
});

export { stockOrderIdState };
