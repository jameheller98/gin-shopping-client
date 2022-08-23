import Image from 'next/image';
import { TouchEvent, useEffect, useLayoutEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  autoPlayPageState,
  touchablePageState,
} from '../../../state/carousel/carouselAtoms';
import {
  animationPageState,
  arrImgSrcCloneState,
  movePageState,
  sizePageState,
} from '../../../state/carousel/carouselSelectors';

export type TCarouselDisplay = {} & React.ComponentPropsWithoutRef<'div'>;

const CarouselDisplay: React.FC<TCarouselDisplay> = ({
  className,
  ...divProps
}) => {
  const carouselWrapperItemsRef = useRef<null | HTMLDivElement>(null);
  const cloneArrImgSrc = useRecoilValue(arrImgSrcCloneState);
  const [{ pageSelected: currentPage }, setMovePage] =
    useRecoilState(movePageState);
  const [{ animatePage, transitionPage }, setAnimationPage] =
    useRecoilState(animationPageState);
  const sizePage = useRecoilValue(sizePageState);
  const [touchablePage, setTouchablePage] = useRecoilState(touchablePageState);
  useRecoilState(touchablePageState);
  const setAutoPlayPage = useSetRecoilState(autoPlayPageState);
  const currentCarouselWrapper = carouselWrapperItemsRef.current;
  const widthCarouselWrapper =
    currentCarouselWrapper?.getBoundingClientRect().width;
  const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    if (currentCarouselWrapper && widthCarouselWrapper) {
      currentCarouselWrapper.style.transitionDuration = `${animatePage}ms`;

      if (transitionPage && currentPage === sizePage) {
        currentCarouselWrapper.style.transform = `translateX(-${
          widthCarouselWrapper * 0
        }px)`;
      } else if (transitionPage && currentPage === 1) {
        currentCarouselWrapper.style.transform = `translateX(-${
          widthCarouselWrapper * (sizePage + 1)
        }px)`;
      } else if (!transitionPage) {
        currentCarouselWrapper.style.transform = `translateX(-${
          widthCarouselWrapper * currentPage
        }px)`;
      }
    }
  }, [currentPage, sizePage, animatePage, transitionPage]);

  const handleTransitionEnd = () => {
    if (
      (transitionPage && currentPage === sizePage) ||
      (transitionPage && currentPage === 1)
    ) {
      setAnimationPage({ animatePage: 0, transitionPage: false });
    }
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    setTouchablePage((touchablePage) => ({
      ...touchablePage,
      touchable: true,
      posStartTouch: event.touches[0].clientX,
    }));
    setAutoPlayPage(false);
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    if (
      currentCarouselWrapper &&
      widthCarouselWrapper &&
      touchablePage.touchable
    ) {
      currentCarouselWrapper.style.transitionDuration = `0ms`;
      currentCarouselWrapper.style.transform = `translateX(-${
        widthCarouselWrapper * currentPage +
        (touchablePage.posStartTouch - event.touches[0].clientX)
      }px)`;

      setTouchablePage((touchablePage) => ({
        ...touchablePage,
        stepMove: touchablePage.posStartTouch - event.touches[0].clientX,
      }));
    }
  };

  const handleTouchEnd = () => {
    if (widthCarouselWrapper && currentCarouselWrapper) {
      if (touchablePage.stepMove > widthCarouselWrapper / 4) {
        setMovePage((movePage) => ({
          ...movePage,
          typeMovePage: 'nextPage',
        }));
      } else if (touchablePage.stepMove < -widthCarouselWrapper / 4) {
        setMovePage((movePage) => ({
          ...movePage,
          typeMovePage: 'prevPage',
        }));
      } else {
        currentCarouselWrapper.style.transitionDuration = `700ms`;
        currentCarouselWrapper.style.transform = `translateX(-${
          widthCarouselWrapper * currentPage
        }px)`;
      }
    }

    setTouchablePage((touchablePage) => ({
      ...touchablePage,
      touchable: false,
    }));
  };

  return (
    <div {...divProps} className={`overflow-hidden w-screen ${className}`}>
      <div
        ref={carouselWrapperItemsRef}
        className="h-full w-full flex flex-nowrap flex-row transition-transform"
        onTransitionEnd={handleTransitionEnd}
        onTouchStart={(event) => handleTouchStart(event)}
        onTouchMove={(event) => handleTouchMove(event)}
        onTouchEnd={handleTouchEnd}
      >
        {cloneArrImgSrc.map((imgSrc, idx) => (
          <div className="flex items-center h-full w-full shrink-0" key={idx}>
            <Image
              src={imgSrc}
              width={720}
              height={480}
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
