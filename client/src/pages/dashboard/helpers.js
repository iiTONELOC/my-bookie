
export function insertEventFilterableFields(data) {
    return data.map(item => {
        return {
            ...item,
            month: item.start_time.split('-')[1],
            day: item.start_time.split('-')[2].split('T')[0],
            year: item.start_time.split('-')[0],
            time: item.start_time.split('-')[2].split('T')[1]
        }
    })
}

export async function getUserEvents(getEventsByMonth, dispatch) {
    const response = await getEventsByMonth();
    if (response.data && response.error === null) {
        return dispatch({
            type: 'SET_INIT_EVENTS',
            payload: insertEventFilterableFields(response.data.events)
        });
    } else {
        console.log(response.error);
        return setTimeout(() => {
            getUserEvents();
        }, [60000]);
    };
};
