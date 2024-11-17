import { createBrowserRouter, RouteObject } from "react-router-dom";
import LoginForm from "../../components/users/LoginForm";
import RequireAuth from "../Interceptor/RequireAuth";
import Dashbord from "../../components/dashbord/Dashbord";
import App from "../App";

export const routes: RouteObject[] = [
    {
        path: 'login',
        element: <LoginForm />
    },
    {
        path: '/',
        element: <App />,
        children: [
            { path: 'dashboard', element: <div>Dashboard Content</div> },
            { path: 'inventory', element: <div>Inventory Content</div> },
            { path: 'customers', element: <div>Customers Content</div> },
            { path: 'orders', element: <div>Orders Content</div> },
            { path: 'staff', element: <div>Staff Content</div> },
            { path: 'coupons', element: <div>Coupons Content</div> },
            { path: 'feedback', element: <div>Feedback Content</div> },
        ]
    }
]


export const router = createBrowserRouter(routes)