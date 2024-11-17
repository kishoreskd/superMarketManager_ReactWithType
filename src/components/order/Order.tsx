import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import Pagination from '../../app/common/pagination/Pagination';
import { usePagination } from '../../app/common/pagination/usePagination';
import { Order as OrderType } from '../../app/models/Order';
import LoadingComponent from '../../layout/LoadingContainer';

const Order = observer(() => {
    const { orderStore } = useStore();
    const { currentItems, currentPage, itemsPerPage, totalItems, paginate } =
        usePagination<OrderType>(orderStore.ordersList);

    useEffect(() => {
        orderStore.loadOrders();
    }, [orderStore]);

    const handleStatusUpdate = async (orderId: string, newStatus: OrderType['ws_order_status']) => {
        try {
            await orderStore.updateOrderStatus(orderId, newStatus);
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    if (orderStore.loading) return <LoadingComponent content="Loading orders..." />;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Orders</h1>
                <Link
                    to="/orders/new"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Place New Order
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-50 border-b">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Coupon</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {currentItems.map((order) => (
                            <tr key={order.ws_order_id}>
                                <td className="px-6 py-4 whitespace-nowrap">{order.ws_order_id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{order.ws_customerid}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{order.ws_item_id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{order.ws_quantity}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{order.ws_coupon || '-'}</td>
                                <td className="px-6 py-4 whitespace-nowrap">${order.ws_order_total}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{order.ws_transaction_date}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 rounded text-sm ${order.ws_order_status === 'RECEIVED' ? 'bg-green-100 text-green-800' :
                                            order.ws_order_status === 'CANCEL' ? 'bg-red-100 text-red-800' :
                                                'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {order.ws_order_status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex space-x-2">
                                        <Link
                                            to={`/orders/edit/${order.ws_order_id}`}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            Edit
                                        </Link>
                                        {order.ws_order_status === 'ORDERED' && (
                                            <>
                                                <button
                                                    onClick={() => handleStatusUpdate(order.ws_order_id, 'RECEIVED')}
                                                    className="text-green-500 hover:text-green-700"
                                                >
                                                    Receive
                                                </button>
                                                <button
                                                    onClick={() => handleStatusUpdate(order.ws_order_id, 'CANCEL')}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Pagination
                    currentPage={currentPage}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    onPageChange={paginate}
                />
            </div>
        </div>
    );
});

export default Order;