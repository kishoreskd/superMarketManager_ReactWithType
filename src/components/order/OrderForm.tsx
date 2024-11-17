import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { Order } from '../../app/models/Order';

type CreateOrderData = Pick<Order, 'ws_customerid' | 'ws_item_id' | 'ws_quantity' | 'ws_coupon'>;

const OrderForm = observer(() => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { orderStore } = useStore();
    const isEditMode = !!id;

    const [formData, setFormData] = useState<CreateOrderData>({
        ws_customerid: '',
        ws_item_id: '',
        ws_quantity: 0,
        ws_coupon: undefined
    });

    const [errors, setErrors] = useState<Record<keyof CreateOrderData, string | undefined>>({
        ws_customerid: undefined,
        ws_item_id: undefined,
        ws_quantity: undefined,
        ws_coupon: undefined
    });
    const [touched, setTouched] = useState<Record<keyof CreateOrderData, boolean>>({
        ws_customerid: false,
        ws_item_id: false,
        ws_quantity: false,
        ws_coupon: false
    });

    const validateCustomerId = (id: string): string | null => {
        if (!id) {
            return 'Customer ID is required';
        }
        if (!/^C[A-Za-z0-9]{3}$/.test(id)) {
            return 'Customer ID must be 4 characters starting with C';
        }
        return null;
    };

    const validateItemId = (id: string): string | null => {
        if (!id) {
            return 'Item ID is required';
        }
        if (!/^I[A-Za-z0-9]{3}$/.test(id)) {
            return 'Item ID must be 4 characters starting with I';
        }
        return null;
    };

    const validateQuantity = (quantity: number): string | null => {
        if (!quantity) {
            return 'Quantity is required';
        }
        if (quantity <= 0) {
            return 'Quantity must be greater than 0';
        }
        if (quantity >= 100) {
            return 'Quantity must be less than 100';
        }
        return null;
    };

    const validateCoupon = (coupon: string): string | null => {
        if (!coupon) return null; // Optional field
        if (!/^[A-Za-z0-9]{4}$/.test(coupon)) {
            return 'Coupon must be 4 alphanumeric characters';
        }
        return null;
    };

    const validateField = (name: keyof CreateOrderData, value: any): string | null => {
        switch (name) {
            case 'ws_customerid':
                return validateCustomerId(value);
            case 'ws_item_id':
                return validateItemId(value);
            case 'ws_quantity':
                return validateQuantity(Number(value));
            case 'ws_coupon':
                return validateCoupon(value);
            default:
                return null;
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const finalValue = name === 'ws_quantity' ? parseInt(value) || 0 : value;

        setFormData(prev => ({
            ...prev,
            [name]: finalValue
        }));

        if (touched[name as keyof CreateOrderData]) {
            const error = validateField(name as keyof CreateOrderData, finalValue);
            setErrors(prev => ({
                ...prev,
                [name]: error || undefined
            }));
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setTouched(prev => ({
            ...prev,
            [name]: true
        }));

        const error = validateField(name as keyof CreateOrderData, value);
        setErrors(prev => ({
            ...prev,
            [name]: error || undefined
        }));
    };

    const validateForm = () => {
        const newErrors: Record<keyof CreateOrderData, string | undefined> = {
            ws_customerid: undefined,
            ws_item_id: undefined,
            ws_quantity: undefined,
            ws_coupon: undefined
        };
        let isValid = true;

        (Object.keys(formData) as Array<keyof CreateOrderData>).forEach(field => {
            const error = validateField(field, formData[field]);
            if (error) {
                newErrors[field] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const orderData: Order = {
                ...formData,
                ws_order_id: '',
                ws_order_total: 0,
                ws_transaction_date: new Date().toISOString(),
                ws_order_status: 'ORDERED' as const
            };

            await orderStore.placeOrder(orderData);
            navigate('/orders');
        } catch (error) {
            console.error('Error saving order:', error);
        }
    };

    const getInputClassName = (fieldName: keyof CreateOrderData) => `
        w-full px-3 py-2 border rounded 
        ${errors[fieldName] ? 'border-red-500' : 'border-gray-300'}
        ${touched[fieldName] && !errors[fieldName] ? 'border-green-500' : ''}
        focus:outline-none focus:ring-2
        ${errors[fieldName] ? 'focus:ring-red-200' : 'focus:ring-blue-200'}
    `;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">
                {isEditMode ? 'Edit Order' : 'Place New Order'}
            </h1>

            <form onSubmit={handleSubmit} className="max-w-lg bg-white p-6 rounded-lg shadow">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Customer ID *
                    </label>
                    <input
                        type="text"
                        name="ws_customerid"
                        value={formData.ws_customerid}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        maxLength={4}
                        className={getInputClassName('ws_customerid')}
                        placeholder="Enter Customer ID (e.g., C123)"
                    />
                    {errors.ws_customerid && touched.ws_customerid &&
                        <p className="text-red-500 text-xs mt-1">{errors.ws_customerid}</p>
                    }
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Item ID *
                    </label>
                    <input
                        type="text"
                        name="ws_item_id"
                        value={formData.ws_item_id}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        maxLength={4}
                        className={getInputClassName('ws_item_id')}
                        placeholder="Enter Item ID (e.g., I123)"
                    />
                    {errors.ws_item_id && touched.ws_item_id &&
                        <p className="text-red-500 text-xs mt-1">{errors.ws_item_id}</p>
                    }
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Quantity *
                    </label>
                    <input
                        type="number"
                        name="ws_quantity"
                        value={formData.ws_quantity}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        min="1"
                        max="99"
                        className={getInputClassName('ws_quantity')}
                        placeholder="Enter quantity (1-99)"
                    />
                    {errors.ws_quantity && touched.ws_quantity &&
                        <p className="text-red-500 text-xs mt-1">{errors.ws_quantity}</p>
                    }
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Coupon Code (Optional)
                    </label>
                    <input
                        type="text"
                        name="ws_coupon"
                        value={formData.ws_coupon ?? ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        maxLength={4}
                        className={getInputClassName('ws_coupon')}
                        placeholder="Enter coupon code (4 characters)"
                    />
                    {errors.ws_coupon && touched.ws_coupon &&
                        <p className="text-red-500 text-xs mt-1">{errors.ws_coupon}</p>
                    }
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
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
                        disabled={orderStore.loading || Object.keys(errors).length > 0}
                    >
                        {orderStore.loading ? 'Saving...' : (isEditMode ? 'Update Order' : 'Place Order')}
                    </button>
                </div>
            </form>
        </div>
    );
});

export default OrderForm;