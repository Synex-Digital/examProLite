import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";
import { questionid } from "../../../features/questionSlice";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import ExamTime from "../layout/ExamTime";
import { useNavigate } from "react-router-dom";
import img from "../../assets/img1.png";
import Image from "../layout/Image";
import { userExamQuestion } from "../../../features/examQuestionSlice";
import { checkId } from "../../../features/checkidSlice";
import ModalImage from "react-modal-image";
import Cookies from "universal-cookie";

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

const Exam = () => {
    const cookies = new Cookies();
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const [models, setModels] = useState([]);
    const [question, setQuestion] = useState("");
    const [choiceid, setChoiceid] = useState("");
    const [modelid, setModelid] = useState("");
    const [examcount, setExamCount] = useState("");
    Modal.setAppElement("#root");
    const [modalIsOpen, setIsOpen] = useState(false);
    let qusid = useSelector((state) => state.queid.value);
    let examQuestion = useSelector((state) => state.question.Question);
    let modeltestvaluse = useSelector((state) => state.userModelTest.values);
    let loginUser = useSelector((state) => state.loggedUser.loginUser);
    let userToken = useSelector((state) => state.tokened.Token);
    let examId = useSelector((state) => state.examid.id);
    let chackid = useSelector((state) => state.checkid.value);
    let [loading, setloading] = useState(true);
    let [spamcheck, setSpamcheck] = useState(true);
    const [upperindex, setUpperIndex] = useState("");
    let cookData = cookies.get("realdata");
    // const [chackid, setChackid] = useState("");

    // model data

    useEffect(() => {
        async function fetchData() {
            try {
                let data = new FormData();
                data.append("model_id", examId);

                const response = await fetch(
                    "http://127.0.0.1:8000/api/attempt",
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
                setModels(responseData.data);
                setSpamcheck(false);
            } catch (error) {
                throw error;
            }
        }
        fetchData();

        setSpamcheck(false);
    }, []);

    // examtime

    useEffect(() => {
        async function fetchDatathree() {
            try {
                let data = new FormData();
                data.append("model_id", examId);

                const response = await fetch(
                    "http://127.0.0.1:8000/api/attempt",
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
                setExamCount(responseData.exam_time);
                setloading(false);
            } catch (error) {
                throw error;
            }
        }
        fetchDatathree();
        setSpamcheck(false);
    }, []);

    // subQus

    useEffect(() => {
        async function fetchDatatwo() {
            try {
                let data = new FormData();
                data.append("choice_id", choiceid);
                data.append("question_id", question);
                data.append("model_id", modeltestvaluse.id);

                const response = await fetch(
                    "http://127.0.0.1:8000/api/answer/submit",
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
        }
        fetchDatatwo();
        setSpamcheck(false);
    }, [choiceid]);

    // relode

    useEffect(() => {
        const handleReload = (event) => {
            const message =
                "Are you sure you want to reload? This will end your session.";
            if (!window.confirm(message)) {
                event.preventDefault();
            } else {
                localStorage.removeItem("sessionData");
            }
        };

        window.addEventListener("beforeunload", handleReload);
        window.addEventListener("unload", handleReload);

        return () => {
            // navigate("/user/iqtest");
            window.removeEventListener("beforeunload", handleReload);
            window.removeEventListener("unload", handleReload);
        };
    }, []);

    // relode

    useEffect(() => {
        if (loginUser == null) {
            navigate("/");
        }
    }, []);

    if (loading) {
        return (
            <div className="mt-24">
                <Image
                    className="mx-auto md:mb-7 mb-2 w-[120px] h-[100px]"
                    imgsrc={img}
                />
                <p className=" font-rb font-bold text-xl text-center">
                    Preparing question data. Please wait...
                </p>
            </div>
        );
    }

    let handlereload = () => {
        window.location.reload();
        setSpamcheck(false);
    };

    if (spamcheck) {
        return (
            <div className="mt-16 h-[90vh] flex flex-col items-center justify-center">
                <h1 className="text-2xl">
                    Your test has been caught in spam wait 30s
                </h1>
                <button
                    onClick={handlereload}
                    className="text-[#3888F9] border rounded border-[#3888F9] transition duration-300 ease-in-out py-2 px-6 hover:bg-[#3888F9] hover:text-white text-lg font-rb font-semibold mt-5"
                >
                    Again start
                </button>
            </div>
        );
    }

    if (loginUser == null) {
        navigate("/");
        return;
    }
    if (modeltestvaluse == null) {
        navigate("/user/iqtest");
        return;
    }
    if (examQuestion == null) {
        navigate("/user/iqtest");
        return;
    }

    if (models == null) {
        setSpamcheck(true);
        return;
    }

    let lastlength = models.length;

    const time = new Date();
    time.setSeconds(time.getSeconds() + examcount);

    let hendlesubmit = async (sitem, item) => {
        dispatch(checkId({ qid: item.id, id: sitem.id }));

        let existingArray = cookies.get("realdata");
        if (!existingArray || !Array.isArray(existingArray)) {
            existingArray = [];
        }
        let newObj = { q: item.id, i: sitem.id };
        let foundIndex = existingArray.findIndex((obj) => obj.q === item.id);

        if (foundIndex !== -1) {
            existingArray[foundIndex] = newObj;
        } else {
            existingArray.push(newObj);
        }
        cookies.set("realdata", existingArray);

        try {
            let data = new FormData();
            data.append("choice_id", sitem.id);
            data.append("question_id", item.id);
            data.append("model_id", modeltestvaluse.id);

            const response = await fetch(
                "http://127.0.0.1:8000/api/answer/submit",
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

        setChoiceid(sitem.id);
    };

    let hendleexamsubmit = async () => {
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
        setIsOpen(true);
        dispatch(questionid(1));
        localStorage.setItem("questionid", JSON.stringify(1));
    };

    let handlearrowleft = () => {
        if (qusid > 1) {
            let incre = qusid - 1;

            dispatch(questionid(incre));
            localStorage.setItem("questionid", JSON.stringify(incre));
        }
    };

    let handlearrowright = (item) => {
        if (lastlength != qusid) {
            let incre = qusid + 1;
            dispatch(questionid(incre));
            localStorage.setItem("questionid", JSON.stringify(incre));
        }
        if (item.index > upperindex) {
            setUpperIndex(item.index + 1);
        }
    };

    let handlequstionindex = (item) => {
        if (item.index > upperindex) {
            setUpperIndex(item.index);
        }
        dispatch(questionid(item.index));
        localStorage.setItem("questionid", JSON.stringify(item.index));
    };

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
    const getQuestionClassName = (item) => {
        const isCurrentQuestion = qusid === item.index;
        const isAnsweredQuestion = cookData?.some(
            (citem) => citem.q === item.id
        );

        if (isCurrentQuestion) {
            return "!bg-[#08458a] text-white border";
        }

        if (isAnsweredQuestion) {
            return "bg-[#20913b] text-white border";
        }

        if (item.index < qusid || item.index < upperindex + 1) {
            return "bg-[#EF4444] text-white";
        }

        return ""; // Default class when none of the conditions are met
    };

    return (
        <>
            <section className="mt-16  p-4 mx-auto ">
                <div className=" relative container mx-auto px-5">
                    <div className="flex justify-between">
                        <h2 className=" font-rb font-bold text-2xl mb-4 ">
                            {modeltestvaluse.title}
                        </h2>
                        <time>
                            <ExamTime expiryTimestamp={time} />
                        </time>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {models.map((item, index) => (
                            <div
                                key={index}
                                className="cursor-pointer font-rb text-lg font-medium"
                            >
                                <p
                                    className={`${getQuestionClassName(
                                        item
                                    )} border rounded-sm py-1 px-3`}
                                    onClick={() => handlequstionindex(item)}
                                >
                                    {index + 1}
                                </p>
                            </div>
                        ))}
                    </div>
                    {models.map(
                        (item, index) =>
                            qusid == item.index && (
                                <div
                                    key={index}
                                    className="flex items-center justify-center"
                                >
                                    <div>
                                        <GoArrowLeft
                                            className="border border-[#705BCC] rounded-full p-3 text-lg w-12 h-12 text-[#705BCC]  cursor-pointer mr-7 smalldevice:max-sm:absolute -bottom-[70px] left-5"
                                            onClick={() =>
                                                handlearrowleft(item)
                                            }
                                        />
                                    </div>
                                    <div className="border rounded-lg relative mt-4 p-2 sm:p-4 sm:w-1/2">
                                        <div className="mb-4 flex justify-center items-center gap-x-3">
                                            {item.question_test_image && (
                                                <ModalImage
                                                    className="w-[160px] h-[160px]"
                                                    small={
                                                        item.question_test_image
                                                    }
                                                    large={
                                                        item.question_test_image
                                                    }
                                                    alt="Image"
                                                />
                                            )}
                                            <h2 className=" font-rb font-semibold md:text-xl xl:text-2xl text-center">
                                                {item.question_test_text}
                                            </h2>
                                        </div>

                                        <div className="flex flex-col gap-y-4 ">
                                            {item.choices &&
                                                item.choices.map(
                                                    (sitem, index) => (
                                                        <p
                                                            key={sitem.id}
                                                            className={`${cookData?.map(
                                                                (citem) =>
                                                                    citem.i ==
                                                                    sitem.id
                                                                        ? "border rounded bg-green-400 border-[#36ff40] font-rb sm:text-lg py-2 px-2 sm:px-6  text-[#0c0c0c] mx-auto cursor-pointer w-[98%]"
                                                                        : "border rounded border-[#292055] font-rb sm:text-lg py-2 px-2 sm:px-6  text-[#0C0C0C] mx-auto cursor-pointer w-[98%]"
                                                            )} "border rounded border-[#292055] font-rb sm:text-lg py-2 px-2 sm:px-6  text-[#0C0C0C] mx-auto cursor-pointer w-[98%]"
                                                    `}
                                                            onClick={() =>
                                                                hendlesubmit(
                                                                    sitem,
                                                                    item
                                                                )
                                                            }
                                                        >
                                                            {index + 1}.{" "}
                                                            {sitem.choice_text}
                                                        </p>
                                                    )
                                                )}
                                        </div>
                                    </div>
                                    {lastlength != qusid ? (
                                        <div>
                                            <GoArrowRight
                                                className="border border-[#705BCC] rounded-full p-3 text-lg w-12 h-12 text-[#705BCC]  cursor-pointer ml-7 smalldevice:max-sm:absolute -bottom-[70px] right-5"
                                                onClick={() =>
                                                    handlearrowright(item)
                                                }
                                            />
                                        </div>
                                    ) : (
                                        <div>
                                            <button
                                                onClick={hendleexamsubmit}
                                                className="border bg-[#21BA45] border-[#21BA45]  p-3 text-lg font-semibold text-white  cursor-pointer ml-7   smalldevice:max-sm:absolute -bottom-[70px] right-5"
                                            >
                                                {" "}
                                                Submit
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )
                    )}
                </div>
            </section>
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

export default Exam;
