import { Transition } from '@headlessui/react';
import { useEffect, useRef, useState } from 'react';
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

const Carousel: React.FC<TCarousel> = ({
  arrImgSrc,
  autoPlay = false,
  className,
  ...divProps
}) => {
  const refCarousel = useRef<null | HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const setArrImgSrc = useSetRecoilState(arrImgSrcState);
  const setAutoPlayPage = useSetRecoilState(autoPlayPageState);

  useIsomorphicLayoutEffect(() => {
    setArrImgSrc(arrImgSrc);
    setAutoPlayPage(autoPlay);
  }, [setArrImgSrc, setAutoPlayPage, arrImgSrc, autoPlay]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useOnClickOutSide(refCarousel, () => setAutoPlayPage(true));

  return (
    <Transition
      {...divProps}
      as="div"
      ref={refCarousel}
      onClick={() => setAutoPlayPage(false)}
      className={`relative ${className}`}
      show={isVisible}
      enter="transition-[transform,opacity] duration-[1200ms] ease-out"
      enterFrom="scale-0 opacity-0"
      enterTo="scale-1 opacity-100"
    >
      <CarouselDisplay />
      <CarouselControl />
    </Transition>
  );
};

export default Carousel;
