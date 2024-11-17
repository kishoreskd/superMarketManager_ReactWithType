import { makeAutoObservable, runInAction } from "mobx";
import { Inventory } from "../models/Inventory";
import agent from "../services/agent";

export default class InventoryStore {
    inventoryRegistry = new Map<string, Inventory>();
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    get inventoryItems() {
        return Array.from(this.inventoryRegistry.values());
    }

    loadInventory = async () => {
        this.loading = true;
        try {
            const response = await agent.InventoryApi.getInventory() as any;
            const items = response.PMAI006OperationResponse.ws_invent_recout.ws_invent_res;
            runInAction(() => {
                items.forEach((item: Inventory) => {
                    this.inventoryRegistry.set(item.ws_item_id, item);
                });
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }
} 