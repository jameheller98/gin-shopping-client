import { forwardRef } from 'react';
import { useRecoilValue } from 'recoil';
import {
  arrImgSrcCloneState,
  movePageState,
} from '../../../state/carousel/carouselSelectors';
import CarouselDisplayItem from './CarouselDisplayItem';

export type TPropsImg = {
  width: number;
  height: number;
  distanceBetweenImgs: number;
  distanceEachImgShouldMinus: number;
  percentDisplayImgCenter: number;
  percentDisplayImgBothSide: number;
  amountCloneImgSrc: number;
};

export type TPropsFuncAnimate = {
  handleTransitionEnd: () => void;
  handleStartSlide: (_clientX: number) => void;
  handleMoveSlide: (_clientX: number) => void;
  handleEndSlide: () => void;
};

export type TCarouselDisplayListItem = {
  keyCarousel: string;
  propsImg: TPropsImg;
  propsFuncAnimate: TPropsFuncAnimate;
} & React.ComponentPropsWithoutRef<'div'>;

// eslint-disable-next-line react/display-name
const CarouselDisplayListItem = forwardRef<
  HTMLDivElement,
  TCarouselDisplayListItem
>((props, ref) => {
  const { keyCarousel, propsImg, propsFuncAnimate, className, ...divProps } =
    props;
  const {
    distanceBetweenImgs,
    distanceEachImgShouldMinus,
    percentDisplayImgCenter,
    percentDisplayImgBothSide,
    amountCloneImgSrc,
  } = propsImg;
  const {
    handleTransitionEnd,
    handleStartSlide,
    handleMoveSlide,
    handleEndSlide,
  } = propsFuncAnimate;
  const cloneArrImgSrc = useRecoilValue(arrImgSrcCloneState(amountCloneImgSrc));
  const { pageSelected: currentPage } = useRecoilValue(
    movePageState(keyCarousel)
  );

  return (
    <div
      {...divProps}
      ref={ref}
      className={`h-full w-full flex flex-nowrap flex-row transition-transform ${className}`}
      style={{
        transform: `translateX(calc(${
          percentDisplayImgCenter * (amountCloneImgSrc + currentPage - 1) * -1 +
          percentDisplayImgBothSide / 2
        }% - ${distanceBetweenImgs * amountCloneImgSrc}px + ${
          2 * distanceEachImgShouldMinus
        }px))`,
        gap: distanceBetweenImgs,
      }}
      onTransitionEnd={handleTransitionEnd}
      onTouchStart={(event) => handleStartSlide(event.touches[0].clientX)}
      onTouchMove={(event) => handleMoveSlide(event.touches[0].clientX)}
      onTouchEnd={handleEndSlide}
      onMouseDown={(event: any) => handleStartSlide(event.clientX)}
      onMouseMove={(event: any) => handleMoveSlide(event.clientX)}
      onMouseUp={handleEndSlide}
    >
      {cloneArrImgSrc.map((imgSrc, idx) => (
        <CarouselDisplayItem key={idx} propsImg={{ ...propsImg, imgSrc }} />
      ))}
    </div>
  );
});

export default CarouselDisplayListItem;
