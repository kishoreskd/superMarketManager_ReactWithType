import { makeAutoObservable } from "mobx";
import { Login } from "../models/Login";
import agent from "../Services/agent";
import { store } from "./store";
import { CreateAccount } from "../models/CreateAccount";

export default class AuthStore {

    loginState: boolean = false;

    get IsLoggedIn() {
        return this.loginState;
    }

    constructor() {
        makeAutoObservable(this);
    }

    login = async (credentials: Login) => {
        try {
            const response = await agent.AccountApi.login(credentials) as any;
            const status = response.PMAI001OperationResponse.ws_log_recout.ws_out_status;

            if (status.includes('Login successful')) {
                this.loginState = true;
                store.commonStore.setToken(status);
            }

        } catch (error) {
            throw error;
        }
    }

    createAccount = async (credentials: CreateAccount) => {
        try {
            const response = await agent.AccountApi.createAccount(credentials);
        } catch (error) {
            throw error;
        }
    }

    forgetPassword = async (credentials: CreateAccount) => {
        try {
            const response = await agent.AccountApi.forgotPassword(credentials);
        } catch (error) {
            throw error;
        }
    }
}       