// Base Modules
import React from 'react';
import { Router } from '@reach/router';
// import Loadable from 'react-loadable';

// Page Imports
import Home from '../Pages/Home';
import RSVP from '../Pages/RSVP';
import Registry from '../Pages/Registry';
import Information from '../Pages/Information';
import PageNotFound from '../Pages/statuspages/404';
import Confirm from '../Pages/rsvp_confirm';
import Attending from '../Pages/rsvp_isAttending';
import NotAttending from '../Pages/rsvp_notAttending';
import AdminDashboard from '../Pages/Admin/Console';

export default function(){
    return(
        <Router>
            <Home path="/" />
            <RSVP path="rsvp" />
            {/* <Confirm path="rsvp/confirm" /> */}
            {/* <NotAttending path="/respond-no" /> */}
            <Attending path="/rsvp-confirm" />
            <Registry path="registry" />
            <Information path="info" />
            <AdminDashboard path="admin" />
            <PageNotFound default />
        </Router>
    );
}