import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface IOrder {
    id: number;
    customerId: number;
    customerName: string;
    itemId: number;
    itemName: string;
    quantity: number;
    coupon?: string;
    orderTotal: number;
    transactionCode: string;
    orderStatus: 'Pending' | 'Received' | 'Cancelled';
}

const Order = () => {
    const [orders, setOrders] = useState<IOrder[]>([
        // Dummy data - replace with your actual API call
        {
            id: 1,
            customerId: 101,
            customerName: 'John Doe',
            itemId: 201,
            itemName: 'Product A',
            quantity: 2,
            coupon: 'SAVE10',
            orderTotal: 199.99,
            transactionCode: 'TRX123456',
            orderStatus: 'Pending'
        },
        // Add more dummy orders as needed
    ]);

    const handleStatusUpdate = async (orderId: number, newStatus: 'Received' | 'Cancelled') => {
        try {
            // API call to update order status
            // await updateOrderStatus(orderId, newStatus);
            
            // Update local state
            setOrders(orders.map(order => 
                order.id === orderId 
                    ? { ...order, orderStatus: newStatus }
                    : order
            ));
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

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
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Coupon</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transaction</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {order.customerName} (ID: {order.customerId})
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {order.itemName} (ID: {order.itemId})
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{order.quantity}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{order.coupon || '-'}</td>
                                <td className="px-6 py-4 whitespace-nowrap">${order.orderTotal}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{order.transactionCode}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 rounded text-sm ${
                                        order.orderStatus === 'Received' ? 'bg-green-100 text-green-800' :
                                        order.orderStatus === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {order.orderStatus}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex space-x-2">
                                        <Link 
                                            to={`/orders/edit/${order.id}`}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            Edit
                                        </Link>
                                        {order.orderStatus === 'Pending' && (
                                            <>
                                                <button 
                                                    onClick={() => handleStatusUpdate(order.id, 'Received')}
                                                    className="text-green-500 hover:text-green-700"
                                                >
                                                    Receive
                                                </button>
                                                <button 
                                                    onClick={() => handleStatusUpdate(order.id, 'Cancelled')}
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
            </div>
        </div>
    );
};

export default Order;