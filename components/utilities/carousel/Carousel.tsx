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
  autoPlay?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

let setTimeOutAutoPlay: NodeJS.Timeout;

const Carousel: React.FC<TCarousel> = ({
  arrImgSrc,
  autoPlay = false,
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

  useOnClickOutSide(refCarousel, () => setAutoPlayPage(true));

  return (
    <div
      {...divProps}
      ref={refCarousel}
      onClick={() => setAutoPlayPage(false)}
      className={`relative ${className}`}
    >
      <CarouselDisplay />
      <CarouselControl />
    </div>
  );
};

export default Carousel;
