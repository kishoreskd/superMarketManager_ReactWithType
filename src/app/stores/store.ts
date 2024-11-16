import { createContext, useContext } from "react";
import ModalStore from "./ModalStore";
import CommonStore from "./CommonStore";
import AuthStore from "./AuthStore";

interface Store {
    modalStore: ModalStore;
    commonStore: CommonStore;
    authStore: AuthStore;
    // Add other stores here as needed
}

export const store: Store = {
    modalStore: new ModalStore(),
    commonStore: new CommonStore(),
    authStore: new AuthStore()
    // Initialize other stores here
};

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
