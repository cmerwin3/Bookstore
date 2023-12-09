import './SearchBar.css'
import {useState, useEffect} from 'react';
import {REST_URL} from "../../constants";
import AppState from '../../AppState';


//TODO Update the change in display mode from single display to list and back


function SearchBar({appState, setAppState}) {
    const [genre, setGenre]= useState('all');
    const [genreList, setGenreList] = useState([]);
    const [keyword, setKeyword]= useState('');


    // Load in genre list from server 
    useEffect(() => {    
        if(genreList.length === 0){
            // setGenreList(['Test_Biographies']);
            fetch(REST_URL + 'genres')
            .then((response) => response.json())    
            .then((data) => {
                    const returnList = data.map(item => item.genre);
                    setGenreList(returnList);
            })
        }
    })
        
   
    function searchHandler(event) {
        event.preventDefault();
        
        const restUrl = new URL(`${REST_URL}books`);
        
        if (genre !== 'all'){
            restUrl.searchParams.append('genre', `${encodeURIComponent(genre)}`);
        }

        if (keyword !== undefined) {
            restUrl.searchParams.append('keyword', `${encodeURIComponent(keyword)}`); 
        }

        fetch(restUrl.toString())
            .then((response) => response.json())    
            .then((data) => {
                
                setAppState((previousAppState) => {
                    let newAppState = previousAppState.clone();
                    newAppState.bookList = data;
                    newAppState.displayMode = AppState.DISPLAY_MODE_LIST;
                    return newAppState;
                });   
            })
        
    };
    
    return (
        <div className='header-bar__search-bar'>  
            <form onSubmit={searchHandler}>
                <select name='genre' id='genre' onChange={(e) => setGenre(e.target.value)}>
                    <option value='all'>All Genres</option>
                    {genreList.map((item, i) => 
                        <option value={item} key={i}> {item} </option>
                    )}
                </select>
                <input
                    type='text' 
                    id='keyword' 
                    name='keyword' 
                    placeholder='Title or Author' 
                    onChange={(e) => setKeyword(e.target.value)}
                /> 
                <button type='submit'>Search</button>
            </form>
        </div>
    );
}



export default SearchBar;