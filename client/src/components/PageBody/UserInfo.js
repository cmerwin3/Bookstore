import AppState from "../../AppState";
import {useState, useEffect, Fragment} from 'react';
import { REST_URL } from "../../constants";
import './UserInfo.css';


function UserInfo({appState ,setAppState}) {
    const [orderList, setOrderList] = useState([]);

    useEffect(() => {  
        if(orderList.length === 0){
            fetch(REST_URL + 'orders?customer_id=' + appState.user.id)
            .then((response) => response.json())    
            .then((data) => {
                    setOrderList(data);
            })
        }
    });

    function logOutHandler(event) {
        event.preventDefault();

        setAppState((previousAppState) => {
            let newAppState = previousAppState.clone();
            newAppState.user = undefined;
            newAppState.displayMode = AppState.DISPLAY_MODE_HOME;
            console.log("step 1");
            return newAppState;
        }); 
    };
    
    let user = appState.user;

    console.log("step 2");

    return (
        <div className='user-info'>
            <h1>Customer Information</h1>
            <div className='user-info_user-container color-2-base'>
                <div>{user.first_name} {user.last_name}</div>
                <div>{user.email}</div>
                <div>{user.city} {user.address} {user.state} {user.zip}</div>
            </div>
            <h1>Previous Orders</h1>
            {orderList.map((order, i) =>
                <div className='user-info__order_container color-2-base'>
                    <div className="span-columns-3">
                        <strong>Order ID:</strong> {order.id}
                        <strong style={{paddingLeft: 15}}> Date of Purchase:</strong> {(new Date(order.timestamp)).toDateString()}
                    </div>
                    <div><strong>Title</strong></div>
                    <div><strong>Qty</strong></div>
                    <div><strong>Price</strong></div>
                    {order.items.map((item, i) =>
                        <Fragment key={i}>
                            <div> {item.book_details.title} <br/> 
                                by {item.book_details.author_firstname} {item.book_details.author_lastname}
                            </div>
                            <div>{item.quantity}</div>
                            <div> ${item.price.toFixed(2)}</div>
                        </Fragment>
                    )}
                    <div className="span-columns-2" style={{justifySelf:"right"}}>Subtotal:</div>
                    <div> ${order.subtotal.toFixed(2)}</div>
                    <div className="span-columns-2" style={{justifySelf:"right"}}>Tax:</div>
                    <div> ${order.tax.toFixed(2)}</div>
                    <div className="span-columns-2" style={{justifySelf:"right"}}>Total:</div>
                    <div> ${order.total.toFixed(2)}</div>
                </div>
            )}
            <div className='user-info__log-out button-style' onClick={logOutHandler}>Log Out</div>
        </div>
    );
}


export default UserInfo;

