import React from "react";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

const SkeletonDesign = ({ Boxwidth }) => {
    return (
        <>
            <section>
                <div className="flex flex-wrap gap-5 container mx-auto overflow-hidden ">
                    <div className="bg-[#EFF5F5] relative w-full overflow-hidden rounded-2xl">
                        <div className=" bg-[#19875426] w-28 h-28 rounded-full absolute -top-6 -right-6"></div>
                        <div className=" bg-[#19875433] w-16 h-16 rounded-full absolute -top-1 -right-1"></div>
                        <div className="p-5 shadow-md">
                            <time className="flex items-center gap-x-1 justify-end font-rb text-sm text-[#6D6D6D]">
                                <Skeleton count={1} height={20} width={100} />
                            </time>
                            <div className="mt-2 mb-4">
                                <Skeleton count={1} height={20} width={100} />
                            </div>
                            <Skeleton count={1} height={20} width={150} />
                            <div className="flex justify-between my-5">
                                <Skeleton count={1} height={20} width={100} />
                                <Skeleton count={1} height={20} width={100} />
                            </div>

                            <Skeleton count={1} height={40} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SkeletonDesign;
