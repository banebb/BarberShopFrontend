import React from "react";
import barbershoppng from "../images/barbershop.png";
import { Link } from "react-router-dom";

const Welcome = () => {

    return (
        <div className="flex flex-col gap-16 justify-center items-center h-screen bg-black" >
            <img src={barbershoppng} alt="barbershop" className="w-1/12" />
            <h1 className="text-orange-400 text-8xl text-center">Welcome to the BarberShop appointment <br /> reservation service!</h1>
            <div className="text-4xl flex justify-center w-screen items-center">
                <div className="block w-1/2 text-center">
                    <h2 className="text-white">If you already have account sign in</h2>
                    <br />
                    <Link to="/login"><button className="text-white m-auto border-2 border-orange-400 rounded-lg px-5 py-2 hover:bg-orange-400 hover:transtion hover:duration-150 ">SIGN IN</button></Link>
                </div>
                <div className="block w-1/2 text-center">
                    <h2 className="text-white">If you don't have account sign up</h2>
                    <br />
                    <Link to="/register"><button className="text-white m-auto border-2 border-orange-400 rounded-lg px-5 py-2 hover:bg-orange-400 hover:transtion hover:duration-150">SIGN UP</button></Link>
                </div>
                
            </div>
        </div>
    );
}

export default Welcome;