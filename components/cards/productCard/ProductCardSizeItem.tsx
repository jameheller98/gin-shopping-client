import classnames from 'classnames';
import { useRecoilValue } from 'recoil';
import {
  IProductData,
  IProductSize,
  IProductStock,
} from '../../../libs/product/interfaces';
import { stockOrderIdState } from '../../../state/product/productAtoms';
import Canvas from '../../utilities/canvas/Canvas';

export type TProductCardSizeItem = {
  value: IProductSize['value'];
  productId: IProductData['id'];
  stockDetail?: IProductStock;
  handleOrderSize: (_stockId: string) => void;
} & React.ComponentPropsWithoutRef<'li'>;

const ProductCardSizeItem: React.FC<TProductCardSizeItem> = ({
  value,
  productId,
  stockDetail,
  handleOrderSize,
  className,
  ...liProps
}) => {
  const stockOrderId = useRecoilValue(stockOrderIdState(productId));
  const isStockClassName = classnames({
    ['opacity-100']: stockDetail?.isStock,
    ['opacity-50 pointer-events-none']: !stockDetail?.isStock,
  });
  const isActiveSizeClassName = classnames({
    ['bg-slate-400 text-slate-50']: stockOrderId === stockDetail?.id,
    ['bg-transparent text-slate-700']: stockOrderId !== stockDetail?.id,
  });

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = 'rgba(0,0,0,0.3)';
    ctx.moveTo(3, 3);
    ctx.lineTo(37, 37);
    ctx.moveTo(3, 37);
    ctx.lineTo(37, 3);
    ctx.stroke();
  };

  return (
    <li {...liProps}>
      <button
        className={`border-2 border-slate-300 w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold ${isActiveSizeClassName} ${isStockClassName} ${className}`}
        onClick={() => handleOrderSize(stockDetail?.id || '')}
      >
        {!stockDetail?.isStock && (
          <Canvas width={40} height={40} draw={draw} className="absolute" />
        )}
        {value}
      </button>
    </li>
  );
};

export default ProductCardSizeItem;
