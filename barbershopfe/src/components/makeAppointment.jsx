import React, { useState } from "react";
import barbershoppng from "../images/barbershop.png";
import { useNavigate, Link } from "react-router-dom";

const MakeAppointment = () => {
    const [date, setDate] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [availableTimes, setAvailableTimes] = useState([]);
    const [selectedTime, setSelectedTime] = useState(null);

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        if (new Date(selectedDate) < new Date()) {
            setAlertMessage("Please select a future date");
            return;
        } else {
            setAlertMessage("");
        }
        setDate(selectedDate);
        handleGetAppointments(selectedDate);
    }

    const navigate = useNavigate();

    const handleGetAppointments = async (selectedDate) => {
        try {
            const response = await fetch("http://localhost:8081/api/getAppointmentsOnDate/" + selectedDate, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Fetched appointments:", data); // Debug log
            
            generateAvailableTimes(selectedDate, data);
        } catch (error) {
            const data = [];
            
            generateAvailableTimes(selectedDate, data);
        }
    }

    const generateAvailableTimes = (selectedDate, appointments) => {
        console.log("Generating available times with appointments:", appointments); // Debug log
        const times = [];
        const startTime = new Date();
        startTime.setHours(8, 0, 0, 0); // 8:00 AM

        const endTime = new Date();
        endTime.setHours(16, 0, 0, 0); // 4:00 PM

        const interval = 45 * 60 * 1000; // 45 minutes in milliseconds

        let currentTime = new Date(startTime);

        while (currentTime <= endTime) {
            const timeString = currentTime.toTimeString().split(' ')[0].substring(0, 5);
            if (!appointments.some(appointment => appointment.dateTime.split('T')[1].substring(0, 5) === timeString)) {
                times.push(timeString);
            }
            currentTime = new Date(currentTime.getTime() + interval);
        }

        setAvailableTimes(times);
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

    const handleTimeClick = (time) => {
        setSelectedTime(time);
    };

    const handleMakeAppointment = async () => {
        if (!date || !selectedTime) {
            setAlertMessage("Please select a date and time");
            return;
        }

        const dateTimeString = date + "T" + selectedTime + ":00";

        try {
            const response = await fetch("http://localhost:8081/api/makeApointment", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ dateTimeStr: dateTimeString })
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Appointment made:", data); // Debug log
            setAlertMessage("Appointment successfully made!"); // Show success message in green
        } catch (error) {
            console.error("Failed to make appointment:", error);
            setAlertMessage("Failed to make appointment"); // show alerts somwhere else
        }
    };

    return (
        <div className="bg-black h-screen">
            <Link to="/"><p className="absolute top-8 left-8 text-white text-5xl"  >←</p></Link>
            <button 
                        className="absolute top-8 right-8 text-white border-2 border-orange-400 rounded-lg px-5 py-2 active:bg-orange-400  hover:bg-orange-400 hover:transtion hover:duration-150"
                        onClick={handleLogout}
                    >
                            Sign Out
                    </button>
            <div className="flex flex-col gap-10 justify-center items-center h-screen bg-black text-4xl">
                <h1 className="text-orange-400 text-8xl">Make the Appointment</h1>
                <img src={barbershoppng} alt="barbershop" className="w-32" />
                <div className="flex flex-col gap-4 justify-center items-center bg-black">
                    <label className="text-orange-400 font-bold">Choose date</label>
                    <div className="flex gap-10 relative">
                        <input type="date" 
                            value={date}
                            className="text-black border-2 border-orange-400 rounded-lg px-5 py-2" 
                            onChange={handleDateChange} 
                        />
                        {alertMessage && (
                            <div className="absolute transform translate-x-full bg-red-500 text-white p-4 rounded">
                                {alertMessage}
                            </div>
                        )} 
                    </div>
                    
                </div>
                
                {date && <h2 className="text-white">Available Times</h2>}
                <div className="grid-flow-row-dense grid grid-cols-4 gap-4 text-white align-center">
                    {availableTimes.map((time, index) => (
                        <div key={index} 
                             className={`text-center border-2 border-orange-400 rounded-lg px-5 py-2 cursor-pointer ${selectedTime === time ? 'bg-orange-400' : 'hover:bg-orange-400 hover:transtion hover:duration-150'}`}
                             onClick={() => handleTimeClick(time)}
                        >
                            {time}
                        </div>
                        
                    ))}
                </div>
                {date && (
                        <button 
                            className="mt-4 text-white border-2 border-orange-400 rounded-lg px-5 py-2 active:bg-orange-400 hover:bg-orange-400 hover:transtion hover:duration-150"
                            onClick={handleMakeAppointment}
                        >
                            Make Appointment
                        </button>
                    )}
                {date && availableTimes.length === 0 && (
                    <p className="text-center m-auto text-white">No available times</p> 
                )}
            </div>
            
        </div>
    );
}

export default MakeAppointment;