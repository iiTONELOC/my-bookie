import { useState, useEffect, Fragment } from 'react';
import helpers from './utils';
import ScrollIntoView from '../../hooks/scrollIntoView';
import { useDatabaseContext } from '../../providers';
import { getUserEventsByDay } from '../../pages/dashboard/helpers';

const {
    hours,
    handleFuture,
    handleCurrent,
    handleCurrentPast,
    dailyUserData,
} = helpers

const RenderEvents = (events) => {

    return events.map(event => (
        <p className='p-2'>
            {event.description}
        </p>
    ))

}

export default function DailyView(date) {
    const [isMounted, setIsMounted] = useState(false);
    const [currentHour, setCurrentHour] = useState(new Date().getHours());
    const [hourData, setHourData] = useState(hours());
    const [state, dispatch] = useDatabaseContext();
    const [events, setEvents] = useState([]);
    ScrollIntoView();
    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);
    useEffect(() => {
        if (isMounted) handleCurrent(currentHour, setCurrentHour);
        // eslint-disable-next-line
    }, [isMounted]);
    useEffect(() => {
        if (isMounted && state.events.length > 0 && events.length === 0) {
            dailyUserData({
                state,
                hourData,
                setEvents,
                setHourData,
                getUserEventsByDay
            });
        };
        // eslint-disable-next-line
    }, [state.events.length])

    if (!isMounted) return null;
    return (
        isMounted && state.authentication.isAuthenticated && (
            <div className="flex flex-col w-full h-full rounded-lg gap-3 p-3  overflow-y-auto">
                {events.map((hour, index) => {
                    return (
                        <Fragment key={index}>
                            {/* Individual hour container */}
                            <div
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
                                            hour.event.map(item => (
                                                <p
                                                    key={hour + Date.now()}
                                                    className='p-2'>
                                                    {item.description}
                                                </p>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    )
                })}
            </div>
        )
    );
};