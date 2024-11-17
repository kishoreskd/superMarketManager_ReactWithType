import { makeAutoObservable, runInAction } from "mobx";
import { Login } from "../models/Login";
import agent from "../services/agent";
import { store } from "./store";
import { CreateAccount } from "../models/CreateAccount";
import { router } from "../router/Routes";
import { toast } from "react-toastify";

export default class AuthStore {

    loginState: boolean = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setError = (error: string | null) => {
        this.error = error;
    }

    get IsLoggedIn() {
        return this.loginState;
    }

    login = async (credentials: Login) => {
        try {
            this.setError(null); // Clear previous errors
            // const response = await agent.AccountApi.login(credentials) as any;
            // const status = response.PMAI001OperationResponse.ws_reg_recout.ws_out_status;

            // if (status.includes('Login successful')) {
            //     runInAction(() => {
            //         this.loginState = true;
            //         store.commonStore.setToken(status);
            //         toast.success('Login successful');
            //         router.navigate('/dashboard');
            //     });
            // } else {
            //     runInAction(() => {
            //         this.setError(status || 'Login failed');
            //     });
            // }
            router.navigate('/dashboard');

        } catch (error: any) {
            runInAction(() => {
                this.loginState = false;
                if (error.response?.data?.message) {
                    this.setError(error.response.data.message);
                } else {
                    this.setError('Failed to login. Please try again.');
                }
            });
            throw error;
        }
    }

    createAccount = async (credentials: CreateAccount) => {
        try {
            const response = await agent.AccountApi.createAccount(credentials) as any;
            const status = response.PMAI002OperationResponse.ws_log_recout.ws_out_status;

            if (status.includes('REGISTRATION SUCCESSFULL')) {

                runInAction(() => {
                    this.loginState = true;
                    store.commonStore.setToken(status);
                    store.modalStore.closeModal();
                    toast.success('Account created successfully');
                    router.navigate('/dashboard');
                });
            }
        } catch (error) {
            throw error;
        }
    }

    forgetPassword = async (credentials: CreateAccount) => {
        try {
            const response = await agent.AccountApi.forgotPassword(credentials) as any;

            const status = response.PMAI003OperationResponse.ws_reg_recout.ws_out_status;

            if (status.includes('Password changed successfully')) {

                runInAction(() => {
                    store.modalStore.closeModal();
                    toast.success('Password changed successfully');
                });
            }

        } catch (error) {
            throw error;
        }
    }
}       