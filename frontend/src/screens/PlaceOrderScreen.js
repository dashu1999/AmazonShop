import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import CheckOutSteps from '../components/CheckOutSteps'

export default function PlaceOrderScreen() {
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);
    if (!cart.paymentMethod) {
        navigate('/payment');
    }
    const toPrice = (num) => Number(num.toFixed(2));
    cart.itemsPrice = toPrice(cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0));
    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
    cart.taxPrice = toPrice(0.15 * cart.itemsPrice); // Here tax input 0.15(15%)
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
    const placeOrderHandler = () => {
        // Palce Action
    }
    return (
        <div>
            <CheckOutSteps step1 step2 step3 step4></CheckOutSteps>
            <div className='row top'>
                <div className='col-2'>
                    <ul>
                        <li>
                            <div className='card card-body'>
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                                    <strong>Address:</strong> {cart.shippingAddress.address},
                                    {cart.shippingAddress.city},{cart.shippingAddress.postalCode},
                                    {cart.shippingAddress.country}, {cart.shippingAddress.phone}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className='card card-body'>
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method:</strong> {cart.paymentMethod}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className='card card-body'>
                                <h2>Order Items</h2>
                                <ul>
                                    {
                                        cart.cartItems.map((item) => (
                                            <li key={item.product}>
                                                <div className='row'>
                                                    <div>
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="small">
                                                        </img>
                                                    </div>
                                                    <div className='min-30'>
                                                        <Link to={`/products/${item.product}`}>{item.name}</Link>
                                                    </div>

                                                    <div>{item.qty} x INR {item.price} = INR {item.qty * item.price}</div>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className='col-1'>
                    <div className='card card-body'>
                        <ul>
                            <li>
                                <h2>Order Summary</h2>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Items</div>
                                    <div>INR {cart.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Shipping</div>
                                    <div>INR {cart.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Tax</div>
                                    <div>INR {cart.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div><strong>Order Total</strong></div>
                                    <div>
                                        <strong>INR {cart.totalPrice.toFixed(2)}</strong>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <button
                                    type='button'
                                    onClick={placeOrderHandler}
                                    disabled={cart.cartItems.length === 0}
                                    className='primary block'>                                    
                                    Place Order
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}