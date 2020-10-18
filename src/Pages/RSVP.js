// Base Modules
import React, { useState } from 'react';
import { API } from 'aws-amplify';
import * as queries from '../graphql/queries';
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
    const lookupGuest = async () => {
        let filter = {
            and: [{
                or: [{ lastName: {eq: lastName}},
                    {altLastName: {eq: lastName}}            
                ],
                or: [{ firstName: {eq: firstName}},
                    { altFirstName: {eq: firstName}}
                ]
            }]
        }
        const userCheck = await API.graphql({ query: queries.listGuests, variables: {filter: filter} });

        if (userCheck){
            const { allowPlusOne, altFirstName, altLastName, firstName, lastName, isAttending, id, phoneNumber, plusOne, timeEnd, timeStart} = userCheck.data.listGuests.items[0];

            const dataArray = {
                allowPlusOne: allowPlusOne,
                altFirstName: altFirstName,
                altLastName: altLastName,
                firstName: firstName,
                lastName: lastName,
                isAttending: isAttending, 
                id: id, 
                phoneNumber: phoneNumber,
                plusOne: plusOne, 
                timeEnd: timeEnd,
                timeStart: timeStart,
            }
            navigate('/rsvp/confirm', {state: { userData: dataArray }});
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
                        <Button variant="outlined" color="primary" style={{margin: '25px', padding: '15px 25px', backgroundColor: '#2D5151', color: 'white'}} onClick={() => lookupGuest()}>Check RSVP List</Button>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );


}