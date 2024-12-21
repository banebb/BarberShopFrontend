import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await fetch("http://localhost:8081/api/isLogged", {
                    method: "GET",
                    credentials: "include",
                });
                if (response.ok) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        checkAuthentication();
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>; // or a loading spinner
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;