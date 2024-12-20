import React, { useState } from "react";
import barbershoppng from "../images/barbershop.png";
import { Link, useNavigate } from "react-router-dom";

//user.getUsername(), user.getPassword(), user.getEmail(), user.getName(), user.getSurname(), user.getPhoneNumber()

const Register = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const navigate = useNavigate();

    const handleRegister = async () => {
        const response = await fetch("http://localhost:8081/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password,
                email,
                name,
                surname,
                phoneNumber
            })
        });

        if (response.ok) {
            navigate("/login");
        } else {
            const data = await response.text();
            setAlertMessage(data);
        }
    }

    return (
        <div className="bg-black h-screen">
            <Link to="/"><p className="absolute top-8 left-8 text-white text-5xl"  >←</p></Link>
            <div className="flex flex-col gap-20 justify-center items-center h-screen bg-black">
                <h1 className="text-orange-400 text-8xl text-center">Sign up</h1>
                <img src={barbershoppng} alt="barbershop" className="w-1/12" />
                {alertMessage && (
                    <div className="bg-red-500 text-white p-4 rounded">
                        {alertMessage}
                    </div>
                )}
                <div className="flex flex-col gap-10 justify-center items-center bg-black">
                    <div className="flex gap-10">
                        <div className="flex flex-col gap-4">
                            <label className="text-orange-400 font-bold"> Usermane</label>
                            <input 
                                type="text" 
                                placeholder="Username" 
                                className="text-black border-2 border-orange-400 rounded-lg px-5 py-2"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <label className="text-orange-400 font-bold">password</label>
                            <input 
                                type="password" 
                                placeholder="Password" 
                                className="text-black border-2 border-orange-400 rounded-lg px-5 py-2"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label className="text-orange-400 font-bold">Email</label>
                            <input 
                                type="email" 
                                placeholder="Email" 
                                className="text-black border-2 border-orange-400 rounded-lg px-5 py-2"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className="text-orange-400 font-bold">Name</label>
                            <input 
                                type="text" 
                                placeholder="Name" 
                                className="text-black border-2 border-orange-400 rounded-lg px-5 py-2"
                                onChange={(e) => setName(e.target.value)}
                            />
                            <label className="text-orange-400 font-bold">Surname</label>
                            <input 
                                type="text" 
                                placeholder="Surname" 
                                className="text-black border-2 border-orange-400 rounded-lg px-5 py-2"
                                onChange={(e) => setSurname(e.target.value)}
                            />
                            <label className="text-orange-400 font-bold">Phone number</label>
                            <input 
                                type="tel" 
                                placeholder="Phone number" 
                                className="text-black border-2 border-orange-400 rounded-lg px-5 py-2"
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                    </div>
                    <button 
                        className="text-white border-2 border-orange-400 rounded-lg px-5 py-2 hover:bg-orange-400 hover:transtion hover:duration-150"
                        onClick={handleRegister}
                    >
                            SIGN UP
                    </button>
                </div>
            </div>
        </div>
    );

}

export default Register;