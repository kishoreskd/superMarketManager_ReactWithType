import { createContext, useContext } from "react";
import InventoryStore from "./InventoryStore";
import ModalStore from "./ModalStore";
import CommonStore from "./CommonStore";
import AuthStore from "./AuthStore";
import FeedbackStore from "./FeedbackStore";
import DashboardStore from "./DashboardStore";
import CustomerStore from "./CustomerStore";
import CouponStore from "./CouponStore";
import StaffStore from "./StaffStore";

interface Store {
    inventoryStore: InventoryStore;
    modalStore: ModalStore;
    commonStore: CommonStore;
    authStore: AuthStore;
    feedbackStore: FeedbackStore;
    dashboardStore: DashboardStore;
    customerStore: CustomerStore;
    couponStore: CouponStore;
    staffStore: StaffStore;
    // Add other stores here as needed
}   

export const store: Store = {
    inventoryStore: new InventoryStore(),
    modalStore: new ModalStore(),
    commonStore: new CommonStore(),
    authStore: new AuthStore(),
    feedbackStore: new FeedbackStore(),
    dashboardStore: new DashboardStore(),
    customerStore: new CustomerStore(),
    couponStore: new CouponStore(),
    staffStore: new StaffStore(),
    // Initialize other stores here
};

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
