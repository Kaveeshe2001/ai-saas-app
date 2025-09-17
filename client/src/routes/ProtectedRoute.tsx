import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";

type ProtectedRouteProps = {
    children: React.ReactNode;
};

const ProtectedRoute = ({children}: ProtectedRouteProps) => {
    const location = useLocation();
    const { isLoggedIn } = useAuth();

    return isLoggedIn() ? (
        <>{children}</>
    ) : (
        <Navigate to='/login' state={{ from: location }} replace />
    );
};

export default ProtectedRoute;