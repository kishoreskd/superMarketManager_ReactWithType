import { observer } from "mobx-react-lite";
import { useState } from "react";
import { CreateAccount } from "../../app/models/CreateAccount";
import { useStore } from "../../app/stores/store";
import { toast } from "react-toastify";
import { ValidationErrors, validateForm } from "../../app/utils/Validation";

interface Props {
    onClose: () => void;
}

export default observer(function CreateAccountForm({ onClose }: Props) {
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
            await authStore.createAccount(formData);
            toast.success('Account created successfully');
            onClose();
        } catch (error: any) {
            toast.error('Failed to create account: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Create Account</h2>
            <div>
                <input
                    type="text"
                    placeholder="Employee ID"
                    value={formData.ws_employee_id}
                    onChange={(e) => setFormData({ ...formData, ws_employee_id: e.target.value })}
                    className={`w-full p-2 border rounded ${errors.ws_employee_id ? 'border-red-500' : ''}`}
                />
                {errors.ws_employee_id && (
                    <p className="text-red-500 text-sm mt-1">{errors.ws_employee_id}</p>
                )}
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Security Question"
                    value={formData.ws_security_question}
                    onChange={(e) => setFormData({ ...formData, ws_security_question: e.target.value })}
                    className={`w-full p-2 border rounded ${errors.ws_security_question ? 'border-red-500' : ''}`}
                />
                {errors.ws_security_question && (
                    <p className="text-red-500 text-sm mt-1">{errors.ws_security_question}</p>
                )}
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Answer"
                    value={formData.ws_answer}
                    onChange={(e) => setFormData({ ...formData, ws_answer: e.target.value })}
                    className={`w-full p-2 border rounded ${errors.ws_answer ? 'border-red-500' : ''}`}
                />
                {errors.ws_answer && (
                    <p className="text-red-500 text-sm mt-1">{errors.ws_answer}</p>
                )}
            </div>
            <div>
                <input
                    type="password"
                    placeholder="Password"
                    value={formData.ws_password}
                    onChange={(e) => setFormData({ ...formData, ws_password: e.target.value })}
                    className={`w-full p-2 border rounded ${errors.ws_password ? 'border-red-500' : ''}`}
                />
                {errors.ws_password && (
                    <p className="text-red-500 text-sm mt-1">{errors.ws_password}</p>
                )}
            </div>
            <div className="flex justify-end space-x-2">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-200 rounded"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    {isSubmitting ? 'Creating...' : 'Create Account'}
                </button>
            </div>
        </form>
    );
});