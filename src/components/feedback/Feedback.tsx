import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { useEffect } from 'react';
import LoadingComponent from '../../layout/LoadingContainer';
import { usePagination } from '../../app/common/pagination/usePagination';
import Pagination from '../../app/common/pagination/Pagination';

const Feedback = observer(() => {
    const { feedbackStore } = useStore();
    const { loadFeedbacks, feedbackRegistry, loading } = feedbackStore;
    
    const { currentItems, currentPage, itemsPerPage, totalItems, paginate } = 
        usePagination(Array.from(feedbackRegistry.values()));

    useEffect(() => {
        loadFeedbacks();
    }, [loadFeedbacks]);

    const renderStars = (rating: number) => {
        return (
            <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span 
                        key={star}
                        className={`material-icons text-xl ${
                            star <= rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                    >
                        star
                    </span>
                ))}
                <span className="ml-2 text-gray-600">({rating})</span>
            </div>
        );
    };

    if (loading) return <LoadingComponent content="Loading feedback..." />;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Customer Feedback</h1>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-50 border-b">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item Rating</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service Rating</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Billing Rating</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Review</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {currentItems.map((feedback) => (
                            <tr key={feedback.ws_order_id}>
                                <td className="px-6 py-4 whitespace-nowrap">{feedback.ws_order_id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{feedback.ws_customerid}</td>
                                <td className="px-6 py-4">{renderStars(feedback.ws_item_feedback)}</td>
                                <td className="px-6 py-4">{renderStars(feedback.ws_service_feedback)}</td>
                                <td className="px-6 py-4">{renderStars(feedback.ws_billing_feedback)}</td>
                                <td className="px-6 py-4">
                                    <p className="text-gray-700 max-w-md">{feedback.ws_customer_review}</p>
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

export default Feedback;