import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CiCircleCheck } from "react-icons/ci";
import { RxCrossCircled } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { PDFViewer, BlobProvider } from "@react-pdf/renderer";
import PdfDesign from "./PdfDesign";

const Show = () => {
    let navigate = useNavigate();
    let result = useSelector((state) => state.examresult.value);
    let userData = useSelector((state) => state.loggedUser.loginUser);
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
                `https://admin.icaniqbd.synexdigital.com/api/result/download/${pdfID} `,
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
        <section className=" mt-24 p-4 w-full">
            <div className="container mx-auto px-2">
                <div className="flex flex-col justify-center items-center mb-10">
                    <p className="font-rb font-semibold text-3xl">iCAN-IQ</p>
                    <p className="font-rb font-medium text-2xl mt-5">
                        Name: {userData.name}
                    </p>
                </div>

                <div className="w-full  border-gray-400 font-rb font-semibold text-xl flex justify-between mb-10">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-400 px-4 py-2">
                                    Correct answer
                                </th>
                                <th className="border border-gray-400 px-4 py-2">
                                    Incorrect
                                </th>
                                <th className="border border-gray-400 px-4 py-2">
                                    Total number
                                </th>
                                <th className="border border-gray-400 px-4 py-2">
                                    Time taken
                                </th>
                                <th className="border border-gray-400 px-4 py-2">
                                    Exam time
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-400 px-4 py-2 text-center">
                                    {result.history.correct}
                                </td>
                                <td className="border border-gray-400 px-4 py-2 text-center">
                                    {result.history.wrong}
                                </td>
                                <td className="border border-gray-400 px-4 py-2 text-center">
                                    {result.history.total}
                                </td>
                                <td className="border border-gray-400 px-4 py-2 text-center">
                                    {result.history.time_taken}
                                </td>
                                <td className="border border-gray-400 px-4 py-2 text-center">
                                    {result.history.exam_time} mins
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="w-full flex justify-between items-center my-[30px]">
                    <>
                        <BlobProvider document={<PdfDesign results={result} />}>
                            {({ url }) => (
                                <a
                                    href={url}
                                    className="block w-full max-w-xs bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Download Sheet
                                </a>
                            )}
                        </BlobProvider>
                    </>
                    <div className="flex items-center justify-center">
                        <p className="text-lg font-medium">Filter by:</p>
                        <select
                            className="ml-2 border p-1 rounded-md font-medium border-[#d9d9d9] bg-[#d9d9d926]"
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
                            <div key={index} className="mt-[40px]">
                                <h2 className="font-rb text-xl font-semibold flex gap-x-2 items-center">
                                    <span>{index + 1}. </span>
                                    {item.question_test_text}{" "}
                                    <span>
                                        {item.is_correct == 1 ? (
                                            <CiCircleCheck className="text-green-800 text-xl" />
                                        ) : (
                                            <RxCrossCircled className="text-red-800 text-xl" />
                                        )}
                                    </span>
                                </h2>
                                <div className="md:flex md:flex-wrap smalldevice:max-md:flex flex-col smalldevice:max-md:w-full mt-6 gap-4">
                                    {item.choices &&
                                        item.choices.map((sitem) => (
                                            <p
                                                key={sitem.id}
                                                className={`${
                                                    !item.is_correct
                                                        ? item.wrong_id ==
                                                          sitem.id
                                                            ? "text-white !bg-[#f91f1fe7]"
                                                            : sitem.is_correct ==
                                                              1
                                                            ? "!bg-green-400 text-white"
                                                            : "text-black "
                                                        : item.correct_id ==
                                                          sitem.id
                                                        ? "!bg-green-400 text-white"
                                                        : "text-black"
                                                } md:w-[48%] p-2 border rounded-md font-rb bg-[#d9d9d926]`}
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
                                    <div className="md:flex md:flex-wrap smalldevice:max-md:flex flex-col smalldevice:max-md:w-full mt-6 gap-4">
                                        {item.choices &&
                                            item.choices.map((sitem) => (
                                                <p
                                                    key={sitem.id}
                                                    className={`${
                                                        !item.is_correct
                                                            ? item.wrong_id ==
                                                              sitem.id
                                                                ? "text-white !bg-[#f91f1fe7]"
                                                                : sitem.is_correct ==
                                                                  1
                                                                ? "!bg-green-400 text-white"
                                                                : "text-black "
                                                            : item.correct_id ==
                                                              sitem.id
                                                            ? "!bg-green-400 text-white"
                                                            : "text-black"
                                                    } md:w-[48%] p-2 border rounded-md font-rb bg-[#d9d9d926]`}
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
                                    <div className="md:flex md:flex-wrap smalldevice:max-md:flex flex-col smalldevice:max-md:w-full mt-6 gap-4">
                                        {item.choices &&
                                            item.choices.map((sitem) => (
                                                <p
                                                    key={sitem.id}
                                                    className={`${
                                                        !item.is_correct
                                                            ? item.wrong_id ==
                                                              sitem.id
                                                                ? "text-white !bg-[#f91f1fe7]"
                                                                : sitem.is_correct ==
                                                                  1
                                                                ? "!bg-green-400 text-white"
                                                                : "text-black "
                                                            : item.correct_id ==
                                                              sitem.id
                                                            ? "!bg-green-400 text-white"
                                                            : "text-black"
                                                    } md:w-[48%] p-2 border rounded-md font-rb bg-[#d9d9d926]`}
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
            </div>
        </section>
    );
};

export default Show;
