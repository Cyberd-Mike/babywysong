// Base Modules
import React, { useState } from 'react';
import { API } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';
import { Helmet } from 'react-helmet';
import { useSnackbar } from 'notistack';
import { navigate } from "@reach/router"
// UI Components
import {
    Grid,
    Button, 
    TextField,
    Checkbox,
    FormControlLabel
} from '@material-ui/core';

export default function(){
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ boolAttend, setBoolAttend ] = useState(false);

    const { enqueueSnackbar } = useSnackbar();
    const handleCheck = () => {
        if (boolAttend === true){
            setBoolAttend(false);
        } else {
            setBoolAttend(true);
        }
    }

    const lookupGuest = async () => {
        let filter = {
            lastName: {
                eq: lastName
            },
            firstName: {
                eq: firstName
            }
        }
    
        const userCheck = await API.graphql({ query: queries.listGuests, variables: {filter: filter} })
        if (userCheck){
            console.log('User Check response was ', userCheck);
            return userCheck;
        }
        else
        {
            return false;
        }
    }

    const handleRespond = async () => {

        const userData = await lookupGuest();
        console.log('User data in the handle response function is ', userData);
        const { id, phoneNumber, timeStart, timeEnd, } = userData.data.listGuests.items[0];

        const rsvpData = {
            id: id,
            firstName: firstName, 
            lastName: lastName, 
            phoneNumber: phoneNumber,
            timeStart: timeStart,
            timeEnd: timeEnd,
            isAttending: boolAttend
        }
        console.log('RSVP data is ', rsvpData)

        const response = await API.graphql({ query: mutations.updateGuest, variables: { input: rsvpData }});
    
        if (response){
            console.log('Response was ', response);
            return response;
        }
        else
        {
            return false;
        }
    }

    const handleSubmit = () => {     

        handleRespond()
        .then((data) => {
            console.log('HandleRespond data is', data)
            if (data.data.updateGuest !== null){
                enqueueSnackbar('RSVP Complete!', {
                    variant: 'success', 
                    anchorOrigin: {
                        vertical: 'bottom', 
                        horizontal: 'center'
                    },
                    autoHideDuration: 3000
                })

                if (data.data.updateGuest.isAttending === true){
                    console.log('Guest is attending.')
                    const { timeStart, timeEnd } = data.data.updateGuest;
                    console.log(timeStart, timeEnd);
                    navigate('/respond-yes', { state: { start: timeStart, end: timeEnd }});
                } else {
                    console.log('Guest is not attending.')
                    navigate('/respond-no');
                }

            }
        })
        .catch((err) => {
            console.log('Error submitting RSVP', err);
            if (firstName !== undefined || lastName !== undefined || firstName !== null || lastName !== null){
                enqueueSnackbar('Please enter in your first & last name.', {
                    variant: 'error', 
                    anchorOrigin: {
                        vertical: 'bottom', 
                        horizontal: 'center'
                    },
                    autoHideDuration: 3000
                })
            }else{
                enqueueSnackbar('Oops. There has been an errror', {
                    variant: 'error', 
                    anchorOrigin: {
                        vertical: 'bottom', 
                        horizontal: 'center'
                    },
                    autoHideDuration: 3000
                })
            }
        });
    }

    const SubmitButton = () => {
        if (boolAttend === true){
            return(<Button variant="outlined" color="primary" style={{margin: '25px', padding: '15px 25px', backgroundColor: '#2D5151', color: 'white'}} onClick={() => handleSubmit()}>Respond "Yes"</Button>);
        } else {
            return(<Button variant="outlined" color="primary" style={{margin: '25px', padding: '15px 25px', backgroundColor: '#E4C7C9', color: 'black'}} onClick={() => handleSubmit()}>Respond "No"</Button>);
        }
    }

    return(
        <React.Fragment>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Baby Wysong | RSVP</title>
            </Helmet>
            <Grid container>
                <Grid item xs={12}>
                    <h1>RSVP</h1>
                    <h3>Please enter your first and last name.</h3>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        <TextField label="First Name" variant="outlined" value={firstName} style={{margin: '10px'}} onChange={(e) => setFirstName(e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Last Name" variant="outlined" value={lastName} style={{margin: '10px'}} onChange={(e) => setLastName(e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <p style={{marginBottom: '0px'}}>Check the box if you are attending.</p>
                        <FormControlLabel
                            value={boolAttend}
                            onChange={handleCheck}
                            control={<Checkbox color="primary" />}
                            labelPlacement="top"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <SubmitButton />
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}