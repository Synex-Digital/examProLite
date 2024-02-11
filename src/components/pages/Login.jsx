import React, { useState, useEffect } from "react";
// import Image from "../layout/Image";
// import icanIQ from "../../assets/logo.svg";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { userData } from "../../../features/userSlice";
// import { userToken } from "../../../features/tokenSlice";
import { MdErrorOutline } from "react-icons/md";

let initialValue = {
    email: "",
    password: "",
    error: "",
};

const Login = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    let [show, setShow] = useState(false);
    let [values, setValues] = useState(initialValue);

    let handlevalues = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
            error: "",
        });
    };

  return (
    <div className="flex justify-center items-center h-[100vh]">
    <div className="md:shadow-2xl shadow p-8 rounded-xl smalldevice:max-sm:w-[90%]">
        <div className="flex justify-center mb-5 ">
            {/* <Image
                imgsrc={icanIQ}
                className="bg-black w-24 h-24 rounded-full"
            /> */}
        </div>
        <div className="sm:w-[430px]">
            <h2 className=" text-center font-rb font-bold sm:max-md:text-xl md:text-xl lg:text-2xl smalldevice:max-sm:text-xl mb-2 md:mb-5 text-tbcolor ">
                Sign in
            </h2>
            <div className="rounded-lg">
                <h3 className=" font-rb md:font-semibold font-medium md:text-lg text-tbcolor smalldevice:max-sm:mt-3">
                    Email
                </h3>
                <input
                    type="email"
                    className="p-3 mt-2 mb-2 md:mt-4 w-full border rounded border-bcolor border-solid"
                    placeholder="your email here"
                    onChange={handlevalues}
                    name="email"
                />
                {values.error &&
                    values.error?.includes("Enter_your_email") && (
                        <p className="font-rb bg-[#FDEDED] text-[#692B20] p-2 w-full my-2 md:my-4 flex gap-x-2 items-center">
                            <MdErrorOutline />
                            Please Enter your Email
                        </p>
                    )}
                <h3 className="font-rb md:font-semibold font-medium md:text-lg text-tbcolor smalldevice:max-sm:mt-3">
                    Password
                </h3>

                <div className=" relative mb-2">
                    <input
                        type={show ? "text" : "password"}
                        className="p-3 w-full mt-2 md:mt-4 border rounded border-bcolor border-solid"
                        placeholder="password"
                        name="password"
                        onChange={handlevalues}
                    />
                    {values.error &&
                        values.error?.includes(
                            "Enter_your_password"
                        ) && (
                            <p className="font-rb bg-[#FDEDED] text-[#692B20] p-2 w-full my-2 md:my-4 flex gap-x-2 items-center">
                                <MdErrorOutline />
                                Please Enter your Password
                            </p>
                        )}
                    {show ? (
                        <IoEye
                            className=" cursor-pointer absolute top-7 md:top-[34px] right-4 text-[#adadad]"
                            onClick={() => setShow(!show)}
                        />
                    ) : (
                        <IoEyeOff
                            className=" cursor-pointer absolute top-7 md:top-[34px] right-4 text-[#adadad]"
                            onClick={() => setShow(!show)}
                        />
                    )}
                </div>
                <Link className="smalldevice:max-sm:text-white font-rb text-tgcolor font-medium ">
                    Forgot Password?
                </Link>
                <button
                    className=" bg-tgcolor w-full p-1 md:p-3 mt-2 text-white md:mt-5 text-xl font-medium md:font-bold rounded smalldevice:max-sm:my-5 smalldevice:max-sm:p-3"
                    // onClick={handlelogin}
                >
                    Log in
                </button>
            </div>
        </div>
    </div>
</div>
  );
};

export default Login;

