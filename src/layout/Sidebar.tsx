import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
    const location = useLocation();
    const menuItems = [
        { path: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
        { path: '/inventory', icon: 'inventory_2', label: 'Inventory' },
        { path: '/customers', icon: 'person_outline', label: 'Customers' },
        { path: '/orders', icon: 'description', label: 'Orders' },
        { path: '/staff', icon: 'people', label: 'Staff' },
        { path: '/coupons', icon: 'star_border', label: 'Coupons' },
        { path: '/feedback', icon: 'chat_bubble_outline', label: 'Feedback' },
    ];

    return (
        <div 
            className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-200 shadow-lg transition-all duration-300 z-40 flex flex-col
                ${isOpen ? 'w-72' : 'w-16'}`}
        >
            {/* Sidebar Header */}
            <div className={`p-6 ${!isOpen && 'px-4'}`}>
                {isOpen ? (
                    <h1 className="text-xl font-bold text-gray-800">Super Market Manager</h1>
                ) : (
                    <span className="material-icons text-gray-800">store</span>
                )}
            </div>

            {/* Search Bar - Only show when sidebar is open */}
            {isOpen && (
                <div className="px-4 mb-6">
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                </div>
            )}

            {/* Navigation Menu */}
            <nav className="flex-1 overflow-y-auto">
                <ul className={`px-2 space-y-1 ${!isOpen && 'px-3'}`}>
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`flex items-center ${isOpen ? 'px-4 py-2.5' : 'px-2 py-2.5'} rounded-lg transition-colors
                                        ${isActive 
                                            ? 'bg-blue-50 text-blue-600' 
                                            : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                    title={!isOpen ? item.label : ''}
                                >
                                    <span className="material-icons text-[20px] mr-3">
                                        {item.icon}
                                    </span>
                                    {isOpen && (
                                        <span className="text-sm font-medium">
                                            {item.label}
                                        </span>
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Bottom Section with Toggle Button */}
            <div className="border-t border-gray-200 p-4">
                <button
                    onClick={toggleSidebar}
                    className={`flex items-center justify-center w-full text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors
                        ${isOpen ? 'px-4 py-2' : 'px-2 py-2'}`}
                >
                    {isOpen ? (
                        <>
                            <span className="material-icons text-[20px] mr-3">chevron_left</span>
                            <span className="font-medium">Collapse</span>
                        </>
                    ) : (
                        <span className="material-icons text-[20px]">chevron_right</span>
                    )}
                </button>
            </div>
        </div>
    );
};

export default Sidebar; 