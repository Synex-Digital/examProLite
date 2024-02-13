import React from "react";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

const SkeletonDesign = () => {
    return (
        <>
            <div className="w-[32%] ">
                <div className="border p-5 rounded-2xl shadow-md">
                    <div className="w-[80%]">
                        <Skeleton count={1} />
                    </div>
                    <div className="my-4">
                        <Skeleton count={1} />
                    </div>
                    <div className="w-1/2">
                        <Skeleton count={1} />
                    </div>
                    <div className=" my-5">
                        <Skeleton count={1} />
                    </div>
                    <div className=" h-10 w-full rounded-lg ">
                        <Skeleton count={1} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SkeletonDesign;
