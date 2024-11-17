import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { useEffect } from 'react';
import LoadingComponent from '../../layout/LoadingContainer';
import Pagination from '../../app/common/pagination/Pagination';
import { usePagination } from '../../app/common/pagination/usePagination';

export default observer(function Inventory() {
    const { inventoryStore } = useStore();
    const { loadInventory, inventoryItems, loading } = inventoryStore;

    const { currentItems, currentPage, itemsPerPage, totalItems, paginate } = usePagination(inventoryItems);

    useEffect(() => {
        loadInventory();
    }, [loadInventory]);

    if (loading) return <LoadingComponent content="Loading inventory..." />;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Inventory</h1>
            </div>

            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-50 border-b">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Retailer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {currentItems.map((item) => (
                            <tr key={item.ws_item_id}>
                                <td className="px-6 py-4 whitespace-nowrap">{item.ws_item_id}</td>
                                <td className="px-6 py-4 whitespace-nowrap font-medium">{item.ws_item_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.ws_stock}</td>
                                <td className="px-6 py-4 whitespace-nowrap">${item.ws_unit_price.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.ws_category}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.ws_retailer}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 rounded text-sm ${item.ws_stock === 0 ? 'bg-red-100 text-red-800' :
                                            item.ws_stock < 20 ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-green-100 text-green-800'
                                        }`}>
                                        {item.ws_stock === 0 ? 'Out of Stock' :
                                            item.ws_stock < 20 ? 'Low Stock' :
                                                'In Stock'}
                                    </span>
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
