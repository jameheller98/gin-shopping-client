import Image from 'next/image';
import { FC, memo } from 'react';
import { TPropsImg } from './CarouselDisplayListItem';

export type TCarouselDisplayItem = {
  propsImg: TPropsImg;
  imgSrc: string;
} & React.ComponentPropsWithoutRef<'div'>;

// eslint-disable-next-line react/display-name
const CarouselDisplayItem: FC<TCarouselDisplayItem> = memo(
  ({ propsImg, imgSrc, className, ...divProps }) => {
    const {
      width,
      height,
      percentDisplayImgCenter,
      distanceEachImgShouldMinus,
    } = propsImg;

    return (
      <div
        {...divProps}
        className={`flex items-center shrink-0 ${className}`}
        style={{
          width: `calc(${percentDisplayImgCenter}% - ${distanceEachImgShouldMinus}px`,
        }}
      >
        <Image
          src={imgSrc}
          width={width}
          height={height}
          alt="Home logo"
          priority
          onDragStart={(event) => event.preventDefault()}
        />
      </div>
    );
  }
);

export default CarouselDisplayItem;
