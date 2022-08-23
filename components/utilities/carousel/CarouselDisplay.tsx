import Image from 'next/image';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  animatePageState,
  currentPageState,
  transitionPageState,
} from '../../../state/carousel/carouselAtoms';
import {
  arrImgSrcCloneState,
  sizePageState,
} from '../../../state/carousel/carouselSelectors';

export type TCarouselDisplay = {} & React.ComponentPropsWithoutRef<'div'>;

const CarouselDisplay: React.FC<TCarouselDisplay> = ({
  className,
  ...divProps
}) => {
  const carouselDisplayRef = useRef<null | HTMLDivElement>(null);
  const carouselWrapperItemsRef = useRef<null | HTMLDivElement>(null);
  const cloneArrImgSrc = useRecoilValue(arrImgSrcCloneState);
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
  const [animatePage, setAnimatePage] = useRecoilState(animatePageState);
  const [transitionPage, setTransitionPage] =
    useRecoilState(transitionPageState);
  const sizePage = useRecoilValue(sizePageState);

  useLayoutEffect(() => {
    if (carouselWrapperItemsRef.current && carouselDisplayRef.current) {
      const widthCarouselDisplay =
        carouselDisplayRef.current.getBoundingClientRect().width;

      carouselWrapperItemsRef.current.style.transitionDuration = `${animatePage}ms`;

      if (transitionPage && currentPage === sizePage) {
        carouselWrapperItemsRef.current.style.transform = `translateX(-${
          widthCarouselDisplay * 0
        }px)`;
      } else if (transitionPage && currentPage === 1) {
        carouselWrapperItemsRef.current.style.transform = `translateX(-${
          widthCarouselDisplay * (sizePage + 1)
        }px)`;
      } else if (!transitionPage) {
        carouselWrapperItemsRef.current.style.transform = `translateX(-${
          widthCarouselDisplay * currentPage
        }px)`;
      }
    }
  }, [currentPage, animatePage, transitionPage, sizePage]);

  useEffect(() => {
    const currentCarouselDisplay = carouselWrapperItemsRef.current;

    const handleTransitionEnd = () => {
      if (transitionPage && currentPage === sizePage) {
        setAnimatePage(0);
        setTransitionPage(false);
      } else if (transitionPage && currentPage === 1) {
        setAnimatePage(0);
        setTransitionPage(false);
      }
    };

    currentCarouselDisplay?.addEventListener(
      'transitionend',
      handleTransitionEnd
    );

    return () => {
      currentCarouselDisplay?.removeEventListener(
        'transitionend',
        handleTransitionEnd
      );
    };
  }, [
    currentPage,
    transitionPage,
    sizePage,
    setCurrentPage,
    setAnimatePage,
    setTransitionPage,
  ]);

  return (
    <div
      ref={carouselDisplayRef}
      {...divProps}
      className={`overflow-hidden w-screen ${className}`}
    >
      <div
        ref={carouselWrapperItemsRef}
        className="flex flex-nowrap flex-row transition-transform"
      >
        {cloneArrImgSrc.map((imgSrc, idx) => (
          <div className="w-full shrink-0" key={idx}>
            <Image
              src={imgSrc}
              width={500}
              height={333}
              alt="Home logo"
              priority
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselDisplay;
