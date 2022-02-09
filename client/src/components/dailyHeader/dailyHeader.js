import { useState, useEffect } from 'react';
import { CalendarIcon, ClockIcon } from '@heroicons/react/outline'
import { useAuthContext } from '../../providers/withAuth'
export default function DailyHeader() {
    const userData = useAuthContext();
    const [time, setTime] = useState(Date.now());
    const [mounted, setMounted] = useState(false);
    const timerUpdater = () => {
        setTime(Date.now())
    };
    useEffect(() => {
        if (!mounted) setMounted(true);
        return () => { setMounted(false); clearInterval(timerUpdater) };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        if (mounted) {
            setTime(Date.now())
            setInterval(timerUpdater, 10000);
        }
    }, [mounted])

    const headerIconData = [
        {
            Icon: CalendarIcon,
            text: `${new Intl.DateTimeFormat('en-US')
                .format(Date.now())}`
        },
        {
            Icon: ClockIcon,
            text: `${new Intl.DateTimeFormat('en-US',
                { timeStyle: 'short' })
                .format(time)}`
        }
    ]
    return (
        <header className='flex flex-row justify-end h-10 text-gray-300'>
            <div className='w-1/2 flex flex-row justify-start items-center p-1'>
                <h1 className=' text-md md:text-lg lg:text-xl xl:text-2xl'>
                    Welcome, {userData?.isAuthenticated?.user?.username || 'Guest'}!
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
        </header>
    )
}