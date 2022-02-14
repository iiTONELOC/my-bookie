import { useState, useEffect } from 'react';
import { ComputedPageHeight } from "../../hooks";
import { DailyView } from "../../components/dailyView";
import { useDatabaseContext } from '../../providers';
import { DailyHeader } from "../../components/dailyHeader";
import { EventsController } from '../../utils/api/events';
import { getUserEvents } from './helpers';
// the dashboard's default is the daily view
// the side bar displays a monthly view and defaults to the current month
// the dashboard should fetch all the events for the current month
// save it in it's state and pass it down to the daily header
// and daily view. The dashboard should also track the current
// view which can be changed by the user in the month view 

const { getEventsByMonth } = EventsController;

export default function Dashboard() {
    const [pageHeight] = useState(ComputedPageHeight());
    const [isMounted, setMounted] = useState(false);
    const [state, dispatch] = useDatabaseContext();

    useEffect(() => {
        setMounted(true);
        // fetch the events for the current month, saves to state
        getUserEvents(getEventsByMonth, dispatch);
        return () => setMounted(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        !isMounted ? null :
            (
                <div
                    className="w-full text-gray-300 flex flex-col md:flex-row overflow-hidden"
                    style={{ height: pageHeight }}
                >
                    <div
                        className="bg-black w-full h-12 md:w-16 md:h-full flex flex-col md:flex-row">
                        SideBar
                    </div>
                    <div className="flex flex-col md:flex-row w-full h-full">
                        {state.viewSelection !== 'monthly' && (
                            <div
                                className="bg-gray-800 w-full min-h-[250px]  flex flex-col md:flex-row md:w-[450px]">
                                Month views
                            </div>
                        )}
                        <div className=" flex flex-col p-2 md:p-0 overflow-hidden w-full h-full mt-2 mb-6 gap-5">
                            <DailyHeader {...state} />
                            {state?.viewSelection === 'daily' && <DailyView />}
                        </div>
                    </div>
                </div>
            )
    );
};