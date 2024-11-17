import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { Order } from '../../app/models/Order';

type CreateOrderData = Omit<Order, 'ws_order_id' | 'ws_order_total' | 'ws_transaction_date' | 'ws_order_status'>;

const OrderForm = observer(() => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { orderStore } = useStore();
    const isEditMode = !!id;

    const [formData, setFormData] = useState<CreateOrderData>({
        ws_customerid: '',
        ws_item_id: '',
        ws_quantity: 0,
        ws_coupon: ''
    });

    const [errors, setErrors] = useState<Partial<CreateOrderData>>({});

    const validateForm = () => {
        const newErrors: Partial<CreateOrderData> = {};

        if (!formData.ws_customerid) {
            newErrors.ws_customerid = 'Customer ID is required';
        }
        if (!formData.ws_item_id) {
            newErrors.ws_item_id = 'Item ID is required';
        }
        // if (!formData.ws_quantity || formData.ws_quantity <= 0) {
        //     newErrors.ws_quantity = 'Quantity must be greater than 0';
        // }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'ws_quantity' ? parseInt(value) || 0 : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        try {
            const orderData: Order = {
                ...formData,
                ws_order_id: '', // Will be set by server
                ws_order_total: 0, // Will be calculated by server
                ws_transaction_date: new Date().toISOString(), // Will be set by server
                ws_order_status: 'ORDERED'
            };

            await orderStore.placeOrder(orderData);
            navigate('/orders');
        } catch (error) {
            console.error('Error saving order:', error);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">
                {isEditMode ? 'Edit Order' : 'Place New Order'}
            </h1>

            <form onSubmit={handleSubmit} className="max-w-lg bg-white p-6 rounded-lg shadow">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Customer ID
                    </label>
                    <input
                        type="text"
                        name="ws_customerid"
                        value={formData.ws_customerid}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded ${errors.ws_customerid ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.ws_customerid && <p className="text-red-500 text-xs mt-1">{errors.ws_customerid}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Item ID
                    </label>
                    <input
                        type="text"
                        name="ws_item_id"
                        value={formData.ws_item_id}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded ${errors.ws_item_id ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.ws_item_id && <p className="text-red-500 text-xs mt-1">{errors.ws_item_id}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Quantity
                    </label>
                    <input
                        type="number"
                        name="ws_quantity"
                        value={formData.ws_quantity}
                        onChange={handleChange}
                        min="1"
                        className={`w-full px-3 py-2 border rounded ${errors.ws_quantity ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.ws_quantity && <p className="text-red-500 text-xs mt-1">{errors.ws_quantity}</p>}
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Coupon Code
                    </label>
                    <input
                        type="text"
                        name="ws_coupon"
                        value={formData.ws_coupon || ''}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded border-gray-300"
                        placeholder="Optional"
                    />
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => navigate('/orders')}
                        className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        disabled={orderStore.loading}
                    >
                        {orderStore.loading ? 'Saving...' : (isEditMode ? 'Update Order' : 'Place Order')}
                    </button>
                </div>
            </form>
        </div>
    );
});

export default OrderForm;