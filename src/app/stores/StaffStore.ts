import { makeAutoObservable, runInAction } from "mobx";
import { Staff } from "../models/Staff";
import agent from "../services/agent";

export default class StaffStore {
    staffRegistry = new Map<string, Staff>();
    selectedStaff: Staff | undefined = undefined;
    loading = false;
    
    constructor() {
        makeAutoObservable(this);
    }
    
    loadStaff = async () => {
        try {
            this.loading = true;
            const result = await agent.StaffApi.getStaff() as any;
            runInAction(() => {
                result.forEach((staff: Staff) => {
                    this.staffRegistry.set(staff.ws_employee_id, staff);
                });
                this.loading = false;
            });
        } catch (error) {
            console.error('Error loading staff:', error);
            this.loading = false;
        }
    }

    createStaff = async (staff: Staff) => {
        try {
            this.loading = true;
            await agent.StaffApi.addStaff(staff);
            runInAction(() => {
                this.staffRegistry.set(staff.ws_employee_id, staff);
                this.loading = false;
            });
        } catch (error) {
            console.error('Error creating staff:', error);
            this.loading = false;
            throw error;
        }
    }

    updateStaff = async (staff: Staff) => {
        try {
            this.loading = true;
            await agent.StaffApi.updateStaff(staff);
            runInAction(() => {
                this.staffRegistry.set(staff.ws_employee_id, staff);
                this.loading = false;
            });
        } catch (error) {
            console.error('Error updating staff:', error);
            this.loading = false;
            throw error;
        }
    }

    deleteStaff = async (id: string) => {
        try {
            this.loading = true;
            await agent.StaffApi.deleteStaff(id);
            runInAction(() => {
                this.staffRegistry.delete(id);
                this.loading = false;
            });
        } catch (error) {
            console.error('Error deleting staff:', error);
            this.loading = false;
            throw error;
        }
    }
} 