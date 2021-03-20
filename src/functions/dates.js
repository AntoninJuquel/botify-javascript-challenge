export function closestDate(datesArray) {
    const beforedates = datesArray.filter(date => date - new Date() < 0)
    const closestDate = beforedates.pop()
    return { date: closestDate, index: datesArray.indexOf(closestDate) }
}

export function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}