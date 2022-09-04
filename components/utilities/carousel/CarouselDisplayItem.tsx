import Image from 'next/image';
import { FC } from 'react';
import { TPropsImg } from './CarouselDisplayListItem';

export type TCarouselDisplayItem = {
  propsImg: TPropsImg & { imgSrc: string };
} & React.ComponentPropsWithoutRef<'div'>;

const CarouselDisplayItem: FC<TCarouselDisplayItem> = ({
  propsImg,
  className,
  ...divProps
}) => {
  const {
    width,
    height,
    imgSrc,
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
};

export default CarouselDisplayItem;
