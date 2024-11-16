import axios, { AxiosResponse } from "axios";
import { CreateAccount } from "../models/CreateAccount";
import { Login } from "../models/Login";
import { Customer } from "../models/Customer";
import { Staff } from "../models/Staff";
import { Coupon } from "../models/Coupon";
import { Order } from "../models/Order";
import { Feedback } from "../models/Feedback";  


const BASE_URL = 'http://10.123.79.112:1026/u/home/json';
axios.defaults.baseURL = BASE_URL;

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request =
{
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: object) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: object) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}


const AccountApi = {
    login: (credentials: Login) =>
        request.post('/pmai001', {
            PMAI001Operation: {
                ws_log_recin: {
                    ws_us_userid: credentials.ws_us_userid,
                    ws_us_pswd: credentials.ws_us_pswd
                }
            }
        }),

    createAccount: (accountData: CreateAccount) =>
        request.post('/pmai002', {
            PMAI002Operation: {
                ws_creat_recin: {
                    ws_employee_id: accountData.ws_employee_id,
                    ws_security_question: accountData.ws_security_question,
                    ws_answer: accountData.ws_answer,
                    ws_password: accountData.ws_password
                }
            }
        }),

    forgotPassword: (resetData: CreateAccount) =>
        request.post('/pmai003', {
            PMAI003Operation: {
                ws_forgot_recin: {
                    ws_employee_id: resetData.ws_employee_id,
                    ws_security_question: resetData.ws_security_question,
                    ws_answer: resetData.ws_answer,
                    ws_password: resetData.ws_password
                }
            }
        })
}



const DashboardApi = {
    getBestSelling: () =>
        request.post('/pmai004', { PMAI004Operation: {} }),

    getDailySales: () =>
        request.post('/pmai005', { PMAI005Operation: {} }),
}

const InventoryApi = {
    getInventory: () =>
        request.post('/pmai006', { PMAI006Operation: {} }),
}

const FeedbackApi = {
    getFeedback: () =>
        request.post('/pmai007', { PMAI007Operation: {} }),

    submitFeedback: (feedbackData: Feedback) =>
        request.post('/pmai020', {
            PMAI020Operation: {
                ws_feedback_recin: {
                    ws_order_id: feedbackData.ws_order_id,
                    ws_customerid: feedbackData.ws_customerid,
                    ws_item_feedback: feedbackData.ws_item_feedback,
                    ws_service_feedback: feedbackData.ws_service_feedback,
                    ws_billing_feedback: feedbackData.ws_billing_feedback,
                    ws_customer_review: feedbackData.ws_customer_review
                }
            }
        })
}

const CustomerApi = {
    getCustomerDetails: (customerId: string) =>
        request.post('/pmai008', {
            PMAI008Operation: {
                ws_custdet_recin: {
                    ws_customer_id: customerId
                }
            }
        }),

    addCustomer: (customerData: Customer) =>
        request.post('/pmai019', {
            PMAI019Operation: {
                ws_custins_recin: {
                    ws_customername: customerData.ws_customername,
                    ws_emailid: customerData.ws_emailid,
                    ws_phoneno: customerData.ws_phoneno
                }
            }
        }),
}

const OrderApi = {
    getOrders: () =>
        request.post('/pmai009', { PMAI009Operation: {} }),

    placeOrder: (orderData: Order) =>
        request.post('/pmai010', {
            PMAI010Operation: {
                ws_place_order_input: {
                    ws_customerid: orderData.ws_customerid,
                    ws_item_id: orderData.ws_item_id,
                    ws_quantity: orderData.ws_quantity,
                    ws_coupon: orderData.ws_coupon
                }
            }
        }),

    updateOrder: (orderId: string, status: string) =>
        request.post('/pmai011', {
            PMAI011Operation: {
                ws_order_update_input: {
                    ws_order_id: orderId,
                    ws_status: status
                }
            }
        }),
}

const StaffApi = {
    getStaff: () =>
        request.post('/pmai012', { PMAI012Operation: {} }),

    addStaff: (staffData: Staff) =>
        request.post('/pmai013', {
            PMAI013Operation: {
                ws_stafins_recin: {
                    ws_employee_id: staffData.ws_employee_id,
                    ws_employee_name: staffData.ws_employee_name,
                    ws_employee_email: staffData.ws_employee_email,
                    ws_employee_phno: staffData.ws_employee_phno,
                    ws_role: staffData.ws_role
                }
            }
        }),

    deleteStaff: (employeeId: string) =>
        request.post('/pmai014', {
            PMAI014Operation: {
                ws_stafdel_recin: {
                    ws_employee_id: employeeId
                }
            }
        }),

    updateStaff: (staffData: Staff) =>
        request.post('/pmai015', {
            PMAI015Operation: {
                ws_stafupd_recin: {
                    ws_employee_id: staffData.ws_employee_id,
                    ws_employee_email: staffData.ws_employee_email,
                    ws_employee_phno: staffData.ws_employee_phno,
                    ws_role: staffData.ws_role
                }
            }
        }),
}

const CouponApi = {
    getCoupons: () =>
        request.post('/pmai016', { PMAI016Operation: {} }),

    addCoupon: (couponData: Coupon) =>
        request.post('/pmai017', {
            PMAI017Operation: {
                ws_coupins_recin: {
                    ws_start_date: couponData.ws_start_date,
                    ws_end_date: couponData.ws_end_date,
                    ws_campaigns_name: couponData.ws_campaigns_name,
                    ws_coupon_code: couponData.ws_coupon_code,
                    ws_offer_percent: couponData.ws_offer_percent
                }
            }
        }),

    updateCoupon: (couponData: Coupon) =>
        request.post('/pmai018', {
            PMAI018Operation: {
                ws_coupupd_recin: {
                    ws_coupon_id: couponData.ws_coupon_id,
                    ws_end_date: couponData.ws_end_date,
                    ws_coupon_code: couponData.ws_coupon_code,
                    ws_offer_percent: couponData.ws_offer_percent
                }
            }
        }),
}

const agent = {
    AccountApi,
    DashboardApi,
    InventoryApi,
    FeedbackApi,
    CustomerApi,
    OrderApi,
    StaffApi,
    CouponApi
}

export default agent;