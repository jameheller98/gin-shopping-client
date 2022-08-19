import Image from 'next/image';

export type TBrand = {};

const Brand: React.FC<TBrand> = () => {
  return (
    <Image
      src="/icons/brand/brand.png"
      alt="Brand logo"
      className="cursor-pointer"
      height={197}
      width={384}
      priority
    />
  );
};

export default Brand;
