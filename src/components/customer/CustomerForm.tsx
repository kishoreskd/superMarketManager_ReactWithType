import { observer } from "mobx-react-lite";
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from '../../app/stores/store';
import { Customer } from '../../app/models/Customer';
import LoadingComponent from "../../layout/LoadingContainer";

const CustomerForm = observer(() => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { customerStore } = useStore();
    const { createCustomer, loadCustomer, selectedCustomer, loading } = customerStore;

    const [formData, setFormData] = useState<Customer>({
        ws_customer_id: '',
        ws_customername: '',
        ws_phoneno: '',
        ws_emailid: '',
    });

    const [errors, setErrors] = useState<Partial<Customer>>({});

    useEffect(() => {
        if (id) {
            loadCustomer(id);
        }
    }, [id, loadCustomer]);

    useEffect(() => {
        if (selectedCustomer) {
            setFormData(selectedCustomer);
        }
    }, [selectedCustomer]);

    const validateCustomerId = (id: string): string | null => {
        if (!id.trim()) {
            return 'Customer ID is required';
        }
        if (!/^[a-zA-Z0-9]{4}$/.test(id)) {
            return 'Customer ID must be exactly 4 alphanumeric characters';
        }
        return null;
    };

    const validateForm = () => {
        const newErrors: Partial<Customer> = {};

        // Customer ID validation
        const customerIdError = validateCustomerId(formData.ws_customer_id);
        if (customerIdError) {
            newErrors.ws_customer_id = customerIdError;
        }

        // Name validation
        if (!formData.ws_customername.trim()) {
            newErrors.ws_customername = 'Name is required';
        }

        // Phone validation
        if (!formData.ws_phoneno.trim()) {
            newErrors.ws_phoneno = 'Phone is required';
        } else if (!/^\d{10}$/.test(formData.ws_phoneno)) {
            newErrors.ws_phoneno = 'Phone number must be 10 digits';
        }

        // Email validation
        if (!formData.ws_emailid.trim()) {
            newErrors.ws_emailid = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.ws_emailid)) {
            newErrors.ws_emailid = 'Invalid email format';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        // Real-time Customer ID validation
        if (name === 'ws_customer_id') {
            const error = validateCustomerId(value);
            setErrors(prev => ({
                ...prev,
                [name]: error || undefined
            }));
        }

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const success = await createCustomer(formData);
            if (success) {
                navigate('/customers');
            }
        } catch (error: any) {
            // Handle backend errors
            if (error.message.includes('already exists')) {
                setErrors(prev => ({
                    ...prev,
                    ws_customer_id: 'Customer ID already exists'
                }));
            }
        }
    };

    if (loading) return <LoadingComponent content="Loading customer..." />;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">
                {id ? 'Edit Customer' : 'Add New Customer'}
            </h1>

            <form onSubmit={handleSubmit} className="max-w-lg bg-white p-6 rounded-lg shadow">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Customer ID
                    </label>
                    <input
                        type="text"
                        name="ws_customer_id"
                        value={formData.ws_customer_id}
                        onChange={handleChange}
                        maxLength={4}
                        className={`w-full px-3 py-2 border rounded ${errors.ws_customer_id ? 'border-red-500' : 'border-gray-300'}`}
                        disabled={!!id}
                    />
                    {errors.ws_customer_id && 
                        <p className="text-red-500 text-xs mt-1">{errors.ws_customer_id}</p>
                    }
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        name="ws_customername"
                        value={formData.ws_customername}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded ${errors.ws_customername ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.ws_customername && 
                        <p className="text-red-500 text-xs mt-1">{errors.ws_customername}</p>
                    }
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Phone
                    </label>
                    <input
                        type="tel"
                        name="ws_phoneno"
                        value={formData.ws_phoneno}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded ${errors.ws_phoneno ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.ws_phoneno && 
                        <p className="text-red-500 text-xs mt-1">{errors.ws_phoneno}</p>
                    }
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        name="ws_emailid"
                        value={formData.ws_emailid}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded ${errors.ws_emailid ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.ws_emailid && 
                        <p className="text-red-500 text-xs mt-1">{errors.ws_emailid}</p>
                    }
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => navigate('/customers')}
                        className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : (id ? 'Update Customer' : 'Add Customer')}
                    </button>
                </div>
            </form>
        </div>
    );
});

export default CustomerForm;