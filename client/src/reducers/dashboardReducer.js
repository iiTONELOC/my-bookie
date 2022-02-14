import { useReducer } from "react";

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_TIME':
            return {
                ...state,
                time: action.payload
            };
        case 'SET_INIT_EVENTS':
            return {
                ...state,
                events: action.payload
            };
        default:
            return state;
    };
};

const useDashboardReducer = (initialState) => useReducer(reducer, initialState);

export default useDashboardReducer;