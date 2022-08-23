import { atom } from 'recoil';

const arrImgSrcState = atom<string[]>({
  key: 'ArrImgSrc',
  default: [],
});

const currentPageState = atom({
  key: 'CurrentPage',
  default: 1,
});

const animatePageState = atom({
  key: 'AnimatePage',
  default: 0,
});

const transitionPageState = atom({
  key: 'TransitionPage',
  default: false,
});

const autoPlayPageState = atom({
  key: 'AutoPlayPage',
  default: false,
});

export {
  arrImgSrcState,
  currentPageState,
  animatePageState,
  transitionPageState,
  autoPlayPageState,
};
