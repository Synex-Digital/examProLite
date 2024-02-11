import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { useSelector } from "react-redux";

const Rotlayout = () => {
    let navigate = useNavigate();
    let show = useSelector((state) => state.counter.value);
    let loginUser = useSelector((state) => state.loggedUser.loginUser);

    useEffect(() => {
        if (loginUser == null) {
            navigate("/");
        }
    }, []);
    return (
        <>
            <Navbar />
            <div className="xl:flex">
                <div className={`${show ? "xl:w-[15%]" : "xl:w-[4%]"}`}>
                    <Sidebar />
                </div>
                <div className={`${show ? "xl:w-[85%]" : "xl:w-[94%]"}`}>
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default Rotlayout;
