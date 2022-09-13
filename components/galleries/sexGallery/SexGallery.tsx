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
    <div {...propsDiv} className={`grid grid-cols-2 gap-4 ${className}`}>
      {listProduct.map(({ id, imgSrc, sex, cat, price, name }) => (
        <figure key={id}>
          <div className="rounded-2xl overflow-hidden">
            <Link href={`/product/${sex}/${cat}/${id}`}>
              <a className="flex">
                <Image
                  src={imgSrc[0]}
                  alt={imgSrc[0]}
                  width="350"
                  height="525"
                />
              </a>
            </Link>
          </div>
          <figcaption className="text-center text-slate-700">
            <div className="pt-2 pb-1 font-medium text-sm">{name}</div>
            <div className="font-bold">
              {formatCurrency.current.format(price)}
            </div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
};

export default SexGallery;
