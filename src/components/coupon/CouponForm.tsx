import { observer } from "mobx-react-lite";
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from '../../app/stores/store';
import { Coupon } from '../../app/models/Coupon';

const CouponForm = observer(() => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { couponStore } = useStore();
    const { createCoupon, updateCoupon, loading } = couponStore;

    const [formData, setFormData] = useState<Coupon>({
        ws_campaigns_name: '',
        ws_coupon_code: '',
        ws_start_date: '',
        ws_end_date: '',
        ws_offer_percent: 0,
        ws_is_active: true
    });

    const [errors, setErrors] = useState<Partial<Coupon>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked :
                name === 'ws_offer_percent' ? Number(value) :
                    value
        }));
    };

    const validateForm = () => {
        const newErrors: Partial<Coupon> = {};

        if (!formData.ws_coupon_code.trim()) {
            newErrors.ws_coupon_code = 'Coupon code is required';
        }

        if (!formData.ws_campaigns_name.trim()) {
            newErrors.ws_campaigns_name = 'Campaign name is required';
        }

        // if (formData.ws_offer_percent <= 0 || formData.ws_offer_percent > 100) {
        //     newErrors.ws_offer_percent = 'Percentage must be between 1 and 100';
        // }

        if (!formData.ws_start_date) {
            newErrors.ws_start_date = 'Start date is required';
        }

        if (!formData.ws_end_date) {
            newErrors.ws_end_date = 'End date is required';
        } else if (new Date(formData.ws_end_date) <= new Date(formData.ws_start_date)) {
            newErrors.ws_end_date = 'End date must be after start date';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        const success = id
            ? await updateCoupon(formData)
            : await createCoupon(formData);

        if (success) {
            navigate('/coupons');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">
                {id ? 'Edit Coupon' : 'Add New Coupon'}
            </h1>

            <form onSubmit={handleSubmit} className="max-w-lg bg-white p-6 rounded-lg shadow">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Coupon Code
                    </label>
                    <input
                        type="text"
                        name="ws_coupon_code"
                        value={formData.ws_coupon_code}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded ${errors.ws_coupon_code ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="e.g., SUMMER2024"
                    />
                    {errors.ws_coupon_code && <p className="text-red-500 text-xs mt-1">{errors.ws_coupon_code}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Campaign Name
                    </label>
                    <input
                        type="text"
                        name="ws_campaigns_name"
                        value={formData.ws_campaigns_name}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded ${errors.ws_campaigns_name ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="e.g., Summer Sale 2024"
                    />
                    {errors.ws_campaigns_name && <p className="text-red-500 text-xs mt-1">{errors.ws_campaigns_name}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Discount Percentage
                    </label>
                    <input
                        type="number"
                        name="ws_offer_percent"
                        value={formData.ws_offer_percent}
                        onChange={handleChange}
                        min="1"
                        max="100"
                        className={`w-full px-3 py-2 border rounded ${errors.ws_offer_percent ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="e.g., 20"
                    />
                    {errors.ws_offer_percent && <p className="text-red-500 text-xs mt-1">{errors.ws_offer_percent}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Start Date
                    </label>
                    <input
                        type="date"
                        name="ws_start_date"
                        value={formData.ws_start_date}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded ${errors.ws_start_date ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.ws_start_date && <p className="text-red-500 text-xs mt-1">{errors.ws_start_date}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        End Date
                    </label>
                    <input
                        type="date"
                        name="ws_end_date"
                        value={formData.ws_end_date}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded ${errors.ws_end_date ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.ws_end_date && <p className="text-red-500 text-xs mt-1">{errors.ws_end_date}</p>}
                </div>

                <div className="mb-6">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="ws_is_active"
                            checked={formData.ws_is_active}
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
                        {id ? 'Update Coupon' : 'Create Coupon'}
                    </button>
                </div>
            </form>
        </div>
    );
});

export default CouponForm;