import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ThankYou = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Check if the appointment was made
    if (!location.state || !location.state.appointmentMade) {
        navigate("/"); // Redirect to home if accessed directly
        return null;
    }

    return (
        <div className="bg-black h-screen flex flex-col justify-center items-center text-white">
            <h1 className="text-4xl mb-4">Thank You!</h1>
            <p>Your appointment has been successfully made.</p>
            <button 
                className="mt-4 text-white border-2 border-orange-400 rounded-lg px-5 py-2 active:bg-orange-400 hover:bg-orange-400 hover:transtion hover:duration-150"
                onClick={() => navigate("/")}
            >
                Go to Home
            </button>
        </div>
    );
}

export default ThankYou;