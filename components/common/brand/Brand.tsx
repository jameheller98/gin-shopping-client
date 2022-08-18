import Image from 'next/image';

export type TBrand = {};

const Brand: React.FC<TBrand> = () => {
  return (
    <Image
      src="/icons/brand/brand.png"
      alt="Brand logo"
      className="cursor-pointer"
      height={72}
      width={140}
    />
  );
};

export default Brand;
