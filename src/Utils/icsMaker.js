// const ics = require('ics');
// var fileDownload = require('js-file-download');

// export default function createAppointment(){
    
//     const event = {
//         start: [2020, 11, 8, 2, 00],
//         duration: {minutes: 120},
//         title: 'Wysong Baby Shower',
//         description: 'Visit the Wysong Manor to greet Shaun and Bethany',
//         location: '10415 Saranac Way Parker, CO 80134',
//         status: 'CONFIRMED',
//         busyStatus: 'BUSY',
//         organizer: { name: 'Bethany Pandes Wysong + Shaun Wysong'}
//     }

//     console.log('Event params are ', event);

//     ics.createEvent(event, (error, value) => {
//         if (error) {
//             console.log('Error', error);
//             return error;
//         }
//         fileDownload(value, 'Wysong Baby Shower.ics');
//     })
// }