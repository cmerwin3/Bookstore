import AppState from "../../AppState";
import Home from "./Home";
import BookList from "./BookList";
import BookItem from "./BookItem";
import Login from "./Login";
import Registration from "./Registration"
import './PageBody.css';
import ShoppingCart from "./ShoppingCart";


 function PageBody({appState ,setAppState}) {
    
    console.log("display mode =" + appState.displayMode);
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
        console.log("page body registration");
        return (
            <Registration appState={appState} setAppState={setAppState} />
        );
    }
    
    // Default to Home Page 
    else {
        return (
            <Home appState={appState} setAppState={setAppState} />
        );
    }
};

export default PageBody;