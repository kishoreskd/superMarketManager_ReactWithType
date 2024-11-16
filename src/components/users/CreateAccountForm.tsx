import { observer } from "mobx-react-lite";
import { useState } from "react";
import { CreateAccount } from "../../app/models/CreateAccount";

interface Props {
    onClose: () => void;
}

export default observer(function CreateAccountForm({ onClose }: Props) {
    const [formData, setFormData] = useState<CreateAccount>({
        ws_employee_id: '',
        ws_security_question: '',
        ws_answer: '',
        ws_password: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle account creation logic here
        console.log(formData);
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Create Account</h2>
            <div>
                <input
                    type="text"
                    placeholder="Employee ID"
                    value={formData.ws_employee_id}
                    onChange={(e) => setFormData({...formData, ws_employee_id: e.target.value})}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Security Question"
                    value={formData.ws_security_question}
                    onChange={(e) => setFormData({...formData, ws_security_question: e.target.value})}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Answer"
                    value={formData.ws_answer}
                    onChange={(e) => setFormData({...formData, ws_answer: e.target.value})}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div>
                <input
                    type="password"
                    placeholder="Password"
                    value={formData.ws_password}
                    onChange={(e) => setFormData({...formData, ws_password: e.target.value})}
                    className="w-full p-2 border rounded"
                />
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
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Create Account
                </button>
            </div>
        </form>
    );
});