import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { BsCalendar2Check } from "react-icons/bs";
import { GiNotebook } from "react-icons/gi";
import { PiClockClockwiseFill } from "react-icons/pi";
import { toast } from "react-toastify";
import { userExamQuestion } from "../../../features/examQuestionSlice";
import { modelTest } from "../../../features/modelTestSlice";
import { userExamid } from "../../../features/examIdSlice";
import SkeletonDesign from "../layout/SkeletonDesign";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-45%",
        transform: "translate(-50%, -50%)",
        padding: "0px",
    },
    overlay: {
        backgroundColor: "rgba(12, 12, 12, 0.85)",
    },
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

const IqTest = (props) => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    Modal.setAppElement("#root");
    let show = useSelector((state) => state.counter.value);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalIsOpen_2, setIsOpen_2] = useState(false);
    const [models, setModels] = useState([]);
    const [modelsId, setModelsId] = useState("");
    const [examId, setExamId] = useState("");
    const [modeltextvaluse, setModelTextValuse] = useState("");
    let [loading, setloading] = useState(true);
    let userToken = useSelector((state) => state.tokened.Token);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    "https://admin.icaniqbd.synexdigital.com/api/model/test",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${userToken}`,
                            Accept: "application/json",
                        },
                    }
                );

                const responseData = await response.json();
                setModels(responseData.modelTest);
                setloading(false);
            } catch (error) {
                throw error;
            }
        }
        fetchData();
    }, [modalIsOpen]);

    if (loading) {
        return (
            <div className="flex smalldevice:max-sm:flex-col mt-24 gap-4 flex-wrap container mx-auto px-2">
                <div className="lg:w-[32%] sm:w-[48%]">
                    <SkeletonDesign Boxwidth={"32%"} />
                </div>
                <div className="lg:w-[32%] sm:w-[48%]">
                    <SkeletonDesign Boxwidth={"32%"} />
                </div>
                <div className="lg:w-[32%] sm:w-[48%]">
                    <SkeletonDesign Boxwidth={"32%"} />
                </div>
                <div className="lg:w-[32%] sm:w-[48%]">
                    <SkeletonDesign Boxwidth={"32%"} />
                </div>
                <div className="lg:w-[32%] sm:w-[48%]">
                    <SkeletonDesign Boxwidth={"32%"} />
                </div>
                <div className="lg:w-[32%] sm:w-[48%]">
                    <SkeletonDesign Boxwidth={"32%"} />
                </div>
            </div>
        );
    }

    let openModal = (item) => {
        setIsOpen(true);
        setModelsId(item.id);
    };

    let closeModal = () => {
        setIsOpen(false);
    };

    let handlstart = async () => {
        try {
            const response = await fetch(
                `https://admin.icaniqbd.synexdigital.com/api/model/request/${modelsId}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                        Accept: "application/json",
                    },
                }
            );

            const responseData = await response.json();
            notify(responseData.message);
        } catch (error) {
            throw error;
        }
        setIsOpen(false);
    };

    let handleexam = (item) => {
        setExamId(item.id);
        setIsOpen_2(true);
        setModelTextValuse(item);
    };

    let handleexamstart = async () => {
        dispatch(modelTest(modeltextvaluse));
        localStorage.setItem("modeltest", JSON.stringify(modeltextvaluse));
        try {
            let data = new FormData();
            data.append("model_id", examId);

            const response = await fetch(
                "https://admin.icaniqbd.synexdigital.com/api/attempt",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                        Accept: "application/json",
                    },
                    body: data,
                }
            );

            const responseData = await response.json();
            dispatch(userExamQuestion(responseData.data));
            localStorage.setItem("question", JSON.stringify(responseData.data));
        } catch (error) {
            throw error;
        }
        dispatch(userExamid(examId));
        localStorage.setItem("examid", JSON.stringify(examId));
        navigate("/user/exam");
    };

    return (
        <>
            <section className="mt-24 w-full">
                <div className="flex smalldevice:max-sm:flex-col flex-wrap gap-4 container px-2 mx-auto overflow-hidden">
                    {models.map((item, index) => (
                        <div
                            key={index}
                            className="lg:w-[32%] sm:w-[48%] bg-[#EFF5F5] relative overflow-hidden rounded-2xl"
                        >
                            <div className=" bg-[#19875426] w-28 h-28 rounded-full absolute -top-6 -right-6"></div>
                            <div className=" bg-[#19875433] w-16 h-16 rounded-full absolute -top-1 -right-1"></div>
                            <div className="p-5 ">
                                <time className="flex items-center gap-x-1 justify-end font-rb text-sm text-[#6D6D6D]">
                                    <span>
                                        <BsCalendar2Check />
                                    </span>
                                    Updated by 1day ago
                                </time>
                                <h2 className="font-rb text-2xl font-semibold text-tbcolor mt-2 mb-4">
                                    {item.title}
                                </h2>
                                <p className="font-rb text-sm text-[#6D6D6D] xl:w-[320px]">
                                    {item.note}
                                </p>
                                <div className="flex justify-between mt-5 mb-8">
                                    <h4 className="flex items-center gap-x-2 font-rb text-[#3D3D3D]">
                                        <span className=" text-2xl text-[#705BCC]">
                                            <GiNotebook />
                                        </span>
                                        {item.total_question} Question
                                    </h4>
                                    <h4 className="flex items-center gap-x-2 font-rb text-[#3D3D3D]">
                                        <span className=" text-2xl text-[#32B548]">
                                            <PiClockClockwiseFill />
                                        </span>
                                        Duration {item.exam_time} m
                                    </h4>
                                </div>
                                {item.approval == 1 ? (
                                    <button
                                        onClick={() => openModal(item)}
                                        className="group font-rb font-bold text-lg text-center border py-[10px] w-full text-[#3888F9] rounded-lg border-[#3888F9] transition duration-300 ease-in-out hover:text-white hover:bg-[#3888F9]"
                                    >
                                        Request
                                    </button>
                                ) : item.approval == 2 ? (
                                    <button
                                        className="group font-rb font-bold text-lg text-center border py-[10px] w-full text-[#6C757D] rounded-lg border-[#6C757D] "
                                        disabled
                                    >
                                        Pending
                                    </button>
                                ) : item.approval == 3 ? (
                                    <button
                                        onClick={() => handleexam(item)}
                                        className="group font-rb font-bold text-lg text-center border py-[10px] w-full rounded-lg border-[#198754] transition duration-300 ease-in-out text-white bg-[#198754]"
                                    >
                                        Start
                                    </button>
                                ) : item.approval == 5 ? (
                                    <button
                                        onClick={() => openModal(item)}
                                        className="group font-rb font-bold text-lg text-center border py-[10px] w-full text-[#3888F9] rounded-lg border-[#3888F9] transition duration-300 ease-in-out hover:text-white hover:bg-[#3888F9]"
                                    >
                                        Request
                                    </button>
                                ) : (
                                    <button
                                        disabled
                                        className="group font-rb font-bold text-lg text-center border py-[10px] w-full rounded-lg border-[#198754] transition duration-300 ease-in-out text-white bg-[#198754]"
                                    >
                                        Completed
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <div>
                <Modal
                    appElement={document.getElementById("root")}
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div className="overflow-hidden w-full relative bg-[#d5fafa] xl:p-5">
                        <div className=" bg-[#19875426] w-28 h-28 rounded-full absolute -top-6 -right-6"></div>
                        <div className=" bg-[#19875433] w-16 h-16 rounded-full absolute -top-1 -right-1"></div>
                        <p className="sm:w-[456px] font-rb text-lg text-[#454545] mb-10">
                            Send a request to Admin to start the exam
                        </p>
                        <div className="flex justify-between">
                            <button
                                onClick={closeModal}
                                className="w-[48%] border text-[#198754] transition duration-300 ease-in-out border-[#198754] py-2 px-6 rounded hover:bg-[#198754] hover:text-white text-lg font-rb font-semibold"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handlstart}
                                className="w-[48%] text-[#198754] border rounded border-[#198754] transition duration-300 ease-in-out py-2 px-6 hover:bg-[#198754] hover:text-white text-lg font-rb font-semibold"
                            >
                                Start
                            </button>
                        </div>
                    </div>
                </Modal>

                <Modal
                    appElement={document.getElementById("root")}
                    isOpen={modalIsOpen_2}
                    onRequestClose={() => setIsOpen_2(false)}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div className="overflow-hidden w-full relative bg-[#d5fafa] xl:p-5">
                        <div className=" bg-[#19875426] w-28 h-28 rounded-full absolute -top-6 -right-6"></div>
                        <div className=" bg-[#19875433] w-16 h-16 rounded-full absolute -top-1 -right-1"></div>
                        <p className="sm:w-[456px] font-rb text-lg text-[#454545] mb-10">
                            Starting the quiz will start the timer. Are you sure
                            you want to start the quiz?
                        </p>
                        <div className="flex justify-between">
                            <button
                                onClick={() => setIsOpen_2(false)}
                                className="w-[48%] border text-[#198754] transition duration-300 ease-in-out border-[#198754] py-2 px-6 rounded hover:bg-[#198754] hover:text-white text-lg font-rb font-semibold"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleexamstart}
                                className="w-[48%] text-[#198754] border rounded border-[#198754] transition duration-300 ease-in-out py-2 px-6 hover:bg-[#198754] hover:text-white text-lg font-rb font-semibold"
                            >
                                Start
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    );
};

export default IqTest;
