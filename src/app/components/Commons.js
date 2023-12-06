import dayjs from 'dayjs';

const compareDates = (date1, date2) => {
    const parsedDate1 = dayjs(date1);
    const parsedDate2 = dayjs(date2);
  
    if (parsedDate1.isBefore(parsedDate2)) {
      return -1;
    } else if (parsedDate1.isAfter(parsedDate2)) {
      return 1;
    } else {
      return 0;
    }
};

module.exports = { compareDates };