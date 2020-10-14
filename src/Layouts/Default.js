// Base Modules
import React, { Fragment } from 'react';
import { SnackbarProvider } from 'notistack';

// UI Components
import { 
    Container,
    Grid
} from '@material-ui/core';

// Custom Components
import Toolbar from '../Components/_gen_Toolbar_Desktop';
import Footer from '../Components/_gen_Footer';

export default function(props){
    return(
            <SnackbarProvider>
                <Toolbar />
                    {props.children}
                <Footer />
            </SnackbarProvider>
    );
}