import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { detailsUser } from '../actions/userActions';
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import Product from '../components/Product';

export default function SellerScreen() {
    const params = useParams();
    const { id: sellerId } = params;
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const productList = useSelector((state) => state.productList);
    const { loading: loadingProducts, error: errorProducts, products } = productList;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(detailsUser(sellerId));
        dispatch(listProducts({ seller: sellerId }));
    }, [dispatch, sellerId]);
    return (
        <div className='row top'>
            <div className='col-1'>
                {loading
                    ? <LoadingBox></LoadingBox>
                    : error ? <MessageBox variant="danger">{error} </MessageBox>
                        : (
                            <>
                                <ul className='card card-body'>
                                    <li>
                                        <div className='row start'>
                                            <div className='p-1'>
                                                <img className='small' src={user.seller.logo} alt={user.seller.name}></img>
                                            </div>
                                            <div>
                                                <h1 className='p-1'>
                                                    {user.seller.name}
                                                </h1>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <Rating
                                            rating={user.seller.rating}
                                            numReviews={user.seller.numReviews}>
                                        </Rating>
                                    </li>
                                    <li>
                                        <a href={`mailto:${user.email}`}>Contact Seller</a>
                                    </li>
                                    <li>
                                        {user.seller.description}
                                    </li>
                                </ul>
                            </>
                        )
                }
            </div>
            <div className='col-3 card card-body'>
                {
                    loadingProducts
                        ? <LoadingBox></LoadingBox>
                        : errorProducts ? <MessageBox variant="danger">{errorProducts} </MessageBox>
                            : (
                                <>
                                    {products.length === 0 && (<MessageBox variant="danger">No Product Found</MessageBox>)}
                                    <div className='row center'>
                                        {products.map((product) => (
                                            <Product key={product._id} product={product}></Product>
                                        ))}
                                    </div>
                                </>

                            )
                }
            </div>
        </div>
    )
}
