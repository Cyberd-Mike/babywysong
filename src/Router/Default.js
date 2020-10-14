// Base Modules
import React from 'react';
import { Router } from '@reach/router';
// import Loadable from 'react-loadable';

// Page Imports
import Home from '../Pages/Home';
import RSVP from '../Pages/RSVP';
import RSVPRoot from '../Pages/rsvp_Root';
import Registry from '../Pages/Registry';
import Information from '../Pages/Information';
import PageNotFound from '../Pages/statuspages/404';
// import Loading from '../Pages/statuspages/loading';
import Attending from '../Pages/rsvp_isAttending';
import NotAttending from '../Pages/rsvp_notAttending';
import AdminDashboard from '../Pages/Admin/Console';

export default function(){

    // const AdminDashboard = Loadable({
    //     loader: () => import('../Pages/Admin/Console'),
    //     loading: Loading,
    // });

    return(
        <Router>
            <Home path="/" />
            <RSVPRoot path="/">
                <RSVP path="rsvp" />
                <NotAttending path="/respond-no" />
                <Attending path="/respond-yes" />
            </RSVPRoot>
            <Registry path="registry" />
            <Information path="info" />
            <AdminDashboard path="admin" />
            <PageNotFound default />
        </Router>
    );
}