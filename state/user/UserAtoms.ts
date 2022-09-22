import { atom } from 'recoil';
import ApiUser from '../../libs/api/ApiUser';
import { UserResponse } from '../../libs/user/interfaces';

const tokenState = atom({
  key: 'TokenState',
  default: { token: '', tokenRefresh: '' },
  effects: [
    ({ onSet, setSelf }) => {
      if (typeof window !== 'undefined') {
        const tokenState = localStorage.getItem('tokenState');

        if (tokenState) {
          setSelf(JSON.parse(tokenState));
        }

        onSet((newTokenState, _, isReset) => {
          isReset
            ? localStorage.removeItem('tokenState')
            : localStorage.setItem('tokenState', JSON.stringify(newTokenState));
        });
      }
    },
  ],
});

const userState = atom<UserResponse | null>({
  key: 'UserState',
  default: null,
  effects: [
    ({ onSet, setSelf, trigger }) => {
      if (trigger === 'get') setSelf(ApiUser.getUser());

      onSet((userState, _, isReset) => {
        isReset
          ? localStorage.removeItem('userState')
          : localStorage.setItem('userState', JSON.stringify(userState));
      });
    },
  ],
});

export { tokenState, userState };
