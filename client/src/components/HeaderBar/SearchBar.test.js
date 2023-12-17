import nock from 'nock';
import { render, screen, waitFor, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {act} from 'react-dom/test-utils';
import AppState from '../../AppState'; 
import SearchBar from './SearchBar';


let testBookList = [
    {
        "id": 1,
        "title": "Making It So: A Memoir",
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
    }]


const genreTestList = [
        {"genre":"Test_Biographies"},
        {"genre":"Test_Culinary"},
        {"genre":"Test_History"},
        {"genre":"Test_Romance"},
        {"genre":"Test_Science Fiction"}]
  


let startingAppState = undefined;
let newAppState = undefined;
let setAppState = undefined;

beforeEach(() => {
    startingAppState = new AppState();
    setAppState = (innerFunction) => {
        newAppState = innerFunction(startingAppState);
    };

    const scope = nock('http://localhost:8000/')
        // Default reply is used to set the headers of the mock reply to avoid CORS error
        .defaultReplyHeaders({
            'access-control-allow-origin': '*',
            'access-control-allow-credentials': 'true'
        })
        .get('/genres')
        .reply(200, JSON.stringify(genreTestList));
})



test('displays genre dropdown data from API', async () => {
    //Arrange see beforeEach for the set up for test
    
    
    //Action
    render(<SearchBar appState={startingAppState} setAppState={setAppState}/>);

    //Assert
    const dataElement = await screen.findByText('Test_Biographies');
    expect(dataElement).toBeInTheDocument();

    const dataElements = await screen.findAllByText('Test_Culinary');
    expect(dataElements.length).toBe(1);
    expect(dataElements[0]).toBeInTheDocument();
    
});



test('update appState when a user selects a genre and clicks search', async () => {
    //Arrange
    const scope = nock('http://localhost:8000/')
    // Default reply is used to set the headers of the mock reply to avoid CORS error
    .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
    })
    .get('/books?genre=Test_Culinary')
    .reply(200, JSON.stringify(testBookList));
    
    //Action

    render(<SearchBar appState={startingAppState} setAppState={setAppState}/>);

    const combobox = await screen.findByRole('combobox');
    const option = await screen.findByRole('option', {name: 'Test_Culinary'});
    const searchButton = await screen.findByText('Search');
    // const user = userEvent.setup();
    
    act(() => {

        userEvent.selectOptions(combobox, option);
        userEvent.click(searchButton);
    });


    //Assert
    // Await for allow the appstate to update before the expect is executed
    await waitFor(() => {
        expect(newAppState.displayMode).toBe(AppState.DISPLAY_MODE_LIST);
        expect(newAppState.bookList).toBeDefined();
        expect(newAppState.bookList[0].id).toBe(testBookList[0].id);
        expect(newAppState.bookList[1].id).toBe(testBookList[1].id);
    });

    
});

