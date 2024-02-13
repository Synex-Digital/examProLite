import React, { useEffect, useState, Fragment } from "react";
import Image from "./layout/Image";
import profileimg from "../assets/profile.png";
import logo from "../assets/logo.png";
import { MdOutlineNotificationsActive } from "react-icons/md";
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

    let [show, setShow] = useState(true);
    useEffect(() => {
        function scrollWidth() {
            if (window.innerWidth < 1280) {
                setShow(false);
            } else {
                setShow(true);
            }
        }
        scrollWidth();
        window.addEventListener("resize", scrollWidth);
    }, []);

    useEffect(() => {
        dispatch(navvalue(show));
    }, [show]);

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
        <nav className="fixed top-0 font-rb z-[51] h-[80px] w-full bg-[#162655] shadow-md">
            <div className="container mx-auto flex py-2 pl-5 justify-between w-full">
                <div className="w-[20%]">
                    <Image className=" w-[80px]" imgsrc={logo} />
                </div>
                <div className="flex items-center gap-x-7 relative justify-end mr-6">
                    <ul className="flex gap-x-10 font-medium text-white">
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
                    <MdOutlineNotificationsActive className=" font-semibold text-white text-xl" />

                    <Menu as="div" className="relative ml-3">
                        <div>
                            <Menu.Button>
                                <Image
                                    className=" w-12 h-12 rounded-full"
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
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <Menu.Item>
                                    {({ active }) => (
                                        <Link
                                            to="result"
                                            className={classNames(
                                                active ? "bg-gray-100" : "",
                                                "block px-4 py-2 text-sm text-gray-700"
                                            )}
                                        >
                                            Your Profile
                                        </Link>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={classNames(
                                                active ? "bg-gray-100" : "",
                                                "block px-4 py-2 text-sm text-gray-700"
                                            )}
                                        >
                                            Settings
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <Link
                                            onClick={hendleLogout}
                                            className={classNames(
                                                active ? "bg-gray-100" : "",
                                                "block px-4 py-2 text-sm text-gray-700"
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
            </div>
        </nav>
    );
};

export default Navbar;
