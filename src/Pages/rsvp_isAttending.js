import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { Link } from '@reach/router';
import convertTime from '../Utils/ConvertTime';
import createAppointment from '../Utils/icsMaker';

export default function(props){
    return(
            <Grid container style={{margin: '8% 0'}}>
                <Grid item xs={12}>
                    <h1>Yay!</h1>
                </Grid>
                <Grid item xs={12}>
                    <p>We look forward to seeing you there!</p>
                    <p>Thanks for celebrating with us while keeping everyone safe.</p>
                </Grid>
                <Grid item xs={12}>
                    <p className="Signature">Bethany + Shaun</p>
                </Grid>
                {/* <Grid item xs={12}>
                    <Button className="calendarButton" color="secondary" variant="filled" onClick={() => createicsEvent()}>Download Reminder</Button>
                </Grid> */}
                <Grid item xs={12}>
                    <Link to="/rsvp" className="RSVP_Return"><p>Return to RSVP Page</p></Link>
                </Grid>
            </Grid>
    );
}