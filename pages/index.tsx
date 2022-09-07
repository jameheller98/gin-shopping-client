import HotCard from '../components/cards/hotCard/HotCard';
import { mockHotCardProps } from '../components/cards/hotCard/HotCard.mocks';
import NewArrivalCard from '../components/cards/newArrivalCard/NewArrivalCard';
import { mockNewArrivalCardProps } from '../components/cards/newArrivalCard/NewArrivalCard.mocks';
import TitleCard from '../components/common/titleCard/TitleCard';
import { mockTitleCardProps } from '../components/common/titleCard/TitleCard.mocks';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import Carousel from '../components/utilities/carousel/Carousel';
import { mockCarouselProps } from '../components/utilities/carousel/Carousel.mocks';
import { NextPageWithLayout } from './page';

const Home: NextPageWithLayout = () => {
  return (
    <section className="flex flex-col">
      <Carousel {...mockCarouselProps.base} />
      <TitleCard {...mockTitleCardProps.base} />
      <HotCard {...mockHotCardProps.base} className="mt-4 mx-10 mb-6" />
      <HotCard
        srcImg="/home/card/accessories.jpg"
        directionTransition="origin-top-right"
        textButton="Accessories"
        className="mt-4 mx-10"
      />
      <TitleCard title="New arrival" />
      <NewArrivalCard
        {...mockNewArrivalCardProps.base}
        className="mt-4 mx-5 mb-2 pr-1"
        styleProps={{
          arrBgColor: ['bg-red-100', 'bg-red-200'],
          shadowsColor: 'shadow-red-400',
          buttonStyle: {
            bgColor: 'bg-red-400',
            fromEffect: 'after:from-red-200',
            borderColor: 'border-red-200',
          },
        }}
      />
      <NewArrivalCard
        title="Black shirt men"
        description="Black is the original power colour. Hipsters and urbane sophisticates have always gravitated to black clothing."
        imgSrc="/home/card/men-black-shirt.jpg"
        reversePosition={true}
        className="mt-4 mx-5"
        styleProps={{
          arrBgColor: ['bg-orange-100', 'bg-orange-200'],
          shadowsColor: 'shadow-orange-400',
          buttonStyle: {
            bgColor: 'bg-orange-400',
            fromEffect: 'after:from-orange-200',
            borderColor: 'border-orange-200',
          },
        }}
      />
    </section>
  );
};

export default Home;

Home.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
