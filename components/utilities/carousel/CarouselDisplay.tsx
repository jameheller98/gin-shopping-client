import { Transition } from '@headlessui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  autoPlayPageState,
  touchablePageState,
} from '../../../state/carousel/carouselAtoms';
import {
  animationPageState,
  movePageState,
  sizePageState,
} from '../../../state/carousel/carouselSelectors';
import useIsomorphicLayoutEffect from '../../../state/hooks/useIsomorphicLayoutEffect';
import CarouselDisplayItemFake from './CarouselDisplayItemFake';
import CarouselDisplayListItem from './CarouselDisplayListItem';

export type TCarouselDisplay = {
  keyCarousel: string;
  width: number;
  height: number;
  numberItems: number;
  distanceBetweenImgs: number;
  ratioDisplayImgBothSide: number;
  sensitivityTouchAnimateSlide: number;
} & React.ComponentPropsWithoutRef<'div'>;

const CarouselDisplay: React.FC<TCarouselDisplay> = ({
  keyCarousel,
  width,
  height,
  numberItems,
  distanceBetweenImgs,
  ratioDisplayImgBothSide,
  sensitivityTouchAnimateSlide,
  className,
  ...divProps
}) => {
  const carouselWrapperItemsRef = useRef<null | HTMLDivElement>(null);
  const itemRef = useRef<null | HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const amountCloneImgSrc = numberItems + (ratioDisplayImgBothSide > 0 ? 1 : 0);
  const [{ pageSelected: currentPage }, setMovePage] = useRecoilState(
    movePageState(keyCarousel)
  );
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
  const distanceEachImgShouldMinus =
    (distanceBetweenImgs * (numberItems - 1)) / numberItems;
  const amountFrameBasicOfImg = 1 / ratioDisplayImgBothSide || 1;
  const frameNeededAddBothSide = 2;
  const amountFrameSplitedOfImgs =
    amountFrameBasicOfImg * numberItems + frameNeededAddBothSide;
  const percentDisplayImgBothSide = (100 / amountFrameSplitedOfImgs) * 2;
  const percentDisplayImgCenter =
    (100 - percentDisplayImgBothSide) / numberItems;

  const stringTranlateXCalculated = useCallback(
    (currentPage: number, valueCanAdded = 0) => {
      const valueTranlateX =
        widthCarouselWrapper && widthItem
          ? ((widthItem + distanceBetweenImgs) * currentPage -
              (widthCarouselWrapper * percentDisplayImgBothSide) / 100 / 2 +
              valueCanAdded) *
            -1
          : 0;
      return `translateX(${valueTranlateX}px)`;
    },
    [
      widthCarouselWrapper,
      widthItem,
      percentDisplayImgBothSide,
      distanceBetweenImgs,
    ]
  );

  useIsomorphicLayoutEffect(() => {
    if (currentCarouselWrapper) {
      currentCarouselWrapper.style.transitionDuration = `${animatePage}ms`;

      if (transitionPage && currentPage === sizePage) {
        currentCarouselWrapper.style.transform = stringTranlateXCalculated(
          amountCloneImgSrc - 1
        );
      } else if (transitionPage && currentPage === 1) {
        currentCarouselWrapper.style.transform = stringTranlateXCalculated(
          sizePage + amountCloneImgSrc
        );
      } else if (!transitionPage) {
        currentCarouselWrapper.style.transform = stringTranlateXCalculated(
          currentPage + amountCloneImgSrc - 1
        );
      }
    }
  }, [
    currentPage,
    sizePage,
    animatePage,
    transitionPage,
    stringTranlateXCalculated,
  ]);

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
      currentCarouselWrapper.style.transform = stringTranlateXCalculated(
        currentPage + amountCloneImgSrc - 1,
        touchablePage.posStartTouch - clientX
      );

      setTouchablePage((touchablePage) => ({
        ...touchablePage,
        stepMove: touchablePage.posStartTouch - clientX,
      }));
    }
  };

  const handleEndSlide = () => {
    if (widthCarouselWrapper && currentCarouselWrapper) {
      if (
        touchablePage.stepMove >
        widthCarouselWrapper / sensitivityTouchAnimateSlide
      ) {
        setMovePage((movePage) => ({
          ...movePage,
          typeMovePage: 'nextPage',
        }));
      } else if (
        touchablePage.stepMove <
        -widthCarouselWrapper / sensitivityTouchAnimateSlide
      ) {
        setMovePage((movePage) => ({
          ...movePage,
          typeMovePage: 'prevPage',
        }));
      } else {
        currentCarouselWrapper.style.transitionDuration = `700ms`;
        currentCarouselWrapper.style.transform = stringTranlateXCalculated(
          currentPage + amountCloneImgSrc - 1
        );
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
      <CarouselDisplayItemFake
        percentDisplayImgCenter={percentDisplayImgCenter}
        distanceEachImgShouldMinus={distanceEachImgShouldMinus}
        ref={itemRef}
      />
      <Transition
        show={isVisible}
        enter="transition-[transform,opacity] duration-[1000ms]"
        enterFrom="scale-50 opacity-0"
        enterTo="scale-100 opacity-100"
      >
        <CarouselDisplayListItem
          ref={carouselWrapperItemsRef}
          keyCarousel={keyCarousel}
          propsImg={{
            width,
            height,
            distanceBetweenImgs,
            distanceEachImgShouldMinus,
            percentDisplayImgCenter,
            percentDisplayImgBothSide,
            amountCloneImgSrc,
          }}
          propsFuncAnimate={{
            handleTransitionEnd,
            handleStartSlide,
            handleMoveSlide,
            handleEndSlide,
          }}
        />
      </Transition>
    </div>
  );
};

export default CarouselDisplay;
