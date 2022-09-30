import useCanvas from '../../../state/hooks/useCanvas';

export type TCanvas = {
  width: number;
  height: number;
  draw: (_context: CanvasRenderingContext2D) => void;
} & React.ComponentPropsWithoutRef<'canvas'>;

const Canvas: React.FC<TCanvas> = ({
  width,
  height,
  draw,
  className,
  ...canvasProps
}) => {
  const { canvasRef } = useCanvas(draw);

  return (
    <canvas
      {...canvasProps}
      width={width}
      height={height}
      ref={canvasRef}
      className={`${className}`}
    />
  );
};

export default Canvas;
