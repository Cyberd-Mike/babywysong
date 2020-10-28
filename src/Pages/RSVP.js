// Base Modules
import React, { useState } from 'react';
import { API } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { Helmet } from 'react-helmet';
import { useSnackbar } from 'notistack';
import { navigate } from "@reach/router"
// UI Components
import {
    Grid,
    Button, 
    TextField,
} from '@material-ui/core';

export default function(){
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const { enqueueSnackbar } = useSnackbar();

    const registerGuest = async () => {
        let input = {
            firstName: firstName,
            lastName: lastName,
        }
        const userRegister = await API.graphql({ query: mutations.createGuest, variables: {input: input} });

        if (userRegister){
            const { firstName, lastName} = userCheck.data.listGuests.items[0];

            const dataArray = {
                firstName: firstName,
                lastName: lastName,
                id: id
            }
            navigate('/rsvp-confirm');
        }
        else
        {
            enqueueSnackbar('Guest not found.', {
                variant: 'error', 
                anchorOrigin: {
                    vertical: 'bottom', 
                    horizontal: 'center'
                },
                autoHideDuration: 3000
            })
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
                        <Button variant="outlined" color="primary" style={{margin: '25px', padding: '15px 25px', backgroundColor: '#2D5151', color: 'white'}} onClick={() => registerGuest()}>Check RSVP List</Button>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );


}