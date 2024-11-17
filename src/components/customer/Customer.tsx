import { observer } from "mobx-react-lite";
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useStore } from '../../app/stores/store';
import Pagination from '../../app/common/pagination/Pagination';
import { usePagination } from '../../app/common/pagination/usePagination';

const Customer = observer(() => {
    const { customerStore } = useStore();
    const { customers, loading, loadCustomers } = customerStore;

    useEffect(() => {
        loadCustomers();
    }, [loadCustomers]);

    const { currentItems, currentPage, itemsPerPage, totalItems, paginate } = 
        usePagination(customers);

    if (loading) return <div>Loading...</div>;

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
                            <tr key={customer.ws_customer_id}>
                                <td className="px-6 py-4 whitespace-nowrap">{customer.ws_customer_id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{customer.ws_customername}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{customer.ws_phoneno}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{customer.ws_emailid}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex space-x-3">
                                        <Link 
                                            to={`/customers/edit/${customer.ws_customer_id}`}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            Edit
                                        </Link>
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
});

export default Customer;