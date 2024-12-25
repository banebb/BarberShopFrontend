import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import barbershoppng from "../images/barbershop.png";

const Home = () => {

    const [name, setName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        checkIfBarber();
        getName();
    }, []);

    const checkIfBarber = async () => {
        try {
            const response = await fetch("http://localhost:8081/api/isBarber", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                const isBarber = await response.json();
                if (isBarber) {
                    navigate("/home-barber");
                }
            }
        } catch (error) {
            console.error("Failed to check if user is barber:", error);
        }
    };

    const getName = async () => {
        try {
            const response = await fetch("http://localhost:8081/api/getName", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                const data = await response.text();
                console.log(data);
                setName(data);
            }
        } catch (error) {
            console.error("Failed to get name:", error);
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

    return (
        <div className="flex flex-col gap-16 justify-center items-center h-screen bg-black">
             <button 
                        className="absolute top-8 right-8 text-white border-2 border-orange-400 rounded-lg px-5 py-2 active:bg-orange-400  hover:bg-orange-400 hover:transtion hover:duration-150"
                        onClick={handleLogout}
                    >
                            Sign Out
                    </button>
            <img src={barbershoppng} alt="barbershop" className="w-1/12" />
            <h1 className="text-8xl text-orange-400">Hello, {name}!</h1>
            <div className="text-4xl flex justify-center w-screen items-center gap-10">
                <Link to="/makeappointment">
                    <button 
                        className="text-white border-2 border-orange-400 rounded-lg px-5 py-2 hover:bg-orange-400 hover:transtion hover:duration-150"
                    >
                        Make an Appointment
                    </button>
                </Link>
                <Link to="/usersappointments">
                    <button 
                        className="text-white border-2 border-orange-400 rounded-lg px-5 py-2 hover:bg-orange-400 hover:transtion hover:duration-150"
                    >
                        See your appointments
                    </button>
                </Link>
            </div>
        </div>
    );
}


export default Home;