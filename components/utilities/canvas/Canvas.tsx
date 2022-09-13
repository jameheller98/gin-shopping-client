import useCanvas from '../../../state/hooks/useCanvas';
import { Shape } from '../../../utils/common/commonClass';

export type TCanvas = {
  width: number;
  height: number;
  draw: (_context: CanvasRenderingContext2D) => void;
  shapeObj?: Shape;
} & React.ComponentPropsWithoutRef<'canvas'>;

const Canvas: React.FC<TCanvas> = ({
  width,
  height,
  draw,
  shapeObj,
  className,
  ...canvasProps
}) => {
  const { canvasRef, handleMouseDown, handleMouseMove, handleMouseUp } =
    useCanvas(draw, shapeObj);

  return (
    <canvas
      {...canvasProps}
      width={width}
      height={height}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      ref={canvasRef}
      className={`${className}`}
    />
  );
};

export default Canvas;
