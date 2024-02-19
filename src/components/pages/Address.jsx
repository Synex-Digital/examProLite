import React, { useState, useEffect } from "react";
import Image from "../layout/Image";
import logo from "../../assets/logo.svg";
import team from "../../assets/team.jpg";
import profile from "../../assets/profile.png";

const Address = () => {
    return (
        <div className="mt-24 w-full flex items-center justify-center h-full">
            <div className="flex justify-center items-center px-2 flex-col text-center text-cdrop">
                <Image className="w-[130px] h-[130px]" imgsrc={logo} />
                <h1 className="font-rb font-semibold text-2xl mt-6">
                    ISSB & Cadet Coaching
                </h1>
                <p className="font-rb font-medium mt-4">Phone:</p>
                <p className="font-rb font-medium">+880 1711 447 403</p>
                <p className="font-rb font-medium">+880 1753 526 178</p>
                <h2 className="font-rb my-4">
                    (Dhanmondi Branch) 50 Eastern Elite Cantre, Meena Bazar{" "}
                    <br /> Building Floor-6, Road-9A, Dhanmondi, Dhaka
                </h2>
                <h2 className="font-rb ">
                    (Farmgate Branch) Room - G18 (Ground Floor), RH Home Centre{" "}
                    <br />
                    (beside Anada Cinema Hall) Farmgate, Dhaka
                </h2>
                <h2 className="font-rb mt-4">
                    (Mirpur Branch) Lift 5, Prince Bazar building, Mirpur 12 bus stand, Mirpur
                    12
                </h2>
            </div>
        </div>
    );
};

export default Address;
