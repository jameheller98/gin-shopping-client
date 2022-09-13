import { atomFamily } from 'recoil';

const openDrawerState = atomFamily({
  key: 'OpenDrawer',
  default: false,
});

export { openDrawerState };
