// Base Modules
import React from 'react';

// UI Components
import {
    Grid, 
    ButtonBase
} from '@material-ui/core';

export default function(){
    return(
        <Grid container className="Footer" style={{backgroundColor: '#2D5151', minHeight: '35px', marginTop:'25vh'}}>
            <Grid item xs={6}>
            </Grid>
            <Grid item xs={6}>
            </Grid>
        </Grid>
    );
}