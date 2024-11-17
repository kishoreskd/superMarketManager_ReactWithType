import { makeAutoObservable, runInAction } from "mobx";
import { Feedback } from "../models/Feedback";
import agent from "../services/agent";

export default class FeedbackStore {
    feedbackRegistry = new Map<string, Feedback>();
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    loadFeedbacks = async () => {
        this.loading = true;
        try {
            const response = await agent.FeedbackApi.getFeedback() as any;
            runInAction(() => {
                response.forEach((feedback: Feedback) => {
                    this.feedbackRegistry.set(feedback.ws_order_id, feedback);
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

    createFeedback = async (feedback: Feedback) => {
        this.loading = true;
        try {
            // await agent.FeedbackApi.create(feedback);
            runInAction(() => {
                this.feedbackRegistry.set(feedback.ws_order_id, feedback);
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