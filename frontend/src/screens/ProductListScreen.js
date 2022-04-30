import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';


export default function ProductListScreen() {
    const navigate = useNavigate();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);
    const deleteHandler = () => {
        // TODO: DELETE Action
    }
    return (
        <div>
            <h1>Products</h1>
            {
                loading
                    ? <LoadingBox></LoadingBox>
                    : error
                        ? <MessageBox variant="danger">{error}</MessageBox>
                        :
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>PRICE</th>
                                    <th>CATEGORY</th>
                                    <th>BRAND</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price.toFixed(2)} <strong>INR</strong></td>
                                        <td>{product.category}</td>
                                        <td>{product.brand}</td>
                                        <td>
                                            <button
                                                type='button'
                                                className='small'
                                                onClick={() => navigate(`/product/${product._id}/edit`)}>
                                                Edit
                                            </button>
                                            <button
                                                type='button'
                                                className='small'
                                                onClick={() => deleteHandler(product)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
            }
        </div>
    )
}
