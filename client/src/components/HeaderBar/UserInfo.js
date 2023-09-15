import AppState from "../../AppState";
import {useState, useEffect} from 'react';
import { REST_URL } from "../../constants";
import './UserInfo.css';


function UserInfo({appState ,setAppState}) {

    function logOutHandler(event) {
        event.preventDefault();

        setAppState((previousAppState) => {
            let newAppState = previousAppState.clone();
            newAppState.user = undefined;
            newAppState.displayMode = AppState.DISPLAY_MODE_HOME;
            console.log("step 1");
            return newAppState;
        }); 
    };
    
    let user = appState.user;

    console.log("step 2");

    return (
        <div className='user-info'>
            <h1>User Information</h1>
            <div className='user-info__user-container'>
                <div>{user.first_name}</div>
                <div>{user.last_name}</div>
                <div>{user.email}</div>
                <div>{user.address}</div>
                <div>{user.city}</div>
                <div>{user.state}</div>
                <div>{user.zip}</div>
            </div>
            <div className='user-info__log-out' onClick={logOutHandler}>Log Out</div>
        </div>
    );
}


export default UserInfo;

