import dayjs from 'dayjs';

function getMonth(month = dayjs().month()){
    const year = dayjs().year();
    const firstDayOfMonth = dayjs(new Date(year, month, 1)).day();
    let currentMonthCount = 0 - firstDayOfMonth;

    const daysMatrix = new Array(5).fill([]).map(() => {
        return new Array(7).fill(null).map(() => {
            currentMonthCount++;
            return dayjs(new Date(year, month, currentMonthCount))
        })
    })

    return daysMatrix;
}

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

function compareDateKeys(a, b) {
  const dateA = new Date(Object.keys(a)[0]);
  const dateB = new Date(Object.keys(b)[0]);

  if (dateA < dateB) {
    return -1;
  }
  if (dateA > dateB) {
    return 1;
  }
  return 0;
}

const sortDates = (date1, date2) => {
  const dayjsDate1 = dayjs(date1);
  const dayjsDate2 = dayjs(date2);

  return dayjsDate1.diff(dayjsDate2);
}

const sortNames = (name1, name2) => {
  // Convert names to lowercase for case-insensitive sorting
  name1 = name1.toLowerCase();
  name2 = name2.toLowerCase();

  // Compare names
  if (name1 < name2) {
    return -1;
  }
  if (name1 > name2) {
    return 1;
  }
  // Names are equal
  return 0;
}

module.exports = { getMonth, compareDates, compareDateKeys, sortNames};