import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from '@reach/router';

export function PageNotFound(){
    return(
        <React.Fragment>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Baby Wysong | Oops - Page not Found</title>
            </Helmet>
            <h1>Oops! Page Not Found!</h1>
            <h3><Link to="/">Go Home</Link></h3>
        </React.Fragment>
    );
}

export default PageNotFound;