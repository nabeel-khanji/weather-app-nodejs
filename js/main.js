const curDate = document.getElementById('date');
let weathercon = document.getElementById('weathercon');
const tempStatus = '{%tempstatus%}';
const getCurrentDay = () => {
    var weekDay = new Array(7);
    weekDay[0] = 'Sun';
    weekDay[1] = 'Mon';
    weekDay[2] = 'Tue';
    weekDay[3] = 'Wed';
    weekDay[4] = 'Thu';
    weekDay[5] = 'Fri';
    weekDay[6] = 'Sat';

    let currentTime = new Date();
    let day = weekDay[currentTime.getDay()];
    return day;
};
const getCurrentTime = () => {
    var months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ]
    var now = new Date();
    var month = months[now.getMonth()];
    var date = now.getDate();
    let hours = now.getHours();
    let min = now.getMinutes();
    let period = 'AM';
    if (hours > 11) {
        period = 'PM'
        if (hours > 12) {
            hours -= 12;
        }
    }
    if (min < 10) {
        min = '0' + min;
    }

    return `${month} ${date} | ${hours}:${min}${period}`;
}
curDate.innerHTML = getCurrentDay() + ' | ' + getCurrentTime();