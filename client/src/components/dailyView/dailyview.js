import { useState, useEffect } from 'react';

const hours = [];
function formatTime(hour) {
    const aP = hour >= 12 ? 'PM' : 'AM';
    hour %= 12;
    if (hour === 0) hour = 12
    return `${hour}:00 ${aP}`;
};

for (let i = 0; i < 24; i++) {
    const hour = { time: formatTime(i), event: false };
    hours.push(hour);
};

function scrollIntoView() {
    try {
        const current = document.querySelector('.current-hour')
        current.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        return
    }
};
const currentHourClass = 'border-myPink border-solid border-2 current-hour';
const pastHourClass = 'border-gray-800 border-solid border-2 stripes-gray';
const futureHourClass = 'border-gray-800 border-solid border-2';
function handleCurrentPast(hour, currentHour) {
    return hour === currentHour ? currentHourClass :
        hour < currentHour ? pastHourClass : ''

}
function handleFuture(hour, currentHour) {
    return hour > currentHour ? futureHourClass : ''
}
export default function DailyView(date) {
    const [isMounted, setIsMounted] = useState(false);
    const [currentHour, setCurrentHour] = useState(new Date().getHours());
    function handleCurrent() {
        setInterval(() => {
            const time = new Date().getHours();
            if (time !== currentHour) {
                setCurrentHour(time)
            }
        }, 5000)
    }
    useEffect(() => {
        setIsMounted(true);
        return () => { setIsMounted(false); window.removeEventListener('resize', () => scrollIntoView()) };
    }, [])
    useEffect(() => {
        scrollIntoView()

        if (isMounted) {
            window.addEventListener('resize', () => scrollIntoView());
            handleCurrent()
        }
        // eslint-disable-next-line
    }, [isMounted])
    if (!isMounted) return null;

    return (
        isMounted && (
            <div className="flex flex-col w-full h-full rounded-lg gap-3 p-3  overflow-y-auto">
                {hours.map((hour, index) => {
                    return (
                        <>
                            {/* Individual hour container */}
                            <div
                                key={index}
                                datahour={index}
                                className={`flex flex-row w-full h-24 rounded-lg ${handleCurrentPast(index, currentHour)} ${hour.event ?
                                    handleFuture(index, currentHour) : null}`}
                            >
                                <span className="w-28 p-2 text-center"><p>{hour.time}</p></span>
                                {/* the event wrapper */}
                                <div className={`flex flex-row w-full h-full justify-center items-center`}>
                                    <div className={`${hour.event ? 'bg-gray-800 h-full'
                                        : 'border-t-2 border-gray-500 flex flex-row flex-wrap h-auto'} w-full `}>
                                        {hour.event && (
                                            <p>
                                                lorem ipsum dolor sit amet consectetur adipisicing elit.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}
            </div>
        )
    );
};