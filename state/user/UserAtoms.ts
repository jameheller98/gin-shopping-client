import { atom } from 'recoil';
import { UserResponse } from '../../libs/user/interfaces';

const localStorage = typeof window !== 'undefined' ? window.localStorage : null;

const tokenState = atom({
  key: 'TokenState',
  default: { token: '', tokenRefresh: '' },
  effects: [
    ({ onSet, setSelf }) => {
      const tokenState = localStorage?.getItem('tokenState');

      if (tokenState) {
        setSelf(JSON.parse(tokenState));
      }

      onSet((newTokenState, _, isReset) => {
        isReset
          ? localStorage?.removeItem('tokenState')
          : localStorage?.setItem('tokenState', JSON.stringify(newTokenState));
      });
    },
  ],
});

const userState = atom<UserResponse | null>({
  key: 'UserState',
  default: null,
});

export { tokenState, userState };
