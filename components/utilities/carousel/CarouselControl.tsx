import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { useCallback, useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  animatePageState,
  arrImgSrcState,
  autoPlayPageState,
  currentPageState,
  transitionPageState,
} from '../../../state/carousel/carouselAtoms';
import { sizePageState } from '../../../state/carousel/carouselSelectors';

export type TCarouselControl = {} & React.ComponentPropsWithoutRef<'div'>;

let interval: NodeJS.Timer;

const CarouselControl: React.FC<TCarouselControl> = ({
  className,
  ...divProps
}) => {
  const arrImgSrc = useRecoilValue(arrImgSrcState);
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
  const sizePage = useRecoilValue(sizePageState);
  const setAnimatePage = useSetRecoilState(animatePageState);
  const setTransitionPage = useSetRecoilState(transitionPageState);
  const autoPlayPage = useRecoilValue(autoPlayPageState);

  const handleMovePrevPage = () => {
    setAnimatePage(700);
    setCurrentPage((currentPage) =>
      currentPage > 1 ? currentPage - 1 : sizePage
    );
    if (currentPage > 1) {
      setTransitionPage(false);
    } else {
      setTransitionPage(true);
    }
  };

  const handleMoveNextPage = useCallback(() => {
    setAnimatePage(700);
    setCurrentPage((currentPage) =>
      currentPage < sizePage ? currentPage + 1 : 1
    );
    if (currentPage < sizePage) {
      setTransitionPage(false);
    } else {
      setTransitionPage(true);
    }
  }, [
    currentPage,
    sizePage,
    setAnimatePage,
    setCurrentPage,
    setTransitionPage,
  ]);

  const handleMovePageSelected = (pageSelected: number) => {
    setAnimatePage(700);
    setCurrentPage(pageSelected);
    if (
      (currentPage === sizePage && pageSelected === 1) ||
      (currentPage === 1 && pageSelected === sizePage)
    ) {
      setTransitionPage(true);
    } else {
      setTransitionPage(false);
    }
  };

  useEffect(() => {
    if (autoPlayPage) {
      interval = setInterval(() => {
        handleMoveNextPage();
      }, 3000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [handleMoveNextPage, autoPlayPage]);

  return (
    <div
      {...divProps}
      className={`flex justify-between absolute top-0 w-full h-full ${className}`}
    >
      <CarouselControlPrevious handleMovePrevPage={handleMovePrevPage} />
      <CarouselControlIndicators
        arrImgSrc={arrImgSrc}
        currentPage={currentPage}
        handleMovePageSelected={handleMovePageSelected}
      />
      <CarouselControlNext handleMoveNextPage={handleMoveNextPage} />
    </div>
  );
};

const CarouselControlPrevious: React.FC<{
  handleMovePrevPage: () => void;
}> = ({ handleMovePrevPage }) => (
  <div className="h-full w-2/12 flex items-center shadow-[50px_0_30px_-40px_rgba(0,0,0,0.6)_inset]">
    <button
      onClick={handleMovePrevPage}
      type="button"
      aria-label="Previous page"
    >
      <ChevronLeftIcon className="h-10 text-white text-opacity-80 active:text-opacity-80" />
    </button>
  </div>
);

const CarouselControlNext: React.FC<{
  handleMoveNextPage: () => void;
}> = ({ handleMoveNextPage }) => (
  <div className="h-full w-2/12 flex items-center justify-end shadow-[-50px_0_30px_-40px_rgba(0,0,0,0.6)_inset]">
    <button onClick={handleMoveNextPage} type="button" aria-label="Next page">
      <ChevronRightIcon className="h-10 text-white text-opacity-80 active:text-opacity-80" />
    </button>
  </div>
);

const CarouselControlIndicators: React.FC<{
  arrImgSrc: string[];
  currentPage: number;
  handleMovePageSelected: (_pageSelected: number) => void;
}> = ({ arrImgSrc, currentPage, handleMovePageSelected }) => (
  <div className="flex items-end gap-4 mb-3">
    {arrImgSrc.map((_, idx) => (
      <button
        key={idx}
        onClick={() => handleMovePageSelected(idx + 1)}
        aria-label={`Page ${idx + 1}`}
      >
        <span
          className={`h-3 w-3 bg-white block rounded-full${
            currentPage === idx + 1 ? '' : ' bg-opacity-50'
          }`}
        />
      </button>
    ))}
  </div>
);

export default CarouselControl;
