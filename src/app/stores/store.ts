import { createContext, useContext } from "react";
import ModalStore from "./ModalStore";

interface Store {
    modalStore: ModalStore;
    // Add other stores here as needed
}

export const store: Store = {
    modalStore: new ModalStore()
    // Initialize other stores here
};

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
