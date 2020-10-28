import React, { useState, forwardRef, createRef, useEffect } from 'react';
import MaterialTable from 'material-table';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { useSnackbar } from 'notistack';

import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import PublishSharpIcon from '@material-ui/icons/PublishSharp';
import RemoveCircleOutlineSharpIcon from '@material-ui/icons/RemoveCircleOutlineSharp';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import VisibilitySharpIcon from '@material-ui/icons/VisibilitySharp';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ClearSharpIcon from '@material-ui/icons/ClearSharp';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Search from '@material-ui/icons/Search';
import RefreshSharpIcon from '@material-ui/icons/RefreshSharp';
import CheckSharpIcon from '@material-ui/icons/CheckSharp';
import HighlightOffSharpIcon from '@material-ui/icons/HighlightOffSharp';
import CancelSharpIcon from '@material-ui/icons/CancelSharp';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <EditSharpIcon {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <CancelSharpIcon {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteForeverSharpIcon {...props} ref={ref} />),
    Publish: forwardRef((props, ref) => <PublishSharpIcon {...props} ref={ref} />),
    Remove: forwardRef((props, ref) => <RemoveCircleOutlineSharpIcon {...props} ref={ref} />),
    Refresh: forwardRef((props, ref) => <RefreshSharpIcon {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} /> ),
    FilterList: forwardRef((props,ref) => <FilterList {...props} ref={ref} /> ),
    LastPage: forwardRef((props,ref) => <LastPage {...props} ref={ref} /> ),
    FirstPage: forwardRef((props,ref) => <FirstPage {...props} ref={ref} /> ),
    ResetSearch: forwardRef((props,ref) => <ClearSharpIcon {...props} ref={ref} /> ),
    NextPage: forwardRef((props,ref) => <ChevronRight {...props} ref={ref} /> ),
    PreviousPage: forwardRef((props,ref) => <ChevronLeft {...props} ref={ref} /> ),
    View: forwardRef((props, ref) => <VisibilitySharpIcon {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <CheckSharpIcon {...props} ref={ref} /> ),
    ThirdStateCheck: forwardRef((props, ref) => <HighlightOffSharpIcon {...props} ref={ref} />)
}

export default function(){
    const tableRef = createRef();
    const [remoteData, setRemoteData] = useState([]);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        getGuestList();
    },[])

    async function getGuestList(){
        const data = await API.graphql(graphqlOperation(queries.listGuests));
        const guests = (data.data.listGuests.items);
        setRemoteData(guests);
    }

    async function CreateGuest(data){
        const newGuest = await API.graphql({ query: mutations.createGuest, variables: { input: data }, authMode: 'AMAZON_COGNITO_USER_POOLS'})
        if (newGuest.data.createGuest !== undefined){
            return true;
        } else {
            return false;
        }
    }
    
    async function UpdateGuest(data){
        const updateGuest = await API.graphql({ query: mutations.updateGuest, variables: { input: data }, authMode: 'AMAZON_COGNITO_USER_POOLS'});
        if (updateGuest.data.updateGuest !== undefined){
            return true;
        } else {
            return false;
        }
    }

    async function DeleteGuest(data){
        const deleteGuest = await API.graphql({ query: mutations.deleteGuest, variables: { input: data }, authMode: 'AMAZON_COGNITO_USER_POOLS'});
        return true;
    }

    return(
        <MaterialTable
            title="Manage Posts"
            tableRef={tableRef}
            icons={tableIcons}
            options={{
                sorting: true,
                search: true
            }}
            
            data={ remoteData }

            editable={{
                onRowAdd: newData =>
                    new Promise ((resolve, reject) => {
                    const { lastName, firstName, } = newData;                   
                    const guestDetails = {
                        lastName: lastName, 
                         firstName: firstName,
                    };
                    CreateGuest(guestDetails)
                    .then((data) => {
                        if (data.createGuest !== null){
                            enqueueSnackbar('Guest added.', {
                                variant: 'success',
                                anchorOrigin: {
                                    vertical: 'bottom',
                                    horizontal: 'center'
                                }, 
                                autoHideDuration: 3000
                            });
                            resolve();
                            getGuestList();
                        }
                        else
                        {
                            enqueueSnackbar(data.errors[0].message,{
                                variant: 'error',
                                anchorOrigin: {
                                    vertical: 'bottom', 
                                    horizontal: 'center'
                                },
                                autoHideDuration: 3000
                            });
                            reject();
                        }
                    })
                    .catch((err) => {
                        enqueueSnackbar(err.errors[0].message, {
                            variant: 'error',
                            anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'center'
                            },
                            autoHideDuration: 3000
                        })
                        reject();
                    })
                    getGuestList();
                }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        const { lastName, firstName } = newData;

                        const { id } = oldData; 

                        const guestDetails = {
                            id: id,
                            lastName: lastName,
                            firstName: firstName, 
                        };

                        UpdateGuest(guestDetails)
                        .then((data) => {
                            if (data.updateGuest !== null){
                                enqueueSnackbar(`${firstName} ${lastName} has been updated!`, {
                                    variant: 'success',
                                    anchorOrigin: {
                                        vertical: 'bottom',
                                        horizontal: 'center'
                                    }, 
                                    autoHideDuration: 3000
                                });
                                resolve();
                                getGuestList();
                            }
                            else
                            {
                                enqueueSnackbar(data.errors[0].message,{
                                    variant: 'error',
                                    anchorOrigin: {
                                        vertical: 'bottom', 
                                        horizontal: 'center'
                                    },
                                    autoHideDuration: 3000
                                });
                                reject();
                            }
                        })
                        .catch((err) => {
                            enqueueSnackbar(err.errors[0].message, {
                                variant: 'error',
                                anchorOrigin: {
                                    vertical: 'bottom',
                                    horizontal: 'center'
                                },
                                autoHideDuration: 3000
                            })
                            reject();
                        })
                        getGuestList();
                    }),
                onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                        const { id, version } = oldData;
                        const dataArray = {
                            id: id,
                            version: version
                        }
                        DeleteGuest(dataArray)
                        .then((data) => {
                            if (data.deleteGuest !== null){
                                enqueueSnackbar(`Account has been removed!`, {
                                    variant: 'success',
                                    anchorOrigin: {
                                        vertical: 'bottom',
                                        horizontal: 'center'
                                    }, 
                                    autoHideDuration: 3000
                                });
                                resolve();
                                getGuestList();
                            }
                            else
                            {
                                enqueueSnackbar(data.errors[0].message,{
                                    variant: 'error',
                                    anchorOrigin: {
                                        vertical: 'bottom', 
                                        horizontal: 'center'
                                    },
                                    autoHideDuration: 3000
                                });
                                reject();
                            }
                            getGuestList();
                        })
                        .catch((err) => {
                            enqueueSnackbar(err.errors[0].message, {
                                variant: 'error',
                                anchorOrigin: {
                                    vertical: 'bottom',
                                    horizontal: 'center'
                                },
                                autoHideDuration: 3000
                            })
                            reject();
                        });
                    
                        getGuestList();
                    })
            }}          
            
            columns = {[
                {title: 'Last Name', align: 'center', field: 'lastName', type: 'string'},
                {title: 'First Name', align: 'center', field: 'firstName', type: 'string'},
                {title: 'dbIdentifier', align: 'center', field: 'id', type: 'string', hidden: true}
            ]}
        />
    );
}