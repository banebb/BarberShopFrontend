import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UsersAppointments = () => {

    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await fetch("http://localhost:8081/api/getAppointmentsByUser", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                const data = await response.json();
                setAppointments(data);
            } else {
                console.error("Failed to fetch appointments");
            }
        } catch (error) {
            console.error("Failed to fetch appointments:", error);
        }
    };

    const handleCancelAppointment = async (dateTime) => {

        const confirmCancel = window.confirm("Are you sure you want to cancel this appointment? You can only cancel appointments 10 times before getting banned.");
        if (!confirmCancel) {
            return;
        }

        try {
            const response = await fetch("http://localhost:8081/api/cancelApointment", {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ dateTimeStr: dateTime} )
            });

            if (response.ok) {
                fetchAppointments(); // Refresh the appointments list
            } else {
                console.error("Failed to cancel appointment");
            }
        } catch (error) {
            console.error("Failed to cancel appointment:", error);
        }
    };

    const handleLogout = async () => {
        const response = await fetch("http://localhost:8081/api/logout", {
            method: "POST",
            credentials: "include",
        });
    
        if (response.ok) {
            navigate("/");
        }
    };

    const navigate = useNavigate();

    return (
        <div className="flex flex-col gap-16 justify-center items-center w-screen bg-black">
            <Link to="/home"><p className="absolute top-8 left-8 text-white text-5xl"  >←</p></Link>
            <button 
                        className="absolute top-8 right-8 text-white border-2 border-orange-400 rounded-lg px-5 py-2 active:bg-orange-400  hover:bg-orange-400 hover:transtion hover:duration-150"
                        onClick={handleLogout}
                    >
                            Sign Out
                    </button>
            <h1 className="text-orange-400 text-8xl">Your Appointments</h1>
            {appointments.length === 0 ? (
                <p className="text-white">You have no appointments</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {appointments.map((appointment) => {
                        const [date, time] = appointment.dateTime.split('T');
                        return (
                            <div key={appointment.id} className="text-white border-2 border-orange-400 rounded-lg p-4">
                                <p>Date: {date}</p>
                                <p>Time: {time}</p>
                                {appointment.status === "NOT_THE_TIME" && (
                                    <button
                                        className="text-white bg-red-500 rounded-lg px-4 py-2 mt-2"
                                        onClick={() => handleCancelAppointment(appointment.dateTime)}
                                    >
                                        Cancel
                                    </button>
                                )}
                                {appointment.status === "DONE" && (
                                    <p className="text-green-500 mt-2">Done</p>
                                )}
                                {appointment.status === "CANCELED" && (
                                    <p className="text-red-500 mt-2">Canceled</p>
                                )}
                                {appointment.status === "DIDNT_SHOW_UP" && (
                                    <p className="text-red-500 mt-2">Missed</p>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default UsersAppointments;