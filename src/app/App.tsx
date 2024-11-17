import './style.css';
import ModalContainer from './common/modals/ModalContainer';
import { ToastContainer } from 'react-toastify';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import Sidebar from '../layout/Sidebar';
import Topbar from '../layout/Topbar';
import { useStore } from './stores/store';
import { Outlet } from 'react-router-dom';

export default observer(function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { authStore } = useStore();

    return (
        <div className="App">
            <ModalContainer />
            <ToastContainer position='bottom-right' theme='colored' autoClose={5000} hideProgressBar={false} />
            
            {/* Main Layout */}
            <div className="flex h-screen bg-gray-50">
                {/* Sidebar */}
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

                {/* Main Content */}
                <div className={`flex-1 transition-all duration-300 ${
                    isSidebarOpen ? 'ml-72' : 'ml-16'
                }`}>
                    {/* Topbar */}
                    {<Topbar isOpen={isSidebarOpen} />}
                    {/* {authStore.IsLoggedIn && <Topbar isOpen={isSidebarOpen} />} */}

                    
                    {/* Main Content Area */}
                    <div className="pt-16 p-8 min-h-screen">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
});

