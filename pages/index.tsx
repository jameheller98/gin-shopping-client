import NewArrivalCard from '../components/cards/newArrivalCard/NewArrivalCard';
import { mockNewArrivalCardProps } from '../components/cards/newArrivalCard/NewArrivalCard.mocks';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import Carousel from '../components/utilities/carousel/Carousel';
import { mockCarouselProps } from '../components/utilities/carousel/Carousel.mocks';
import { NextPageWithLayout } from './page';

const Home: NextPageWithLayout = () => {
  return (
    <section className="w-full">
      <Carousel {...mockCarouselProps.base} />
      <NewArrivalCard
        {...mockNewArrivalCardProps.base}
        className="mt-5"
        arrBgColor={['bg-red-100', 'bg-red-200', 'bg-red-300']}
        shadowsColor="shadow-red-400"
      />
      <NewArrivalCard
        {...mockNewArrivalCardProps.base}
        reversePosition={true}
        className="mt-5"
        arrBgColor={['bg-orange-100', 'bg-orange-200', 'bg-orange-300']}
        shadowsColor="shadow-orange-400"
      />
    </section>
  );
};

export default Home;

Home.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
