import { ComputedPageHeight } from "../../hooks";
import { DailyHeader } from "../../components/dailyHeader";
import { useAuthContext } from "../../providers/withAuth";

export default function Dashboard() {
    // const data = useAuthContext();
    // console.log('HERE IS THE AUTH CONTEXT', data);
    return (
        <div
            className={`w-full text-gray-300 flex flex-wrap flex-row md:flex-nowrap`}
            style={{ height: ComputedPageHeight() }}
        >
            <div
                className="bg-black w-full h-12 md:w-16 md:h-full flex flex-col md:flex-row">
                SideBar
            </div>
            <div className="bg-yellow-500 flex flex-wrap flex-row w-full h-full md:flex-nowrap">
                <div
                    className="bg-gray-800 w-full min-h-[150px] md:w-96 md:h-full flex flex-row md:flex-col">
                    Month views
                </div>
                <div className="bg-slate-800 w-full h-full flex flex-row md:flex-col p-2">
                    {/* daily header */}
                    <DailyHeader />
                </div>
            </div>
        </div>
    );
};