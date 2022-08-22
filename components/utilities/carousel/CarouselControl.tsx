import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  currentPageState,
  sizePageState,
} from '../../../state/carousel/carouselAtoms';

export type TCarouselControl = {
  arrImgSrc: string[];
} & React.ComponentPropsWithoutRef<'div'>;

const CarouselControl: React.FC<TCarouselControl> = ({
  arrImgSrc,
  className,
  ...divProps
}) => {
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
  const sizePage = useRecoilValue(sizePageState);

  const handleMovePrevPage = () => {
    setCurrentPage((currentPage) =>
      currentPage > 1 ? currentPage - 1 : currentPage
    );
  };

  const handleMoveNextPage = () => {
    setCurrentPage((currentPage) =>
      currentPage < sizePage ? currentPage + 1 : currentPage
    );
  };

  const handleMovePageSelected = (pageSelected: number) => {
    setCurrentPage(pageSelected);
  };

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
  <div className="h-full w-2/12 flex items-center shadow-[30px_0_30px_-15px_rgba(0,0,0,0.7)_inset]">
    <button onClick={handleMovePrevPage} type="button">
      <ChevronLeftIcon className="h-10 text-white text-opacity-60 active:text-opacity-80" />
    </button>
  </div>
);

const CarouselControlNext: React.FC<{
  handleMoveNextPage: () => void;
}> = ({ handleMoveNextPage }) => (
  <div className="h-full w-2/12 flex items-center justify-end shadow-[-30px_0_30px_-15px_rgba(0,0,0,0.7)_inset]">
    <button onClick={handleMoveNextPage} type="button">
      <ChevronRightIcon className="h-10 text-white text-opacity-60 active:text-opacity-80" />
    </button>
  </div>
);

const CarouselControlIndicators: React.FC<{
  arrImgSrc: string[];
  currentPage: number;
  handleMovePageSelected: (pageSelected: number) => void;
}> = ({ arrImgSrc, currentPage, handleMovePageSelected }) => (
  <div className="flex items-end gap-3 mb-3">
    {arrImgSrc.map((_, idx) => (
      <span
        className={`h-3 w-3 bg-white  block rounded-full cursor-pointer ${
          currentPage === idx + 1 ? '' : 'bg-opacity-50'
        }`}
        key={idx}
        onClick={() => handleMovePageSelected(idx + 1)}
      />
    ))}
  </div>
);

export default CarouselControl;
