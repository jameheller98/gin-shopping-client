import { Transition } from '@headlessui/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import TitleCard from '../components/common/titleCard/TitleCard';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import { NextPageWithLayout } from './page';

const About: NextPageWithLayout = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section>
      <Transition show={isVisible}>
        <Transition.Child
          className="text-center md:mx-40 lg:mx-52"
          enter="transition-transform duration-1000"
          enterFrom="scale-0"
          enterTo="scale-1"
        >
          <Image
            src="/about/men-shirt.jpeg"
            alt="men-shirt"
            width="1251"
            height="704"
            priority
          />
        </Transition.Child>

        <TitleCard title="About GIN" posHorizal="bottom" className="mt-2" />
        <Transition.Child
          className="text-center md:mx-40 lg:mx-52"
          enter="transition-opacity duration-500 delay-1000"
          enterFrom="opacity-0"
          enterTo="opacity-1"
        >
          <p className="px-5 text-lg">
            <cite>Gin</cite> is product designed by HoangTuan, this is webpage
            design not for commercial use, you can experience all feature in
            webpage here.
          </p>
        </Transition.Child>
      </Transition>
    </section>
  );
};

export default About;

About.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
