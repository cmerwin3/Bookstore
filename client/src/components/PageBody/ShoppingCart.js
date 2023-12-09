import AppState from "../../AppState";
import Home from "./Home"
import {BOOK_IMAGE_URL} from "../../constants";
import "./ShoppingCart.css"

//TODO display items quantity from shopping cart as current value of quantity on shopping cart page
//TODO if cart is empty grey out icon with hover over message or modal popup

function ShoppingCart({appState ,setAppState}) {
    
    function selectBookHandler(item) {
        setAppState((previousAppState) => {
            let newAppState = previousAppState.clone();
            newAppState.bookItem = item;
            newAppState.displayMode = AppState.DISPLAY_MODE_ITEM;
            return newAppState;
        });   
    }

    function deleteBookHandler(item) {
        let cart = appState.shoppingCart;
        for(let index = 0; index < cart.length; index++){
            if (cart[index].book.id === item.id){
                cart.splice(index, 1);
                break;
            }
        }
        setAppState((previousAppState) => {
            let newAppState = previousAppState.clone();
            newAppState.shoppingCart = cart;
            return newAppState;
        });
    }

    function updateQuantityHandler(cartListindex, newOption){
        let cart = appState.shoppingCart;
        cart[cartListindex].quantity = Number(newOption);
        setAppState((previousAppState) => {
            let newAppState = previousAppState.clone();
            newAppState.shoppingCart = cart;
            return newAppState;
        });
    }

    function checkoutHandler(){
        if (appState.user === undefined) {
            setAppState((previousAppState) => {
                let newAppState = previousAppState.clone();
                newAppState.displayMode = AppState.DISPLAY_MODE_LOGIN
                return newAppState;
            });
        } else {
            setAppState((previousAppState) => {
                let newAppState = previousAppState.clone();
                newAppState.displayMode = AppState.DISPLAY_MODE_CHECKOUT
                return newAppState;
            });
        }   
    }

    if (appState.shoppingCart.length === 0) { 
        setAppState((previousAppState) => {
            let newAppState = previousAppState.clone();
            newAppState.homeMessage = "Your cart is empty";
            newAppState.displayMode = AppState.DISPLAY_MODE_HOME;
            return newAppState;
        });
    }

    let buttonText = "Checkout"
    if(appState.user === undefined){
        buttonText = "Login to Checkout"
    }


    return (
        <div className='shopping-cart'>
            <h1>Shopping Cart Page</h1> 
            {appState.shoppingCart.map((item, i) => 
                <div className='shopping-cart__item-container color-2-base' key={i}> 
                    <div className='book-image-small-container'>
                        <img className='book-image-small'
                                src={`${BOOK_IMAGE_URL}${item.book.id}.jpg`}></img>
                    </div>
                    <div className='shopping-cart__item-text'>
                        <div className='shopping-cart__item-title' 
                            onClick = {() => {selectBookHandler(item.book)}}>{item.book.title}</div>
                        <div>Author: {item.book.author_firstname} {item.book.author_lastname}</div>
                        <div>Genre: {item.book.genre}</div>
                        <div>${item.book.price}</div>
                        <div> quantity  
                            <select name='quantity' id={i}
                                    defaultValue={item.quantity} 
                                    onChange={(e) => updateQuantityHandler(i, e.target.value)}>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                            </select>
                        </div>
                        <div className= 'shopping-cart__delete-button clickable-text button-style'
                            onClick = {() => {deleteBookHandler(item.book)}}>Remove from Cart</div>
                        </div>
                </div>)
            }
            <div onClick={()=> {checkoutHandler()}} className='button-style'>{buttonText}</div>
        </div>
    )
}  
export default ShoppingCart;