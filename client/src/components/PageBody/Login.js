import AppState from "../../AppState";
import {useState, useEffect} from 'react';
import { REST_URL } from "../../constants";
import './Login.css';


function Login({appState ,setAppState}) {
    const [loginEmail, setLoginEmail]= useState('');
    const [loginPassword, setLoginPassword]= useState('');
    const [errorMessage, setErrorMessage]= useState('');

    function submitLoginHandler(event) {
        event.preventDefault();

        const restUrl = new URL(`${REST_URL}customers`);
       
        restUrl.searchParams.append('email', `${encodeURIComponent(loginEmail)}`);
        restUrl.searchParams.append('password', `${encodeURIComponent(loginPassword)}`);
        
        // const requestOptions = {
        //     method: 'GET',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify({
        //         email: loginEmail,
        //         password: loginPassword
        //     })
        // }
        // console.log(JSON.stringify(requestOptions));
        console.log("1-" + restUrl.toString());

        fetch(restUrl.toString())
            .then((response) => {
                console.log("response1 = " + JSON.stringify(response));
                console.log("response2 = " + response.status);
                if (!response.ok) {
                    console.log("response before throw");
                    throw new Error('not found')
                }
                return response.json();
            })    
            .then((data) => {
                console.log("inside data 1: " + data );
                console.log("inside data 2: " + JSON.stringify(data));
                setAppState((previousAppState) => {
                    let newAppState = previousAppState.clone();
                    newAppState.user = data;
                    // TODO Update to return user back to previous display page dynamically 
                    newAppState.displayMode = AppState.DISPLAY_MODE_HOME;
                    console.log( "new =" + JSON.stringify(newAppState.user));
                    return newAppState;
                });   
            })
            .catch(error => {
                console.log("error1 = " + error);

                console.log("error = " + JSON.stringify(error));
                setErrorMessage('Email and password combination not verified please try again.');
            })   
    }

    function registrationHandler() {
        console.log("inside registration handler");
        setAppState((previousAppState) => {
            let newAppState = previousAppState.clone();
            newAppState.displayMode = AppState.DISPLAY_MODE_REGISTRATION;
            return newAppState;
        });
    }

    return (
        <div className='login'>
            <h1>Customer Login</h1>
            {errorMessage.length > 0 &&
                <div className="warning-message">
                    {errorMessage}
                </div>
            }
            <form onSubmit={submitLoginHandler}>
                <div>User Email</div>
                <input
                        type='text' 
                        id='email' 
                        name='email' 
                        placeholder='email' 
                        onChange={(e) => setLoginEmail(e.target.value)}
                />
                <div>User Password</div>
                <input
                        type='password' 
                        id='password' 
                        name='password' 
                        placeholder='password' 
                        onChange={(e) => setLoginPassword(e.target.value)}
                />
                <button type='submit'>Submit</button>
            </form>
            <div className="login__register">Not a member yet? 
                <span onClick={() => {registrationHandler()}} className="login__register-link clickable-text">
                    Register here!</span></div>

        </div> 


    );
}

export default Login;