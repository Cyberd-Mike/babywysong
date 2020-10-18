//Base Modules
import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

// UI Components
import {
    ButtonBase,
    Button,
    AppBar, 
    Grid,
    Box
} from '@material-ui/core';
import { AmplifySignOut } from '@aws-amplify/ui-react';

export default function(){
    const [ auth, setAuth ] = useState();

    useEffect(() => {
        onAuthUIStateChange((nextAuthState) => {
            setAuth(nextAuthState);
        })
    }, [])

    const LogoutButton = () => {
        return (
            <Grid container>
                <Grid item xs={6}>
                <Button variant="text"><Link className="Navigation_Link" to="admin">Admin Console</Link></Button>
                </Grid>
                <Grid item xs={6}>
                    <AmplifySignOut />
                </Grid>
            </Grid>
        );
    };

    return(
        <AppBar className="Toolbar_Desktop" position="static">
            <Grid container spacing={3}>
                <Grid item sm={2} xs={12}>
                <ButtonBase className="Button_ImgButton">
                    <Link className="Navigation_Link" id="Home_Link" to="/">
                        <img src={require('../Images/iag_par.png')} className="HeaderImage_IAG" alt="Homepage_Link" />
                    </Link>
                </ButtonBase>
                </Grid>
                <Grid item sm={10} xs={12} container justify="flex-end" alignItems="center" id="Link_Container">
                    <Box display="flex" flexDirection="row-reverse">
                        <Grid item>
                            <Button className="Navigation_Button" variant="text">
                                <Link className="Navigation_Link" to="/info">
                                    Information
                                </Link>
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button className="Navigation_Button" variant="text">
                                <Link className="Navigation_Link" to="/rsvp">
                                    RSVP
                                </Link>
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button className="Navigation_Button" variant="text">
                                <Link className="Navigation_Link" to="/registry">
                                    Registry
                                </Link>
                            </Button>
                        </Grid>
                    </Box>
                </Grid>

                { auth === AuthState.SignedIn ? <LogoutButton /> : null }

            </Grid>
        </AppBar>
    );
}