import { atom } from 'recoil';
import { IImage } from '../../components/utilities/carousel/Carousel';

const arrImageState = atom<IImage[]>({
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

export {
  arrImageState,
  currentPageState,
  animatePageState,
  transitionPageState,
};
