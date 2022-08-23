import Image from 'next/image';
import { useEffect, useLayoutEffect, useRef } from 'react';
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
  const carouselDisplayRef = useRef<null | HTMLDivElement>(null);
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
  const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    const currentCarouselDisplay = carouselDisplayRef.current;
    const currentCarouselWrapper = carouselWrapperItemsRef.current;

    if (currentCarouselWrapper && currentCarouselDisplay) {
      const widthCarouselDisplay =
        currentCarouselDisplay.getBoundingClientRect().width;

      currentCarouselWrapper.style.transitionDuration = `${animatePage}ms`;

      if (transitionPage && currentPage === sizePage) {
        currentCarouselWrapper.style.transform = `translateX(-${
          widthCarouselDisplay * 0
        }px)`;
      } else if (transitionPage && currentPage === 1) {
        currentCarouselWrapper.style.transform = `translateX(-${
          widthCarouselDisplay * (sizePage + 1)
        }px)`;
      } else if (!transitionPage) {
        currentCarouselWrapper.style.transform = `translateX(-${
          widthCarouselDisplay * currentPage
        }px)`;
      }
    }
  }, [currentPage, sizePage, animatePage, transitionPage]);

  useEffect(() => {
    const currentCarouselDisplay = carouselDisplayRef.current;
    const currentCarouselWrapper = carouselWrapperItemsRef.current;
    const widthCarouselDisplay =
      currentCarouselDisplay?.getBoundingClientRect().width;

    const handleTransitionEnd = () => {
      if (
        (transitionPage && currentPage === sizePage) ||
        (transitionPage && currentPage === 1)
      ) {
        setAnimationPage({ animatePage: 0, transitionPage: false });
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      setTouchablePage((touchablePage) => ({
        ...touchablePage,
        touchable: true,
        posStartTouch: event.touches[0].clientX,
      }));
      setAutoPlayPage(false);
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (
        currentCarouselWrapper &&
        widthCarouselDisplay &&
        touchablePage.touchable
      ) {
        currentCarouselWrapper.style.transitionDuration = `0ms`;
        currentCarouselWrapper.style.transform = `translateX(-${
          widthCarouselDisplay * currentPage +
          (touchablePage.posStartTouch - event.touches[0].clientX)
        }px)`;

        setTouchablePage((touchablePage) => ({
          ...touchablePage,
          stepMove: touchablePage.posStartTouch - event.touches[0].clientX,
        }));
      }
    };

    const handleTouchEnd = () => {
      if (widthCarouselDisplay && currentCarouselWrapper) {
        if (touchablePage.stepMove > widthCarouselDisplay / 4) {
          setMovePage((movePage) => ({
            ...movePage,
            typeMovePage: 'nextPage',
          }));
        } else if (touchablePage.stepMove < -widthCarouselDisplay / 4) {
          setMovePage((movePage) => ({
            ...movePage,
            typeMovePage: 'prevPage',
          }));
        } else {
          currentCarouselWrapper.style.transitionDuration = `700ms`;
          currentCarouselWrapper.style.transform = `translateX(-${
            widthCarouselDisplay * currentPage
          }px)`;
        }
      }

      setTouchablePage((touchablePage) => ({
        ...touchablePage,
        touchable: false,
      }));
    };

    currentCarouselWrapper?.addEventListener(
      'transitionend',
      handleTransitionEnd
    );
    currentCarouselWrapper?.addEventListener('touchstart', handleTouchStart);
    currentCarouselWrapper?.addEventListener('touchmove', handleTouchMove);
    currentCarouselWrapper?.addEventListener('touchend', handleTouchEnd);

    return () => {
      currentCarouselWrapper?.removeEventListener(
        'transitionend',
        handleTransitionEnd
      );
      currentCarouselWrapper?.removeEventListener(
        'touchstart',
        handleTouchStart
      );
      currentCarouselWrapper?.removeEventListener('touchmove', handleTouchMove);
      currentCarouselWrapper?.removeEventListener('touchend', handleTouchEnd);
    };
  }, [
    transitionPage,
    sizePage,
    currentPage,
    touchablePage,
    setTouchablePage,
    setAnimationPage,
    setAutoPlayPage,
    setMovePage,
  ]);

  return (
    <div
      {...divProps}
      ref={carouselDisplayRef}
      className={`overflow-hidden w-screen ${className}`}
    >
      <div
        ref={carouselWrapperItemsRef}
        className="h-full w-full flex flex-nowrap flex-row transition-transform"
      >
        {cloneArrImgSrc.map((imgSrc, idx) => (
          <div className="flex items-center h-full w-full shrink-0" key={idx}>
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
