import { makeAutoObservable, runInAction } from "mobx";
import agent from "../services/agent";

interface BestSelling {
    ws_item_id: string;
    ws_item_quantity: number;
}

interface DailySales {
    ws_transaction_date: string;
    ws_amount: number;
    ws_no_of_orders: number;
}

export default class DashboardStore {
    bestSellingItems: BestSelling[] = [];
    dailySales: DailySales[] = [];
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    loadBestSelling = async () => {
        this.loading = true;
        try {
            const response = await agent.DashboardApi.getBestSelling() as any;
            runInAction(() => {
                this.bestSellingItems = response.PMAI004OperationResponse.ws_sales_recout.ws_sales_res;
            });
        } catch (error) {
            console.error('Error loading best selling items:', error);
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    loadDailySales = async () => {
        this.loading = true;
        try {
            const response = await agent.DashboardApi.getDailySales() as any;
            runInAction(() => {
                this.dailySales = response.PMAI005OperationResponse.ws_sales_recout.ws_sales_res;
            });
        } catch (error) {
            console.error('Error loading daily sales:', error);
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }
} 