import { InboxIcon, PhoneIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import TitleCard from '../components/common/titleCard/TitleCard';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import { NextPageWithLayout } from './page';

const Contact: NextPageWithLayout = () => {
  return (
    <section>
      <TitleCard
        title="Contact for business"
        posHorizal="bottom"
        className="mt-2"
      />
      <address className="px-5 text-lg flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <PhoneIcon className="w-5 inline-block" /> Phone: (+84) 938542267
        </div>
        <div className="flex items-center gap-2">
          <InboxIcon className="w-5 inline-block" /> Email:{' '}
          <a
            href="mailto:nguyentuanwd.ou@gmail.com"
            className="text-blue-600 hover:text-blue-400 active:text-blue-300 underline underline-offset-2"
          >
            nguyentuanwd.ou@gmail.com
          </a>
        </div>
        <div className="flex items-center gap-2">
          <span className="pl-[2px]">
            <Image
              src="/icons/social/facebook.png"
              alt="facebook"
              width="16"
              height="16"
            />
          </span>
          Facebook:
          <a
            href="https://www.facebook.com/OuHoangTuan"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:text-blue-400 active:text-blue-300 underline underline-offset-2"
          >
            Hoàng Tuấn
          </a>
        </div>
        <div className="flex items-center gap-2">
          <span className="pl-[2px]">
            <Image
              src="/icons/social/github.png"
              alt="github"
              width="16"
              height="16"
            />
          </span>
          Github:
          <a
            href="https://github.com/jameheller98"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:text-blue-400 active:text-blue-300 underline underline-offset-2"
          >
            jameheller98
          </a>
        </div>
        <div className="flex items-center gap-2">
          <span className="pl-[2px]">
            <Image
              src="/icons/social/twitter.png"
              alt="twitter"
              width="16"
              height="16"
            />
          </span>
          Twitter:
          <a
            href="https://twitter.com/Tun70307847"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:text-blue-400 active:text-blue-300 underline underline-offset-2"
          >
            @Tun70307847
          </a>
        </div>
      </address>
    </section>
  );
};

export default Contact;

Contact.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
