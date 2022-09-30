import classNames from 'classnames';
import { memo, ReactNode, useRef } from 'react';
import useWindowSize from '../../../state/hooks/useWindowSize';
import { GalleryGrid } from '../../../utils/common/commonClass';
import { TProductGallery } from './ProductGallery';
import ProductGalleryBox, { TProductGalleryBox } from './ProductGalleryBox';

export type TProductGalleryGrid = {} & TProductGallery &
  React.ComponentPropsWithoutRef<'div'>;

// eslint-disable-next-line react/display-name
const ProductGalleryGrid: React.FC<TProductGalleryGrid> = memo(
  ({ className, products, options, ...divProps }) => {
    const { width } = useWindowSize();
    const galleryGrid = useRef(new GalleryGrid(1, 0, 3));
    galleryGrid.current.resetProperty();
    const gridClassName = classNames({
      ['80px']: width < 768,
      ['160px']: width >= 768 && width < 1024,
      ['180px']: width >= 1024 && width < 1280,
      ['200px']: width > 1280,
    });

    const OptionComponent = (side: 'left' | 'right', node: ReactNode) => {
      if (node)
        return (
          <div
            className={`flex items-center justify-center rounded-md ${
              side === 'left'
                ? 'row-start-1 col-start-1'
                : 'row-start-1 col-start-3'
            }`}
          >
            {node}
          </div>
        );
      return null;
    };

    return (
      <div
        {...divProps}
        className={`grid grid-cols-3 gap-3 md:gap-10 sm:gap-5 lg:gap-20 ${className}`}
        style={{
          gridTemplateRows: `repeat(${galleryGrid.current.calTotalRow(
            products.length
          )},${gridClassName})`,
        }}
      >
        {OptionComponent('left', options?.left)}
        {OptionComponent('right', options?.right)}
        {products.map((product, idx) => {
          const { gridRowStart, gridRowEnd } =
            galleryGrid.current.calNumberColAndRowPresent();
          const positionItem = galleryGrid.current.positionItemFollowCol();
          const positionItemClassName = classNames({
            'origin-center': positionItem === 'center',
            'origin-left': positionItem === 'left',
            'origin-right': positionItem === 'right',
          }) as TProductGalleryBox['positionScale'];

          return (
            <ProductGalleryBox
              key={product.id}
              product={product}
              gridColumnStart={idx === 0 ? 2 : idx === 1 ? 3 : undefined}
              gridRowStart={gridRowStart}
              gridRowEnd={gridRowEnd}
              positionScale={positionItemClassName}
            />
          );
        })}
      </div>
    );
  }
);

export default ProductGalleryGrid;
