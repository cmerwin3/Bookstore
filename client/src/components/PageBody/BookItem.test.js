import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import AppState from '../../AppState'; 
import BookItem from './BookItem'
import { act } from 'react-dom/test-utils';


let testBook = {
    "id": 1,
    "title": "Making It So: A Memoir",
    "price": 19.99,
    "author_lastname": "Stewart ",
    "author_firstname": " Patrick",
    "genre": "Biographies"
}

describe('Book Item Component', () => {
    test('change in appstate shopping cart', () => {
      //Arrange
      let appState = new AppState();
      appState.displayMode = AppState.DISPLAY_MODE_ITEM;
      appState.bookItem = testBook;
      let newAppState = undefined;
      let setAppState = (innerFunction) => {
          newAppState = innerFunction(appState);
      }
      act(() => render(<BookItem appState={appState} setAppState={setAppState}/>));
      
      //Action
      let cartButton = screen.getByText("Add To Cart");
      act(() => userEvent.click(cartButton));

      //Assert
      expect(newAppState.displayMode).toBe(AppState.DISPLAY_MODE_ITEM);
      expect(newAppState.shoppingCart.length).toBe(1);
      expect(newAppState.shoppingCart[0]['book']['id']).toBe(1);
    });
});