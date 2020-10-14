import React from 'react';
import { Grid } from '@material-ui/core';
import { Link } from '@reach/router';
import convertTime from '../Utils/ConvertTime';

export default function(props){
    console.log('Props are ', props);
    const { start, end } = props.location.state;

    const start12 = convertTime(start);
    const end12 = convertTime(end);

    return(
            <Grid container style={{margin: '8% 0'}}>
                <Grid item xs={12}>
                    <h1>Yay!</h1>
                </Grid>
                <Grid item xs={12}>
                    <p>We look forward to seeing you there!</p>
                    <p className="userTime">Your time slot is on <b>November 8th from {start12} to {end12}</b>.</p>
                    <p>Thanks for celebrating with us while keeping everyone safe.</p>
                </Grid>
                <Grid item xs={12}>
                    <p className="Signature">Bethany + Shaun</p>
                </Grid>
                <Grid item xs={12}>
                    <Link to="/rsvp" className="RSVP_Return"><p>Return to RSVP Page</p></Link>
                </Grid>
            </Grid>
    );
}