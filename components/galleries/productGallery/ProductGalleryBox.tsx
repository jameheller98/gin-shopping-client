import { Transition } from '@headlessui/react';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { IProductData } from '../../../libs/product/interfaces';
import useIntersectionObserver from '../../../state/hooks/useIntersectionObserver';
import useWindowSize from '../../../state/hooks/useWindowSize';

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
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      currencyDisplay: 'narrowSymbol',
    })
  );
  const galleryBoxRef = useRef<null | HTMLDivElement>(null);
  const entry = useIntersectionObserver(galleryBoxRef, {
    threshold: 0.5,
    freezeOnceVisible: true,
  });
  const isVisible = !!entry?.isIntersecting;
  const { width } = useWindowSize();
  const itemClassName = classNames({
    ['grid-rows-[140px_auto]']: width < 768,
    ['grid-rows-[290px_auto]']: width >= 768 && width < 1024,
    ['grid-rows-[340px_auto]']: width >= 1024 && width < 1280,
    ['grid-rows-[420px_auto]']: width >= 1028,
  });

  return (
    <Link href={`product/${sex}/${cat}/${id}`}>
      <div
        className={`grid shadow-xl rounded-md cursor-pointer ${itemClassName}`}
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
        <div className="rounded-b-md flex items-center justify-center text-sm lg:text-xl lg:font-medium">
          {formatCurrency.current.format(price)}
        </div>
      </div>
    </Link>
  );
};

export default ProductGalleryBox;
