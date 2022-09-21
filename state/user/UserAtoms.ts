import { atom } from 'recoil';

const localStorage = typeof window !== `undefined` ? window.localStorage : null;

const tokenState = atom({
  key: 'TokenState',
  default: '',
  effects: [
    ({ onSet, setSelf }) => {
      const token = localStorage?.getItem('token');

      if (token) {
        setSelf(token);
      }

      onSet((newCartState, _, isReset) => {
        isReset
          ? localStorage?.removeItem('token')
          : localStorage?.setItem('token', newCartState);
      });
    },
  ],
});

export { tokenState };
