import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface ICouponForm {
    code: string;
    campaignName: string;
    percentage: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
}

const CouponForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    const [formData, setFormData] = useState<ICouponForm>({
        code: '',
        campaignName: '',
        percentage: '',
        startDate: '',
        endDate: '',
        isActive: true
    });

    const [errors, setErrors] = useState<Partial<ICouponForm>>({});

    useEffect(() => {
        if (isEditMode) {
            // Fetch coupon data if in edit mode
            // Replace with your actual API call
            // fetchCoupon(id).then(data => setFormData(data));
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const validateForm = () => {
        const newErrors: Partial<ICouponForm> = {};
        
        if (!formData.code.trim()) {
            newErrors.code = 'Coupon code is required';
        }
        
        if (!formData.campaignName.trim()) {
            newErrors.campaignName = 'Campaign name is required';
        }
        
        if (!formData.percentage || Number(formData.percentage) <= 0 || Number(formData.percentage) > 100) {
            newErrors.percentage = 'Percentage must be between 1 and 100';
        }
        
        if (!formData.startDate) {
            newErrors.startDate = 'Start date is required';
        }
        
        if (!formData.endDate) {
            newErrors.endDate = 'End date is required';
        } else if (new Date(formData.endDate) <= new Date(formData.startDate)) {
            newErrors.endDate = 'End date must be after start date';
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
            //     await updateCoupon(id, formData);
            // } else {
            //     await createCoupon(formData);
            // }
            
            navigate('/coupons');
        } catch (error) {
            console.error('Error saving coupon:', error);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">
                {isEditMode ? 'Edit Coupon' : 'Add New Coupon'}
            </h1>

            <form onSubmit={handleSubmit} className="max-w-lg bg-white p-6 rounded-lg shadow">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Coupon Code
                    </label>
                    <input
                        type="text"
                        name="code"
                        value={formData.code}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded ${errors.code ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="e.g., SUMMER2024"
                    />
                    {errors.code && <p className="text-red-500 text-xs mt-1">{errors.code}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Campaign Name
                    </label>
                    <input
                        type="text"
                        name="campaignName"
                        value={formData.campaignName}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded ${errors.campaignName ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="e.g., Summer Sale 2024"
                    />
                    {errors.campaignName && <p className="text-red-500 text-xs mt-1">{errors.campaignName}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Discount Percentage
                    </label>
                    <input
                        type="number"
                        name="percentage"
                        value={formData.percentage}
                        onChange={handleChange}
                        min="1"
                        max="100"
                        className={`w-full px-3 py-2 border rounded ${errors.percentage ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="e.g., 20"
                    />
                    {errors.percentage && <p className="text-red-500 text-xs mt-1">{errors.percentage}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Start Date
                    </label>
                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded ${errors.startDate ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        End Date
                    </label>
                    <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded ${errors.endDate ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
                </div>

                <div className="mb-6">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="isActive"
                            checked={formData.isActive}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        <span className="text-gray-700 text-sm font-bold">Active</span>
                    </label>
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => navigate('/coupons')}
                        className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        {isEditMode ? 'Update Coupon' : 'Create Coupon'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CouponForm;