import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Pagination from '../../app/common/pagination/Pagination';
import { usePagination } from '../../app/common/pagination/usePagination';

interface ICustomer {
    id: number;
    name: string;
    phone: string;
    email: string;
}

const Customer = () => {
    const [customers] = useState<ICustomer[]>([
        // Dummy data - replace with your actual API call
        { id: 1, name: 'John Doe', phone: '123-456-7890', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', phone: '098-765-4321', email: 'jane@example.com' },
        { id: 3, name: 'Bob Johnson', phone: '555-555-5555', email: 'bob@example.com' },
        { id: 4, name: 'Alice Brown', phone: '444-444-4444', email: 'alice@example.com' },
        // Add more dummy data to test pagination
    ]);

    // Add pagination hook
    const { currentItems, currentPage, itemsPerPage, totalItems, paginate } = usePagination(customers);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Customers</h1>
                <Link 
                    to="/customers/new" 
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Add New Customer
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-50 border-b">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {currentItems.map((customer) => (
                            <tr key={customer.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{customer.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{customer.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{customer.phone}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{customer.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex space-x-3">
                                        <Link 
                                            to={`/customers/edit/${customer.id}`}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            Edit
                                        </Link>
                                        <button 
                                            onClick={() => {/* Handle delete */}}
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

                {/* Add Pagination Component */}
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

export default Customer;