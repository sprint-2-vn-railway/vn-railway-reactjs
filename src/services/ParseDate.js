export const parseDate = (inputDateString) => {
    const moment = require('moment');
    const outputDateFormat = "DD-MM-YYYY HH:mm:ss";
    const parsedDate = moment(inputDateString).format(outputDateFormat);
    return parsedDate;
}