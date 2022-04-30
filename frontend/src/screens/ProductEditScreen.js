import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ProductEditScreen(props) {
    const navigate = useNavigate();
    const params = useParams();
    const { id: productId } = params;
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;
    const dispatch = useDispatch();
    useEffect(() => {
        if (!product || (product._id !== productId)) {
            dispatch(detailsProduct(productId));
        } else {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setBrand(product.brand);
            setDescription(product.description);
        }
    }, [product, dispatch, productId]);
    const submitHandler = (e) => {
        e.preventDefault();
        // TODO: Acd
    }
    return (
        <div>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>Edit Product {productId}</h1>
                </div>
                {
                    loading
                        ? <LoadingBox></LoadingBox>
                        : error
                            ? <MessageBox variant="danger">{error}</MessageBox>
                            :
                            <>
                                <div>
                                    <label htmlFor='name'>Product Name</label>
                                    <input
                                        id='name'
                                        type="text"
                                        placeholder="Enter Product Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}>
                                    </input>
                                </div>
                                <div>
                                    <label htmlFor='price'>Product Price</label>
                                    <input
                                        id='price'
                                        type="text"
                                        placeholder="Enter Product Price"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}>
                                    </input>
                                </div>
                                <div>
                                    <label htmlFor='image'>Product Image</label>
                                    <input
                                        id='image'
                                        type="text"
                                        placeholder="Enter Product Image"
                                        value={image}
                                        onChange={(e) => setImage(e.target.value)}>
                                    </input>
                                </div>
                                <div>
                                    <label htmlFor='category'>Product Category</label>
                                    <input
                                        id='category'
                                        type="text"
                                        placeholder="Enter Product Category"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}>
                                    </input>
                                </div>
                                <div>
                                    <label htmlFor='brand'>Product Brand</label>
                                    <input
                                        id='brand'
                                        type="text"
                                        placeholder="Enter Product Brand"
                                        value={brand}
                                        onChange={(e) => setBrand(e.target.value)}>
                                    </input>
                                </div>
                                <div>
                                    <label htmlFor='countInStock'>Product Stock</label>
                                    <input
                                        id='countInStock'
                                        type="text"
                                        placeholder="Enter Product Stock"
                                        value={countInStock}
                                        onChange={(e) => setCountInStock(e.target.value)}>
                                    </input>
                                </div>
                                <div>
                                    <label htmlFor='description'>Product Description</label>
                                    <textarea
                                        id='description'
                                        rows="3"
                                        type="text"
                                        placeholder="Enter Product Description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}>
                                    </textarea>
                                </div>
                                <div>
                                    <label></label>
                                    <button className='primary' type='submit'>Update Product</button>
                                </div>
                            </>
                }
            </form>
        </div>
    )
}