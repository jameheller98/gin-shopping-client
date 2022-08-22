import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { currentPageState } from '../../../state/carousel/carouselAtoms';

export type TCarouselDisplay = {
  arrImgSrc: string[];
} & React.ComponentPropsWithoutRef<'div'>;

const CarouselDisplay: React.FC<TCarouselDisplay> = ({
  arrImgSrc,
  className,
  ...divProps
}) => {
  const carouselDisplayRef = useRef<null | HTMLDivElement>(null);
  const carouselWrapperItemsRef = useRef<null | HTMLDivElement>(null);
  const currentPage = useRecoilValue(currentPageState);

  useEffect(() => {
    if (carouselWrapperItemsRef.current && carouselDisplayRef.current) {
      const widthCarouselDisplay =
        carouselDisplayRef.current.getBoundingClientRect().width;

      carouselWrapperItemsRef.current.style.transform = `translateX(-${
        widthCarouselDisplay * (currentPage - 1)
      }px)`;
    }
  }, [currentPage]);

  return (
    <div
      ref={carouselDisplayRef}
      {...divProps}
      className={`overflow-hidden ${className}`}
    >
      <div
        ref={carouselWrapperItemsRef}
        className="flex flex-nowrap flex-row transition-transform duration-700"
      >
        {arrImgSrc.map((imgSrc, idx) => (
          <div className="h-[300px] w-full shrink-0" key={idx}>
            <Image
              src={imgSrc}
              alt="Home logo"
              height={1323}
              width={880}
              priority
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselDisplay;
