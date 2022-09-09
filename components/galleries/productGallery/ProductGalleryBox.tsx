import { Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { IProductData } from '../../../libs/product/interfaces';
import useIntersectionObserver from '../../../state/hooks/useIntersectionObserver';

export type TProductGalleryBox = {
  product: IProductData;
  gridColumnStart?: number;
  gridRowStart?: number;
  gridRowEnd?: number;
  positionScale?: 'origin-center' | 'origin-left' | 'origin-right';
} & React.ComponentPropsWithoutRef<'div'>;

const ProductGalleryBox: React.FC<TProductGalleryBox> = ({
  product,
  gridColumnStart,
  gridRowStart,
  gridRowEnd,
  positionScale = 'origin center',
  className,
  ...divProps
}) => {
  const { imgSrc, price, sex, cat, id } = product;
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
    <Link href={`product/${sex}/${cat}/${id}`}>
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
            <Image src={imgSrc[0]} alt={imgSrc[0]} width="350" height="525" />
          </Transition>
        </div>
        <div className="rounded-b-md flex items-center justify-center text-sm">
          {formatCurrency.current.format(price)}
        </div>
      </div>
    </Link>
  );
};

export default ProductGalleryBox;
