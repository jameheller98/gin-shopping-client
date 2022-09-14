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
  set: ({ set }, newValue) => {
    const { typeHandle, cartList } = newValue as ICartManagerState;

    if (typeHandle) {
      switch (typeHandle) {
        case 'addOne':
          return set(cartState, (cart) => {
            const cartExistIndex = cart.findIndex(
              (item) =>
                item.id === cartList[0].id &&
                item.size.id === cartList[0].size.id
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
          return set(cartState, (cart) => {
            const cartExistIndex = cart.findIndex(
              (item) =>
                item.id === cartList[0].id &&
                item.size.id === cartList[0].size.id
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

            return cart.filter(
              (item) =>
                item.id !== cartList[0].id ||
                item.size.id !== cartList[0].size.id
            );
          });
        case 'removeItem':
          return set(cartState, (cart) => {
            return cart.filter(
              (item) =>
                item.id !== cartList[0].id ||
                item.size.id !== cartList[0].size.id
            );
          });
        case 'removeAll':
          return set(cartState, []);
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
