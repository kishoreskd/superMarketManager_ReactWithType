import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useStore } from "../../app/stores/store";
import { CreateAccount } from "../../app/models/CreateAccount";
import { toast } from "react-toastify";
import { ValidationErrors, validateForm } from "../../app/utils/Validation";

interface Props {
    onClose: () => void;
}

export default observer(function ForgetAccountForm({ onClose }: Props) {
    const { authStore } = useStore();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [formData, setFormData] = useState<CreateAccount>({
        ws_employee_id: '',
        ws_security_question: '',
        ws_answer: '',
        ws_password: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});

        setIsSubmitting(true);
        try {
            const response = await authStore.forgetPassword(formData);
            // Assuming the response contains a success message
            toast.success('Password reset successful');
            onClose();
        } catch (error: any) {
            toast.error(error.message || 'Failed to reset password');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Reset Password</h2>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employee ID
                </label>
                <input
                    type="text"
                    name="ws_employee_id"
                    placeholder="Enter your employee ID"
                    value={formData.ws_employee_id}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500 
                        ${errors.ws_employee_id ? 'border-red-500' : ''}`}
                />
                {errors.ws_employee_id && (
                    <p className="text-red-500 text-sm mt-1">{errors.ws_employee_id}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Security Question
                </label>
                <input
                    type="text"
                    name="ws_security_question"
                    placeholder="Enter your security question"
                    value={formData.ws_security_question}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500 
                        ${errors.ws_security_question ? 'border-red-500' : ''}`}
                />
                {errors.ws_security_question && (
                    <p className="text-red-500 text-sm mt-1">{errors.ws_security_question}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Answer
                </label>
                <input
                    type="text"
                    name="ws_answer"
                    placeholder="Enter your answer"
                    value={formData.ws_answer}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500 
                        ${errors.ws_answer ? 'border-red-500' : ''}`}
                />
                {errors.ws_answer && (
                    <p className="text-red-500 text-sm mt-1">{errors.ws_answer}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                </label>
                <input
                    type="password"
                    name="ws_password"
                    placeholder="Enter new password"
                    value={formData.ws_password}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500 
                        ${errors.ws_password ? 'border-red-500' : ''}`}
                />
                {errors.ws_password && (
                    <p className="text-red-500 text-sm mt-1">{errors.ws_password}</p>
                )}
            </div>

            <div className="flex justify-end space-x-2 pt-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                    disabled={isSubmitting}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 
                             disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {isSubmitting ? (
                        <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Resetting...
                        </span>
                    ) : (
                        'Reset Password'
                    )}
                </button>
            </div>
        </form>
    );
});