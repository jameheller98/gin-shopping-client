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
  keyCarousel: string;
  arrImgSrc: string[];
  width: number;
  height: number;
  autoPlay?: boolean;
  numberItems?: number;
  distanceBetweenImgs?: number;
  ratioDisplayImgBothSide?: number;
  sensitivityTouchAnimateSlide?: number;
} & React.ComponentPropsWithoutRef<'div'>;

const Carousel: React.FC<TCarousel> = ({
  keyCarousel,
  arrImgSrc,
  width,
  height,
  autoPlay = true,
  numberItems = 1,
  distanceBetweenImgs = 8,
  ratioDisplayImgBothSide = 0.2,
  sensitivityTouchAnimateSlide = 20,
  className,
  ...divProps
}) => {
  const refCarousel = useRef<null | HTMLDivElement>(null);
  const timeOutAutoPlay = useRef<NodeJS.Timeout>();
  const setArrImgSrc = useSetRecoilState(arrImgSrcState);
  const setAutoPlayPage = useSetRecoilState(autoPlayPageState);

  useIsomorphicLayoutEffect(() => {
    setArrImgSrc(arrImgSrc);

    timeOutAutoPlay.current = setTimeout(() => setAutoPlayPage(autoPlay), 1500);

    return () => clearTimeout(timeOutAutoPlay.current);
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
        keyCarousel={keyCarousel}
        width={width}
        height={height}
        numberItems={numberItems}
        distanceBetweenImgs={distanceBetweenImgs}
        ratioDisplayImgBothSide={ratioDisplayImgBothSide}
        sensitivityTouchAnimateSlide={sensitivityTouchAnimateSlide}
      />
      <CarouselControl keyCarousel={keyCarousel} />
    </div>
  );
};

export default Carousel;
