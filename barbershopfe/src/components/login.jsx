import React, { useState }  from "react";
import barbershoppng from "../images/barbershop.png";
import { Link } from "react-router-dom";

const Login = () => {

    const [usernameOrEmailOrPhoneNumber, setUsernameOrEmailOrPhoneNumber] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const response = await fetch("http://localhost:8081/api/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                usernameOrEmailOrPhoneNumber,
                password
            })
        });

        const data = await response;
        console.log(data);
    }

    return (
        <div className="bg-black h-screen">
            <Link to="/"><p className="absolute top-8 left-8 text-white text-5xl"  >←</p></Link>
            <div className="flex flex-col gap-20 justify-center items-center h-screen bg-black">
                <h1 className="text-orange-400 text-8xl text-center">Sign in</h1>
                <img src={barbershoppng} alt="barbershop" className="w-1/12" />
                <div className="flex flex-col gap-4 justify-center items-center bg-black">
                    <label className="text-orange-400 font-bold"> Username/Email/Phone number</label>
                    <input 
                        type="text" 
                        placeholder="Username/Email/Phone number" 
                        className="text-black border-2 border-orange-400 rounded-lg px-5 py-2" 
                        onChange={(e) => setUsernameOrEmailOrPhoneNumber(e.target.value)}
                    />
                    <label className="text-orange-400 font-bold">password</label>
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="text-black border-2 border-orange-400 rounded-lg px-5 py-2" 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button 
                        className="text-white border-2 border-orange-400 rounded-lg px-5 py-2 hover:bg-orange-400 hover:transtion hover:duration-150"
                        onClick={handleLogin}
                    >
                            SIGN IN
                    </button>
                </div>
            </div>
        </div>
    );
}
 

export default Login;   
