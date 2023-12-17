import nock from 'nock';
import { render, screen, waitFor, fireEvent} from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import {act} from 'react-dom/test-utils';
import AppState from '../../AppState'; 
import Home from './Home';



let testBookList = [
    {
        "id": 1,
        "title": "Making",
        "price": 19.99,
        "author_lastname": "Stewart ",
        "author_firstname": " Patrick",
        "genre": "Biographies"
    },
    {
        "id": 2,
        "title": "Greenlights",
        "price": 15.99,
        "author_lastname": "McConaughey",
        "author_firstname": "Matthew",
        "genre": "Biographies"
    },
    {
        "id": 3, 
        "title": 'Dual Memory',
        "price": 15.99,
        "author_lastname": 'Burke',
        "author_firstname": 'Sue',
        "genre": 'Science Fiction'
    }]


    let startingAppState = undefined;
    let newAppState = undefined;
    let setAppState = undefined;


    beforeEach(() => {
        startingAppState = new AppState();
        setAppState = (innerFunction) => {
            newAppState = innerFunction(startingAppState);
        };
    
        const scope = nock('http://localhost:8000/')
            .defaultReplyHeaders({
                'access-control-allow-origin': '*',
                'access-control-allow-credentials': 'true'
            })
            .get('/books?order=random&limit=3')
            .reply(200, JSON.stringify(testBookList)); //I am unsure what to pass into the json response
    })



describe('Homepage Componet', () => {
    test('Rest API Call for booklist', async () => {
        //Arrange
        
        //Action
       // I know i need to change the appstate here but im not sure what the correct way 
        render(<Home appState={startingAppState} setAppState={setAppState}/>);
      

        //Assert
        await waitFor(() => {
            expect(startingAppState).toBeDefined();
        })
    })
})