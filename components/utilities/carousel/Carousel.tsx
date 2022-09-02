import { useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import {
  arrImgSrcState,
  autoPlayPageState,
} from '../../../state/carousel/carouselAtoms';
import useIsomorphicLayoutEffect from '../../../state/hooks/useIsomorphicLayoutEffect';
import useOnClickOutSide from '../../../state/hooks/useOnClickOutSide';
import CarouselControl from './CarouselControl';
import CarouselDisplay from './CarouselDisplay';

export type TCarousel = {
  arrImgSrc: string[];
  width: number;
  height: number;
  autoPlay?: boolean;
  numberItems?: number;
  distanceBetweenImgs?: number;
  ratioDisplayImgBothSide?: number;
} & React.ComponentPropsWithoutRef<'div'>;

let setTimeOutAutoPlay: NodeJS.Timeout;

const Carousel: React.FC<TCarousel> = ({
  arrImgSrc,
  width,
  height,
  autoPlay = false,
  numberItems = 1,
  distanceBetweenImgs = 8,
  ratioDisplayImgBothSide = 0.25,
  className,
  ...divProps
}) => {
  const refCarousel = useRef<null | HTMLDivElement>(null);
  const setArrImgSrc = useSetRecoilState(arrImgSrcState);
  const setAutoPlayPage = useSetRecoilState(autoPlayPageState);

  useIsomorphicLayoutEffect(() => {
    setArrImgSrc(arrImgSrc);

    setTimeOutAutoPlay = setTimeout(() => setAutoPlayPage(autoPlay), 1500);

    return () => clearTimeout(setTimeOutAutoPlay);
  }, [setArrImgSrc, setAutoPlayPage, arrImgSrc, autoPlay]);

  useOnClickOutSide(refCarousel, () => autoPlay && setAutoPlayPage(true));

  return (
    <div
      {...divProps}
      ref={refCarousel}
      onClick={() => autoPlay && setAutoPlayPage(false)}
      className={`relative ${className}`}
    >
      <CarouselDisplay
        width={width}
        height={height}
        numberItems={numberItems}
        distanceBetweenImgs={distanceBetweenImgs}
        ratioDisplayImgBothSide={ratioDisplayImgBothSide}
      />
      <CarouselControl />
    </div>
  );
};

export default Carousel;
