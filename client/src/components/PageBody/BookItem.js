import AppState from "../../AppState";
import ReactModal from 'react-modal';
import {BOOK_IMAGE_URL} from '../../constants.js';
import {useState} from 'react';
import './BookItem.css'


//TODO create helper function to update shopping cart quantity
//TODO react select information

function BookItem({appState ,setAppState}) {
    const [quantity, setQuantity]= useState(1);
    const [modalState, setModalState]= useState(false);
    function handleCloseModal() {
        return setModalState(false);
    };

    function addToCart(book) {
        let newCart = appState.shoppingCart
        let isDuplicate = false;
        
        //Check for duplicate item
        for(let index = 0; index < newCart.length; index++){
            if (newCart[index].book.id === book.id){
                newCart[index].quantity += Number(quantity);
                isDuplicate = true;
            }
        }
        
        if (isDuplicate === false){
            const itemInfo = {book: book, quantity: Number(quantity)}
            newCart.push(itemInfo);
        }
        
        setModalState(true);
        setAppState((previousAppState) => {
            let newAppState = previousAppState.clone();
            newAppState.shoppingCart = newCart;
            newAppState.displayMode = AppState.DISPLAY_MODE_ITEM;
            return newAppState;
        });
        
        setTimeout(() => {
            handleCloseModal();
        }, 4000);   
    }

    let book = appState.bookItem;
    

    return (
        <div> 
            <h1>Book Item Page</h1> 
            <div className='book-item__item-container color-2-base'>
                <div className='book-image-large-container'>
                    <img className='book-image-large'
                        src={`${BOOK_IMAGE_URL}${book.id}.jpg`}></img>
                </div>
                <div className='book-item__text_container color-2-base'>
                    <div className='book-item__item-title color-2-action'>{book.title}</div>
                    <div>Author: {book.author_firstname} {book.author_lastname}</div>
                    <div>Genre: {book.genre}</div>
                    <div style={{paddingTop:20}}>{book.synopsis}</div>
                    <div className='book-item__price-container'>
                        <div>$ {book.price}</div>
                        <div>Qty&nbsp;
                            <select name='quantity' id='quantity' 
                                    onChange={(e) => setQuantity(e.target.value)}>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                            </select>
                        </div>
                        <button className='button-style' onClick = {() => {addToCart(book)}}>Add To Cart</button>
                    </div>
                    <ReactModal 
                        isOpen={modalState}
                        className= "book-item__modal"
                        overlayClassName= "book-item__overlay"
                        ariaHideApp={false}>
                            
                        <div>Item added to cart.</div>
                        <button className='button-style' onClick={() => {handleCloseModal()}}>Close Modal</button>
                    </ReactModal>
                </div>
            </div>
        </div>
    );
};

export default BookItem;