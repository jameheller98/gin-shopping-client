import { Transition } from '@headlessui/react';
import Image from 'next/image';
import { Fragment, useRef } from 'react';
import useIntersectionObserver from '../../../state/hooks/useIntersectionObserver';
import { TCubeButton } from '../../buttons/CubeButton/CubeButton';
import NewArrivalCardContent from './NewArrivalCardContent';

export interface INewArrivalCardStyles {
  arrBgColor: string[];
  shadowsColor?: string;
  buttonStyle?: Pick<TCubeButton, 'bgColor' | 'fromEffect' | 'borderColor'>;
}

export type TNewArrivalCard = {
  title: string;
  description: string;
  imgSrc: string;
  reversePosition?: boolean;
  styleProps?: INewArrivalCardStyles;
  href?: string;
} & React.ComponentPropsWithoutRef<'article'>;

const NewArrivalCard: React.FC<TNewArrivalCard> = ({
  title,
  description,
  imgSrc,
  reversePosition = false,
  styleProps = {
    arrBgColor: ['bg-slate-100', 'bg-slate-200'],
    shadowsColor: 'shadow-slate-400',
    buttonStyle: {
      bgColor: 'bg-slate-400',
      fromEffect: 'after:from-slate-200',
      borderColor: 'border-slate-200',
    },
  },
  href = '#',
  className,
  ...articleProps
}) => {
  const refNewArrivalCard = useRef<null | HTMLElement>(null);
  const entry = useIntersectionObserver(refNewArrivalCard, {
    threshold: 0.5,
    freezeOnceVisible: true,
  });
  const isVisible = !!entry?.isIntersecting;

  return (
    <article
      {...articleProps}
      className={`min-h-[216px] ${className} ${styleProps?.arrBgColor[0]}`}
      ref={refNewArrivalCard}
    >
      <Transition
        as="div"
        className={`grid grid-flow-col p-3 relative ${
          reversePosition ? 'gap-4' : 'gap-3'
        }`}
        show={isVisible}
        enter="transition-[transform,opacity] duration-1000 origin-bottom"
        enterFrom="scale-[0.2] opacity-0"
        enterTo="scale-1 opacity-100"
      >
        <figure className={`${reversePosition ? 'order-last' : ''}`}>
          <Transition.Child
            as={Fragment}
            enter="transition-[transform,opacity] duration-1000 delay-1000"
            enterFrom="translate-x-5 opacity-0"
            enterTo="translate-x-0 opacity-100"
          >
            <figcaption
              className={`text-lg font-medium mb-3 ${
                reversePosition ? 'text-right' : 'text-left'
              }`}
            >
              {title}
            </figcaption>
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter={`transition-transform duration-1000 delay-[1500ms] ${
              reversePosition ? 'origin-right' : 'origin-left'
            }`}
            enterFrom="scale-0"
            enterTo="scale-100"
          >
            <hr
              className={`border-t-2 w-[60%] border-slate-700 absolute top-10 ${
                reversePosition ? 'right-2' : 'left-2'
              }`}
            />
          </Transition.Child>
          <Transition.Child
            as="div"
            className="overflow-hidden h-[160px] w-[160px]"
            enter="transition-[transform,opacity] duration-1000 delay-500"
            enterFrom={`${
              reversePosition ? 'translate-x-5' : '-translate-x-5'
            } opacity-0`}
            enterTo="translate-x-0 opacity-100"
          >
            <Image
              src={imgSrc}
              alt="Men white shirt"
              width="360"
              height="490"
            />
          </Transition.Child>
        </figure>
        <NewArrivalCardContent
          title={title}
          description={description}
          styleProps={styleProps}
          href={href}
        />
      </Transition>
    </article>
  );
};

export default NewArrivalCard;
