import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonDesignDashboard = () => {
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
                            <Skeleton count={1} height={20} width={100} />
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
                            <Skeleton count={1} height={20} width={100} />
                        </span>
                    </div>
                    <div className="rounded-lg  bg-[#EFF5F5]  px-8 py-5 shadow-sm flex flex-col relative overflow-hidden w-[32%]">
                        <div className=" bg-[#19875426] w-20 h-20 rounded-full absolute -bottom-6 -left-6"></div>
                        <div className=" bg-[#19875433] w-10 h-10 rounded-full absolute -bottom-1 -left-1"></div>
                        <div className="flex gap-x-3 items-center justify-center">
                            <div className="w-[18px] h-[18px] rounded-full bg-[#DB2828]"></div>
                            <p className="font-rb text-2xl">Average Time</p>
                        </div>
                        <span className=" mt-5 text-2xl">
                            <Skeleton count={1} height={20} width={100} />
                        </span>
                    </div>
                </div>

                <div className=" mt-5 w-full">
                    <Skeleton count={1} height={"60vh"} width={"100%"} />
                </div>
            </div>

            <div className="flex w-[28%] flex-col gap-4">
                <div className=" bg-[#EFF5F5]  p-5 rounded-2xl text-center">
                    <div className=" mt-5 rounded-full">
                        <Skeleton
                            className="rounded-full"
                            count={1}
                            duration={1}
                            height={100}
                            width={100}
                        />
                    </div>
                    <div className=" mt-2 ">
                        <Skeleton
                            count={1}
                            duration={1}
                            height={20}
                            width={100}
                        />
                    </div>
                    <div className=" my-2 ">
                        <Skeleton
                            count={1}
                            duration={1}
                            height={20}
                            width={100}
                        />
                    </div>
                    <div className="  ">
                        <Skeleton
                            count={1}
                            duration={1}
                            height={20}
                            width={100}
                        />
                    </div>
                    <div className=" mb-7 ">
                        <Skeleton
                            count={1}
                            duration={1}
                            height={20}
                            width={100}
                        />
                    </div>
                    <div className=" px-2 py-2 ">
                        <Skeleton
                            count={1}
                            duration={1}
                            height={40}
                            width={"100%"}
                        />
                    </div>
                </div>

                <div className=" text-center bg-[#EFF5F5] p-5 rounded-2xl">
                    <Skeleton count={1} height={100} duration={1} width={200} />
                </div>
            </div>
        </div>
    );
};

export default SkeletonDesignDashboard;
