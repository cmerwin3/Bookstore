import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils';
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
        "id": 5, 
        "title": 'Dual Memory',
        "price": 15.99,
        "author_lastname": 'Burke',
        "author_firstname": 'Sue',
        "genre": 'Science Fiction'
    }]


    //I think i am not approaching this the right way. The home page is set to randomly grab 3 books.
describe('Homepage Componet', () => {
    test('selectBookHandler function', () => {
        //Arrange
        let appState = new AppState();
        appState.displayMode = AppState.DISPLAY_MODE_HOME;
        let newAppState = undefined;
        let setAppState = (innerFunction) => {
            newAppState = innerFunction(appState);
        }
        act(() => render(<Home appState={appState} setAppState={setAppState}/>));
        // Create a mock for rest api call


        //Action
        let titleElement = screen.getByText(testBookList[0].title);
        act(() => userEvent.click(titleElement));

        //Assert
        expect(newAppState.displayMode).toBe(AppState.DISPLAY_MODE_ITEM);
        expect(newAppState.bookItem).toBeDefined();
        expect(newAppState.bookItem.id).toBe(testBookList[0].id);
    })
})