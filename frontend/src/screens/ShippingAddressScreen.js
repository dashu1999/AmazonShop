import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../actions/cartActions';
import CheckOutSteps from '../components/CheckOutSteps'

export default function ShippingAddressScreen(props) {
    const navigate = useNavigate();
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    if (!userInfo) {
        navigate('/signin');
    }
    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);
    const [phone, setPhone] = useState(shippingAddress.phone);
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({
            fullName,
            address,
            city,
            postalCode,
            country,
            phone,
        })
        );
        navigate('/payment');
        // dispatch save
    };
    return (
        <div>
            <CheckOutSteps step1 step2></CheckOutSteps>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>Shipping Address</h1>
                </div>
                <div>
                    <label htmlFor='fullName'>Full Name</label>
                    <input
                        type='text'
                        id='fullName'
                        placeholder='Enter full name'
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required>

                    </input>
                </div>
                <div>
                    <label htmlFor='address'>Address</label>
                    <input
                        type='text'
                        id='address'
                        placeholder='Enter address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required>

                    </input>
                </div>
                <div>
                    <label htmlFor='city'>City</label>
                    <input
                        type='text'
                        id='city'
                        placeholder='Enter City'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required>

                    </input>
                </div>
                <div>
                    <label htmlFor='postalcode'>Postal Code</label>
                    <input
                        type='text'
                        id='postalcode'
                        placeholder='Enter Postal Code'
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        required>

                    </input>
                </div>
                <div>
                    <label htmlFor='country'>Country</label>
                    <input
                        type='text'
                        id='country'
                        placeholder='Enter country'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required>

                    </input>
                </div>
                <div>
                    <label htmlFor='phone'>Phone</label>
                    <input
                        type='text'
                        id='phone'
                        placeholder='Enter phone'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required>
                    </input>
                </div>
                <div>
                    <label />
                    <button className='primary' type='submit'>
                        Continue
                    </button>
                </div>
            </form>
        </div>
    )
}