import { ComputedPageHeight } from "../../hooks";
import { HeroImage } from "../../components";

const buttonData = [
    {
        text: 'Sign Up',
        link: '/sign-up',
    },
    {
        text: 'Login',
        link: '/login',
    }
];
const handleButtonClick = (e, link) => {
    e.preventDefault(); e.stopPropagation(); window.location.replace(link)
}
const btnClasses = 'flex justify-center py-2 px-4 border border-transparent text-md font-large rounded-md text-white bg-indigo-600 hover:bg-myPink focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
export default function Home() {

    // get the height of the nav and subtract it from the height of the window
    return (
        <div
            className={`w-full flex flex-col justify-center md:flex-row md:justify-start
            items-center bg-darkBlue p-1 overflow-hidden relative`}
            style={{
                height: ComputedPageHeight()
            }}>

            <div className={`text-gray-100 w-full md:w-6/12 z-40 flex flex-col justify-center items-center text-center gap-5 overflow-hidden `}>
                <h1 className="mt-36 md:mt-0 font-medium text-2xl">
                    <span className="font-medium text-4xl text-myPink">A</span>ppointments
                </h1>
                <p className="p-1">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <div className="w-max p-4 gap-10 flex justify-center">
                    {buttonData.map(({ text, link }, index) => (
                        <button
                            index={index}
                            className={`${btnClasses}`}
                            onClick={(e) => { handleButtonClick(e, link) }}
                        >
                            {text}
                        </button>
                    ))}
                </div>
            </div>
            <div className="absolute object-center top-0 mt-5 lg:m-5 md:right-0 w-6/12">
                <HeroImage />
            </div>
        </div>
    );
};