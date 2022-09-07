import Image from 'next/image';
import TitleCard from '../components/common/titleCard/TitleCard';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import { NextPageWithLayout } from './page';

const About: NextPageWithLayout = () => {
  return (
    <section>
      <Image
        src="/about/men-shirt.jpeg"
        alt="men-shirt"
        width="1251"
        height="704"
      />
      <TitleCard title="About GIN" posHorizal="bottom" className="mt-2" />
      <p className="px-5 text-lg">
        <cite>Gin</cite> is product designed by HoangTuan, this is webpage
        design not for commercial use, you can experience all feature in webpage
        here.
      </p>
    </section>
  );
};

export default About;

About.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
