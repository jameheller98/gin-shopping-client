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

class CalendarCentral {
  handleDatesOfMonth(year: number, month: number) {
    const date = new Date(year, month, 1);
    const dates = [];

    while (date.getMonth() === month) {
      dates.push(new Date(date));

      date.setUTCDate(date.getUTCDate() + 1);
    }

    return dates;
  }

  handleFillDatesOfMonth(
    year: number,
    month: number,
    datesOfMonth: Array<Date>
  ) {
    const dateStart = new Date(year, month, 1);
    const dateEnd = new Date(year, month, datesOfMonth.length);
    const datesBeforeDateStart = [];
    const datesAfterDateEnd = [];

    while (dateStart.getUTCDay() > 0) {
      dateStart.setUTCDate(dateStart.getUTCDate() - 1);

      datesBeforeDateStart.push(new Date(dateStart));
    }

    let rowNeedForTable = this.handleRowNeedForTable(
      datesBeforeDateStart.length,
      datesAfterDateEnd.length,
      datesOfMonth.length
    );

    while (dateEnd.getUTCDay() < 6 || rowNeedForTable < 6) {
      dateEnd.setUTCDate(dateEnd.getUTCDate() + 1);

      datesAfterDateEnd.push(new Date(dateEnd));

      rowNeedForTable = this.handleRowNeedForTable(
        datesBeforeDateStart.length,
        datesAfterDateEnd.length,
        datesOfMonth.length
      );
    }

    return [
      ...datesBeforeDateStart.reverse(),
      ...datesOfMonth,
      ...datesAfterDateEnd,
    ];
  }

  handleRowNeedForTable(
    lengthDatesBefore: number,
    lengthDatesAfter: number,
    lengthDatesMonth: number
  ) {
    return Math.ceil(
      (lengthDatesBefore + lengthDatesAfter + lengthDatesMonth) / 7
    );
  }
}

export { GalleryGrid, CalendarCentral };
