import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface ICoupon {
    id: number;
    code: string;
    campaignName: string;
    percentage: number;
    startDate: string;
    endDate: string;
    isActive: boolean;
}

const Coupon = () => {
    const [coupons, setCoupons] = useState<ICoupon[]>([
        // Dummy data - replace with your actual API call
        {
            id: 1,
            code: 'SUMMER2024',
            campaignName: 'Summer Sale 2024',
            percentage: 20,
            startDate: '2024-06-01',
            endDate: '2024-08-31',
            isActive: true
        },
        // Add more dummy coupons as needed
    ]);

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this coupon?')) {
            try {
                // API call to delete coupon
                // await deleteCoupon(id);
                
                // Update local state
                setCoupons(coupons.filter(coupon => coupon.id !== id));
            } catch (error) {
                console.error('Error deleting coupon:', error);
            }
        }
    };

    const isExpired = (endDate: string) => {
        return new Date(endDate) < new Date();
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Coupons</h1>
                <Link 
                    to="/coupons/new" 
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Add New Coupon
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-50 border-b">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Campaign</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Discount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Start Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">End Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {coupons.map((coupon) => (
                            <tr key={coupon.id}>
                                <td className="px-6 py-4 whitespace-nowrap font-medium">{coupon.code}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{coupon.campaignName}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{coupon.percentage}%</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {new Date(coupon.startDate).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {new Date(coupon.endDate).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 rounded text-sm ${
                                        !coupon.isActive ? 'bg-red-100 text-red-800' :
                                        isExpired(coupon.endDate) ? 'bg-gray-100 text-gray-800' :
                                        'bg-green-100 text-green-800'
                                    }`}>
                                        {!coupon.isActive ? 'Inactive' :
                                         isExpired(coupon.endDate) ? 'Expired' :
                                         'Active'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex space-x-3">
                                        <Link 
                                            to={`/coupons/edit/${coupon.id}`}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            Edit
                                        </Link>
                                        <button 
                                            onClick={() => handleDelete(coupon.id)}
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
            </div>
        </div>
    );
};

export default Coupon;