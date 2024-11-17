import { useState } from 'react';

export function usePagination<T>(items: T[], itemsPerPage: number = 10) {
    const [currentPage, setCurrentPage] = useState(1);
    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
    
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    
    return {
        currentPage,
        currentItems,
        itemsPerPage,
        totalItems: items.length,
        paginate
    };
}