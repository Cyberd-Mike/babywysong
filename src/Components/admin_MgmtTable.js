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
        console.log('Guest info is ', guests);
        setRemoteData(guests);
    }

    async function CreateGuest(data){
        const newGuest = await API.graphql({ query: mutations.createGuest, variables: { input: data }, authMode: 'AMAZON_COGNITO_USER_POOLS'})
        console.log('New guest is ', newGuest);
        console.log(JSON.stringify(newGuest));
        if (newGuest.data.createGuest !== undefined){
            return true;
        } else {
            return false;
        }
    }
    
    async function UpdateGuest(data){
        const updateGuest = await API.graphql({ query: mutations.updateGuest, variables: { input: data }, authMode: 'AMAZON_COGNITO_USER_POOLS'});
        console.log(JSON.stringify(updateGuest));
        if (updateGuest.data.updateGuest !== undefined){
            return true;
        } else {
            return false;
        }
    }

    async function DeleteGuest(data){
        const deleteGuest = await API.graphql({ query: mutations.deleteGuest, variables: { input: data }, authMode: 'AMAZON_COGNITO_USER_POOLS'});
        console.log(JSON.stringify(deleteGuest));
        return true;
    }
    //TODO: Create add, update and delete buttons.
    //      Create an "add" button so Bethany can add guests.
    //          Steps: 
    //              Get row data
    //              Do actions
    //              Reload table?
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
                    console.log('New data is ' + JSON.stringify(newData));
                    const { lastName, firstName, phoneNumber, isAttending, timeStart, timeEnd } = newData;
                
                    const strStart = timeStart.toString();
                    const strEnd = timeEnd.toString();

                    const propStart = strStart.split(' ');
                    const propEnd = strEnd.split(' ');

                    const StartStr = propStart[4];
                    const EndStr = propEnd[4];

                    const Start = StartStr.substring(0, StartStr.length - 3);
                    const End = EndStr.substring(0, EndStr.length - 3);
                    
                    const guestDetails = {
                        lastName: lastName, 
                        firstName: firstName, 
                        phoneNumber: phoneNumber, 
                        timeStart: Start, 
                        timeEnd: End,
                        isAttending: isAttending
                    };
                    console.log('Details are ', guestDetails)
                    CreateGuest(guestDetails)
                    .then((data) => {
                        if (data.createGuest !== null){
                            console.log('Operation returned ', data);
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
                            console.log('Operation failed', data.errors);
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
                        console.log('Error creating guest ', err)
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
                        console.log('Updating data', oldData)
                        const { lastName, firstName, phoneNumber, isAttending, timeStart, timeEnd } = newData;
                        console.log('Is Attending is set to ', isAttending);
                        var Start;
                        var End;
                        if (isAttending === null || isAttending === false){
                            console.log('Attendence was null, setting value to false')
                            var Attending = false;
                        } else {
                            console.log('Attendance is not null, setting to true')
                            var Attending = true;
                        }

                        if (timeStart.toString().length > 9){
                            const strStart = timeStart.toString();
                            const propStart = strStart.split(' ');                            
                            const StartStr = propStart[4];
                            Start = StartStr.substring(0, StartStr.length - 3);
                        }
                        else
                        {
                            Start = timeStart;
                        }
                        
                        
                        if (timeEnd.toString().length > 9){
                            const strEnd = timeEnd.toString();
                            const propEnd = strEnd.split(' ');
                            const EndStr = propEnd[4];
                            End = EndStr.substring(0, EndStr.length - 3);
                        }
                        else
                        {
                            End = timeStart;
                        }

                        
                        const { id } = oldData; 
                        console.log('id is ', id);

                        const guestDetails = {
                            id: id,
                            lastName: lastName, 
                            firstName: firstName, 
                            phoneNumber: phoneNumber, 
                            timeStart: Start, 
                            timeEnd: End,
                            isAttending: Attending
                        };

                        console.log('Guest details are ', guestDetails);

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
                                console.log('Operation failed', data.errors);
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
                        const { firstName, lastName, id, isAttending, phoneNumber, timeEnd, timeStart, version } = oldData;
                        const dataArray = {
                            id: id,
                            version: version
                        }
                        console.log('Old data id is ', )
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
                                console.log('Operation failed', data.errors);
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
                {title: 'Phone Number', align: 'center', field: 'phoneNumber', type: 'numeric'},
                {title: 'Time Start', align: 'center', field: 'timeStart', type: 'time'},
                {title: 'Time End', align: 'center', field: 'timeEnd', type: 'time'},
                {title: 'Attending?', align: 'center', field: 'isAttending', type: 'boolean'},
                {title: 'dbIdentifier', align: 'center', field: 'id', type: 'string', hidden: true}
            ]}
        />
    );
}