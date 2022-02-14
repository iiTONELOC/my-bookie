import React, { createContext, useContext } from "react";
import { useDashboardReducer } from '../reducers';
import { useAuthContext } from "./withAuth";
const DatabaseContext = createContext();
const { Provider } = DatabaseContext;

const viewSelectionTypes = {
    'daily': 'daily',
    'weekly': 'weekly',
    'monthly': 'monthly'
};
const defaultDate = {
    date: new Intl.DateTimeFormat('en-US').format(Date.now()),
    time: new Intl.DateTimeFormat('en-US', { timeStyle: 'short' })
        .format(Date.now()),
    hour: new Date().getHours()
};


export const DatabaseProvider = ({ value = [], ...props }) => {
    const auth = useAuthContext();
    const initialState = {
        user: auth.isAuthenticated?.user || {},
        events: [],
        viewSelection: viewSelectionTypes['daily'],
        date: defaultDate.date,
        time: defaultDate.time,
        currentHour: defaultDate.hour,
        authentication: {
            isAuthenticated: auth.isAuthenticated,
            setIsAuthenticated: auth.setIsAuthenticated
        },
    };
    const [state, dispatch] = useDashboardReducer(initialState);
    return <Provider value={[state, dispatch]} {...props} />;
};

export const useDatabaseContext = () => {
    return useContext(DatabaseContext);
}
