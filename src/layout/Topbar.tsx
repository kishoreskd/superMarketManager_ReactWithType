import { observer } from "mobx-react-lite";
import { useStore } from "../app/stores/store";

interface TopbarProps {
    isOpen: boolean;
}

const Topbar = observer(({ isOpen }: TopbarProps) => {
    const { authStore } = useStore();

    return (
        <div className={`h-16 bg-white border-b border-gray-200 flex items-center justify-between fixed top-0 z-30 transition-all duration-300 ${
            isOpen ? 'left-72 right-0' : 'left-16 right-0'
        } px-8`}>
            <div className="flex items-center">
                {/* <h2 className="text-lg font-semibold text-gray-700">
                    Welcome to Super Market Manager
                </h2> */}
            </div>

            <div className="flex items-center space-x-6">
             

                {/* Vertical Divider */}
                <div className="h-8 w-px bg-gray-200"></div>

                {/* Logout Button */}
                <button 
                    onClick={() => authStore.logout()}
                    className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                    <span className="material-icons">logout</span>
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
});

export default Topbar;