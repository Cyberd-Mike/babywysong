// Base Modules
import React from 'react';

// UI Components
import {
    Grid, 
    ButtonBase
} from '@material-ui/core';

export default function(){
    
    // const handleContact = () => {
    //     console.log("Nope")
    // }

    return(
        <Grid container className="Footer" style={{backgroundColor: '#2D5151', minHeight: '35px', marginTop:'25vh'}}>
            <Grid item xs={6}>
            </Grid>
            <Grid item xs={6}>
                {/* <ButtonBase style={{margin: '5px', padding: '15px'}} onClick={() => handleContact()}>Contact Web Admin</ButtonBase> */}
            </Grid>
        </Grid>
    );
}