import AppState from '../../AppState';
import './LoginStatus.css'

function LoginStatus({appState, setAppState}) {
    console.log( "user =" + JSON.stringify(appState.user))
    if(appState.user === undefined){
        return (
            <button onClick={loginNavigation} className='header-bar__login-status'> Login Status </button>
        );
    } else{
        return (
            <div className='header-bar__login-status'> Welcome {appState.user.first_name} </div>
        );
    }
    function loginNavigation() {
        setAppState((previousAppState) => {
            let newAppState = previousAppState.clone();
            newAppState.displayMode = AppState.DISPLAY_MODE_LOGIN;
            return newAppState;
        }); 
    }
}

export default LoginStatus;