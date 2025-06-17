import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const location = useLocation();
    const { isAuth } = useAuth();

    if (!isAuth) {
        return <Navigate to="/" state={{ from: location.pathname }} />;
    }

    return children;
};

export default ProtectedRoute;
