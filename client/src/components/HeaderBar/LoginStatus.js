import AppState from '../../AppState';
import './LoginStatus.css'

function LoginStatus({appState, setAppState}) {
    console.log( "user =" + JSON.stringify(appState.user))
    if(appState.user === undefined){
        return (
            <div onClick={loginHandler} className='header-bar__login-status'> Login Status </div>
        );
    } else{
        return (
            <div onClick={userInfoHandler}className='header-bar__login-status'> Welcome {appState.user.first_name} </div>
        );
    }
    function loginHandler() {
        setAppState((previousAppState) => {
            let newAppState = previousAppState.clone();
            newAppState.displayMode = AppState.DISPLAY_MODE_LOGIN;
            return newAppState;
        }); 
    }

    function userInfoHandler(){
        setAppState((previousAppState) => {
            let newAppState = previousAppState.clone();
            newAppState.displayMode = AppState.DISPLAY_MODE_USER_INFO;
            return newAppState;
        }); 
    }
}

export default LoginStatus;