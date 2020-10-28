// Base Modules
import React, {Fragment} from 'react';
// UI Components
import {
    Grid
} from '@material-ui/core';
import { Helmet } from 'react-helmet';
import Iframe from 'react-iframe';

export default function(){

    return(
        <Fragment>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Baby Wysong | Information</title>
            </Helmet>
            <Grid container direction="column" alignItems="center">
                <Grid item xs={12}>
                    <h1>COVID-19 Update!</h1>
                </Grid>
                <Grid item xs={8} container direction="column" justify="center" alignItems="center" className="COVID_Copy">
                <p>"Due to the most recent executive order, our shower is going to look different than originally planned. Since we can't gather in groups larger than 5, we will be doing a drive-thru shower at our home. The parents-to-be will be out in front of the house to exchange hellos, gifts, and favors. Feel free to drop by anytime between 2-4pm. We are sad not to be able to celebrate the way we originally intended, but the most important thing is keeping everyone safe and healthy.</p>

                <p>Bethany + Shaun</p>

                </Grid>
                <Grid item xs={12}>
                    <h3>Directions</h3>
                </Grid>
                <Grid item xs>
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
        </Fragment>
    );
}