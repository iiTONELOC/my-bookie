import { useState, useEffect } from 'react';
import { useDatabaseContext } from '../../providers';
import { CalendarIcon, ClockIcon } from '@heroicons/react/outline';

export default function DailyHeader() {
    const [isMounted, setMounted] = useState(false);
    const [state, dispatch] = useDatabaseContext();

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false)
    }, []);

    const headerIconData = [
        {
            Icon: CalendarIcon,
            text: `${state.date}`
        },
        {
            Icon: ClockIcon,
            text: `${state.time}`
        }
    ];

    setInterval(() => {
        dispatch({
            type: 'SET_TIME',
            payload: new Intl.DateTimeFormat('en-US', { timeStyle: 'short' })
                .format(Date.now())
        });
    }, 10000)

    return !isMounted ? null :
        (isMounted && (
            <header className='flex flex-row justify-end h-10 text-gray-300'>
                <div className='w-1/2 flex flex-row justify-start items-center p-1'>
                    <h1 className=' text-md md:text-lg lg:text-xl xl:text-2xl'>
                        Welcome, {state.user.username || 'Guest'}!
                    </h1>
                </div>
                <div className='w-full flex flex-row justify-end items-center p-1 gap-3'>
                    {headerIconData.map(({ Icon, text }, index) => {
                        return (
                            <span
                                key={'header-icon-' + index}
                                className='flex flex-row items-center'>
                                <Icon className='w-5 h-5' />
                                <p className='ml-3 text-sm '>{text}</p>
                            </span>
                        )
                    })}
                </div>
            </header>));
};