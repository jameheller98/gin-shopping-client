import { Transition } from '@headlessui/react';
import Image from 'next/image';
import { useRef } from 'react';
import useIntersectionObserver from '../../../state/hooks/useIntersectionObserver';

export type TProductGalleryBox = {
  imgSrc: string;
  priceProduct: number;
  gridColumnStart?: number;
  gridRowStart?: number;
  gridRowEnd?: number;
  positionScale?: 'origin-center' | 'origin-left' | 'origin-right';
} & React.ComponentPropsWithoutRef<'div'>;

const ProductGalleryBox: React.FC<TProductGalleryBox> = ({
  imgSrc,
  priceProduct,
  gridColumnStart,
  gridRowStart,
  gridRowEnd,
  positionScale = 'origin center',
  className,
  ...divProps
}) => {
  const formatCurrency = useRef(
    new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    })
  );
  const galleryBoxRef = useRef<null | HTMLDivElement>(null);
  const entry = useIntersectionObserver(galleryBoxRef, {
    threshold: 0.5,
    freezeOnceVisible: true,
  });
  const isVisible = !!entry?.isIntersecting;

  return (
    <div
      className="grid grid-rows-[140px_auto] shadow-xl rounded-md"
      ref={galleryBoxRef}
      style={{
        gridColumnStart,
        gridRowStart,
        gridRowEnd,
      }}
    >
      <div
        {...divProps}
        className={`overflow-hidden flex items-center justify-center rounded-t-md ${className}`}
      >
        <Transition
          show={isVisible}
          enter={`transition-transform duration-1000 ${positionScale}`}
          enterFrom="scale-0"
          enterTo="scale-1"
        >
          <Image src={imgSrc} alt={imgSrc} width="350" height="525" />
        </Transition>
      </div>
      <div className="rounded-b-md flex items-center justify-center text-sm">
        {formatCurrency.current.format(priceProduct)}
      </div>
    </div>
  );
};

export default ProductGalleryBox;
