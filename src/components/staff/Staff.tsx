import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Pagination from '../../app/common/pagination/Pagination';
import { usePagination } from '../../app/common/pagination/usePagination';

interface IStaff {
    ws_employee_id: string;
    ws_employee_name: string;
    ws_employee_email: string;
    ws_employee_phno: string;
    ws_role: 'MANAGER' | 'BILLER' | 'SUPERVISOR' | 'FACILITY';
}

const Staff = () => {
    const [staffMembers] = useState<IStaff[]>([
        {
            ws_employee_id: '12345',
            ws_employee_name: 'John Doe',
            ws_employee_email: 'john@example.com',
            ws_employee_phno: '123-456-7890',
            ws_role: 'MANAGER'
        },
        {
            ws_employee_id: '12346',
            ws_employee_name: 'Jane Smith',
            ws_employee_email: 'jane@example.com',
            ws_employee_phno: '098-765-4321',
            ws_role: 'SUPERVISOR'
        },
        // Add more dummy data
    ]);

    const { currentItems, currentPage, itemsPerPage, totalItems, paginate } = usePagination(staffMembers);

    const handleDelete = async (employeeId: string) => {
        if (window.confirm('Are you sure you want to delete this staff member?')) {
            try {
                // API call to delete staff member
                // await deleteStaff(employeeId);
                console.log('Delete staff member:', employeeId);
            } catch (error) {
                console.error('Error deleting staff member:', error);
            }
        }
    };

    const getRoleColor = (role: string) => {
        const colors = {
            MANAGER: 'bg-purple-100 text-purple-800',
            BILLER: 'bg-blue-100 text-blue-800',
            SUPERVISOR: 'bg-green-100 text-green-800',
            FACILITY: 'bg-yellow-100 text-yellow-800'
        };
        return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Staff Management</h1>
                <Link 
                    to="/staff/new" 
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Add New Staff
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-50 border-b">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {currentItems.map((staff) => (
                            <tr key={staff.ws_employee_id}>
                                <td className="px-6 py-4 whitespace-nowrap">{staff.ws_employee_id}</td>
                                <td className="px-6 py-4 whitespace-nowrap font-medium">{staff.ws_employee_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{staff.ws_employee_email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{staff.ws_employee_phno}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 rounded text-sm ${getRoleColor(staff.ws_role)}`}>
                                        {staff.ws_role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex space-x-3">
                                        <Link 
                                            to={`/staff/edit/${staff.ws_employee_id}`}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            Edit
                                        </Link>
                                        <button 
                                            onClick={() => handleDelete(staff.ws_employee_id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Pagination
                    currentPage={currentPage}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    onPageChange={paginate}
                />
            </div>
        </div>
    );
};

export default Staff;