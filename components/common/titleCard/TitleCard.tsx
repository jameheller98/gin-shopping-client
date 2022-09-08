import { Transition } from '@headlessui/react';
import { useRef } from 'react';
import useIntersectionObserver from '../../../state/hooks/useIntersectionObserver';

export type TTitleCard = {
  title: string;
  posHorizal?: 'top' | 'bottom';
} & React.ComponentPropsWithoutRef<'div'>;

const TitleCard: React.FC<TTitleCard> = ({
  title,
  posHorizal = 'top',
  className,
  ...divProps
}) => {
  const refTitleCard = useRef<null | HTMLDivElement>(null);
  const entry = useIntersectionObserver(refTitleCard, {
    threshold: 0.5,
    freezeOnceVisible: true,
  });
  const isVisible = !!entry?.isIntersecting;

  return (
    <div className="w-full" ref={refTitleCard}>
      <Transition {...divProps} show={isVisible} className={`${className}`}>
        {posHorizal === 'top' && (
          <Transition.Child
            as="div"
            enter="transition-transform duration-1000"
            enterFrom="scale-0"
            enterTo="scale-100"
          >
            <hr className="mx-4 mt-6 mb-2 border-t-2 border-slate-500" />
          </Transition.Child>
        )}
        <Transition.Child
          as="h1"
          className="text-3xl text-center tracking-wider ml-[-0.05em]"
          enter="transition-transform duration-1000 delay-300"
          enterFrom="scale-0"
          enterTo="scale-100"
        >
          {title}
        </Transition.Child>
        {posHorizal === 'bottom' && (
          <Transition.Child
            as="div"
            enter="transition-transform duration-1000"
            enterFrom="scale-0"
            enterTo="scale-100"
          >
            <hr className="mx-4 mb-6 mt-2 border-t-2 border-slate-500" />
          </Transition.Child>
        )}
      </Transition>
    </div>
  );
};

export default TitleCard;
