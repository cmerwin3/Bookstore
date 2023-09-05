import AppState from "../../AppState";
import Home from "./Home";
import './BookList.css'


 function BookList({appState ,setAppState}) {
    
    function selectBookHandler(item) {
        setAppState((previousAppState) => {
            let newAppState = previousAppState.clone();
            newAppState.bookItem = item;
            newAppState.displayMode = AppState.DISPLAY_MODE_ITEM;
            return newAppState;
        });   
    }
    
    if (appState.bookList.length === 0) { 
        return (
            <div className='book-list'>
                <div className='warning-message'>No results found.</div>
                <Home appState={appState} setAppState={setAppState}></Home>
            </div>
        )
    }
    
    return (
        <div className='book-list'> 
            <h1>Book List Page</h1> 
            {appState.bookList.map((item, i) => 
            <div className='book-list__item-container color-2-base' key={i}> 
                <div className='book-list__item-image'> Image Here</div>
                <div className='book-list__item-text'>
                    <div className='book-list__item-title color-2-action clickable-text' 
                        onClick = {() => {selectBookHandler(item)}}>{item.title}</div>
                    <div>${item.price}</div>
                    <div>{item.author_firstname} {item.author_lastname}</div>
                    <div>{item.genre}</div>
                </div>
            </div>)}

        </div>
    )
}

export default BookList;