import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface ICustomerForm {
    name: string;
    phone: string;
    email: string;
}

const CustomerForm = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // For edit mode
    const isEditMode = !!id;

    const [formData, setFormData] = useState<ICustomerForm>({
        name: '',
        phone: '',
        email: '',
    });

    const [errors, setErrors] = useState<Partial<ICustomerForm>>({});

    useEffect(() => {
        if (isEditMode) {
            // Fetch customer data if in edit mode
            // Replace with your actual API call
            // fetchCustomer(id).then(data => setFormData(data));
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const newErrors: Partial<ICustomerForm> = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone is required';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
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
            //     await updateCustomer(id, formData);
            // } else {
            //     await createCustomer(formData);
            // }
            
            navigate('/customers');
        } catch (error) {
            console.error('Error saving customer:', error);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">
                {isEditMode ? 'Edit Customer' : 'Add New Customer'}
            </h1>

            <form onSubmit={handleSubmit} className="max-w-lg bg-white p-6 rounded-lg shadow">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Phone
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
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
                    >
                        {isEditMode ? 'Update Customer' : 'Add Customer'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CustomerForm;