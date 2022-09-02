import { atom, atomFamily } from 'recoil';

const arrImgSrcState = atom<string[]>({
  key: 'ArrImgSrc',
  default: [],
});

const currentPageState = atomFamily({
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

const typeMovePageState = atom<'nextPage' | 'prevPage' | 'selectPage'>({
  key: 'TypeMovePage',
  default: 'selectPage',
});

const touchablePageState = atom({
  key: 'TouchablePage',
  default: { touchable: false, posStartTouch: 0, stepMove: 0 },
});

export {
  arrImgSrcState,
  currentPageState,
  animatePageState,
  transitionPageState,
  autoPlayPageState,
  typeMovePageState,
  touchablePageState,
};
