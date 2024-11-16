import { makeAutoObservable, reaction } from "mobx";

export default class CommonStore {
    apiError: string | null = null;
    token: string | null = null;
    appLoaded: boolean = false;

    constructor() {
        makeAutoObservable(this);

        reaction(() => this.token,
            token => {
                if (token) {
                    localStorage.setItem('auth', token);
                } else {
                    localStorage.removeItem('auth');
                }
            })
    }

    setApiError = (error: string) => {
        this.apiError = error;
    }

    setToken = (token: string | null) => {
        this.token = token;
    }

}
