import React, { useState, useEffect } from "react";
import Image from "../layout/Image";
import { useSelector } from "react-redux";
import logo from "../../assets/logo_hd.webp";
import profile from "../../assets/profile.png";
import Slider from "react-slick";
import SampleNextArrow from "../layout/SampleNextArrow";
import SamplePrevArrow from "../layout/SamplePrevArrow";
import SkeletonDesignDashboard from "../layout/SkeletonDesignDashboard";

const UserDashboard = (props) => {
    let loginUser = useSelector((state) => state.loggedUser.loginUser);
    let userToken = useSelector((state) => state.tokened.Token);
    let [performance, setPerformance] = useState("");
    let [banner, setBanner] = useState([]);
    let [activeDot, setActiveDot] = useState(0);
    let [loading, setloading] = useState(true);

    const settings = {
        dots: true,
        infinite: true,
        fade: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (prev, next) => {
            setActiveDot(next);
        },

        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        appendDots: (dots) => (
            <div
                style={{
                    paddingBottom: "10px",
                }}
            >
                <ul
                    style={{
                        marginBottom: "15px",
                        display: "flex",
                        justifyContent: "center",
                        columnGap: "20px",
                    }}
                >
                    {" "}
                    {dots}{" "}
                </ul>
            </div>
        ),
        customPaging: (i) => (
            <div
                style={
                    i === activeDot
                        ? {
                              width: "40px",
                              border: "2px white solid",
                              borderRadius: "10px",
                              padding: "2px",
                              background: "#fff",
                          }
                        : {
                              width: "40px",
                              border: "2px white solid",
                              borderRadius: "10px",
                              padding: "2px",
                          }
                }
            ></div>
        ),
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    "http://127.0.0.1:8000/api/performance",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${userToken}`,
                            Accept: "application/json",
                        },
                    }
                );

                const responseData = await response.json();
                setPerformance(responseData.data);
                setBanner(responseData.banner);
                setloading(false);
            } catch (error) {
                throw error;
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return <SkeletonDesignDashboard />;
    }

    return (
        <div className="flex flex-col md:flex-row gap-4 mt-24 px-2 w-full container mx-auto">
            <div className="xl:w-[72%]">
                <div className=" w-full flex justify-between text-center">
                    <div className="rounded-lg bg-[#EFF5F5] px-8 py-5 shadow-sm flex flex-col relative overflow-hidden w-[32%]">
                        <div className=" bg-[#19875426] w-20 h-20 rounded-full absolute -bottom-6 -left-6"></div>
                        <div className=" bg-[#19875433] w-10 h-10 rounded-full absolute -bottom-1 -left-1"></div>
                        <div className="flex gap-x-3 items-center justify-center">
                            <div className="w-[18px] h-[18px] rounded-full bg-[#6D6D6D]"></div>
                            <p className="font-rb text-2xl">Total Tests</p>
                        </div>
                        <span className="font-rb text-black font-semibold mt-5 text-2xl">
                            {performance == null ? 0 : performance.total_test}
                        </span>
                    </div>

                    <div className="rounded-lg bg-[#EFF5F5]  px-8 py-5 shadow-sm flex flex-col relative overflow-hidden w-[32%]">
                        <div className="flex gap-x-3 items-center justify-center">
                            <div className=" bg-[#19875426] w-20 h-20 rounded-full absolute -bottom-6 -left-6"></div>
                            <div className=" bg-[#19875433] w-10 h-10 rounded-full absolute -bottom-1 -left-1"></div>
                            <div className="w-[18px] h-[18px] rounded-full bg-[#32B548]"></div>
                            <p className="font-rb text-2xl">Average Score</p>
                        </div>
                        <span className="font-rb text-black font-semibold mt-5 text-2xl">
                            {performance == null ? 0 : performance.av_score}
                        </span>
                    </div>
                    <div className="rounded-lg  bg-[#EFF5F5]  px-8 py-5 shadow-sm flex flex-col relative overflow-hidden w-[32%]">
                        <div className=" bg-[#19875426] w-20 h-20 rounded-full absolute -bottom-6 -left-6"></div>
                        <div className=" bg-[#19875433] w-10 h-10 rounded-full absolute -bottom-1 -left-1"></div>
                        <div className="flex gap-x-3 items-center justify-center">
                            <div className="w-[18px] h-[18px] rounded-full bg-[#DB2828]"></div>
                            <p className="font-rb text-2xl">Average Time</p>
                        </div>
                        <span className="font-rb text-black font-semibold mt-5 text-2xl">
                            {performance == null ? 0 : performance.av_time}
                        </span>
                    </div>
                </div>

                <div className="smalldevice:max-xl:hidden mt-5 w-full">
                    <Slider {...settings}>
                        {banner &&
                            banner.map((item, index) => (
                                <div
                                    key={index}
                                    className="!flex justify-center items-center"
                                >
                                    <Image
                                        className="rounded-lg h-[315px]"
                                        imgsrc={item.banner}
                                    />
                                </div>
                            ))}
                    </Slider>
                </div>
            </div>

            <div className="flex xl:w-[28%] flex-col gap-4">
                <div className=" bg-[#EFF5F5] h-fit p-5 rounded-2xl text-black text-center">
                    <Image
                        className="w-24 h-24 rounded-full mx-auto"
                        imgsrc={
                            loginUser && loginUser.profile
                                ? loginUser.profile
                                : profile
                        }
                    />
                    <h2 className=" font-rb font-bold text-2xl mt-5 text-gray-800">
                        Welcome {loginUser.name}
                    </h2>
                    <p className=" font-rb font-bold mt-2 text-gray-800">
                        ID: {loginUser.student_id}
                    </p>
                    <p className=" font-rb font-bold my-2 text-gray-800">
                        Email: {loginUser.email}
                    </p>
                    <p className=" font-rb font-bold  mb-7 text-gray-800">
                        Number: {loginUser.number}
                    </p>
                    <p className="bg-[#ffcc00] px-2 py-2 rounded font-rb">
                        Validity {loginUser.date}
                    </p>
                </div>

                <div className="flex justify-center bg-[#EFF5F5] p-5 rounded-2xl">
                    <img src={logo} className="w-[55%]" />
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
