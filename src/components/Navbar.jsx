import React, { useEffect, useState, Fragment } from "react";
import Image from "./layout/Image";
import profileimg from "../assets/profile.png";
import logo from "../assets/logo.png";
import { navvalue } from "../../features/navSlice";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../features/userSlice";
import { userToken } from "../../features/tokenSlice";
import { questionid } from "../../features/questionSlice";
import { userExamQuestion } from "../../features/examQuestionSlice";
import { modelTest } from "../../features/modelTestSlice";
import { userExamid } from "../../features/examIdSlice";
import { toast } from "react-toastify";
import { FaBars } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";

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

const Navbar = () => {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let usertoken = useSelector((state) => state.tokened.Token);
    let loginUser = useSelector((state) => state.loggedUser.loginUser);
    let [navbar, setNavbar] = useState(false);

    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }

    let hendleLogout = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/logout", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${usertoken}`,
                    Accept: "application/json",
                },
            });

            const responseData = await response.json();
            notify(responseData.message);
        } catch (error) {
            throw error;
        }
        dispatch(userData(null));
        dispatch(userExamQuestion(null));
        dispatch(userToken(null));
        dispatch(navvalue(null));
        dispatch(questionid(null));
        dispatch(modelTest(null));
        dispatch(userExamid(null));
        localStorage.clear();
        navigate("/");
    };

    return (
        <nav className="fixed top-0 font-rb z-[51] w-full bg-[#EFF5F5] shadow-md">
            <div className="container mx-auto flex py-2 md:pl-5 justify-between w-full">
                <div className="w-[20%]">
                    <Image className="md:w-[80px] w-[60px]" imgsrc={logo} />
                </div>
                <div className="flex justify-center items-center">
                    <FaBars
                        className="cursor-pointer lg:hidden text-2xl "
                        onClick={() => setNavbar(!navbar)}
                    />
                </div>
                {navbar ? (
                    <div className=" bg-[#EFF5F5] w-full p-5 left-0 top-[60px] md:max-lg:top-[68px] absolute">
                        <ul className=" font-medium flex flex-col gap-y-5 text-black">
                            <li>
                                <Link to="dashboard" onClick={() => setNavbar(!navbar)}>Dashboard</Link>
                            </li>
                            <li>
                                <Link to="iqtest" onClick={() => setNavbar(!navbar)}>Test</Link>
                            </li>
                            <li>
                                <Link to="result" onClick={() => setNavbar(!navbar)}>Result</Link>
                            </li>
                            <li>
                                <Link to="address" onClick={() => setNavbar(!navbar)}>Contact Us</Link>
                            </li>
                            <li>
                                <Link
                                    onClick={hendleLogout}
                                    to="address"
                                    className="flex items-center gap-3"
                                >
                                    logout <RiLogoutCircleLine />
                                </Link>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <div className="lg:flex hidden items-center gap-x-7 relative justify-end mr-6">
                        <ul className="flex gap-x-10 font-medium text-black">
                            <li>
                                <Link to="dashboard">Dashboard</Link>
                            </li>
                            <li>
                                <Link to="iqtest">Test</Link>
                            </li>
                            <li>
                                <Link to="result">Result</Link>
                            </li>
                            <li>
                                <Link to="address">Contact Us</Link>
                            </li>
                        </ul>

                        <Menu as="div" className="relative ml-3">
                            <div className="flex">
                                <Menu.Button>
                                    <Image
                                        className=" w-10 h-10 rounded-full"
                                        imgsrc={
                                            loginUser && loginUser.profile
                                                ? loginUser.profile
                                                : profileimg
                                        }
                                    />
                                </Menu.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">
                                    <div className=" bg-[#19875426] w-28 h-28 rounded-full absolute -top-6 -right-6"></div>
                                    <div className=" bg-[#19875433] w-16 h-16 rounded-full absolute -top-1 -right-1"></div>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link
                                                onClick={hendleLogout}
                                                className={classNames(
                                                    active ? "bg-gray-100" : "",
                                                    "block text-center font-semibold text-xl px-4 py-2 text-gray-700"
                                                )}
                                            >
                                                Sign out
                                            </Link>
                                        )}
                                    </Menu.Item>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
