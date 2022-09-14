import { selector } from 'recoil';
import { cartState, TCartState } from './cartAtoms';

interface ICartManagerState {
  typeHandle?: 'addOne' | 'removeOne' | 'removeItem' | 'removeAll';
  cartList: TCartState[];
}

const cartManagerState = selector<ICartManagerState>({
  key: 'CartManagerState',
  get: ({ get }) => {
    const cart = get(cartState);

    return { typeHandle: undefined, cartList: cart };
  },
  set: ({ set, get, reset }, newValue) => {
    const cart = get(cartState);
    const { typeHandle, cartList } = newValue as ICartManagerState;

    if (typeHandle) {
      switch (typeHandle) {
        case 'addOne':
          return set(cartState, (cart) => {
            const cartExistIndex = cart.findIndex(
              (item) => item.stockId === cartList[0].stockId
            );

            if (cartExistIndex > -1) {
              const cartExist = cart[cartExistIndex];

              return [
                ...cart.slice(0, cartExistIndex),
                {
                  ...cartExist,
                  amount: cartExist.amount + cartList[0].amount,
                },
                ...cart.slice(cartExistIndex + 1),
              ];
            }

            return [...cart, ...cartList];
          });
        case 'removeOne':
          if (cart.length <= 1 && cart[0].amount <= 1) return reset(cartState);

          return set(cartState, (cart) => {
            const cartExistIndex = cart.findIndex(
              (item) => item.stockId === cartList[0].stockId
            );

            if (cartExistIndex > -1) {
              const cartExist = cart[cartExistIndex];

              if (cartExist.amount > 1)
                return [
                  ...cart.slice(0, cartExistIndex),
                  {
                    ...cartExist,
                    amount: cartExist.amount - cartList[0].amount,
                  },
                  ...cart.slice(cartExistIndex + 1),
                ];
            }

            return cart.filter((item) => item.stockId !== cartList[0].stockId);
          });
        case 'removeItem':
          if (cart.length <= 1) return reset(cartState);

          return set(cartState, (cart) => {
            return cart.filter((item) => item.stockId !== cartList[0].stockId);
          });
        case 'removeAll':
          return reset(cartState);
        default:
      }
    }
  },
});

const cartTotalState = selector({
  key: 'CartTotalState',
  get: ({ get }) => {
    const { cartList } = get(cartManagerState);

    return cartList.length;
  },
});

const cartTotalPriceState = selector({
  key: 'CartTotalPriceState',
  get: ({ get }) => {
    const { cartList } = get(cartManagerState);

    return cartList.reduce((acc, item) => {
      return acc + item.amount * item.price;
    }, 0.0);
  },
});

export { cartManagerState, cartTotalState, cartTotalPriceState };
