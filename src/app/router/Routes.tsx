import { createBrowserRouter, RouteObject } from "react-router-dom";
import LoginForm from "../../components/users/LoginForm";
import RequireAuth from "../Interceptor/RequireAuth";

export const routes: RouteObject[] = [
    {
        path: 'login',
        element: <LoginForm />
    },
    {
        path: "dashboard",
        element:
            <RequireAuth>
                <h1>Dashbord</h1>
            </RequireAuth>
    }
]


export const router = createBrowserRouter(routes)