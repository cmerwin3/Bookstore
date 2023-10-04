import AppState from "../../AppState";
import {useState, useEffect} from 'react';
import { REST_URL, BOOK_IMAGE_URL } from "../../constants";
import './Home.css'


 function Home({appState ,setAppState}) {
    
    const [homeBookList, setHomeBookList]= useState([]);
    
    useEffect(() => { 
        if(homeBookList.length === 0){
            const restUrl = new URL(`${REST_URL}books`);
            
            restUrl.searchParams.append('order', 'random'); 
            restUrl.searchParams.append('limit', '3'); 

            fetch(restUrl.toString())
                .then((response) => response.json())    
                .then((data) => {
                    setHomeBookList(data);
                })
        }
        
    });

    function selectBookHandler(item) {
        setAppState((previousAppState) => {
            let newAppState = previousAppState.clone();
            newAppState.bookItem = item;
            newAppState.displayMode = AppState.DISPLAY_MODE_ITEM;
            return newAppState;
        });   
    }

    return (
        <div className='home'> 
            {appState.homeMessage != undefined &&
                <div className="warning-message">
                    {appState.homeMessage}
                </div>
            }
            <h1 className='color-1-head'>Home Page</h1> 
            {homeBookList.map((item, i) => 
            <div className='home__item-container color-2-base' key={i}> 
                <div className='book-image-small-container'>
                    <img className='book-image-small'
                            src={`${BOOK_IMAGE_URL}${item.id}.jpg`}></img>
                </div>
                <div className='home__item-text'>
                    <div className='home__item-title color-2-action' 
                        onClick = {() => {selectBookHandler(item)}}>{item.title}</div>
                    <div>Author: {item.author_firstname} {item.author_lastname}</div>
                    <div>Genre: {item.genre}</div>
                    <div>${item.price}</div>
                </div>
            </div>)}

        </div>
    );
};

export default Home;