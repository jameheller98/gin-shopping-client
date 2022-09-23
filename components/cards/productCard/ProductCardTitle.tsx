import { useRef } from 'react';
import { IProductData } from '../../../libs/product/interfaces';

export type TProductCardTitle = {
  name: IProductData['name'];
  price: IProductData['price'];
} & React.ComponentPropsWithoutRef<'section'>;

const ProductCardTitle: React.FC<TProductCardTitle> = ({
  name,
  price,
  className,
  ...sectionProps
}) => {
  const formatCurrency = useRef(
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      currencyDisplay: 'narrowSymbol',
    })
  );

  return (
    <section
      {...sectionProps}
      className={`font-bold text-xl text-center md:text-left md:mt-10 md:text-3xl ${className}`}
    >
      <h1 className="mb-2 tracking-wide md:tracking-wider md:font-normal">
        {name}
      </h1>
      <h2 className="mb-2 md:font-semibold md:text-2xl">
        {formatCurrency.current.format(price)}
      </h2>
    </section>
  );
};

export default ProductCardTitle;
