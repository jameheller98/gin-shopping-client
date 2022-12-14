import Link from 'next/link';
import HotCard from '../../components/cards/hotCard/HotCard';
import TitleCard from '../../components/common/titleCard/TitleCard';
import TypingEffect from '../../components/common/typingEffect/TypingEffect';
import { mockTypingEffectProps } from '../../components/common/typingEffect/TypingEffect.mocks';
import ProductGallery from '../../components/galleries/productGallery/ProductGallery';
import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout';
import Calendar from '../../components/utilities/calendar/Calendar';
import Carousel from '../../components/utilities/carousel/Carousel';
import dataProduct from '../../libs/product/dataProduct.json';
import { IProductData } from '../../libs/product/interfaces';
import useWindowSize from '../../state/hooks/useWindowSize';
import { NextPageWithLayout } from '../page';

export interface IProduct {
  dataProduct: IProductData[];
}

const arrImgSrc = [
  '/product/slide/black-jean-shirt-square.jpg',
  '/product/slide/group-trend-square.jpg',
  '/product/slide/black-vest-white-shirt-square.jpg',
  '/product/slide/student-shirt-square.jpg',
  '/product/slide/black-pant-square.jpg',
];

export const getServerSideProps = async () => {
  return { props: { dataProduct } };
};

const Product: NextPageWithLayout<IProduct> = ({ dataProduct }) => {
  const { width } = useWindowSize();

  return (
    <section className="flex flex-col">
      <div className="sm:flex sm:mx-auto sm:gap-10">
        <div className="sm:flex sm:mx-12 sm:w-[400px] lg:w-[500px]">
          <HotCard
            srcImg="/product/card/denim-cloth.jpg"
            textButton="Shopping now"
            themeCard="light"
            directionTransition="origin-center"
            paddingSide={0}
            className="mt-0"
          />
        </div>
        {width > 1024 && (
          <div className="md:p-4 md:flex items-center">
            <Calendar className="md:w-[450px] md:h-[300px] lg:h-[340px]" />
          </div>
        )}
      </div>
      <Carousel
        keyCarousel="product_carousel_1"
        arrImgSrc={arrImgSrc}
        width={900}
        height={900}
        numberItems={width < 768 ? 2 : 3}
        ratioDisplayImgBothSide={0}
        className="mt-6 sm:mx-10 lg:mx-36"
        distanceBetweenImgs={width < 768 ? 20 : 25}
        autoPlay={false}
      />
      <TitleCard title="New arrival" />
      <ProductGallery
        products={dataProduct}
        options={{
          left: (
            <Link href="/product/men" passHref>
              <TypingEffect
                {...mockTypingEffectProps.base}
                positionDelayTyping={1}
                className="text-lg lg:text-2xl"
              />
            </Link>
          ),
          right: (
            <Link href="/product/woman" passHref>
              <TypingEffect text="Woman" className="text-lg lg:text-2xl" />
            </Link>
          ),
        }}
      />
    </section>
  );
};

export default Product;

Product.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
