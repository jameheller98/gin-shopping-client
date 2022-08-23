import { useLayoutEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import {
  arrImgSrcState,
  autoPlayPageState,
} from '../../../state/carousel/carouselAtoms';
import { useOutSideClick } from '../../../state/common/commonHooks';
import CarouselControl from './CarouselControl';
import CarouselDisplay from './CarouselDisplay';

export type TCarousel = {
  arrImgSrc: string[];
  autoPlay?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

const Carousel: React.FC<TCarousel> = ({
  arrImgSrc,
  autoPlay = false,
  className,
  ...divProps
}) => {
  const setArrImgSrc = useSetRecoilState(arrImgSrcState);
  const setAutoPlayPage = useSetRecoilState(autoPlayPageState);
  const refDivEle = useOutSideClick(() => setAutoPlayPage(true));

  useLayoutEffect(() => {
    setArrImgSrc(arrImgSrc);
    setAutoPlayPage(autoPlay);
  }, [setArrImgSrc, setAutoPlayPage, arrImgSrc, autoPlay]);

  return (
    <div
      {...divProps}
      ref={refDivEle}
      onClick={() => setAutoPlayPage(false)}
      className={`relative ${className}`}
    >
      <CarouselDisplay />
      <CarouselControl />
    </div>
  );
};

export default Carousel;
