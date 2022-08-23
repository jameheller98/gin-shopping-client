import { selector } from 'recoil';
import { arrImgSrcState } from './carouselAtoms';

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

export { arrImgSrcCloneState, sizePageState };
