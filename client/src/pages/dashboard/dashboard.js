import { useState, useEffect } from 'react';
import { ComputedPageHeight } from "../../hooks";
import { DailyView } from "../../components/dailyView";
import { useAuthContext } from "../../providers/withAuth";
import { DailyHeader } from "../../components/dailyHeader";

// the dashboard's default is the daily view
// the side bar displays a monthly view and defaults to the current month
// the dashboard should fetch all the events for the current month
// save it in it's state and pass it down to the daily header
// and daily view. The dashboard should also track the current
// view which can be changed by the user in the month view 


export default function Dashboard() {
    const [pageHeight] = useState(ComputedPageHeight());
    const [isMounted, setMounted] = useState(false);
    const data = useAuthContext();

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false)
    }, []);

    useEffect(() => {
        if (isMounted === true) {
            console.log('mounted')
            console.log('HERE IS THE AUTH CONTEXT', data);

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted])

    return (
        isMounted && (
            <div
                className="w-full text-gray-300 flex flex-col md:flex-row overflow-hidden"
                style={{ height: pageHeight }}
            >
                <div
                    className="bg-black w-full h-12 md:w-16 md:h-full flex flex-col md:flex-row">
                    SideBar
                </div>
                <div className="flex flex-col md:flex-row w-full h-full">
                    <div
                        className="bg-gray-800 w-full min-h-[250px]  flex flex-col md:flex-row md:w-[450px]">
                        Month views
                    </div>
                    <div className=" flex flex-col p-2 md:p-0 overflow-hidden w-full h-full mt-2 mb-6 gap-5">
                        <DailyHeader />
                        <DailyView />
                    </div>
                </div>
            </div>
        )
    );
};