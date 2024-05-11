import dayjs from "dayjs";

export const formatDate = (dateString) => {
    const now = dayjs();
  
    const date = dayjs(dateString);
    const minutesDiff = now.diff(date, 'minute');
  
    // Less than 60 minutes old
    if (minutesDiff < 60) {
      return `${minutesDiff} ${minutesDiff <= 1 ? 'minute' : 'minutes'} ago`;

    } else if (minutesDiff >= 60 && minutesDiff < 1440) { // Between 1 hour to 23 hours old
      const hoursDiff = Math.floor(minutesDiff / 60);
      return `${hoursDiff} ${hoursDiff <= 1 ? 'hour' : 'hours'} ago`;

    } else { // More than 23 hours old
      return date.$y === now.$y ? date.format('MMM D, h:mm A') : date.format('MMM D, YYYY h:mm A');
    }
  };

  export const createMarkups = (htmlString) => {
    return { __html: htmlString };
  };