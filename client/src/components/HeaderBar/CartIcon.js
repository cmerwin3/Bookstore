import AppState from '../../AppState';
import './CartIcon.css'

function CartIcon({appState, setAppState}) {
    
    let cartCount = 0;
    appState.shoppingCart.forEach(function(element){
        cartCount += element.quantity ;
    });

    const cartPageNavigation = () => {
        setAppState((previousAppState) => {
            let newAppState = previousAppState.clone();
            newAppState.displayMode = AppState.DISPLAY_MODE_SHOPPING_CART;
            return newAppState;
        });
    }

    return (
        <button onClick= {cartPageNavigation} 
            className='cart-icon'> Shopping Cart: {cartCount}</button>
    );


}


export default CartIcon;