// Base Modules
import React, { useState, useEffect } from 'react';
import { Storage } from 'aws-amplify';
import { navigate } from '@reach/router';
import { Grid, ButtonBase } from '@material-ui/core';

export default function(){
    const [image1, setImage1] = useState();
    const [image2, setImage2] = useState();
    const [image3, setImage3] = useState();

    useEffect(() => {
        getImages();
    },[]);

     const getImages = async() => {
        const i1 = await Storage.get('letter.png', {level: 'public'})
        const i2 = await Storage.get('mask.png', {level: 'public'})
        const i3 = await Storage.get('shoes.jpg', {level: 'public'})

        setImage1(i1);
        setImage2(i2);
        setImage3(i3);
    }

    return(
        <Grid container direction="row" justify="flex-end" alignItems="center" id="LinkBox">
            <Grid container xs={5} direction="row" justify="flex-end" alignItems="center">
                <img className="Background_Decobar" src={require('../Images/PinkBar.png')} />
            </Grid>
            <Grid container xs direction="row" id="FixContainer_Width" justify="space-evenly" alignItems="center" className="GridContaier_Buttons" style={{flexWrap: 'nowrap'}}>
                    <Grid item xs direction="row" justify="center" alignItems="center" sm container>
                        <ButtonBase className="ImageButton" onClick={() => navigate('info')}>
                            <Grid item xs container direction="column" className="Grid_InnerButton">
                                <img className="ImageButton_Image" alt="Information button image" style={{maxWidth:'300px', maxHeight: 'auto'}} src={image2} />
                                <h3 className="ImageButton_Text">Information</h3>
                            </Grid>
                        </ButtonBase>
                    </Grid>
                    <Grid item xs direction="row" justify="center" alignItems="center" sm container>
                        <ButtonBase className="ImageButton" onClick={() => navigate('rsvp')}>
                            <Grid item xs container direction="column" className="Grid_InnerButton">
                                <img className="ImageButton_Image" alt="Information button image" style={{maxWidth:'300px', maxHeight: 'auto'}} src={image1} />
                                <h3 className="ImageButton_Text">RSVP</h3>
                            </Grid>
                        </ButtonBase>
                    </Grid>
                    <Grid item xs direction="row" justify="center" alignItems="center" sm container>
                        <ButtonBase className="ImageButton" onClick={() => navigate('registry')}>
                            <Grid item xs container direction="column" className="Grid_InnerButton">
                                <img className="ImageButton_Image" alt="Information button image" style={{maxWidth:'300px', maxHeight: 'auto'}} src={image3} />
                                <h3 className="ImageButton_Text">Registry</h3>
                            </Grid>
                        </ButtonBase>
                    </Grid>
            </Grid>
        </Grid>
    );
}