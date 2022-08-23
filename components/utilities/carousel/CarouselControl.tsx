import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  animatePageState,
  arrImageState,
  currentPageState,
  transitionPageState,
} from '../../../state/carousel/carouselAtoms';
import { sizePageState } from '../../../state/carousel/carouselSelectors';
import { IImage } from './Carousel';

export type TCarouselControl = {} & React.ComponentPropsWithoutRef<'div'>;

const CarouselControl: React.FC<TCarouselControl> = ({
  className,
  ...divProps
}) => {
  const arrImage = useRecoilValue(arrImageState);
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
  const sizePage = useRecoilValue(sizePageState);
  const setAnimatePage = useSetRecoilState(animatePageState);
  const setTransitionPage = useSetRecoilState(transitionPageState);

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

  const handleMoveNextPage = () => {
    setAnimatePage(700);
    setCurrentPage((currentPage) =>
      currentPage < sizePage ? currentPage + 1 : 1
    );
    if (currentPage < sizePage) {
      setTransitionPage(false);
    } else {
      setTransitionPage(true);
    }
  };

  const handleMovePageSelected = (pageSelected: number) => {
    setAnimatePage(700);
    setCurrentPage(pageSelected);
    console.log(currentPage, pageSelected);
    if (
      (currentPage === sizePage && pageSelected === 1) ||
      (currentPage === 1 && pageSelected === sizePage)
    ) {
      setTransitionPage(true);
    } else {
      setTransitionPage(false);
    }
  };

  return (
    <div
      {...divProps}
      className={`flex justify-between absolute top-0 w-full h-full ${className}`}
    >
      <CarouselControlPrevious handleMovePrevPage={handleMovePrevPage} />
      <CarouselControlIndicators
        arrImage={arrImage}
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
  <div className="h-full w-2/12 flex items-center shadow-[60px_0_30px_-40px_rgba(255,255,255,0.6)_inset]">
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
  <div className="h-full w-2/12 flex items-center justify-end shadow-[-60px_0_30px_-40px_rgba(255,255,255,0.6)_inset]">
    <button onClick={handleMoveNextPage} type="button" aria-label="Next page">
      <ChevronRightIcon className="h-10 text-white text-opacity-80 active:text-opacity-80" />
    </button>
  </div>
);

const CarouselControlIndicators: React.FC<{
  arrImage: IImage[];
  currentPage: number;
  handleMovePageSelected: (pageSelected: number) => void;
}> = ({ arrImage, currentPage, handleMovePageSelected }) => (
  <div className="flex items-end gap-4 mb-3">
    {arrImage.map((_, idx) => (
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
