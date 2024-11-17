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
                this.staffRegistry.clear();
                result.forEach((staff: Staff) => {
                    this.staffRegistry.set(staff.ws_employee_id, staff);
                });
            });
        } catch (error) {
            console.error('Error loading staff:', error);
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    createStaff = async (staffData: Staff) => {
        try {
            this.loading = true;
            const result = await agent.StaffApi.addStaff(staffData) as any;
            runInAction(() => {
                this.staffRegistry.set(staffData.ws_employee_id, staffData);
            });
            return result;
        } catch (error) {
            console.error('Error creating staff:', error);
            throw error;
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    updateStaff = async (staffData: Staff) => {
        try {
            this.loading = true;
            await agent.StaffApi.updateStaff(staffData);
            runInAction(() => {
                this.staffRegistry.set(staffData.ws_employee_id, staffData);
            });
        } catch (error) {
            console.error('Error updating staff:', error);
            throw error;
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    loadStaffMember = async (id: string) => {
        let staff = this.staffRegistry.get(id);
        if (staff) {
            this.selectedStaff = staff;
            return staff;
        }
        try {
            this.loading = true;
            const result = await agent.StaffApi.getStaff() as any;
            staff = result.find((s: Staff) => s.ws_employee_id === id);
            if (staff) {
                runInAction(() => {
                    this.staffRegistry.set(staff!.ws_employee_id, staff!);
                    this.selectedStaff = staff;
                });
            }
            return staff;
        } catch (error) {
            console.error('Error loading staff member:', error);
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    get staffList() {
        return Array.from(this.staffRegistry.values());
    }
} 