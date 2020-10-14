// Base NPM Modules
import React, { useState, useEffect } from 'react';
import { Storage } from 'aws-amplify';

// UI Components
import {
    Grid
} from '@material-ui/core';

export default function(props){
    const [image1, setImage1] = useState();

    useEffect(() => {
        getImages();
    },[]);

     const getImages = async() => {
        const i1 = await Storage.get('IMG_5078.JPG', {level: 'public'})
        setImage1(i1);
    }

    return(
        <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={6}>
                <img src={image1} className="HeaderBox_SBCute" />
            </Grid>
            <Grid item xs container direction="column"  justify="center" alignItems="center">
                <Grid item xs={6}>
                    <h1 className="InviteMain Title Baby">Baby</h1>
                </Grid>
                <Grid item xs={6}>
                    <h1 className="InviteMain Title Shower">Shower</h1>
                </Grid>
                <Grid item xs>
                    <p className="InviteMain Subtitle">~ HONORING ~</p>
                </Grid>
                <Grid item xs>
                    <h2 className="InviteMain Names">Bethany Pandes Wysong</h2>
                    <h3 className="InviteMain Names Ampersand">&</h3>
                    <h2 className="InviteMain Names">Shaun Wysong</h2>
                </Grid>
                <Grid item xs>
                    <p className="InviteMain Subtitle">NOVEMBER 8th, 2020</p>
                </Grid>
            </Grid>
        </Grid>
    );

}