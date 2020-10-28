// Base Modules
import React, {Fragment, useState, useEffect} from 'react';
import { Storage } from 'aws-amplify';
import { Grid } from '@material-ui/core';
import Iframe from 'react-iframe';

export default function(){

    return(
        <Grid container spacing={1} style={{margin: '3% 0'}}>
            <Grid container item xs={12} spacing={2} direction="column" alignItems="center">
                <Grid item xs={12}>
                    <h1>Location</h1>
                    <h3>Wysong Manor</h3>
                    <h3>10415 Saranac Way</h3>
                    <h3>Parker, CO 80134</h3>
                </Grid>
                <Grid item xs={12}>
                <Iframe
                        url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3077.429396974373!2d-104.804629684631!3d39.5273662794784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876c8fd3b29f72bb%3A0x7b3e73bc5720feff!2s10415%20Saranac%20Way%2C%20Parker%2C%20CO%2080134!5e0!3m2!1sen!2sus!4v1603843816143!5m2!1sen!2sus"
                        width="600px"
                        height="450px"
                        id="google_map"
                        display="initial"
                        styles={{frameborder: '0', border: '0', ariaHidden: false, tabIndex: '0'}}
                    />
                </Grid>
            </Grid> 
        </Grid>
    );
}