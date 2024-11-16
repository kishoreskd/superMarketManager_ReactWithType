import { Navigate } from "react-router-dom";
import { useStore } from "../stores/store";

interface Props {
    children: JSX.Element
}

export default function RequireAuth({ children }: Props) {
    const { authStore: { IsLoggedIn } } = useStore();

    if (!IsLoggedIn) {
        // Redirect them to the login page if not authenticated
        return <Navigate to="/" replace />;
    }

    return children;
}