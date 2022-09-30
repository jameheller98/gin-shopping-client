import { useEffect, useRef } from 'react';

const useCanvas = (draw: (_context: CanvasRenderingContext2D) => void) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const { current: currentCanvas } = canvasRef;

    if (currentCanvas) {
      const ctx = currentCanvas.getContext('2d')!;

      draw(ctx);
    }
  }, [draw]);

  return { canvasRef };
};

export default useCanvas;
