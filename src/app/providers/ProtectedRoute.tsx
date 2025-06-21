import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isAuth } = useAuth();

    if (!isAuth) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
