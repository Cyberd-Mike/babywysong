// Base Modules
import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { Storage } from 'aws-amplify';

export default function(){
    const [image1, setImage1] = useState();
    
    useEffect(() => {
        getImages();
    },[]);

    const getImages = async() => {
        const i1 = await Storage.get('IMG_5084.JPG', {level: 'public'})
        setImage1(i1);
    }

    return(
        <Grid container direction="row" justify="center" alignItems="center" style={{backgroundColor: '#EEECEC'}}>
            <Grid container md={6} sm={8} xs={12} direction="row" justify="center" alignItems="center" style={{padding: '5%'}}>
                    <img src={require('../Images/slsl_par.png')} className="Fluffbox_Image" alt="Homepage_Link" />
            </Grid>
            <Grid container md={6} sm={8} xs={12} direction="row" justify="center" alignItems="center" style={{padding: '5%'}}>
                    <img className="Fluff_Image" src={image1} />
            </Grid>
        </Grid>
    )
}