import { Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import useIntersectionObserver from '../../../state/hooks/useIntersectionObserver';
import useIsomorphicLayoutEffect from '../../../state/hooks/useIsomorphicLayoutEffect';
import RectButton from '../../buttons/RectButton/RectButton';

export type THotCard = {
  srcImg: string;
  directionTransition?:
    | 'origin-top-left'
    | 'origin-top-right'
    | 'origin-center';
  textButton: string;
  href?: string;
  themeCard?: 'light' | 'dark';
  paddingSide?: number;
} & React.ComponentPropsWithoutRef<'article'>;

const HotCard: React.FC<THotCard> = ({
  srcImg,
  directionTransition = 'origin-top-left',
  textButton,
  href = '#',
  themeCard = 'dark',
  paddingSide = 40,
  className,
  ...articleProps
}) => {
  const hotCardRef = useRef<null | HTMLElement>(null);
  const entry = useIntersectionObserver(hotCardRef, {
    threshold: 0.5,
    freezeOnceVisible: true,
  });
  const isVisible = !!entry?.isIntersecting;
  const themeClassName =
    themeCard === 'dark' ? 'before:bg-opacity-60' : 'before:bg-opacity-0';

  useIsomorphicLayoutEffect(() => {
    const currentHotCardRef = hotCardRef.current;
    const scrollbarWidth = window.innerWidth - document.body.clientWidth;

    if (currentHotCardRef) {
      currentHotCardRef.style.width = `calc(100vw - ${scrollbarWidth}px - ${
        paddingSide * 2
      }px)`;
      currentHotCardRef.style.height =
        currentHotCardRef.getBoundingClientRect().width + 'px';
    }
  }, [hotCardRef]);

  return (
    <article
      {...articleProps}
      ref={hotCardRef}
      className={`m-auto w-screen relative overflow-hidden sm:w-full before:content before:w-full before:h-full before:absolute before:top-0 before:left-0 before:bg-slate-600 before:z-[1] before:transition-transform before:duration-500 ease-in-out ${themeClassName} ${
        isVisible ? 'before:translate-y-0' : 'before:-translate-y-full'
      } ${className}`}
    >
      <Transition className="flex" show={isVisible}>
        <Transition.Child
          className="flex"
          enter={`transition-transform duration-700 delay-500 ${directionTransition}`}
          enterFrom="scale-0"
          enterTo="scale-1"
        >
          <Image
            src={srcImg}
            alt="Hot card"
            width="600"
            height="600"
            priority
          />
        </Transition.Child>
        <Link href={href}>
          <a className={`${href === '#' ? 'pointer-events-none' : ''}`}>
            <RectButton
              className={`absolute z-[2] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg none-tap-highlight-color`}
              themeButton={themeCard}
            >
              {textButton}
            </RectButton>
          </a>
        </Link>
      </Transition>
    </article>
  );
};

export default HotCard;
