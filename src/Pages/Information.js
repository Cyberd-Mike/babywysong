// Base Modules
import React, {Fragment, useState, useEffect} from 'react';
import { Storage } from 'aws-amplify';
// UI Components
import {
    Grid
} from '@material-ui/core';
import { Helmet } from 'react-helmet';
import Iframe from 'react-iframe';

export default function(){
    const [mapImage, setMapImage] = useState('');

    useEffect(() => {
        getImages();
    }, [])
        
    const getImages = async() => {
        const i1 = await Storage.get('Map_Final.png', {level: 'public'})
        setMapImage(i1);
    }

    return(
        <Fragment>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Baby Wysong | Information</title>
            </Helmet>
            <Grid container direction="column" alignItems="center">
                <Grid item xs={12}>
                    <h1>Let's Party! (Safely)</h1>
                </Grid>
                <Grid item xs={8} container direction="column" justify="center" alignItems="center" className="COVID_Copy">
                <p>In order to celebrate safely, we would appreciate it if all of our wonderful friends and family could follow a few rules. There are limited spaces per time slot in order to help facilitate proper social distancing guidelines. Please arrive during your designated time which is provided as part of the RSVP process on this website. We ask that all guests maintain a distance of at least 6 feet from individuals who do not live in the same household.</p>

                <p>All guests are also required to wear a mask for the duration of your time at the venue. Masks may be taken off while consuming food or drink. We encourage everyone to practice social distancing during that time. </p>

                <p>We would love nothing more than a big group hug with all of you wonderful people but for everyone’s safety, we’ll have to put that off for a while.</p>

                <p>Thank you and we look forward to celebrating with you all!</p>

                <p>Bethany + Shaun</p>

                </Grid>
                <Grid item xs={12}>
                    <h3>Directions</h3>
                </Grid>
                <Grid item xs>
                    <Iframe
                        url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3068.039342345855!2d-104.96667468434737!3d39.73876710451445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876c7ecaf8303c25%3A0x981cb324085b9f7b!2s1410%20N%20High%20St%2C%20Denver%2C%20CO%2080218!5e0!3m2!1sen!2sus!4v1602607389884!5m2!1sen!2sus"
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