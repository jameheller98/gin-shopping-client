class GalleryGrid {
  private countNumberRowPresent = 1;
  private countNumberItemIsSet = 0;
  private maxNumberItem = 3;

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
}

export { GalleryGrid };
