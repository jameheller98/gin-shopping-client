import { Transition } from '@headlessui/react';
import { InboxIcon, PhoneIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import TitleCard from '../components/common/titleCard/TitleCard';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import { NextPageWithLayout } from './page';

const Contact: NextPageWithLayout = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section>
      <TitleCard
        title="Contact for business"
        posHorizal="bottom"
        className="mt-2"
      />
      <Transition show={isVisible}>
        <address className="px-5 text-lg flex flex-col gap-3">
          <ItemAddress
            title="Phone"
            icon={<PhoneIcon className="w-5 inline-block" />}
            content="(+84) 938542267"
          />
          <ItemAddress
            title="Email"
            icon={<InboxIcon className="w-5 inline-block" />}
            content="nguyentuanwd.ou@gmail.com"
            link={{ href: 'mailto:nguyentuanwd.ou@gmail.com' }}
          />
          <ItemAddress
            title="Facebook"
            icon={
              <span className="pl-[2px]">
                <Image
                  src="/icons/social/facebook.png"
                  alt="facebook"
                  width="16"
                  height="16"
                />
              </span>
            }
            content="Hoàng Tuấn"
            link={{ href: 'https://www.facebook.com/OuHoangTuan' }}
          />
          <ItemAddress
            title="Github"
            icon={
              <span className="pl-[2px]">
                <Image
                  src="/icons/social/github.png"
                  alt="github"
                  width="16"
                  height="16"
                />
              </span>
            }
            content="jameheller98"
            link={{ href: 'https://github.com/jameheller98' }}
          />
          <ItemAddress
            title="Twitter"
            icon={
              <span className="pl-[2px]">
                <Image
                  src="/icons/social/twitter.png"
                  alt="twitter"
                  width="16"
                  height="16"
                />
              </span>
            }
            content="@Tun70307847"
            link={{ href: 'https://twitter.com/Tun70307847' }}
          />
        </address>
      </Transition>
    </section>
  );
};

const ItemAddress = ({
  title,
  icon,
  content,
  link,
}: {
  title: string;
  // eslint-disable-next-line no-undef
  icon: JSX.Element;
  content: string;
  link?: {
    href: string;
  };
}) => (
  <div className="flex items-center gap-2">
    <Transition.Child
      enter="transition-[transform,opacity] duration-500 delay-500"
      enterFrom="opacity-0 -translate-x-1"
      enterTo="opacity-1 translate-x-0"
    >
      <span className="">{icon}</span>
    </Transition.Child>
    <Transition.Child
      enter="transition-[transform,opacity] duration-500 delay-1000"
      enterFrom="opacity-0 -translate-x-1"
      enterTo="opacity-1 translate-x-0"
    >
      <span>{title}:</span>
    </Transition.Child>
    <Transition.Child
      enter="transition-[transform,opacity] duration-500 delay-[1500ms]"
      enterFrom="opacity-0 -translate-x-1"
      enterTo="opacity-1 translate-x-0"
    >
      {!link ? (
        content
      ) : (
        <a
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 hover:text-blue-400 active:text-blue-300 underline underline-offset-2"
        >
          {content}
        </a>
      )}
    </Transition.Child>
  </div>
);

export default Contact;

Contact.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
