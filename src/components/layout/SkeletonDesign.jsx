import React from "react";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

const SkeletonDesign = ({Bwidth}) => {
    return (
        <>
            <div className={`w-[${Bwidth}]`}>
                <div className="border p-5 rounded-2xl shadow-md">
                    <div className="w-[80%]">
                        <Skeleton className="" count={1} />
                    </div>
                    <div className="py-2">
                        <Skeleton className="h-7" count={1} />
                    </div>
                    <div className="w-[20%]">
                        <Skeleton count={1} />
                    </div>
                    <div className=" my-5">
                        <Skeleton count={1} />
                    </div>
                    <div className=" rounded-lg ">
                        <Skeleton className="h-8" count={1} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SkeletonDesign;
