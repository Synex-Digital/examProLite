import React, { useState } from "react";
import { useTimer } from "react-timer-hook";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import Image from "./Image";
import img from "../../assets/img1.png";
import { useDispatch, useSelector } from "react-redux";
import { userExamQuestion } from "../../../features/examQuestionSlice";
import { questionid } from "../../../features/questionSlice";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-45%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#292055",
    },
    overlay: {
        backgroundColor: "rgba(12, 12, 12, 0.85)",
    },
};

const ExamTime = ({ expiryTimestamp }) => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    Modal.setAppElement("#root");
    const [modalIsOpen, setIsOpen] = useState(false);
    let modeltestvaluse = useSelector((state) => state.userModelTest.values);
    let userToken = useSelector((state) => state.tokened.Token);

    let closeModal = () => {
        setIsOpen(false);
        dispatch(userExamQuestion(null));
        localStorage.removeItem("question");
        navigate("/user/iqtest");
    };
    let handleexamstart = () => {
        dispatch(userExamQuestion(null));
        localStorage.removeItem("question");
        navigate("/user/result");
    };
    const { hours, seconds, minutes, isRunning } = useTimer({
        expiryTimestamp,
        onExpire: async () => {
            setIsOpen(true);
            try {
                let data = new FormData();
                data.append("model_id", modeltestvaluse.id);

                const response = await fetch(
                    "http://127.0.0.1:8000/api/answer/submit/done",
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
            } catch (error) {
                throw error;
            }
            dispatch(questionid(1));
            localStorage.setItem("questionid", JSON.stringify(1));
        },
    });

    return (
        <>
            <div style={{ textAlign: "center" }}>
                <div className="flex gap-x-5 items-center">
                    <div className=" font-semibold text-2xl">
                        <span>{hours}</span>:<span>{minutes}</span>:
                        <span>{seconds}</span>
                    </div>
                    <p className=" font-medium text-lg text-green-500">
                        {isRunning ? (
                            "Running"
                        ) : (
                            <span className="text-red-500">Not running</span>
                        )}
                    </p>
                </div>
            </div>
            <div>
                <Modal
                    isOpen={modalIsOpen}
                    appElement={document.getElementById("root")}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <Image
                        className="mx-auto md:mb-7 mb-2 w-[180px] h-[120px] md:w-[250px] md:h-[180px]"
                        imgsrc={img}
                    />
                    <p className=" font-rb uppercase font-bold text-3xl text-[#32B548] text-center">
                        well done
                    </p>
                    <p className="sm:w-[456px] text-center font-rb text-white my-4 md:my-8">
                        You've completed your exam!
                    </p>
                    <div className="flex justify-between">
                        <button
                            onClick={closeModal}
                            className="w-[48%] border text-[#3888F9] transition duration-300 ease-in-out border-[#3888F9] py-2 px-6 rounded hover:bg-[#3888F9] hover:text-white text-lg font-rb font-semibold"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleexamstart}
                            className="w-[48%] text-[#3888F9] border rounded border-[#3888F9] transition duration-300 ease-in-out py-2 px-6 hover:bg-[#3888F9] hover:text-white text-lg font-rb font-semibold"
                        >
                            Result
                        </button>
                    </div>
                </Modal>
            </div>
        </>
    );
};

export default ExamTime;
