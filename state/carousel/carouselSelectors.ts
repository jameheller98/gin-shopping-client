import { selector } from 'recoil';
import {
  animatePageState,
  arrImgSrcState,
  currentPageState,
  transitionPageState,
  typeMovePageState,
} from './carouselAtoms';

interface IMovePageState {
  typeMovePage: 'prevPage' | 'nextPage' | 'selectPage';
  pageSelected: number;
}

interface IAnimationPageState {
  animatePage: number;
  transitionPage: boolean;
}

const arrImgSrcCloneState = selector({
  key: 'ArrImgSrcClone',
  get: ({ get }) => {
    const arrImgSrc = get(arrImgSrcState);

    return arrImgSrc.length > 0
      ? [arrImgSrc[arrImgSrc.length - 1], ...arrImgSrc, arrImgSrc[0]]
      : [];
  },
});

const sizePageState = selector({
  key: 'SizePage',
  get: ({ get }) => {
    const arrImgSrc = get(arrImgSrcState);

    return arrImgSrc.length;
  },
});

const movePageState = selector<IMovePageState>({
  key: 'MovePage',
  get: ({ get }) => {
    const currentPage = get(currentPageState);
    const typeMovePage = get(typeMovePageState);

    return {
      typeMovePage,
      pageSelected: currentPage,
    };
  },
  set: ({ get, set }, newValue) => {
    const { typeMovePage, pageSelected = 1 } = newValue as IMovePageState;
    const sizePage = get(sizePageState);
    const currentPage = get(currentPageState);

    set(animatePageState, 700);

    switch (typeMovePage) {
      case 'prevPage':
        set(transitionPageState, currentPage > 1 ? false : true);
        set(currentPageState, (currentPage) =>
          currentPage > 1 ? currentPage - 1 : sizePage
        );
        set(typeMovePageState, 'prevPage');
        break;
      case 'nextPage':
        set(transitionPageState, currentPage < sizePage ? false : true);
        set(currentPageState, (currentPage) =>
          currentPage < sizePage ? currentPage + 1 : 1
        );
        set(typeMovePageState, 'nextPage');
        break;
      case 'selectPage':
        set(
          transitionPageState,
          (currentPage === sizePage && pageSelected === 1) ||
            (currentPage === 1 && pageSelected === sizePage)
            ? true
            : false
        );
        set(currentPageState, pageSelected);
        set(typeMovePageState, 'selectPage');
        break;
      default:
        set(transitionPageState, false);
        set(currentPageState, currentPage);
        set(typeMovePageState, 'selectPage');
        break;
    }
  },
});

const animationPageState = selector({
  key: 'AnimationPageState',
  get: ({ get }) => {
    const animatePage = get(animatePageState);
    const transitionPage = get(transitionPageState);

    return {
      animatePage,
      transitionPage,
    };
  },
  set: ({ set }, newValue) => {
    const { animatePage, transitionPage } = newValue as IAnimationPageState;

    set(animatePageState, animatePage);
    set(transitionPageState, transitionPage);
  },
});

export {
  arrImgSrcCloneState,
  sizePageState,
  movePageState,
  animationPageState,
};
