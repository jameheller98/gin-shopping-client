import { Transition } from '@headlessui/react';
import Image from 'next/image';
import { useRef } from 'react';
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
      className={`min-h-[224px] ${className} ${styleProps?.arrBgColor[0]}`}
      ref={refNewArrivalCard}
    >
      <Transition
        as="div"
        className={`grid grid-flow-col p-3 ${
          reversePosition ? 'gap-4' : 'gap-3'
        }`}
        show={isVisible}
        enter="transition-[transform,opacity] duration-1000 origin-bottom"
        enterFrom="scale-[0.2] opacity-0"
        enterTo="scale-1 opacity-100"
        leave="transition-[transform,opacity] duration-1000 origin-top"
        leaveFrom="scale-1 opacity-100"
        leaveTo="scale-[0.2] opacity-0"
      >
        <Transition.Child
          as="section"
          className={`overflow-hidden h-[200px] w-[180px]${
            reversePosition ? ' order-last' : ''
          }`}
          enter="transition-[transform,opacity] duration-1000 delay-500"
          enterFrom={`${
            reversePosition ? 'translate-x-5' : '-translate-x-5'
          } opacity-0`}
          enterTo="translate-x-0 opacity-100"
          leave="transition-[transform,opacity] duration-1000 "
          leaveFrom="translate-x-0 opacity-100"
          leaveTo={`${
            reversePosition ? 'translate-x-5' : '-translate-x-5'
          } opacity-0`}
        >
          <Image src={imgSrc} alt="Men white shirt" width="360" height="490" />
        </Transition.Child>
        <NewArrivalCardContent
          title={title}
          description={description}
          styleProps={styleProps}
        />
      </Transition>
    </article>
  );
};

export default NewArrivalCard;
