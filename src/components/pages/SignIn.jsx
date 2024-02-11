import React, { useState, useEffect } from "react";
import Image from "../layout/Image";
import icanIQ from "../../assets/logo.svg";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../../features/userSlice";
import { userToken } from "../../../features/tokenSlice";
import { MdErrorOutline } from "react-icons/md";
import { toast } from "react-toastify";

let initialValue = {
    email: "",
    password: "",
    error: "",
};

const notify = (mas) =>
    toast.success(mas, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
const notifytwo = (mas) =>
    toast.warn(mas, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });

const Signin = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    let [show, setShow] = useState(false);
    let [values, setValues] = useState(initialValue);
    let loginUser = useSelector((state) => state.loggedUser.loginUser);

    useEffect(() => {
        if (loginUser != null) {
            navigate("/user/dashboard");
        }
    }, []);

    let handlevalues = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
            error: "",
        });
    };

    let handlelogin = async () => {
        let { email, password } = values;

        if (!email) {
            setValues({
                ...values,
                error: "Enter_your_email",
            });
            return;
        }
        if (!password) {
            setValues({
                ...values,
                error: "Enter_your_password",
            });
            return;
        }

        try {
            let data = new FormData();
            data.append("email", values.email);
            data.append("password", values.password);

            const response = await fetch(
                "https://laraveladmin.icaniqbd.com/api/login",
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                    },
                    body: data,
                }
            );

            const responseData = await response.json();
            notifytwo(responseData.user);

            if (responseData.status == 1) {
                dispatch(userData(responseData.user));
                dispatch(userToken(responseData.token));
                localStorage.setItem(
                    "token",
                    JSON.stringify(responseData.token)
                );
                localStorage.setItem("user", JSON.stringify(responseData.user));
                notify("Login Successful");
                navigate("/user/dashboard");
            }
        } catch (error) {
            throw error;
        }
    };

    return (
        <div className="flex justify-center items-center h-[100vh]">
            <div className="md:shadow-2xl shadow p-8 rounded-xl smalldevice:max-sm:w-[90%]">
                <div className="flex justify-center mb-5 ">
                    <Image
                        imgsrc={icanIQ}
                        className="bg-black w-24 h-24 rounded-full"
                    />
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
                            onClick={handlelogin}
                        >
                            Log in
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;
