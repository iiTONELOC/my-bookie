const currentHourClass = 'border-myPink border-solid border-2 current-hour';
const pastHourClass = 'border-gray-800 border-solid border-2 stripes-gray';
const futureHourClass = 'border-gray-800 border-solid border-2';


function formatTime(hour) {
    const aP = hour >= 12 ? 'PM' : 'AM';
    hour %= 12;
    if (hour === 0) hour = 12
    return `${hour}:00 ${aP}`;
};

function hours() {
    const hours = [];
    for (let i = 0; i < 24; i++) {
        const hour = { time: formatTime(i), event: false };
        hours.push(hour);
    };
    return hours;
};



function handleCurrentPast(hour, currentHour) {
    return hour === currentHour ? currentHourClass :
        hour < currentHour ? pastHourClass : ''
};
function handleFuture(hour, currentHour) {
    return hour > currentHour ? futureHourClass : ''
};

function handleCurrent(currentHour, setCurrentHour) {
    setInterval(() => {
        const time = new Date().getHours();
        if (time !== currentHour) {
            setCurrentHour(time)
        }
    }, 5000)
};


const helpers = {
    hours,
    formatTime,
    handleCurrentPast,
    handleFuture,
    handleCurrent,
};

export default helpers