import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import Carousel from '../components/utilities/carousel/Carousel';
import { mockCarouselProps } from '../components/utilities/carousel/Carousel.mocks';
import { NextPageWithLayout } from './page';

const Home: NextPageWithLayout = () => {
  return (
    <section className="w-full">
      <Carousel {...mockCarouselProps.base} />
    </section>
  );
};

export default Home;

Home.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
