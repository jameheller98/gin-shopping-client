import CarouselControl from './CarouselControl';
import CarouselDisplay from './CarouselDisplay';

export type TCarousel = {
  arrImgSrc: string[];
} & React.ComponentPropsWithoutRef<'div'>;

const Carousel: React.FC<TCarousel> = ({
  arrImgSrc,
  className,
  ...divProps
}) => {
  return (
    <div {...divProps} className={`relative ${className}`}>
      <CarouselDisplay arrImgSrc={arrImgSrc} />
      <CarouselControl arrImgSrc={arrImgSrc} />
    </div>
  );
};

export default Carousel;
