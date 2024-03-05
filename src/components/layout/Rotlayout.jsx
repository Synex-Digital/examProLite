import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { useSelector } from "react-redux";
import Footar from "./Footar";

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
        <section
            className="flex flex-col justify-between !h-screen"
            style={{ height: "100vh" }}
        >
            <Navbar />
            <Outlet />
            <Footar />
        </section>
    );
};

export default Rotlayout;
