import { Link } from 'react-router-dom';

const Sidebar = () => {
    const menuItems = [
        { path: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
        { path: '/inventory', icon: 'inventory', label: 'Inventory' },
        { path: '/customers', icon: 'people', label: 'Customers' },
        { path: '/orders', icon: 'shopping_cart', label: 'Orders' },
        { path: '/staff', icon: 'badge', label: 'Staff' },
        { path: '/coupons', icon: 'local_offer', label: 'Coupons' },
        { path: '/feedback', icon: 'feedback', label: 'Feedback' },
    ];

    return (
        <div className="sidebar">
            <div className="mb-6">
                <h1 className="text-xl font-bold">Super Market Manager</h1>
            </div>

            <nav>
                <ul className="space-y-2">
                    {menuItems.map((item) => (
                        <li key={item.path}>
                            <Link
                                to={item.path}
                                className="flex items-center px-4 py-2 text-gray-700 rounded hover:bg-gray-100"
                            >
                                <span className="material-icons mr-2">{item.icon}</span>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;