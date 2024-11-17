import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";

export default observer(function ModalContainer() {
    const { modalStore } = useStore();
    console.log("fa");
    if (!modalStore.isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md m-4">
                {modalStore.content}
            </div>
        </div>
    );
});