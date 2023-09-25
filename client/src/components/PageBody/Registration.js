import AppState from "../../AppState";
import {useState, useEffect} from 'react';
import { REST_URL } from "../../constants";
import './Registration.css';


function Registration({appState ,setAppState}) {
    const [errorMessage, setErrorMessage]= useState('');
    const [fields, setFields]= useState({
        email : '',
        password : '',
        last_name : '',
        first_name : '',
        address : '',
        city : '',
        state : '',
        zip : ''
    });
    
    

    function registrationHandler(event) {
        event.preventDefault();

        const restUrl = new URL(`${REST_URL}customers`);
        
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(fields)
        }

        fetch(restUrl.toString(), requestOptions)
            .then((response) => {
                if (!response.ok) {
                    console.log('before error message');
                    return response.json().then(
                        errorData => { 
                            const message = errorData.errors[0].msg;
                            console.log('error message ' + JSON.stringify(errorData));
                            throw new Error(message)});
                }
                return response.json();
            })    
            .then((data) => {
                setAppState((previousAppState) => {
                    let newAppState = previousAppState.clone();
                    newAppState.user = data;
                    newAppState.homeMessage = "Thank you for registering your account"
                    newAppState.displayMode = AppState.DISPLAY_MODE_HOME;
                    return newAppState;
                });   
            })
            .catch(error => {
                console.log("error 2 = " + error);
                setErrorMessage(error.message);
            })   
    }


    function changeHandler(event) {
        const value = event.target.value;

        setFields((previousFields) => {
            let newFields = {
                ...previousFields,
                [event.target.name]: value
            }
            return newFields;
        });   
    }

    function validateEmail(event) {
        const value = event.target.value;
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            setErrorMessage('Please enter a valid email address.')
        } else {
            setErrorMessage('');
            changeHandler(event);
        }
    }

    function validateFields() {
        const keys = Object.keys(fields);
        let isValid = true;
        keys.forEach(element => {
            if (fields[element].trim().length === 0){
                isValid = false;
            }
        });
        return isValid;
    }

    return (
        <div className='registration'>
            <h1>Customer Registration</h1>
            {errorMessage.length > 0 &&
                <div className="warning-message">
                    {errorMessage}
                </div>
            }
            <form onSubmit={registrationHandler}>
                <label>Email</label>
                <input
                        type='email' 
                        id='email' 
                        name='email' 
                        placeholder='email' 
                        onBlur={(event) => validateEmail(event)}
                />
                <label>Password</label>
                <input
                        type="password"
                        id='password' 
                        name='password' 
                        placeholder='password' 
                        onChange={(event) => changeHandler(event)}
                />
                <label>Last Name</label>
                <input
                        type='text' 
                        id='last_name' 
                        name='last_name' 
                        placeholder='last name' 
                        onChange={(event) => changeHandler(event)}
                />
                <label>First Name</label>
                <input
                        type='text' 
                        id='first_name' 
                        name='first_name' 
                        placeholder='first name' 
                        onChange={(event) => changeHandler(event)}
                />
                <label>Address</label>
                <input
                        type='text' 
                        id='address' 
                        name='address' 
                        placeholder='address' 
                        onChange={(event) => changeHandler(event)}
                />
                <label>City</label>
                <input
                        type='text' 
                        id='city' 
                        name='city' 
                        placeholder='city' 
                        onChange={(event) => changeHandler(event)}
                />
                <label>State</label>
                <select name='state' id='state' 
                    onChange={(event) => changeHandler(event)}>
                        <option value="">Select</option>
                        <option value="AL">AL</option>
                        <option value="AK">AK</option>
                        <option value="AZ">AZ</option>
                        <option value="AR">AR</option>
                        <option value="CA">CA</option>
                        <option value="CO">CO</option>
                        <option value="CT">CT</option>
                        <option value="DE">DE</option>
                        <option value="DC">DC</option>
                        <option value="FL">FL</option>
                        <option value="GA">GA</option>
                        <option value="HI">HI</option>
                        <option value="ID">ID</option>
                        <option value="IL">IL</option>
                        <option value="IN">IN</option>
                        <option value="IA">IA</option>
                        <option value="KS">KS</option>
                        <option value="KY">KY</option>
                        <option value="LA">LA</option>
                        <option value="ME">ME</option>
                        <option value="MD">MD</option>
                        <option value="MA">MA</option>
                        <option value="MI">MI</option>
                        <option value="MN">MN</option>
                        <option value="MS">MS</option>
                        <option value="MO">MO</option>
                        <option value="MT">MT</option>
                        <option value="NE">NE</option>
                        <option value="NV">NV</option>
                        <option value="NH">NH</option>
                        <option value="NJ">NJ</option>
                        <option value="NM">NM</option>
                        <option value="NY">NY</option>
                        <option value="NC">NC</option>
                        <option value="ND">ND</option>
                        <option value="OH">OH</option>
                        <option value="OK">OK</option>
                        <option value="OR">OR</option>
                        <option value="PA">PA</option>
                        <option value="RI">RI</option>
                        <option value="SC">SC</option>
                        <option value="SD">SD</option>
                        <option value="TN">TN</option>
                        <option value="TX">TX</option>
                        <option value="UT">UT</option>
                        <option value="VT">VT</option>
                        <option value="VA">VA</option>
                        <option value="WA">WA</option>
                        <option value="WV">WV</option>
                        <option value="WI">WI</option>
                        <option value="WY">WY</option>
                    </select>
                <label>Zip</label>
                <input
                        type='text' 
                        id='zip' 
                        name='zip' 
                        placeholder='zip' 
                        onChange={(event) => changeHandler(event)}
                />
                <button type='submit' className='button-style' disabled={!validateFields()}>Register</button>
            </form>
        </div> 
    );
}

export default Registration;