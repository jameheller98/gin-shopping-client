import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout';
import Carousel from '../../components/utilities/carousel/Carousel';
import { NextPageWithLayout } from '../page';

const arrImgSrc = [
  '/product/slide/women-jean-square.jpg',
  '/product/slide/student-shirt-square.jpg',
  '/product/slide/black-shirt-square.jpg',
  '/product/slide/girl-skirt-square.jpg',
  '/product/slide/women-halter-top-square.jpg',
];

const Product: NextPageWithLayout = () => {
  return (
    <section>
      <Carousel
        arrImgSrc={arrImgSrc}
        width={480}
        height={480}
        numberItems={2}
        ratioDisplayImgBothSide={0.5}
      />
    </section>
  );
};

export default Product;

Product.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
