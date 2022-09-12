import { MouseEvent, useEffect, useRef } from 'react';
import { Shape } from '../../utils/common/commonClass';

const useCanvas = (
  draw: (_context: CanvasRenderingContext2D) => void,
  shapeObj: Shape
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleMouseDown = (event: MouseEvent<HTMLCanvasElement>) => {
    shapeObj.down(event);
  };

  const handleMouseMove = (event: MouseEvent<HTMLCanvasElement>) => {
    const ctx = canvasRef.current?.getContext('2d')!;

    shapeObj.move(
      event,
      ctx,
      canvasRef.current?.clientWidth,
      canvasRef.current?.clientHeight
    );
  };

  const handleMouseUp = (event: MouseEvent<HTMLCanvasElement>) => {
    shapeObj.up(event);
  };

  useEffect(() => {
    const { current: currentCanvas } = canvasRef;

    if (currentCanvas) {
      const ctx = currentCanvas.getContext('2d')!;

      draw(ctx);
    }
  }, [draw]);

  return { canvasRef, handleMouseDown, handleMouseMove, handleMouseUp };
};

export default useCanvas;
