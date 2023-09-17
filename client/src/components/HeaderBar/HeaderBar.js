import LoginStatus from "./LoginStatus";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon"; 
import AppState from "../../AppState";
import './HeaderBar.css'

function HeaderBar({appState, setAppState}) {
    
    const homeHandler = () => {

        setAppState((previousAppState) => {
            let newAppState = previousAppState.clone();
            newAppState.displayMode = AppState.DISPLAY_MODE_HOME;
            return newAppState;
        }); 
    }
    
   
    return (
        <div className='header-bar color-temp'> 
            <div onClick={() => {homeHandler()}} className='header-bar__home clickable-text'> Bookstore  </div>
            <SearchBar appState={appState} setAppState={setAppState} />
            <LoginStatus appState={appState} setAppState={setAppState}/>
            <CartIcon appState={appState} setAppState={setAppState}/>
        </div>
    );
}


export default HeaderBar;