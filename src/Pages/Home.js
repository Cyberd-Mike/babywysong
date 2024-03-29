// Base Modules
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
// UI Components
import {
    Button,  
    Grid
} from '@material-ui/core';

//import custom components
import HeaderBox from '../Components/home_HeaderBox';
import LinkBox from '../Components/home_LinkBox';
import FluffBox from '../Components/home_FluffBox';
import LocationBox from '../Components/home_LocationBox';

export default function(){ 
    return(
        <React.Fragment>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Baby Wysong | Home </title>
            </Helmet>
            <Grid container>
                <HeaderBox />
                <Grid item xs={12}>
                    <h3 style={{margin:'5%', textAlign: 'center'}} className="announcement">*** Plans have changed due to COVID. Please check the Information page. ***</h3>
                </Grid>
                <LinkBox />
                <FluffBox />
                <LocationBox /> 
            </Grid>
        </React.Fragment>
    );    
}