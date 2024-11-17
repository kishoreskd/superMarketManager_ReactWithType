import { createBrowserRouter, RouteObject } from "react-router-dom";
import LoginForm from "../../components/users/LoginForm";
import RequireAuth from "../Interceptor/RequireAuth";
import Dashbord from "../../components/dashbord/Dashbord";
import App from "../App";
import Customer from "../../components/customer/Customer";
import CustomerForm from "../../components/customer/CustomerForm";
import Order from "../../components/order/Order";
import OrderForm from "../../components/order/OrderForm";
import Coupon from "../../components/coupon/Coupon";
import CouponForm from "../../components/coupon/CouponForm";
import FeedbackForm from "../../components/feedback/FeedbackForm";
import Feedback from "../../components/feedback/Feedback";
import Inventory from "../../components/inventory/Inventory";
import StaffForm from "../../components/staff/StaffForm";
import Staff from "../../components/staff/Staff";

export const routes: RouteObject[] = [
    {
        path: 'login',
        element: <LoginForm />
    },
    {
        path: '/',
        element: <App />,
        children: [
            { path: 'dashboard', element: <Dashbord /> },
            { path: 'inventory', element: <Inventory /> },
            { path: 'customers', element: <Customer /> },
            { path: 'customers/new', element: <CustomerForm /> },
            { path: 'customers/edit/:id', element: <CustomerForm /> },
            { path: 'orders', element: <Order /> },
            { path: 'orders/new', element: <OrderForm /> },
            { path: 'orders/edit/:id', element: <OrderForm /> },
            { path: 'coupons', element: <Coupon /> },
            { path: 'coupons/new', element: <CouponForm /> },
            { path: 'coupons/edit/:id', element: <CouponForm /> },
            { path: 'feedback', element: <Feedback /> },
            { path: 'orders/:orderId/feedback', element: <FeedbackForm /> },
            { path: 'staff', element: <Staff /> },
            { path: 'staff/new', element: <StaffForm /> },
            { path: 'staff/edit/:id', element: <StaffForm /> }
        ]
    }
];

export const router = createBrowserRouter(routes);