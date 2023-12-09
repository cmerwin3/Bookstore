import { render, screen } from '@testing-library/react';
import userEvent  from '@testing-library/user-event'
import { act } from 'react-dom/test-utils';
import AppState from '../../AppState';
import BookList from './BookList';


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

describe('BookList Component',  () => {
    test('change in appstate book item', () => {
        //Arrange
        let appState = new AppState();
        appState.displayMode = AppState.DISPLAY_MODE_LIST;
        appState.bookList = testBookList;
        let newAppState = undefined;
        let setAppState = (innerFunction) => {
            newAppState = innerFunction(appState);
        }
        act(() => render(<BookList appState={appState} setAppState={setAppState}/>));
    
        //Action
        let titleElement = screen.getByText(testBookList[0].title);
        act(() =>userEvent.click(titleElement));
        
        
        //Assert
        expect(newAppState.displayMode).toBe(AppState.DISPLAY_MODE_ITEM);
        expect(newAppState.bookItem).toBeDefined();
        expect(newAppState.bookItem.id).toBe(testBookList[0].id);
      });
})

