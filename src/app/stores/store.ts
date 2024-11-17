import { createContext, useContext } from "react";
import InventoryStore from "./InventoryStore";
import ModalStore from "./ModalStore";
import CommonStore from "./CommonStore";
import AuthStore from "./AuthStore";
import FeedbackStore from "./feedbackStore";

interface Store {
    inventoryStore: InventoryStore;
    modalStore: ModalStore;
    commonStore: CommonStore;
    authStore: AuthStore;
    feedbackStore: FeedbackStore;
    // Add other stores here as needed
}   

export const store: Store = {
    inventoryStore: new InventoryStore(),
    modalStore: new ModalStore(),
    commonStore: new CommonStore(),
    authStore: new AuthStore(),
    feedbackStore: new FeedbackStore(),
    // Initialize other stores here
};

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
