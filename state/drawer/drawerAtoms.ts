import { atom } from 'recoil';

const openDrawerState = atom({
  key: 'OpenDrawer',
  default: false,
});

export { openDrawerState };
