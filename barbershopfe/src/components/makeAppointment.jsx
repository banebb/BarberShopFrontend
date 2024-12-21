import React, { useState } from "react";

const MakeAppointment = () => {
    const [date, setDate] = useState("");
    const [appointments, setAppointments] = useState([]);
    const [availableTimes, setAvailableTimes] = useState([]);

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setDate(selectedDate);
        handleGetAppointments(selectedDate);
    }

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
            setAppointments(data);
            generateAvailableTimes(selectedDate, data);
        } catch (error) {
            const data = [];
            setAppointments(data);
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

    return (
        <div>
            <h1>Make Appointment</h1>
            <input type="date" value={date} onChange={handleDateChange} />
            <h2>Available Times</h2>
            <ul>
                {availableTimes.map((time, index) => (
                    <li key={index}>{time}</li>
                ))}
            </ul>
        </div>
    );
}

export default MakeAppointment;