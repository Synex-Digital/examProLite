import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CiCircleCheck } from "react-icons/ci";
import { RxCrossCircled } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

const Show = () => {
    let navigate = useNavigate();
    let result = useSelector((state) => state.examresult.value);
    let userToken = useSelector((state) => state.tokened.Token);
    let pdfID = useSelector((state) => state.pdfid.values);
    let [loading, setloading] = useState(false);
    let [answerValues, setAnswerValues] = useState("all");

    if (result == null) {
        navigate("/user/result");
        return;
    }

    let handlePdf = async () => {
        setloading(true);
        try {
            const response = await fetch(
                `https://laraveladmin.icaniqbd.com/api/result/download/${pdfID} `,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                        Accept: "application/json",
                    },
                }
            );

            if (response.ok) {
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                setloading(false);

                window.open(url, "_blank");
            } else {
                console.error(
                    `Failed to download PDF. Status: ${response.status}`
                );
            }
        } catch (error) {
            throw error;
        }
    };

    let handleAnswer = (e) => {
        setAnswerValues(e.target.value);
    };

    return (
        <section className=" mt-16 p-4 w-full">
            <div
                onClick={handlePdf}
                className="w-full flex items-center justify-center my-[30px]"
            >
                {loading ? (
                    <a className="py-3 px-8 bg-[#3888F9] font-rb text-xl font-semibold text-white cursor-pointer">
                        Loading.......
                    </a>
                ) : (
                    <a className="py-3 px-8 bg-[#3888F9] font-rb text-xl font-semibold text-white cursor-pointer">
                        Download Sheet
                    </a>
                )}
            </div>
            <div className="w-full  border-gray-400 font-rb font-semibold text-xl flex justify-between mb-10">
                <div>
                    <p className="text-green-400">
                        <span>Correct answer: </span> {result.history.correct}
                    </p>
                    <p className="text-red-500">
                        <span>Incorrect: </span> {result.history.wrong}
                    </p>
                    <p>
                        <span>Total number: </span> {result.history.total}
                    </p>
                    <p>
                        <span>Time taken: </span> {result.history.time_taken}
                    </p>
                </div>
                <div className="flex items-center justify-center">
                    <p>Filter by:</p>
                    <select
                        className="ml-2 border p-2 border-black"
                        name="answer"
                        onChange={handleAnswer}
                    >
                        <option value="all">All</option>
                        <option value="correct">Correct</option>
                        <option value="wrong">Wrong</option>
                    </select>
                </div>
            </div>
            <div>
                {result.data.map((item, index) =>
                    answerValues.includes("all") ? (
                        <div key={index} className="mt-[30px]">
                            <h2 className="font-rb text-2xl font-semibold flex gap-x-2 items-center">
                                {item.question_test_text}{" "}
                                <span>
                                    {item.is_correct == 1 ? (
                                        <CiCircleCheck className="text-green-800 text-lg" />
                                    ) : (
                                        <RxCrossCircled className="text-red-800 text-lg" />
                                    )}
                                </span>
                            </h2>
                            <div className="md:flex md:flex-wrap smalldevice:max-md:flex smalldevice:max-md:flex-col smalldevice:max-md:w-full mt-6 gap-x-4 gap-y-5">
                                {item.choices &&
                                    item.choices.map((sitem) => (
                                        <p
                                            key={sitem.id}
                                            className={`${
                                                !item.is_correct
                                                    ? item.wrong_id == sitem.id
                                                        ? "text-white bg-[#f91f1f]"
                                                        : sitem.is_correct == 1
                                                        ? "bg-green-400 text-white"
                                                        : "text-black"
                                                    : item.correct_id ==
                                                      sitem.id
                                                    ? "bg-green-400 text-white"
                                                    : "text-black"
                                            } md:w-[48%] p-3 border font-rb text-lg`}
                                        >
                                            {sitem.choice_text}
                                        </p>
                                    ))}
                            </div>
                        </div>
                    ) : answerValues.includes("correct") ? (
                        item.is_correct == true && (
                            <div key={index} className="mt-[30px]">
                                <h2 className="font-rb text-2xl font-semibold flex gap-x-2 items-center">
                                    {item.question_test_text}{" "}
                                    <span>
                                        {item.is_correct == 1 ? (
                                            <CiCircleCheck className="text-green-800 text-lg" />
                                        ) : (
                                            <RxCrossCircled className="text-red-800 text-lg" />
                                        )}
                                    </span>
                                </h2>
                                <div className="md:flex md:flex-wrap smalldevice:max-md:flex smalldevice:max-md:flex-col smalldevice:max-md:w-full mt-6 gap-x-4 gap-y-5">
                                    {item.choices &&
                                        item.choices.map((sitem) => (
                                            <p
                                                key={sitem.id}
                                                className={`${
                                                    !item.is_correct
                                                        ? item.wrong_id ==
                                                          sitem.id
                                                            ? "text-white bg-[#f91f1f]"
                                                            : sitem.is_correct ==
                                                              1
                                                            ? "bg-green-400 text-white"
                                                            : "text-black"
                                                        : item.correct_id ==
                                                          sitem.id
                                                        ? "bg-green-400 text-white"
                                                        : "text-black"
                                                } md:w-[48%] p-3 border font-rb text-lg`}
                                            >
                                                {sitem.choice_text}
                                            </p>
                                        ))}
                                </div>
                            </div>
                        )
                    ) : (
                        item.is_correct == false && (
                            <div key={index} className="mt-[30px]">
                                <h2 className="font-rb text-2xl font-semibold flex gap-x-2 items-center">
                                    {item.question_test_text}{" "}
                                    <span>
                                        {item.is_correct == 1 ? (
                                            <CiCircleCheck className="text-green-800 text-lg" />
                                        ) : (
                                            <RxCrossCircled className="text-red-800 text-lg" />
                                        )}
                                    </span>
                                </h2>
                                <div className="md:flex md:flex-wrap smalldevice:max-md:flex smalldevice:max-md:flex-col smalldevice:max-md:w-full mt-6 gap-x-4 gap-y-5">
                                    {item.choices &&
                                        item.choices.map((sitem) => (
                                            <p
                                                key={sitem.id}
                                                className={`${
                                                    !item.is_correct
                                                        ? item.wrong_id ==
                                                          sitem.id
                                                            ? "text-white bg-[#f91f1f]"
                                                            : sitem.is_correct ==
                                                              1
                                                            ? "bg-green-400 text-white"
                                                            : "text-black"
                                                        : item.correct_id ==
                                                          sitem.id
                                                        ? "bg-green-400 text-white"
                                                        : "text-black"
                                                } md:w-[48%] p-3 border font-rb text-lg`}
                                            >
                                                {sitem.choice_text}
                                            </p>
                                        ))}
                                </div>
                            </div>
                        )
                    )
                )}
            </div>
        </section>
    );
};

export default Show;
