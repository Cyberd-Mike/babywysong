// Base Modules
import React from 'react';
import { Helmet } from 'react-helmet';
// UI Components
import { Grid, ButtonBase } from '@material-ui/core';

export default function(){
    return(
        <React.Fragment>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Baby Wysong | Registry</title>
            </Helmet>
            <Grid container>
                <Grid item xs={12}>
                    <h1>Registry</h1>
                </Grid>
                <Grid item xs={12}>
                    <h3>If you would like to support the arrival of the newest member of the Wysong family</h3>
                    <h3>please consider purchacing a gift from the registry below.</h3>
                    <h3 className="Registry_Thanks">~ Thank you ~</h3>
                </Grid>
                <Grid item xs={12}>
                    <ButtonBase className="ImageButton">
                        <a href="https://www.amazon.com/baby-reg/3UJJXD4NXFL2E">
                            <img src={require('../Images/babyRegistry.jpg')} className="RegistryButtonImage" />
                        </a>
                    </ButtonBase>
                </Grid>
            </Grid>
        </React.Fragment>
        
    );
}