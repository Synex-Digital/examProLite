import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import Image from "./layout/Image";
import logo from "../assets/logoblack.png";
import profileimg from "../assets/profile.png";
import { useDispatch, useSelector } from "react-redux";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { navvalue } from "../../features/navSlice";

const Navbar = () => {
    let dispatch = useDispatch();
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
    return (
        <nav className="fixed top-0 right-0 left-0 bottom-0 flex w-full  z-[51] h-16 justify-between  bg-[#162655] shadow-md">
            <div className="flex lg:w-[15%] items-center gap-x-3">
                {show ? (
                    <>
                        <FaBars
                            className="ml-4 cursor-pointer text-lg smalldevice:max-xl:hidden text-white"
                            onClick={() => setShow(!show)}
                        />
                        <ImCross
                            onClick={() => setShow(!show)}
                            className="ml-4 text-white cursor-pointer font-bold xl:hidden"
                        />
                    </>
                ) : (
                    <FaBars
                        className="ml-3 cursor-pointer text-lg text-white"
                        onClick={() => setShow(!show)}
                    />
                )}
            </div>
            <div className="flex justify-center items-center w-[70%]">
                <h1 className="text-white text-4xl font-rb font-bold">
                    iCAN-IQ
                </h1>
            </div>

            <div className="flex w-[15%] items-center gap-x-3 relative justify-end mr-6">
                <MdOutlineNotificationsActive className=" font-semibold text-white text-xl" />
                <Image className=" w-12 h-12 rounded-full" imgsrc={loginUser && loginUser.profile ? loginUser.profile : profileimg} />
            </div>
        </nav>
    );
};

export default Navbar;
