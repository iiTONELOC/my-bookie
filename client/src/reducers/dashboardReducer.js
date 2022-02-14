import { useReducer } from "react";

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
}


const useDashboardReducer = (initialState) => useReducer(reducer, initialState);

export default useDashboardReducer