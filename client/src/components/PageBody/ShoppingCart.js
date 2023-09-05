import AppState from "../../AppState";
import Home from "./Home"
import "./ShoppingCart.css"

//TODO display items quantity from shopping cart as current value of quantity on shopping cart page
//TODO if cart is empty grey out icon with hover over message or modal popup
//TODO create helper function to update shopping cart quantity
//TODO update delete button CSS to be more readable as button and change the cursor 


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

    if (appState.shoppingCart.length === 0) { 
        return (
            <div className='shopping-cart'>
                <div className='warning-message'>Your cart is empty.</div>
                <Home appState={appState} setAppState={setAppState}></Home>
            </div>
        )
    }


    return (
    <div className='shopping-cart'>
        <h1>Shopping Cart Page</h1> 
        {appState.shoppingCart.map((item, i) => 
        <div className='shopping-cart__item-container' key={i}> 
            <div className='shopping-cart__item-image'> Image Here</div>
            <div className='shopping-cart__item-text'>
                <div className='shopping-cart__item-title' 
                    onClick = {() => {selectBookHandler(item.book)}}>{item.book.title}</div>
                <div>${item.book.price}</div>
                <div>{item.book.author_firstname} {item.book.author_lastname}</div>
                <div>{item.book.genre}</div>
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
                <div className= 'shopping-cart__delete-button clickable-text'
                    onClick = {() => {deleteBookHandler(item.book)}}>delete</div>
            </div>
        </div>)}

    </div>
)
}
export default ShoppingCart;