import { TCarousel } from './Carousel';

const base: TCarousel = {
  arrImage: [
    {
      src: '/home/slide/man-suit.jpg',
      height: 1323,
      width: 880,
      objectPosition: '',
    },
    {
      src: '/home/slide/girl-flower-shirt.png',
      height: 1920,
      width: 1280,
      objectPosition: '0 -60px',
    },
    {
      src: '/home/slide/woman-halter-top-vertical.jpg',
      height: 3648,
      width: 2432,
      objectPosition: '0 -110px',
    },
  ],
};

export const mockCarouselProps = {
  base,
};
