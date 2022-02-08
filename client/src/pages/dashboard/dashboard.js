import { ComputedPageHeight } from "../../hooks";
import { DailyHeader } from "../../components/dailyHeader";
import { useAuthContext } from "../../providers/withAuth";
import { DailyView } from "../../components/dailyView";

export default function Dashboard() {
    // const data = useAuthContext();
    // console.log('HERE IS THE AUTH CONTEXT', data);
    const height = ComputedPageHeight();
    console.log('HERE IS THE HEIGHT', height);
    return (
        <div
            className="w-full text-gray-300 flex flex-col md:flex-row  bg-purple-500  overflow-hidden"
            style={{ height: height }}
        >

            <div
                className="bg-black w-full h-12 md:w-16 md:h-full flex flex-col md:flex-row">
                SideBar
            </div>
            <div className="flex  flex-col md:flex-row w-full bg-blue-900 h-full  ">
                <div
                    className="bg-gray-800 w-full min-h-[250px]  flex flex-col md:flex-row md:w-[450px]">
                    Month views
                </div>

                <div
                    className=" flex flex-col p-5 md:p-0 overflow-hidden bg-black w-full"
                /*className=" w-full h-full flex flex-row flex-wrap md:flex-col md:items-start md:flex-nowrap p-2 "*/>
                    {/* daily header */}
                    <DailyHeader />
                    {/* daily events */}
                    <DailyView />
                </div>
            </div>

        </div>
    );
};