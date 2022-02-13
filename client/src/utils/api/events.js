export const EventsController = {
    getEventsByMonth: (month) => {
        if (!month) {
            // get the current date
            const date = new Date().toISOString();
            console.log(date)
        }
        return console.log('getEvents');
    }
}