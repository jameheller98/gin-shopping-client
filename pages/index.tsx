import Image from 'next/image';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import { NextPageWithLayout } from './page';

const Home: NextPageWithLayout = () => {
  return (
    <section className="w-full">
      <div className="h-[400px] overflow-hidden">
        <Image
          src="/home/slide/man-suit.jpg"
          alt="Home logo"
          height={1323}
          width={880}
          priority
        />
      </div>
    </section>
  );
};

export default Home;

Home.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
