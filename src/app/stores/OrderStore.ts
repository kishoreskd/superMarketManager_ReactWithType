import { makeAutoObservable, runInAction } from "mobx";
import { Order } from "../models/Order";
import agent from "../services/agent";

export default class OrderStore {
    orderRegistry = new Map<string, Order>();
    loading = false;
    
    constructor() {
        makeAutoObservable(this);
    }

    loadOrders = async () => {
        try {
            this.loading = true;
            const result = await agent.OrderApi.getOrders() as any;
            runInAction(() => {
                this.orderRegistry.clear();
                result.forEach((order: Order) => {
                    this.orderRegistry.set(order.ws_order_id, order) ;
                });
            });
        } catch (error) {
            console.error('Error loading orders:', error);
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    placeOrder = async (orderData: Order) => {
        try {
            this.loading = true;
            const result = await agent.OrderApi.placeOrder(orderData) as any;
            runInAction(() => {
                if (result.ws_order_id) {
                    this.orderRegistry.set(result.ws_order_id, result);
                }
            });
            return result;
        } catch (error) {
            console.error('Error placing order:', error);
            throw error;
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    updateOrderStatus = async (orderId: string, newStatus: Order['ws_order_status']) => {
        try {
            this.loading = true;
            await agent.OrderApi.updateOrder(orderId, newStatus);
            runInAction(() => {
                const order = this.orderRegistry.get(orderId);
                if (order) {
                    order.ws_order_status = newStatus;
                    this.orderRegistry.set(orderId, order);
                }
            });
        } catch (error) {
            console.error('Error updating order status:', error);
            throw error;
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    get ordersList() {
        return Array.from(this.orderRegistry.values());
    }
} 