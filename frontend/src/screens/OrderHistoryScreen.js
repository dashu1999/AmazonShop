import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { listOrderMine } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OrderHistoryScreen() {
    const { pageNumber = 1 } = useParams();

    const orderMineList = useSelector((state) => state.orderMineList);
    const { orders, loading, error, page, pages } = orderMineList;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listOrderMine(pageNumber));
    }, [dispatch, pageNumber]);
    return (
        <div>
            <h1>Order History</h1>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : <>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
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
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.totalPrice.toFixed(2)} <strong>$</strong></td>
                                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
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
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='row center pagination'>
                    {
                        [...Array(pages).keys()].map(x => (
                            <Link className={x + 1 === page ? 'active' : ''} key={x + 1} to={`/orderhistory/pageNumber/${x + 1}`}>{x + 1}</Link>
                        ))
                    }
                </div>
            </>
            }
        </div>
    );
}
