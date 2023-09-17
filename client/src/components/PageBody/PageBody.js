import AppState from "../../AppState";
import Home from "./Home";
import BookList from "./BookList";
import BookItem from "./BookItem";
import Login from "./Login";
import Registration from "./Registration"
import UserInfo from "../HeaderBar/UserInfo";
import ShoppingCart from "./ShoppingCart";
import './PageBody.css';


 function PageBody({appState ,setAppState}) {

    if (appState.displayMode === AppState.DISPLAY_MODE_LIST) {
        return (
            <BookList appState={appState} setAppState={setAppState} />
        );
    }
    else if (appState.displayMode === AppState.DISPLAY_MODE_ITEM) {
        return (
            <BookItem appState={appState} setAppState={setAppState} />
        );
    }
    else if (appState.displayMode === AppState.DISPLAY_MODE_SHOPPING_CART) {
        return (
            <ShoppingCart appState={appState} setAppState={setAppState} />
        );
    }
    else if (appState.displayMode === AppState.DISPLAY_MODE_LOGIN) {
        return (
            <Login appState={appState} setAppState={setAppState} />
        );
    }
    else if (appState.displayMode === AppState.DISPLAY_MODE_REGISTRATION) {
        
        return (
            <Registration appState={appState} setAppState={setAppState} />
        );
    }
    else if (appState.displayMode === AppState.DISPLAY_MODE_USER_INFO) {
        return (
            <UserInfo appState={appState} setAppState={setAppState} />
        );
    }
    else { // Default to Home Page
        return (
            <Home appState={appState} setAppState={setAppState} />
        );
    }
};

export default PageBody;