import { Rect } from '../../../utils/common/commonClass';
import { TCanvas } from './Canvas';

const rect = new Rect(10, 10, 150, 150);

const base: TCanvas = {
  width: 500,
  height: 400,
  draw: (ctx) => {
    rect.draw(ctx);
  },
  shapeObj: rect,
};

export const mockCanvasProps = {
  base,
};
