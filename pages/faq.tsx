import { Transition } from '@headlessui/react';
import { useEffect, useState } from 'react';
import TitleCard from '../components/common/titleCard/TitleCard';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import { NextPageWithLayout } from './page';

const FAQ: NextPageWithLayout = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section>
      <TitleCard title="General question" posHorizal="bottom" />
      <Transition show={isVisible}>
        <Transition.Child
          enter="transition-opacity duration-500 delay-500"
          enterFrom="opacity-0"
          enterTo="opacity-1"
        >
          <h1 className="text-2xl font-medium mx-3 mb-7 leading-5">
            Ordering and payment
          </h1>
        </Transition.Child>
        <Transition.Child
          enter="transition-opacity duration-500 delay-1000"
          enterFrom="opacity-0"
          enterTo="opacity-1"
        >
          <section className="px-10">
            <ol className="list-decimal flex flex-col gap-10">
              <li className="marker:font-medium">
                <article className="flex flex-col gap-2">
                  <h1 className="font-medium">Q: How can I order?</h1>
                  <p className="font-light">
                    A: You can order easily using our online platform. When you
                    find a product you need, you can add it to cart, login and
                    go through the ordering process. After the order is ready,
                    you will receive order summary to your email. Order summary
                    will also be stored to your account.
                  </p>
                </article>
              </li>
              <li className="marker:font-medium">
                <article className="flex flex-col gap-3">
                  <h1 className="font-medium">Q: Why should I buy online?</h1>
                  <p className="font-light">
                    A: Speeding up the process. By ordering online you will you
                    will get prices faster and you will be able to go through
                    order confirmation and payment process much faster. This
                    could save days of your time.
                  </p>
                </article>
              </li>
              <li className="marker:font-medium">
                <article className="flex flex-col gap-3">
                  <h1 className="font-medium">
                    Q: What information should I input when ordering?
                  </h1>
                  <p className="font-light">
                    A: our online ordering system will ask for all the important
                    information you should submit. If you have a VAT number,
                    please remember to submit it. This will make sure the
                    shipment is not delayed because of the lack of VAT number.
                  </p>
                </article>
              </li>
            </ol>
          </section>
        </Transition.Child>
        <Transition.Child
          enter="transition-opacity duration-500 delay-500"
          enterFrom="opacity-0"
          enterTo="opacity-1"
        >
          <h1 className="text-2xl font-medium mx-3 mb-7 leading-5 mt-6">
            Your account
          </h1>
        </Transition.Child>
        <Transition.Child
          enter="transition-opacity duration-500 delay-1000"
          enterFrom="opacity-0"
          enterTo="opacity-1"
        >
          <section className="px-10">
            <ol className="list-decimal flex flex-col gap-10">
              <li className="marker:font-medium">
                <article className="flex flex-col gap-2">
                  <h1 className="font-medium">Q: How do create an account?</h1>
                  <p className="font-light">
                    A: Go to menu and click Register to create an account.
                  </p>
                </article>
              </li>
              <li className="marker:font-medium">
                <article className="flex flex-col gap-2">
                  <h1 className="font-medium">Q: How is security in shop?</h1>
                  <p className="font-light">
                    A: Our web store is secured with SSL certificate. This means
                    the information you input is encrypted and it will not be
                    available for third parties.
                  </p>
                </article>
              </li>
            </ol>
          </section>
        </Transition.Child>
      </Transition>
    </section>
  );
};

export default FAQ;

FAQ.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
