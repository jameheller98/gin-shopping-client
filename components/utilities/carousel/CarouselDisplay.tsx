import { Transition } from '@headlessui/react';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
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
import useIsomorphicLayoutEffect from '../../../state/hooks/useIsomorphicLayoutEffect';

export type TCarouselDisplay = {} & React.ComponentPropsWithoutRef<'div'>;

const CarouselDisplay: React.FC<TCarouselDisplay> = ({
  className,
  ...divProps
}) => {
  const carouselWrapperItemsRef = useRef<null | HTMLDivElement>(null);
  const itemRef = useRef<null | HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
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
  const widthItem = itemRef.current?.getBoundingClientRect().width;

  const calTranlateXItem = useCallback(
    (currentPage: number) =>
      widthCarouselWrapper && widthItem
        ? widthItem * currentPage - (widthCarouselWrapper - widthItem) / 2
        : 0,

    [widthCarouselWrapper, widthItem]
  );

  useIsomorphicLayoutEffect(() => {
    if (currentCarouselWrapper) {
      currentCarouselWrapper.style.transitionDuration = `${animatePage}ms`;

      if (transitionPage && currentPage === sizePage) {
        currentCarouselWrapper.style.transform = `translateX(${-calTranlateXItem(
          1
        )}px)`;
      } else if (transitionPage && currentPage === 1) {
        currentCarouselWrapper.style.transform = `translateX(${-calTranlateXItem(
          sizePage + 2
        )}px)`;
      } else if (!transitionPage) {
        currentCarouselWrapper.style.transform = `translateX(${-calTranlateXItem(
          currentPage + 1
        )}px)`;
      }
    }
  }, [currentPage, sizePage, animatePage, transitionPage, calTranlateXItem]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleTransitionEnd = () => {
    if (
      (transitionPage && currentPage === sizePage) ||
      (transitionPage && currentPage === 1)
    ) {
      setAnimationPage({ animatePage: 0, transitionPage: false });
    }
  };

  const handleStartSlide = (clientX: number) => {
    setTouchablePage((touchablePage) => ({
      ...touchablePage,
      touchable: true,
      posStartTouch: clientX,
    }));
    setAutoPlayPage(false);
  };

  const handleMoveSlide = (clientX: number) => {
    if (currentCarouselWrapper && touchablePage.touchable) {
      currentCarouselWrapper.style.transitionDuration = `0ms`;
      currentCarouselWrapper.style.transform = `translateX(${-(
        calTranlateXItem(currentPage + 1) +
        (touchablePage.posStartTouch - clientX)
      )}px)`;

      setTouchablePage((touchablePage) => ({
        ...touchablePage,
        stepMove: touchablePage.posStartTouch - clientX,
      }));
    }
  };

  const handleEndSlide = () => {
    if (widthCarouselWrapper && currentCarouselWrapper) {
      if (touchablePage.stepMove > widthCarouselWrapper / 20) {
        setMovePage((movePage) => ({
          ...movePage,
          typeMovePage: 'nextPage',
        }));
      } else if (touchablePage.stepMove < -widthCarouselWrapper / 20) {
        setMovePage((movePage) => ({
          ...movePage,
          typeMovePage: 'prevPage',
        }));
      } else {
        currentCarouselWrapper.style.transitionDuration = `700ms`;
        currentCarouselWrapper.style.transform = `translateX(${-calTranlateXItem(
          currentPage + 1
        )}px)`;
      }
    }

    setTouchablePage({
      touchable: false,
      posStartTouch: 0,
      stepMove: 0,
    });
  };

  return (
    <div {...divProps} className={`overflow-hidden w-screen ${className}`}>
      <div ref={itemRef} className="w-[75%]" aria-hidden />
      <Transition
        show={isVisible}
        enter="transition-[transform,opacity] duration-[1000ms]"
        enterFrom="scale-50 opacity-0"
        enterTo="scale-100 opacity-100"
      >
        <div
          ref={carouselWrapperItemsRef}
          className="h-full w-full flex flex-nowrap flex-row -translate-x-[calc(75%*2-(25%/2))] transition-transform"
          onTransitionEnd={handleTransitionEnd}
          onTouchStart={(event) => handleStartSlide(event.touches[0].clientX)}
          onTouchMove={(event) => handleMoveSlide(event.touches[0].clientX)}
          onTouchEnd={handleEndSlide}
          onMouseDown={(event: any) => handleStartSlide(event.clientX)}
          onMouseMove={(event: any) => handleMoveSlide(event.clientX)}
          onMouseUp={handleEndSlide}
        >
          {cloneArrImgSrc.map((imgSrc, idx) => (
            <div
              className="flex items-center h-full w-[75%] shrink-0 px-2"
              key={idx}
            >
              <Image
                src={imgSrc}
                width={720}
                height={480}
                alt="Home logo"
                priority={idx > 1 && idx < 6 ? true : false}
                onDragStart={(event) => event.preventDefault()}
              />
            </div>
          ))}
        </div>
      </Transition>
    </div>
  );
};

export default CarouselDisplay;
