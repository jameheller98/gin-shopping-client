import { selector } from 'recoil';
import { arrImageState } from './carouselAtoms';

const arrImageCloneState = selector({
  key: 'ArrImgSrcClone',
  get: ({ get }) => {
    const arrImage = get(arrImageState);

    return arrImage.length > 0
      ? [arrImage[arrImage.length - 1], ...arrImage, arrImage[0]]
      : [];
  },
});

const sizePageState = selector({
  key: 'SizePage',
  get: ({ get }) => {
    const arrImage = get(arrImageState);

    return arrImage.length;
  },
});

export { arrImageCloneState, sizePageState };
