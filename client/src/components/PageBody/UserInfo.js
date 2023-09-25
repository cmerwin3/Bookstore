import AppState from "../../AppState";
import {useState, useEffect} from 'react';
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
            <h1>User Information</h1>
            <div className='user-info_user-container color-2-base'>
                <div>{user.first_name}</div>
                <div>{user.last_name}</div>
                <div>{user.email}</div>
                <div>{user.address}</div>
                <div>{user.city}</div>
                <div>{user.state}</div>
                <div>{user.zip}</div>
            </div>
            {orderList.map((order, i) =>
                <div>
                    <div>Order ID: {order.id}</div>
                    {order.items.map((item, i) =>
                        <div>
                            <div>Title {item.book_details.title}</div>
                            <div>Author {item.book_details.author_firstname} {item.book_details.author_lastname}</div>
                            <div>Qty {item.quantity}</div>
                            <div>Price ${item.price.toFixed(2)}</div>
                        </div>
                    )}
                    <div>Subtotal ${order.subtotal.toFixed(2)}</div>
                    <div>Tax ${order.tax.toFixed(2)}</div>  
                    <div>Total ${order.total.toFixed(2)}</div>
                </div>
            )}
            <div className='user-info__log-out button-style' onClick={logOutHandler}>Log Out</div>
        </div>
    );
}


export default UserInfo;

