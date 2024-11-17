import { makeAutoObservable, runInAction } from "mobx";
import { Customer } from "../models/Customer";
import agent from "../services/agent";

export default class CustomerStore {
    customers: Customer[] = [];
    selectedCustomer: Customer | null = null;
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    loadCustomers = async () => {
        this.loading = true;
        try {
            const response = await agent.CustomerApi.getCustomerDetails("") as any;
            runInAction(() => {
                this.customers = response.PMAI008OperationResponse.ws_custdet_recout.ws_custdet_res;
            });
        } catch (error) {
            console.error('Error loading customers:', error);
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    loadCustomer = async (id: string) => {
        this.loading = true;
        try {
            const response = await agent.CustomerApi.getCustomerDetails(id) as any;
            runInAction(() => {
                this.selectedCustomer = response.PMAI008OperationResponse.ws_custdet_recout.ws_custdet_res[0];
            });
        } catch (error) {
            console.error('Error loading customer:', error);
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    createCustomer = async (customer: Customer) => {
        this.loading = true;
        try {
            await agent.CustomerApi.addCustomer(customer);
            runInAction(() => {
                this.customers.push(customer);
            });
            return true;
        } catch (error) {
            console.error('Error creating customer:', error);
            return false;
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }
} 