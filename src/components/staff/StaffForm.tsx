import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface StaffFormData {
    ws_employee_id: string;
    ws_employee_name: string;
    ws_employee_email: string;
    ws_employee_phno: string;
    ws_role: 'MANAGER' | 'BILLER' | 'SUPERVISOR' | 'FACILITY';
}

const StaffForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [errors, setErrors] = useState<Partial<StaffFormData>>({});

    const [formData, setFormData] = useState<StaffFormData>({
        ws_employee_id: '',
        ws_employee_name: '',
        ws_employee_email: '',
        ws_employee_phno: '',
        ws_role: 'MANAGER'
    });

    const validateForm = () => {
        const newErrors: Partial<StaffFormData> = {};

        // Employee ID validation
        if (!formData.ws_employee_id) {
            newErrors.ws_employee_id = 'Employee ID is required';
        } else if (!/^\d{5}$/.test(formData.ws_employee_id)) {
            newErrors.ws_employee_id = 'Employee ID must be 5 digits';
        }

        // Email validation
        if (!formData.ws_employee_email) {
            newErrors.ws_employee_email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.com$/.test(formData.ws_employee_email)) {
            newErrors.ws_employee_email = 'Invalid email format';
        }

        // Other required field validations
        if (!formData.ws_employee_name) newErrors.ws_employee_name = 'Name is required';
        if (!formData.ws_employee_phno) newErrors.ws_employee_phno = 'Phone number is required';
        if (!formData.ws_role) newErrors.ws_role = 'Role is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        try {
            // API call to save staff member
            // await saveStaff(formData);
            navigate('/staff');
        } catch (error) {
            console.error('Error saving staff member:', error);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">{id ? 'Edit Staff Member' : 'Add New Staff Member'}</h1>
            
            <form onSubmit={handleSubmit} className="max-w-2xl bg-white rounded-lg shadow p-6">
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Employee ID
                        </label>
                        <input
                            type="text"
                            value={formData.ws_employee_id}
                            onChange={(e) => setFormData({...formData, ws_employee_id: e.target.value})}
                            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                            maxLength={5}
                        />
                        {errors.ws_employee_id && (
                            <p className="text-red-500 text-sm mt-1">{errors.ws_employee_id}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            value={formData.ws_employee_name}
                            onChange={(e) => setFormData({...formData, ws_employee_name: e.target.value})}
                            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.ws_employee_name && (
                            <p className="text-red-500 text-sm mt-1">{errors.ws_employee_name}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={formData.ws_employee_email}
                            onChange={(e) => setFormData({...formData, ws_employee_email: e.target.value})}
                            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.ws_employee_email && (
                            <p className="text-red-500 text-sm mt-1">{errors.ws_employee_email}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            value={formData.ws_employee_phno}
                            onChange={(e) => setFormData({...formData, ws_employee_phno: e.target.value})}
                            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.ws_employee_phno && (
                            <p className="text-red-500 text-sm mt-1">{errors.ws_employee_phno}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Role
                        </label>
                        <select
                            value={formData.ws_role}
                            onChange={(e) => setFormData({...formData, ws_role: e.target.value as StaffFormData['ws_role']})}
                            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="MANAGER">Manager</option>
                            <option value="BILLER">Biller</option>
                            <option value="SUPERVISOR">Supervisor</option>
                            <option value="FACILITY">Facility</option>
                        </select>
                        {errors.ws_role && (
                            <p className="text-red-500 text-sm mt-1">{errors.ws_role}</p>
                        )}
                    </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={() => navigate('/staff')}
                        className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        {id ? 'Update' : 'Save'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StaffForm;