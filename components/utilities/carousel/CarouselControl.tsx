import { Transition } from '@headlessui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  arrImgSrcState,
  autoPlayPageState,
} from '../../../state/carousel/carouselAtoms';
import { movePageState } from '../../../state/carousel/carouselSelectors';

export type TCarouselControl = {
  keyCarousel: string;
} & React.ComponentPropsWithoutRef<'div'>;

let interval: NodeJS.Timer;

const CarouselControl: React.FC<TCarouselControl> = ({
  keyCarousel,
  className,
  ...divProps
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const arrImgSrc = useRecoilValue(arrImgSrcState);
  const autoPlayPage = useRecoilValue(autoPlayPageState);
  const [movePage, setMovePage] = useRecoilState(movePageState(keyCarousel));

  useEffect(() => {
    if (autoPlayPage) {
      interval = setInterval(() => {
        setMovePage(({ pageSelected }) => ({
          typeMovePage: 'nextPage',
          pageSelected,
        }));
      }, 3000);
    }
    setIsVisible(true);

    return () => {
      clearInterval(interval);
    };
  }, [setMovePage, autoPlayPage]);

  return (
    <Transition
      {...divProps}
      as="div"
      className={`flex justify-between absolute top-0 w-full h-full pointer-events-none ${className}`}
      show={isVisible}
    >
      <CarouselControlPrevious
        handleMovePrevPage={() =>
          setMovePage(({ pageSelected }) => ({
            typeMovePage: 'prevPage',
            pageSelected,
          }))
        }
      />
      <CarouselControlIndicators
        arrImgSrc={arrImgSrc}
        currentPage={movePage.pageSelected}
        handleMovePageSelected={(pageSelected) =>
          setMovePage({ typeMovePage: 'selectPage', pageSelected })
        }
      />
      <CarouselControlNext
        handleMoveNextPage={() =>
          setMovePage(({ pageSelected }) => ({
            typeMovePage: 'nextPage',
            pageSelected,
          }))
        }
      />
    </Transition>
  );
};

const CarouselControlPrevious: React.FC<{
  handleMovePrevPage: () => void;
}> = ({ handleMovePrevPage }) => (
  <Transition.Child
    as="div"
    className="h-full w-2/12 flex items-center shadow-[40px_0_30px_-30px_rgba(0,0,0,0.5)_inset]"
    enter="transition-opacity duration-[1200ms] ease-out"
    enterFrom="opacity-0"
    enterTo="opacity-100"
  >
    <Transition.Child
      as="button"
      onClick={handleMovePrevPage}
      type="button"
      aria-label="Previous page"
      className="pointer-events-auto"
      enter="transition-transform duration-[1200ms] ease-out delay-200"
      enterFrom="scale-50"
      enterTo="scale-1"
    >
      <ChevronLeftIcon className="h-10 text-white text-opacity-80 active:text-opacity-80" />
    </Transition.Child>
  </Transition.Child>
);

const CarouselControlNext: React.FC<{
  handleMoveNextPage: () => void;
}> = ({ handleMoveNextPage }) => (
  <Transition.Child
    as="div"
    className="h-full w-2/12 flex items-center justify-end shadow-[-40px_0_30px_-30px_rgba(0,0,0,0.6)_inset]"
    enter="transition-opacity duration-[1200ms] ease-out"
    enterFrom="opacity-0"
    enterTo="opacity-100"
  >
    <Transition.Child
      as="button"
      onClick={handleMoveNextPage}
      type="button"
      aria-label="Next page"
      className="pointer-events-auto"
      enter="transition-transform duration-[1200ms] ease-out delay-200"
      enterFrom="scale-50"
      enterTo="scale-1"
    >
      <ChevronRightIcon className="h-10 text-white text-opacity-80 active:text-opacity-80" />
    </Transition.Child>
  </Transition.Child>
);

const CarouselControlIndicators: React.FC<{
  arrImgSrc: string[];
  currentPage: number;
  handleMovePageSelected: (_pageSelected: number) => void;
}> = ({ arrImgSrc, currentPage, handleMovePageSelected }) => (
  <div className="flex items-end gap-5 mb-3">
    {arrImgSrc.map((_, idx) => (
      <button
        key={idx}
        type="button"
        aria-label={`Page ${idx + 1}`}
        className="pointer-events-auto animate-[wave-button_calc(1000ms+(500ms*(var(--var-i))))_linear_backwards]"
        onClick={() => handleMovePageSelected(idx + 1)}
        style={{ '--var-i': idx + 1 } as React.CSSProperties}
      >
        <span
          className={`h-3 w-3 bg-white block rounded-full transition-transform duration-[1000ms] ${
            currentPage === idx + 1 ? 'scale-[0.7]' : 'bg-opacity-50'
          }`}
        />
      </button>
    ))}
  </div>
);

export default CarouselControl;
