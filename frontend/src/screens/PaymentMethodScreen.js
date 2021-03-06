import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../actions/cartActions';
import CheckOutSteps from '../components/CheckOutSteps'

export default function PaymentMethodScreen() {
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    if (!shippingAddress.address) {
        navigate('/shipping');
    }
    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const [paymentCaseMethod, setPaymentCaseMethod] = useState('CaseonDelivery');
    const [paymentStripeMethod, setPaymentStripeMethod] = useState('Stripe');
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod,paymentCaseMethod,paymentStripeMethod));        
        navigate('/placeorder');
    }
    return (
        <div>
            <CheckOutSteps step1 step2 step3></CheckOutSteps>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>Payment Method</h1>
                </div>
                <div>
                    <div>
                        <input
                            type='radio'
                            id='paypal'
                            value='PayPal'
                            name='paymentMethod'
                            required
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}>
                        </input>
                        <label htmlFor='paypal'>PayPal</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input
                            type='radio'
                            id='stripe'
                            value='Stripe'
                            name='paymentMethod'
                            required
                            onChange={(e) => setPaymentStripeMethod(e.target.value)}>
                        </input>
                        <label htmlFor='stripe'>Stripe</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input
                            type='radio'
                            id='caseondelivery'
                            value='CaseonDelivery'
                            name='paymentMethod'
                            required
                            onChange={(e) => setPaymentCaseMethod(e.target.value)}>
                        </input>
                        <label htmlFor='caseondelivery'>Case on Delivery</label>
                    </div>
                </div>
                <div>
                    <button className='primary' type='submit'>
                        Continue
                    </button>
                </div>
            </form>
        </div>
    )
}
