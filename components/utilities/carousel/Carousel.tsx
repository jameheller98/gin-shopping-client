import { useLayoutEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { arrImageState } from '../../../state/carousel/carouselAtoms';
import CarouselControl from './CarouselControl';
import CarouselDisplay from './CarouselDisplay';

export interface IImage {
  src: string;
  width: number;
  height: number;
  objectPosition: string;
}

export type TCarousel = {
  arrImage: IImage[];
} & React.ComponentPropsWithoutRef<'div'>;

const Carousel: React.FC<TCarousel> = ({
  arrImage,
  className,
  ...divProps
}) => {
  const setArrImage = useSetRecoilState(arrImageState);

  useLayoutEffect(() => {
    setArrImage(arrImage);
  }, [setArrImage, arrImage]);

  return (
    <div {...divProps} className={`relative ${className}`}>
      <CarouselDisplay />
      <CarouselControl />
    </div>
  );
};

export default Carousel;
