import { useState, useEffect } from 'react';
import auth from '../../utils/auth';

function getUserId() {
    const userData = auth.getProfile();
    if (userData) return userData._id;
    else return null;
}
const loggedInData = [
    {
        name: 'Home',
        // icon: '',
        path: '/'
    },
    {
        name: 'Dashboard',
        // icon: '',
        path: `${getUserId() === null ? '/dashboard' :
            `/users/${getUserId()}/dashboard`}`
    },
    {
        name: 'Logout',
        // icon: '',
        path: '/logout'
    },
];
const navLinks = [
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
export default function Nav() {
    const loggedIn = auth.loggedIn();
    const [navData, setNavData] = useState(loggedIn ? loggedInData : navLinks);
    const active = (path) => {
        if (path === window.location.pathname) {
            return 'p-1 border-t-2 border-myPink';
        } if (window.location.pathname.includes('dashboard') && path === '/dashboard') {
            return 'p-1 border-t-2 border-myPink';
        }
    }
    useEffect(() => {
        setNavData(loggedIn ? loggedInData : navLinks);
    }, [loggedIn])
    const logout = (e) => {
        e.preventDefault();
        e.stopPropagation();
        return auth.logout();
    }
    return (
        <nav navdata='navbar' className="bg-slate-900 w-full flex flex-row justify-between items-center text-gray-200 self-start h-16">
            <span className=''>
                <h1 className="ml-3 align-middle text-2xl p-2 hover:text-myLightBlue">
                    <a href='/'><span className="font-medium text-3xl text-myPink">My</span>Bookie</a>
                </h1>
            </span>
            <ul className="flex flex-row gap-10 p-2 mx-3">
                {navData.map((navItem, index) => {
                    return (
                        <li
                            className=''
                            key={'Nav: ' + navItem?.name || `${index}`}>
                            <a
                                onClick={navItem.name === 'Logout' ? (e) => logout(e) : () => { }}
                                className={`lg:text-xl hover:text-myLightBlue ${active(navItem.path)}`}
                                href={navItem.name !== 'Logout' ? navItem.path : ''}>
                                {navItem.name}
                            </a>
                        </li>
                    )
                })}
            </ul>
        </nav>
    );
}