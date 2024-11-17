import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from '../../app/stores/store';
import { Feedback } from '../../app/models/Feedback';

interface FeedbackFormErrors {
    ws_item_feedback?: string;
    ws_service_feedback?: string;
    ws_billing_feedback?: string;
}

const FeedbackForm = observer(() => {
    const navigate = useNavigate();
    const { orderId } = useParams();
    const { feedbackStore } = useStore();
    const [errors, setErrors] = useState<FeedbackFormErrors>({});

    const [formData, setFormData] = useState<Feedback>({
        ws_order_id: orderId || '',
        ws_customerid: '', // Set this from your auth context
        ws_item_feedback: 0,
        ws_service_feedback: 0,
        ws_billing_feedback: 0,
        ws_customer_review: ''
    });

    const handleRatingChange = (field: keyof Feedback, value: number) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const review = e.target.value;
        if (review.length <= 240) {
            setFormData(prev => ({
                ...prev,
                ws_customer_review: review
            }));
        }
    };

    const validateForm = () => {
        const newErrors: FeedbackFormErrors = {};
        
        if (formData.ws_item_feedback === 0) {
            newErrors.ws_item_feedback = 'Please rate the item';
        }
        if (formData.ws_service_feedback === 0) {
            newErrors.ws_service_feedback = 'Please rate the service';
        }
        if (formData.ws_billing_feedback === 0) {
            newErrors.ws_billing_feedback = 'Please rate the billing';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        try {
            await feedbackStore.createFeedback(formData);
            navigate('/orders');
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };

    const RatingInput = ({ 
        label, 
        value, 
        onChange, 
        error 
    }: { 
        label: string; 
        value: number; 
        onChange: (value: number) => void; 
        error?: string;
    }) => (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                {label}
            </label>
            <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => onChange(star)}
                        className={`material-icons text-2xl focus:outline-none ${
                            star <= value ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                    >
                        star
                    </button>
                ))}
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">
                Provide Feedback for Order #{orderId}
            </h1>

            <form onSubmit={handleSubmit} className="max-w-lg bg-white p-6 rounded-lg shadow">
                <RatingInput 
                    label="Item Rating"
                    value={formData.ws_item_feedback}
                    onChange={(value) => handleRatingChange('ws_item_feedback', value)}
                    error={errors.ws_item_feedback}
                />

                <RatingInput 
                    label="Service Rating"
                    value={formData.ws_service_feedback}
                    onChange={(value) => handleRatingChange('ws_service_feedback', value)}
                    error={errors.ws_service_feedback}
                />

                <RatingInput 
                    label="Billing Rating"
                    value={formData.ws_billing_feedback}
                    onChange={(value) => handleRatingChange('ws_billing_feedback', value)}
                    error={errors.ws_billing_feedback}
                />

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Your Review
                    </label>
                    <textarea
                        value={formData.ws_customer_review}
                        onChange={handleReviewChange}
                        className="w-full px-3 py-2 border rounded border-gray-300 h-32"
                        placeholder="Share your experience (max 240 characters)"
                        maxLength={240}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                        {formData.ws_customer_review.length}/240 characters
                    </p>
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
                        Submit Feedback
                    </button>
                </div>
            </form>
        </div>
    );
});

export default FeedbackForm;