import { forwardRef } from 'react';

export type TCarouselDisplayItemFake = {
  percentDisplayImgCenter: number;
  distanceEachImgShouldMinus: number;
} & React.ComponentPropsWithoutRef<'div'>;

// eslint-disable-next-line react/display-name
const CarouselDisplayItemFake = forwardRef<
  HTMLDivElement,
  TCarouselDisplayItemFake
>((props, ref) => {
  const {
    percentDisplayImgCenter,
    distanceEachImgShouldMinus,
    className,
    ...divProps
  } = props;
  return (
    <div
      {...divProps}
      ref={ref}
      className={`${className}`}
      style={{
        width: `calc(${percentDisplayImgCenter}% - ${distanceEachImgShouldMinus}px)`,
      }}
      aria-hidden
    />
  );
});

export default CarouselDisplayItemFake;
