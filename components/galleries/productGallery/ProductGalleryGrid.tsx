import classNames from 'classnames';
import { ReactNode, useMemo } from 'react';
import { GalleryGrid } from '../../../utils/common/commonClass';
import { TProductGallery } from './ProductGallery';
import ProductGalleryBox, { TProductGalleryBox } from './ProductGalleryBox';

export type TProductGalleryGrid = {} & TProductGallery &
  React.ComponentPropsWithoutRef<'div'>;

const ProductGalleryGrid: React.FC<TProductGalleryGrid> = ({
  className,
  products,
  options,
  ...divProps
}) => {
  const galleryGrid = useMemo(() => new GalleryGrid(), []);

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
      className={`grid grid-cols-3 gap-3 ${className}`}
      style={{
        gridTemplateRows: `repeat(${galleryGrid.calTotalRow(
          products.length
        )},80px)`,
      }}
    >
      {OptionComponent('left', options?.left)}
      {OptionComponent('right', options?.right)}
      {products.map(({ imgSrc, price }, idx) => {
        const { gridRowStart, gridRowEnd } =
          galleryGrid.calNumberColAndRowPresent();
        const positionItem = galleryGrid.positionItemFollowCol();
        const positionItemClassName = classNames({
          'origin-center': positionItem === 'center',
          'origin-left': positionItem === 'left',
          'origin-right': positionItem === 'right',
        }) as TProductGalleryBox['positionScale'];

        return (
          <ProductGalleryBox
            key={idx}
            imgSrc={imgSrc[0]}
            priceProduct={price}
            gridColumnStart={idx === 0 ? 2 : undefined}
            gridRowStart={gridRowStart}
            gridRowEnd={gridRowEnd}
            positionScale={positionItemClassName}
          />
        );
      })}
    </div>
  );
};

export default ProductGalleryGrid;
