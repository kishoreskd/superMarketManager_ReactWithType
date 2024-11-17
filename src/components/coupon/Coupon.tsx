import { observer } from "mobx-react-lite";
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useStore } from '../../app/stores/store';
import Pagination from '../../app/common/pagination/Pagination';
import { usePagination } from '../../app/common/pagination/usePagination';

const Coupon = observer(() => {
    const { couponStore } = useStore();
    const { coupons, loading, loadCoupons, isExpired } = couponStore;

    useEffect(() => {
        loadCoupons();
    }, [loadCoupons]);

    const { currentItems, currentPage, itemsPerPage, totalItems, paginate } = 
        usePagination(coupons);

    if (loading) return <div>Loading...</div>;

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
                        {currentItems.map((coupon) => (
                            <tr key={coupon.ws_coupon_id}>
                                <td className="px-6 py-4 whitespace-nowrap font-medium">{coupon.ws_coupon_code}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{coupon.ws_campaigns_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{coupon.ws_offer_percent}%</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {new Date(coupon.ws_start_date).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {new Date(coupon.ws_end_date).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 rounded text-sm ${
                                        !coupon.ws_is_active ? 'bg-red-100 text-red-800' :
                                        isExpired(coupon.ws_end_date) ? 'bg-gray-100 text-gray-800' :
                                        'bg-green-100 text-green-800'
                                    }`}>
                                        {!coupon.ws_is_active ? 'Inactive' :
                                         isExpired(coupon.ws_end_date) ? 'Expired' :
                                         'Active'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex space-x-3">
                                        <Link 
                                            to={`/coupons/edit/${coupon.ws_coupon_id}`}
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

export default Coupon;