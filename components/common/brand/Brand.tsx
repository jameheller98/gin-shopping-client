import Image from 'next/image';

export type TBrand = {};

const Brand: React.FC<TBrand> = () => {
  return (
    <Image
      src="/icons/brand/brand.png"
      alt="Brand logo"
      className="cursor-pointer"
      width={384}
      height={197}
      priority
    />
  );
};

export default Brand;
