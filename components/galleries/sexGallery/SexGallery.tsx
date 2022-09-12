import { ShoppingCartIcon } from '@heroicons/react/solid';
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
    new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    })
  );

  return (
    <div {...propsDiv} className={`grid grid-cols-2 gap-5 ${className}`}>
      {listProduct.map(({ id, imgSrc, sex, cat, price }) => (
        <figure key={id} className="border-4 border-dashed border-slate-400">
          <div className="flex p-4">
            <Link href={`/product/${sex}/${cat}/${id}`}>
              <Image src={imgSrc[0]} alt={imgSrc[0]} width="350" height="525" />
            </Link>
          </div>
          <figcaption className="text-xl border-t-4 border-dashed border-slate-400">
            <div className="float-left p-2">
              {formatCurrency.current.format(price)}
            </div>
            <div className="float-right border-l-4 border-dashed border-slate-400 p-2">
              <ShoppingCartIcon className="w-7" />
            </div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
};

export default SexGallery;
