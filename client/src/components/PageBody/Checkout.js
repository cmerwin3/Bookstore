import AppState from "../../AppState";
import {useState, useEffect, Fragment} from 'react';
import {REST_URL} from "../../constants";
import './Checkout.css'

function Checkout({appState ,setAppState}) {
    const [cardFields, setCardFields]= useState({
        card_number : '',
        card_expiration : '',
        card_ccv : ''
    });
    const [totalFields, setTotalFields]= useState({
        sub_total: 0.0,
        tax: 0.0,
        total: 0.0    
    })
    const [errorMessage, setErrorMessage]= useState('');

    let user = appState.user;
    let cart = appState.shoppingCart;

    useEffect(() => { 
        // calculate sub_total 
        let sub_total = 0;
        appState.shoppingCart.map((item, index) => {
            let value = item.book.price * item.quantity;
            sub_total += value;
        })
        
        // for demo purposes tax rate is asssumed to be standardized 
        let tax_rate = 0.08;
        let tax = tax_rate * sub_total;

        //calculate total
        let total = sub_total + tax;

        setTotalFields(() => {
            let newTotalFields = {
                sub_total: sub_total.toFixed(2),
                tax: tax.toFixed(2),
                total: total.toFixed(2)
            }
            return newTotalFields;
        })

    }, []);

    

    function submitOrderHandler(event) {
        event.preventDefault();

        const restUrl = new URL(`${REST_URL}orders`);
        let orderBody = buildOrderBody();
        
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(orderBody)
        }
        
        fetch(restUrl.toString(), requestOptions)
            .then((response) => {
                if (!response.ok) {
                    console.log('before error message');
                    return response.json().then(
                        errorData => { 
                            const message = errorData.errors;
                            console.log('error message ' + JSON.stringify(errorData));
                            throw new Error(message)});
                }
                return response.json();
            })    
            .then((data) => {
                setAppState((previousAppState) => {
                    let newAppState = previousAppState.clone();
                    newAppState.homeMessage = "Thank you for shopping with us, your order has been placed.";
                    newAppState.displayMode = AppState.DISPLAY_MODE_HOME;
                    return newAppState;
                });   
            })
            .catch(error => {
                console.log("error 2 = " + error);
                setErrorMessage(error.message);
            }) 

    }

    function buildOrderBody(){
        let order = {
            customer_id: appState.user.id,
            subtotal: totalFields.sub_total,
            tax: totalFields.tax,
            total: totalFields.total
        };

        let items = [];

        cart.map((cartItem) => {
            let newItem ={
                book_id: cartItem.book.id,
                quantity: cartItem.quantity,
                price: cartItem.book.price
            }
            items.push(newItem)
        })
        
        let orderBody = {
            order: order,
            items: items
        }

        return orderBody;
    }

    function changeHandler(event) {
        const value = event.target.value;

        setCardFields((previousCardFields) => {
            let newCardFields = {
                ...previousCardFields,
                [event.target.name]: value
            }
            return newCardFields;
        });   
    }

    function validateCCFields() {
        if (!cardFields.card_number.match(/^[0-9]+$/)) {
            return false;
        }

        if (!cardFields.card_expiration.match(/^[0-9]+\/[0-9]+/)) {
            return false;
        }
        
        if (!cardFields.card_ccv.match(/^[0-9]+$/)) {
            return false;
        }

        return true;
    }

  

    return (
        <form onSubmit={submitOrderHandler}>
            <h1>Checkout</h1>
            {errorMessage.length > 0 &&
                <div className="warning-message">
                    {errorMessage}
                </div>
            }
            <h2>Deliver To</h2>
            <div className='checkout__user-container color-2-base'>
                <div>{user.first_name} {user.last_name}</div>
                <div>{user.address}</div>
                <div>{user.city}, {user.state} {user.zip}</div>
            </div>
            <h2>Shopping Cart</h2>
            <div className='checkout__cart-container color-2-base'>
                <div className='checkout__grid-header'>Books</div>
                <div className='checkout__grid-header span-columns-2'>Qty</div>
                <div className='checkout__grid-header'>Price</div>
                {cart.map((item, i) => 
                    <Fragment key={i}>
                        <div className='checkout__item-image' key={i}> Image Here</div>
                        <div className='checkout__grid-title'>{item.book.title}<br/>by {item.book.author_firstname} {item.book.author_lastname}</div>
                        <div>{item.quantity}</div>
                        <div>${item.book.price}</div>
                    </Fragment>
                )}
                <div className='checkout__grid-header span-columns-3'>Subtotal:</div>
                <div>${totalFields.sub_total}</div>
                <div className='checkout__grid-header span-columns-3'>Tax:</div>
                <div>${totalFields.tax}</div>
                <div className='checkout__grid-header span-columns-3'>Total:</div>
                <div>${totalFields.total}</div>
            </div>
            
            <h2>Payment Information</h2>


            <div className='checkout__payment-container color-2-base'>
                <div>Card Number</div>
                <input
                        type='text' 
                        id='card_number' 
                        name='card_number' 
                        placeholder='' 
                        onChange={(event) => changeHandler(event)}
                />
                <div>Card Expiration</div>
                <input
                        type='text' 
                        id='card_expiration' 
                        name='card_expiration' 
                        placeholder='mm/yy' 
                        onChange={(event) => changeHandler(event)}
                />
                <div>Card CCV</div>
                <input
                        type='text' 
                        id='card_ccv' 
                        name='card_ccv' 
                        placeholder='' 
                        onChange={(event) => changeHandler(event)}
                />
            </div>
            <button type='submit' className='button-style' disabled={!validateCCFields()}>Place Order</button>
        </form>
    );
}

export default Checkout;