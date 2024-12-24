import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {

    const [name, setName] = useState("");

    useEffect(() => {
        getName();
    });

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

    return (
        <div className="flex flex-col gap-16 justify-center items-center h-screen bg-black">
            <h1 className="text-8xl text-orange-400">Hello, {name}!</h1>
            <div className="text-4xl flex justify-center w-screen items-center gap-10">
                <Link to="/makeappointment">
                    <button 
                        className="text-white border-2 border-orange-400 rounded-lg px-5 py-2 hover:bg-orange-400 hover:transtion hover:duration-150"
                    >
                        Make an Appointment
                    </button>
                </Link>
                <Link to="#">
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