import { MouseEvent } from 'react';

class GalleryGrid {
  private countNumberRowPresent = 1;
  private countNumberItemIsSet = 0;
  private maxNumberItem = 3;

  constructor(
    countNumberRowPresent: number,
    countNumberItemIsSet: number,
    maxNumberItem: number
  ) {
    this.countNumberRowPresent = countNumberRowPresent;
    this.countNumberItemIsSet = countNumberItemIsSet;
    this.maxNumberItem = maxNumberItem;
  }

  calNumberColAndRowPresent() {
    let gridRowStart = 0,
      gridRowEnd = 0;

    this.countNumberItemIsSet += 1;

    if (this.countNumberItemIsSet % this.maxNumberItem === 1) {
      gridRowStart = this.countNumberRowPresent;
      gridRowEnd = this.countNumberRowPresent + this.maxNumberItem - 1;
    } else {
      gridRowStart = this.countNumberRowPresent + 1;
      gridRowEnd = this.countNumberRowPresent + this.maxNumberItem;
    }

    if (this.countNumberItemIsSet % this.maxNumberItem === 0) {
      this.countNumberRowPresent += this.maxNumberItem - 1;
    }

    return {
      gridRowStart,
      gridRowEnd,
    };
  }

  calTotalRow(numberItem: number) {
    const numberGroupItem = Math.ceil(numberItem / this.maxNumberItem);

    if (numberItem % this.maxNumberItem === 1) {
      return numberGroupItem * 2;
    }

    return numberGroupItem * 2 + 1;
  }

  positionItemFollowCol() {
    if (this.countNumberItemIsSet % this.maxNumberItem === 1) {
      return 'center';
    }

    if (this.countNumberItemIsSet % this.maxNumberItem === 2) {
      return 'left';
    }

    return 'right';
  }

  resetProperty() {
    this.countNumberRowPresent = 1;
    this.countNumberItemIsSet = 0;
    this.maxNumberItem = 3;
  }
}

interface IShape {
  x: number;
  y: number;
  startX: number;
  startY: number;
  isDragging: boolean;
  ctx: CanvasRenderingContext2D | null;
  draw: (_ctx: CanvasRenderingContext2D) => void;
}

abstract class Shape implements IShape {
  x = 0;
  y = 0;
  startX = 0;
  startY = 0;
  ctx = null;
  isDragging = false;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  abstract draw(_ctx: CanvasRenderingContext2D): void;

  abstract down(_event: MouseEvent<HTMLCanvasElement>): void;

  abstract move(
    _event: MouseEvent<HTMLCanvasElement>,
    _ctx: CanvasRenderingContext2D,
    _widthCanvas?: number,
    _heightCanvas?: number
  ): void;

  abstract up(_event: MouseEvent<HTMLCanvasElement>): void;
}

class Rect extends Shape {
  width = 0;
  height = 0;

  constructor(x: number, y: number, width: number, height: number) {
    super(x, y);
    this.width = width;
    this.height = height;
  }

  draw(
    ctx: CanvasRenderingContext2D,
    widthCanvas?: number,
    heightCanvas?: number
  ) {
    if (widthCanvas && heightCanvas)
      ctx.clearRect(0, 0, widthCanvas, heightCanvas);
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineDashOffset = 10;
    ctx.setLineDash([15]);
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }

  hitBox() {
    if (
      this.startX >= this.x &&
      this.startX <= this.x + this.width &&
      this.startY >= this.y &&
      this.startY <= this.y + this.height
    ) {
      return true;
    }
    return false;
  }

  down(event: MouseEvent<HTMLCanvasElement>) {
    this.startX = event.nativeEvent.offsetX;
    this.startY = event.nativeEvent.offsetY;
    this.isDragging = this.hitBox();
  }

  move(
    event: MouseEvent<HTMLCanvasElement>,
    ctx: CanvasRenderingContext2D,
    widthCanvas?: number,
    heightCanvas?: number
  ) {
    if (!this.isDragging) return;

    const mouseX = event.nativeEvent.offsetX;
    const mouseY = event.nativeEvent.offsetY;
    const dx = mouseX - this.startX;
    const dy = mouseY - this.startY;
    this.startX = mouseX;
    this.startY = mouseY;
    this.x += dx;
    this.y += dy;
    this.draw(ctx, widthCanvas, heightCanvas);
  }

  up(event: MouseEvent<HTMLCanvasElement>) {
    this.isDragging = false;
  }
}

export { GalleryGrid, Shape, Rect };
