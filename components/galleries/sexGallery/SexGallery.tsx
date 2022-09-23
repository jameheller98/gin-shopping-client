import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { IProductData } from '../../../libs/product/interfaces';

export type TSexGallery = {
  listProduct: IProductData[];
} & React.ComponentPropsWithoutRef<'div'>;

const SexGallery: React.FC<TSexGallery> = ({
  listProduct,
  className,
  ...propsDiv
}) => {
  const formatCurrency = useRef(
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      currencyDisplay: 'narrowSymbol',
    })
  );

  return (
    <div
      {...propsDiv}
      className={`grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-10 md:grid-cols-4 md:gap-12 lg:grid-cols-5 ${className}`}
    >
      {listProduct.map(({ id, imgSrc, sex, cat, price, name }) => (
        <figure key={id}>
          <Link href={`/product/${sex}/${cat}/${id}`}>
            <a className="flex justify-center">
              <div className="flex rounded-2xl overflow-hidden">
                <Image
                  src={imgSrc[0]}
                  alt={imgSrc[0]}
                  width="350"
                  height="525"
                />
              </div>
            </a>
          </Link>
          <figcaption className="text-center text-slate-700">
            <div className="pt-2 pb-1 font-medium text-sm md:text-lg">
              {name}
            </div>
            <div className="font-bold md:text-xl">
              {formatCurrency.current.format(price)}
            </div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
};

export default SexGallery;
