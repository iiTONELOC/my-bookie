const navData = [
    {
        name: 'Home',
        // icon: '',
        path: '/'
    },
    {
        name: 'About',
        // icon: '',
        path: '/about'
    },
    {
        name: 'Login',
        // icon: '',
        path: '/login'
    },
];
const loggedInData = [
    {
        name: 'Home',
        // icon: '',
        path: '/'
    },
    {
        name: 'Dashboard',
        // icon: '',
        path: '/about'
    },
    {
        name: 'Logout',
        // icon: '',
        path: '/logout'
    },
];
export default function Nav() {
    const active = (path) => {
        if (path === window.location.pathname) {
            return 'p-1 border-t-2 border-yellow-400';
        }
    }
    return (
        <nav className="bg-slate-900 w-full flex flex-row justify-between items-center text-gray-200 self-start">
            <span className=''>
                <h1 className="ml-3 align-middle text-2xl p-2">
                    MyBookie
                </h1>
            </span>
            <ul className="flex flex-row gap-10 p-2 mx-3">
                {navData.map((navItem, index) => {
                    return (
                        <li
                            className=''
                            key={'Nav: ' + navItem?.name || `${index}`}>
                            <a
                                className={`lg:text-xl hover:text-yellow-400 ${active(navItem.path)}`}
                                href={navItem.path}>
                                {navItem.name}
                            </a>
                        </li>
                    )
                })}
            </ul>
        </nav>
    );
}