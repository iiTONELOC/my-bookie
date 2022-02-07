import auth from '../utils/auth';
import { useState, useEffect, createContext, useContext } from 'react';

export const AuthContext = createContext({});
export const useAuthContext = () => useContext(AuthContext);

export default function WithAuthorization({ children, ...props }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const value = { isAuthenticated, setIsAuthenticated };
    const [isMounted, setIsMounted] = useState(false);
    const { Provider } = AuthContext;

    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    function handleAuthStatus() {
        const token = localStorage.getItem('_book_token');
        const isExpired = auth.isTokenExpired(token);
        if (token && !isExpired) {
            const userData = auth.getProfile();
            const data = {
                isAuthenticated: true,
                user: userData
            };
            AuthContext.current = data;
            setIsAuthenticated(data);
        } else {
            localStorage.removeItem('_book_token');
            const data = {
                isAuthenticated: false,
                user: null
            };
            setIsAuthenticated(data);
        };
    };
    useEffect(() => {
        if (isMounted) handleAuthStatus()
        return () => handleAuthStatus()
    }, [isMounted])

    return (
        <Provider value={value}>
            {isAuthenticated.isAuthenticated ?
                <div {...props}>
                    {children}
                </div>
                /* TODO: CREATE A REDIRECT COMPONENT */
                : <h1>Please Login</h1>}
        </Provider>
    );
};