import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { deleteOrder, listOrders } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_DELETE_RESET } from '../constants/orderConstants';

export default function OrderListScreen() {
    const { pageNumber = 1 } = useParams();
    const navigate = useNavigate();

    const { pathname } = useLocation();
    const sellerMode = pathname.indexOf('/seller') >= 0;

    const orderList = useSelector((state) => state.orderList);
    const { orders, loading, error, page, pages } = orderList;

    const orderDelete = useSelector((state) => state.orderDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = orderDelete;

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: ORDER_DELETE_RESET });
        dispatch(listOrders({ seller: sellerMode ? userInfo._id : '', pageNumber }));
    }, [dispatch, successDelete, sellerMode, userInfo, pageNumber]);
    const deleteHandler = (order) => {
        if (window.confirm('Are you sure delete Order?')) {
            dispatch(deleteOrder(order._id));
        }
    };
    return (
        <div>
            <div>
                <h1>Orders</h1>
                {loadingDelete && <LoadingBox></LoadingBox>}
                {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
                {successDelete && <MessageBox variant="success">Orders Deleted Successfully</MessageBox>}
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) :
                    <>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>USER</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.user.name}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>{order.totalPrice.toFixed(2)} <strong>$</strong></td>
                                        <td>{order.isPaid ? order.paidAt : 'No'}</td>
                                        <td>
                                            {order.isDelivered
                                                ? order.deliveredAt.substring(0, 10)
                                                : 'No'}
                                        </td>
                                        <td>
                                            <button
                                                type="button"
                                                className="small"
                                                onClick={() => {
                                                    navigate(`/order/${order._id}`);
                                                }}
                                            >
                                                Details
                                            </button>
                                            <button
                                                type='button'
                                                className='small'
                                                onClick={() => deleteHandler(order)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className='row center pagination'>
                            {
                                [...Array(pages).keys()].map(x => (
                                    <Link
                                        className={x + 1 === page ? 'active' : ''}
                                        key={x + 1} to={sellerMode ? `/orderlist/seller/pageNumber/${x + 1}` : `/orderlist/pageNumber/${x + 1}`}>
                                        {x + 1}
                                    </Link>
                                ))
                            }
                        </div>

                    </>
                }
            </div>
        </div>
    )
}
