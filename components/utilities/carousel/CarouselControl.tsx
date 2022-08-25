import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  arrImgSrcState,
  autoPlayPageState,
} from '../../../state/carousel/carouselAtoms';
import { movePageState } from '../../../state/carousel/carouselSelectors';

export type TCarouselControl = {} & React.ComponentPropsWithoutRef<'div'>;

let interval: NodeJS.Timer;

const CarouselControl: React.FC<TCarouselControl> = ({
  className,
  ...divProps
}) => {
  const arrImgSrc = useRecoilValue(arrImgSrcState);
  const autoPlayPage = useRecoilValue(autoPlayPageState);
  const [movePage, setMovePage] = useRecoilState(movePageState);

  useEffect(() => {
    if (autoPlayPage) {
      interval = setInterval(() => {
        setMovePage(({ pageSelected }) => ({
          typeMovePage: 'nextPage',
          pageSelected,
        }));
      }, 3000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [setMovePage, autoPlayPage]);

  return (
    <div
      {...divProps}
      className={`flex justify-between absolute top-0 w-full h-full pointer-events-none ${className}`}
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
    </div>
  );
};

const CarouselControlPrevious: React.FC<{
  handleMovePrevPage: () => void;
}> = ({ handleMovePrevPage }) => (
  <div className="h-full w-2/12 flex items-center shadow-[30px_0_40px_-25px_rgba(0,0,0,0.5)_inset]">
    <button
      onClick={handleMovePrevPage}
      type="button"
      aria-label="Previous page"
      className="pointer-events-auto"
    >
      <ChevronLeftIcon className="h-10 text-white text-opacity-80 active:text-opacity-80" />
    </button>
  </div>
);

const CarouselControlNext: React.FC<{
  handleMoveNextPage: () => void;
}> = ({ handleMoveNextPage }) => (
  <div className="h-full w-2/12 flex items-center justify-end shadow-[-30px_0_40px_-25px_rgba(0,0,0,0.5)_inset]">
    <button
      onClick={handleMoveNextPage}
      type="button"
      aria-label="Next page"
      className="pointer-events-auto"
    >
      <ChevronRightIcon className="h-10 text-white text-opacity-80 active:text-opacity-80" />
    </button>
  </div>
);

const CarouselControlIndicators: React.FC<{
  arrImgSrc: string[];
  currentPage: number;
  handleMovePageSelected: (_pageSelected: number) => void;
}> = ({ arrImgSrc, currentPage, handleMovePageSelected }) => (
  <div className="flex items-end gap-4 mb-5">
    {arrImgSrc.map((_, idx) => (
      <button
        key={idx}
        onClick={() => handleMovePageSelected(idx + 1)}
        aria-label={`Page ${idx + 1}`}
        className="pointer-events-auto"
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
