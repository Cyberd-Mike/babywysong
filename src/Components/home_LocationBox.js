// Base Modules
import React, {Fragment, useState, useEffect} from 'react';
import { Storage } from 'aws-amplify';
import { Grid } from '@material-ui/core';

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
        <Grid container spacing={1} style={{margin: '3% 0'}}>
            <Grid container item xs={12} spacing={2} direction="column" alignItems="center">
                <Grid item xs={12}>
                    <h1>Location</h1>
                    <h3>1410 N. High Street</h3>
                    <h3>Denver, CO 80218</h3>
                </Grid>
                <Grid item xs={12}>
                    <img src={mapImage} alt="Map to baby shower" />
                </Grid>
            </Grid> 
        </Grid>
    );
}