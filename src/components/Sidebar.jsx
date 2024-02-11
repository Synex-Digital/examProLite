import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../features/userSlice";
import { userToken } from "../../features/tokenSlice";
import { questionid } from "../../features/questionSlice";
import { navvalue } from "../../features/navSlice";
import { userExamQuestion } from "../../features/examQuestionSlice";
import { modelTest } from "../../features/modelTestSlice";
import { userExamid } from "../../features/examIdSlice";
import { TfiWrite } from "react-icons/tfi";
import { FaRegAddressCard } from "react-icons/fa6";
import Image from "./layout/Image";
import logo from "../assets/logo.png";
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

const Sidebar = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    let show = useSelector((state) => state.counter.value);
    let usertoken = useSelector((state) => state.tokened.Token);

    let hendleLogout = async () => {
        try {
            const response = await fetch(
                "https://laraveladmin.icaniqbd.com/api/logout",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${usertoken}`,
                        Accept: "application/json",
                    },
                }
            );

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
        <aside>
            {show ? (
                <div className="xl:w-[15%] md:w-[25%] smalldevice:max-xl:fixed sm:max-md:w-[30%] smalldevice:w-1/2 xl:pt-20 pt-6 px-2 shadow-xl h-[100vh] fixed z-50 bg-[#162655]">
                    <div className="h-[80%]">
                        <div className="mx-2 my-6 pb-4 flex justify-center items-center">
                            <Image className="w-[90px]" imgsrc={logo} />
                        </div>
                        <div className="flex flex-col gap-4">
                            <Link
                                to="dashboard"
                                className="flex items-center p-2 rounded-md bg-[#0C0C0C] hover:bg-black"
                            >
                                <RxDashboard className="font-base text-xl text-white mr-2" />
                                <p className=" font-rb font-base text-base text-white">
                                    Dashboard
                                </p>
                            </Link>
                            <Link
                                to="iqtest"
                                className="flex items-center p-2 rounded-md bg-[#0C0C0C] hover:bg-black"
                            >
                                <TfiWrite className="text-xl font-base text-white mr-2" />
                                <p className=" font-rb font-base text-base text-white">
                                    Test
                                </p>
                            </Link>
                            <Link
                                to="result"
                                className="flex items-center p-2 rounded-md bg-[#0C0C0C] hover:bg-black"
                            >
                                <MdOutlineStickyNote2 className="text-2xl font-base text-white mr-2" />
                                <p className=" font-rb font-base text-base text-white">
                                    Result
                                </p>
                            </Link>
                            <Link
                                to="address"
                                className="flex items-center p-2 rounded-md bg-[#0C0C0C] hover:bg-black"
                            >
                                <FaRegAddressCard className="text-2xl font-base text-white mr-2" />
                                <p className=" font-rb font-base text-base text-white">
                                    Contact Us
                                </p>
                            </Link>
                        </div>
                    </div>
                    <div className="h-[20%]">
                        <div className="w-full flex justify-center py-2">
                            <Link
                                onClick={hendleLogout}
                                className="flex items-center"
                            >
                                <RiLogoutCircleRLine className="text-2xl mr-2 font-medium text-white" />
                                <p className=" font-rb font-medium text-lg text-white">
                                    Log out
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="xl:w-[4%] bg-[#162655] fixed z-50 pt-20 smalldevice:max-xl:hidden px-2 shadow-xl h-[100vh] top-0 bottom-0 right-0 left-0">
                    <div className="h-[90%]">
                        <Link
                            to="dashboard"
                            className="flex items-center pt-5 gap-x-2"
                        >
                            <RxDashboard className="  font-medium text-3xl text-white" />
                        </Link>
                        <Link
                            to="iqtest"
                            className="flex items-center gap-x-2 mt-6"
                        >
                            <TfiWrite className="text-2xl font-medium text-white" />
                        </Link>
                        <Link
                            to="result"
                            className="flex items-center gap-x-2 mt-6"
                        >
                            <MdOutlineStickyNote2 className="text-3xl font-medium text-white" />
                        </Link>
                        <Link
                            to="address"
                            className="flex items-center gap-x-2 mt-6"
                        >
                            <FaRegAddressCard className="text-[26px] font-medium text-white" />
                        </Link>
                    </div>
                    <div className="h-[10%]">
                        <Link onClick={hendleLogout}>
                            <RiLogoutCircleRLine className="text-3xl font-medium text-white" />
                        </Link>
                    </div>
                </div>
            )}
        </aside>
    );
};

export default Sidebar;
