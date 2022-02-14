import Auth from '../auth';
export const EventsController = {
    getEventsByMonth: async (date) => {
        const data = {
            data: {
                events: null
            },
            error: null
        }
        if (!date) {
            // get the current date
            const date = new Date().toISOString().split('T')[0].split('-');
            const searchTerm = `${date[0]}-${date[1]}`;
            const res = await fetch('/api/events', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Auth.getToken()}`,
                }
            });
            if (res.status === 200) {
                const allEvents = await res.json();
                data.data.events = allEvents.events.filter(event => {
                    return event && event?.start_time.split('T')[0].includes(searchTerm);
                });
            } else {
                data.error = await res.json()
            };
        };
        return data
    },
};