import React from 'react';
import { Paper, Grid } from '@material-ui/core';
import { Link } from '@reach/router';

export default function(){
    return(
        <Grid container style={{marginTop: '5%'}}>
            <Grid item xs={12}>
                <h1>Thank you!</h1>
            </Grid>
            <Grid item xs={12}>
                <p>Thank you for the response. It's a bummer you can't make it.</p>
                <p>If you change your mind in the future, you can change your reply on this website by entering your name and checking the box.</p>
            </Grid>
            <Grid item xs={12}>
                <p className="Signature">Bethany + Shaun</p>
            </Grid>
            <Grid item xs={12}>
                <Link to="/rsvp" className="RSVP_Return"><p>Return to RSVP Page.</p></Link>
            </Grid>
        </Grid>
    );
}