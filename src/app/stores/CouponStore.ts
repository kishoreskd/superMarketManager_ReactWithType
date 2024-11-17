import { makeAutoObservable, runInAction } from "mobx";
import { Coupon } from "../models/Coupon";
import agent from "../services/agent";

export default class CouponStore {
    coupons: Coupon[] = [];
    selectedCoupon: Coupon | null = null;
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    loadCoupons = async () => {
        this.loading = true;
        try {
            const response = await agent.CouponApi.getCoupons() as any;
            runInAction(() => {
                this.coupons = response.PMAI016OperationResponse.ws_coupon_recout.ws_coupon_res;
            });
        } catch (error) {
            console.error('Error loading coupons:', error);
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    createCoupon = async (coupon: Coupon) => {
        this.loading = true;
        try {
            await agent.CouponApi.addCoupon(coupon);
            runInAction(() => {
                this.coupons.push(coupon);
            });
            return true;
        } catch (error) {
            console.error('Error creating coupon:', error);
            return false;
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    updateCoupon = async (coupon: Coupon) => {
        this.loading = true;
        try {
            await agent.CouponApi.updateCoupon(coupon);
            runInAction(() => {
                const index = this.coupons.findIndex(c => c.ws_coupon_id === coupon.ws_coupon_id);
                if (index !== -1) this.coupons[index] = coupon;
            });
            return true;
        } catch (error) {
            console.error('Error updating coupon:', error);
            return false;
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    isExpired = (endDate: string) => {
        return new Date(endDate) < new Date();
    }
} 