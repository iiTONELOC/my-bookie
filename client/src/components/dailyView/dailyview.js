import { useState, useEffect } from 'react';
import helpers from './utils';
import ScrollIntoView from '../../hooks/scrollIntoView';
const {
    hours,
    handleFuture,
    handleCurrent,
    handleCurrentPast,
} = helpers


export default function DailyView(date) {
    const [isMounted, setIsMounted] = useState(false);
    const [currentHour, setCurrentHour] = useState(new Date().getHours());
    ScrollIntoView();
    useEffect(() => {
        setIsMounted(true);
        return () => {
            setIsMounted(false);
            // window.removeEventListener('resize', () => scrollIntoView())
        };
    }, []);
    useEffect(() => {
        // scrollIntoView();
        if (isMounted) {
            // window.addEventListener('resize', () => scrollIntoView());
            handleCurrent(currentHour, setCurrentHour);
        }
        // eslint-disable-next-line
    }, [isMounted]);
    if (!isMounted) return null;

    return (
        isMounted && (
            <div className="flex flex-col w-full h-full rounded-lg gap-3 p-3  overflow-y-auto">
                {hours().map((hour, index) => {
                    return (
                        <>
                            {/* Individual hour container */}
                            <div
                                key={index}
                                datahour={index}
                                className={`flex flex-row w-full h-24 rounded-lg 
                                ${handleCurrentPast(index, currentHour)} ${hour.event ?
                                        handleFuture(index, currentHour) : null}`
                                }
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