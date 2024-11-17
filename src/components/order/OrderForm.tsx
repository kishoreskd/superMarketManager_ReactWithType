import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface IOrderForm {
    customerId: string;
    itemId: string;
    quantity: string;
    coupon: string;
}

const OrderForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    const [formData, setFormData] = useState<IOrderForm>({
        customerId: '',
        itemId: '',
        quantity: '',
        coupon: ''
    });

    const [errors, setErrors] = useState<Partial<IOrderForm>>({});
    const [customers, setCustomers] = useState<Array<{ id: number, name: string }>>([]);
    const [items, setItems] = useState<Array<{ id: number, name: string, price: number }>>([]);

    useEffect(() => {
        // Fetch customers and items for dropdowns
        // Replace with your actual API calls
        // fetchCustomers().then(setCustomers);
        // fetchItems().then(setItems);

        if (isEditMode) {
            // Fetch order data if in edit mode
            // fetchOrder(id).then(data => setFormData(data));
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const newErrors: Partial<IOrderForm> = {};
        
        if (!formData.customerId) {
            newErrors.customerId = 'Customer is required';
        }
        if (!formData.itemId) {
            newErrors.itemId = 'Item is required';
        }
        if (!formData.quantity || parseInt(formData.quantity) <= 0) {
            newErrors.quantity = 'Valid quantity is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        try {
            // Replace with your actual API call
            // if (isEditMode) {
            //     await updateOrder(id, formData);
            // } else {
            //     await createOrder(formData);
            // }
            
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
                        Customer
                    </label>
                    <select
                        name="customerId"
                        value={formData.customerId}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded ${errors.customerId ? 'border-red-500' : 'border-gray-300'}`}
                    >
                        <option value="">Select Customer</option>
                        {customers.map(customer => (
                            <option key={customer.id} value={customer.id}>
                                {customer.name}
                            </option>
                        ))}
                    </select>
                    {errors.customerId && <p className="text-red-500 text-xs mt-1">{errors.customerId}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Item
                    </label>
                    <select
                        name="itemId"
                        value={formData.itemId}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded ${errors.itemId ? 'border-red-500' : 'border-gray-300'}`}
                    >
                        <option value="">Select Item</option>
                        {items.map(item => (
                            <option key={item.id} value={item.id}>
                                {item.name} - ${item.price}
                            </option>
                        ))}
                    </select>
                    {errors.itemId && <p className="text-red-500 text-xs mt-1">{errors.itemId}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Quantity
                    </label>
                    <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        min="1"
                        className={`w-full px-3 py-2 border rounded ${errors.quantity ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>}
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Coupon Code
                    </label>
                    <input
                        type="text"
                        name="coupon"
                        value={formData.coupon}
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
                    >
                        {isEditMode ? 'Update Order' : 'Place Order'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default OrderForm;