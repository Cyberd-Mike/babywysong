// Base Modules
import React, { Fragment, useState } from 'react';
import { Helmet } from 'react-helmet';
import { API } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import { useSnackbar } from 'notistack';
import { navigate } from "@reach/router"
// UI Components
import {
    Grid,
    Button, 
    TextField,
    Checkbox,
    RadioGroup,
    Radio,
    FormControlLabel,
    FormLabel
} from '@material-ui/core';

export default function(props){
    const [ boolAttend, setBoolAttend ] = useState(false);
    const [ plusOneName, setPlusOneName ] = useState('');

    const { enqueueSnackbar } = useSnackbar();
    const { userData } = props.location.state;
    
    console.log('User data from previous page is... ', userData);

    const handleCheck = () => {
        if (boolAttend === true){
            setBoolAttend(false);
        } else {
            setBoolAttend(true);
        }
    }

    const handleRespond = async () => {
            console.log('User data from previous page is... ', userData);
            // const { id, lastName, firstName, phoneNumber, timeStart, timeEnd, allowPlusOne } = userData.items[0];
    
            // const rsvpData = {
            //     id: id,
            //     firstName: firstName, 
            //     lastName: lastName, 
            //     phoneNumber: phoneNumber,
            //     timeStart: timeStart,
            //     timeEnd: timeEnd,
            //     isAttending: boolAttend,
            //     allowPlusOne: allowPlusOne,
            //     plusOne: plusOneName
            // }
            // console.log('RSVP data is ', rsvpData)
    
            // const response = await API.graphql({ query: mutations.updateGuest, variables: { input: rsvpData }});
        
            // if (response){
            //     console.log('Response was ', response);
            //     return response;
            // }
            // else
            // {
            //     return false;
            // }
    }        

    const handleSubmit = () => {     

        // handleRespond()
        // .then((data) => {
        //     console.log('HandleRespond data is', data)
        //     if (data.data.updateGuest !== null){
        //         enqueueSnackbar('RSVP Complete!', {
        //             variant: 'success', 
        //             anchorOrigin: {
        //                 vertical: 'bottom', 
        //                 horizontal: 'center'
        //             },
        //             autoHideDuration: 3000
        //         })

        //         if (data.data.updateGuest.isAttending === true){
        //             console.log('Guest is attending.')
        //             const { timeStart, timeEnd } = data.data.updateGuest;
        //             console.log(timeStart, timeEnd);
        //             navigate('/respond-yes', { state: { start: timeStart, end: timeEnd }});
        //         } else {
        //             console.log('Guest is not attending.')
        //             navigate('/respond-no');
        //         }

        //     }
        // })
        // .catch((err) => {
        //     console.log('Error submitting RSVP', err);
        //     if (firstName !== undefined || lastName !== undefined || firstName !== null || lastName !== null){
        //         enqueueSnackbar('Please enter in your first & last name.', {
        //             variant: 'error', 
        //             anchorOrigin: {
        //                 vertical: 'bottom', 
        //                 horizontal: 'center'
        //             },
        //             autoHideDuration: 3000
        //         })
        //     }else{
        //         enqueueSnackbar('Oops. There has been an errror', {
        //             variant: 'error', 
        //             anchorOrigin: {
        //                 vertical: 'bottom', 
        //                 horizontal: 'center'
        //             },
        //             autoHideDuration: 3000
        //         })
        //     }
        // });
    }

    const SubmitButton = () => {
        // if (boolAttend === true){
        //     return(<Button variant="outlined" color="primary" style={{margin: '25px', padding: '15px 25px', backgroundColor: '#2D5151', color: 'white'}} onClick={() => handleSubmit()}>Respond "Yes"</Button>);
        // } else {
        //     return(<Button variant="outlined" color="primary" style={{margin: '25px', padding: '15px 25px', backgroundColor: '#E4C7C9', color: 'black'}} onClick={() => handleSubmit()}>Respond "No"</Button>);
        // }
    }

    const CreatePlusOne = () => {
        // if (allowPlusOne === true){
        //     return (
        //         <Fragment>
        //             <h3>If you would like to bring someone, please let us know their name.</h3>
        //             <TextField variant="outlined" color="primary" onChange={(e) => setPlusOneName(e.target.value)}>+1 Name</TextField>
        //         </Fragment>
        //     );
        // }
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
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                    <FormLabel component="legend">Please Select One</FormLabel>
                        <RadioGroup aria-label="RSVP - Attending" name="Attend" value={boolAttend} onChange={() => handleCheck()}>
                            <FormControlLabel
                                value={true}
                                label="Attending"
                                onChange={() => handleCheck()}
                                control={<Radio color="primary" />}
                                labelPlacement="top"
                            />
                            <FormControlLabel
                                value={false}
                                label="Not Attending"
                                onChange={() => handleCheck()}
                                control={<Radio color="primary" />}
                                labelPlacement="Top"
                            />
                        </RadioGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <CreatePlusOne />
                    </Grid>
                    <Grid item xs={12}>
                        <SubmitButton />
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}