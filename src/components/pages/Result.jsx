import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoTimeOutline } from "react-icons/io5";
import { GiNotebook } from "react-icons/gi";
import { PiClockClockwiseFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { examResult } from "../../../features/resultSlice";
import { pdfDownload } from "../../../features/downloadPdfSlice";

const Result = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    let show = useSelector((state) => state.counter.value);
    let userToken = useSelector((state) => state.tokened.Token);
    let [modalresult, setModalResult] = useState([]);
    let [loading, setloading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    "http://127.0.0.1:8000/api/result/list",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${userToken}`,
                            Accept: "application/json",
                        },
                    }
                );

                const responseData = await response.json();
                setModalResult(responseData.data);
                setloading(false);
            } catch (error) {
                throw error;
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return <h1 className="mt-16 text-2xl">Loading......</h1>;
    }

    let hendleView = async (item) => {
        dispatch(pdfDownload(item.id));
        localStorage.setItem("pdf", JSON.stringify(item.id));
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/result/${item.id}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                        Accept: "application/json",
                    },
                }
            );

            const responseData = await response.json();
            dispatch(examResult(responseData));
            localStorage.setItem("result", JSON.stringify(responseData));
        } catch (error) {
            throw error;
        }
        navigate("/user/show");
    };
    return (
        <section className="flex mt-16 p-4 w-full">
            <div
                className={` ${
                    show ? "xl:w-[70%" : "xl:w-[92%"
                } flex lg:max-xl:w-full gap-x-3 gap-y-3 flex-wrap`}
            >
                {modalresult.map((item, index) => (
                    <div
                        key={index}
                        className="smalldevice:max-sm:w-full sm:max-lg:w-[49%] lg:max-xl:w-[49.3%] "
                    >
                        <div className="border p-5 rounded-2xl shadow-md">
                            <h2 className="font-rb text-2xl font-semibold text-tbcolor mt-2 mb-4">
                                {item.model_name}
                            </h2>
                            <div className="font-rb text-sm text-[#6D6D6D] xl:w-[320px]">
                                <div className="flex justify-between my-5 ">
                                    <h4 className="flex items-center gap-x-2 font-rb text-[#3D3D3D]">
                                        <span className=" text-2xl text-[#705BCC]">
                                            <IoTimeOutline />
                                        </span>
                                        <span className="px-4 text-xs py-1 rounded-lg bg-[#1987545e]">
                                            {item.date}
                                        </span>
                                    </h4>
                                </div>
                                <div className="flex justify-between my-5 ">
                                    <h4 className="flex items-center gap-x-2 font-rb text-[#3D3D3D]">
                                        <span className=" text-2xl text-[#705BCC]">
                                            <GiNotebook />
                                        </span>
                                        {item.questions} Question
                                    </h4>
                                    <h4 className="flex items-center gap-x-2 font-rb text-[#3D3D3D]">
                                        <span className=" text-2xl text-[#32B548]">
                                            <PiClockClockwiseFill />
                                        </span>
                                        Duration {item.exam_time} m
                                    </h4>
                                </div>
                            </div>
                            {item.status == false ? (
                                <button className="group font-rb font-bold text-lg text-center border py-[10px] w-full text-white rounded-lg bg-[#6C757D]  ">
                                    Processing..
                                </button>
                            ) : (
                                <button
                                    onClick={() => hendleView(item)}
                                    className="group font-rb font-bold text-lg text-center border py-[10px] w-full text-white rounded-lg bg-[#198754] "
                                >
                                    View
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Result;
