import { selector, selectorFamily } from 'recoil';
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

const arrImgSrcCloneState = selectorFamily({
  key: 'ArrImgSrcClone',
  get:
    (amountClone: number) =>
    ({ get }) => {
      const arrImgSrc = get(arrImgSrcState);

      return arrImgSrc.length > 0
        ? [
            ...arrImgSrc.filter(
              (_, idx) => idx > arrImgSrc.length - amountClone - 1
            ),
            ...arrImgSrc,
            ...arrImgSrc.filter((_, idx) => idx < amountClone),
          ]
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

const movePageState = selectorFamily<IMovePageState, string>({
  key: 'MovePage',
  get:
    (keyCurrentPage) =>
    ({ get }) => {
      const currentPage = get(currentPageState(keyCurrentPage));
      const typeMovePage = get(typeMovePageState);

      return {
        typeMovePage,
        pageSelected: currentPage,
      };
    },
  set:
    (keyCurrentPage) =>
    ({ get, set }, newValue) => {
      const { typeMovePage, pageSelected = 1 } = newValue as IMovePageState;
      const sizePage = get(sizePageState);
      const currentPage = get(currentPageState(keyCurrentPage));

      set(animatePageState, 700);

      switch (typeMovePage) {
        case 'prevPage':
          set(transitionPageState, currentPage > 1 ? false : true);
          set(currentPageState(keyCurrentPage), (currentPage) =>
            currentPage > 1 ? currentPage - 1 : sizePage
          );
          set(typeMovePageState, 'prevPage');
          break;
        case 'nextPage':
          set(transitionPageState, currentPage < sizePage ? false : true);
          set(currentPageState(keyCurrentPage), (currentPage) =>
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
          set(currentPageState(keyCurrentPage), pageSelected);
          set(typeMovePageState, 'selectPage');
          break;
        default:
          set(transitionPageState, false);
          set(currentPageState(keyCurrentPage), currentPage);
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
