import { ComputedPageHeight } from "../../hooks";
import { DailyView } from "../../components/dailyView";
import { useAuthContext } from "../../providers/withAuth";
import { DailyHeader } from "../../components/dailyHeader";



export default function Dashboard() {
    // const data = useAuthContext();
    // console.log('HERE IS THE AUTH CONTEXT', data);

    return (
        <div
            className="w-full text-gray-300 flex flex-col md:flex-row overflow-hidden"
            style={{ height: ComputedPageHeight() }}
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
    );
};

console.log(new Date().toISOString())