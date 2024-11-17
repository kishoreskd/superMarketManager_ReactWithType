import { createBrowserRouter, RouteObject } from "react-router-dom";
import LoginForm from "../../components/users/LoginForm";
import RequireAuth from "../Interceptor/RequireAuth";
import Dashbord from "../../components/dashbord/Dashbord";
import App from "../App";
import Customer from "../../components/customer/Customer";
import CustomerForm from "../../components/customer/CustomerForm";
import Order from "../../components/order/Order";
import OrderForm from "../../components/order/OrderForm";

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
            { path: 'inventory', element: <div>Inventory Content</div> },
            { path: 'customers', element: <Customer /> },
            { path: 'customers/new', element: <CustomerForm /> },
            { path: 'customers/edit/:id', element: <CustomerForm /> },
            { path: 'orders', element: <Order /> },
            { path: 'orders/new', element: <OrderForm /> },
            { path: 'orders/edit/:id', element: <OrderForm /> },
            { path: 'staff', element: <div>Staff Content</div> },
            { path: 'coupons', element: <div>Coupons Content</div> },
            { path: 'feedback', element: <div>Feedback Content</div> },
        ]
    }
];

export const router = createBrowserRouter(routes);