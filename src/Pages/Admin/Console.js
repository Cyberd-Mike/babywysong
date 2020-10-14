// Base Modules
import React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
// UI Components
import { 
    Grid,
    Paper
} from '@material-ui/core';
import { Helmet } from 'react-helmet';
import ManageGuests from '../../Components/admin_MgmtTable';

//ToDo: Get the table stuff.


function AdminConsole(props){
        return(
        <React.Fragment>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Baby Wysong | Admin</title>
        </Helmet>
        <Grid container>
            <Grid item xs={12}>
                <h1>Guest Management</h1>
            </Grid>
            <Grid item xs={12}>
                <Paper elevation={2}>
                    <ManageGuests />
                </Paper>
            </Grid>
        </Grid>
        </React.Fragment>
    );
}

export default withAuthenticator(AdminConsole);