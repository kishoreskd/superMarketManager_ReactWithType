import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface ICustomer {
    id: number;
    name: string;
    phone: string;
    email: string;
}

const Customer = () => {
    const [customers, setCustomers] = useState<ICustomer[]>([
        // Dummy data - replace with your actual API call
        { id: 1, name: 'John Doe', phone: '123-456-7890', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', phone: '098-765-4321', email: 'jane@example.com' },
    ]);

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

            <div className="bg-white rounded-lg shadow">
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
                        {customers.map((customer) => (
                            <tr key={customer.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{customer.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{customer.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{customer.phone}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{customer.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Link 
                                        to={`/customers/edit/${customer.id}`}
                                        className="text-blue-500 hover:text-blue-700 mr-4"
                                    >
                                        Edit
                                    </Link>
                                    <button 
                                        onClick={() => {/* Handle delete */}}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Customer;