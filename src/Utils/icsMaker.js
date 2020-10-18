const ics = require('ics');
var fileDownload = require('js-file-download');

export default function createAppointment(data){
    const event = {
        start: data.start,
        end: data.end,
        title: 'Wysong Baby Shower',
        description: 'Baby Shower Time Slot',
        location: '1410 N. High Street Denver, CO 80218',
        status: 'CONFIRMED',
        busyStatus: 'BUSY',
        organizer: { name: 'Bethany Pandes Wysong + Shaun Wysong'}
    }

    ics.createEvent(event, (error, value) => {
        if (error) {
            return
        }
        fileDownload(value, 'Wysong Baby Shower.ics');
    })
}