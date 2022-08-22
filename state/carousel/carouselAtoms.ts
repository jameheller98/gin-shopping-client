import { atom } from 'recoil';
import { mockCarouselProps } from '../../components/utilities/carousel/Carousel.mocks';

const currentPageState = atom({
  key: 'CurrentPage',
  default: 1,
});

const sizePageState = atom({
  key: 'SizePageState',
  default: mockCarouselProps.base.arrImgSrc.length,
});

export { currentPageState, sizePageState };
