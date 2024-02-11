import React from "react";
import { RxTriangleRight } from "react-icons/rx";
const SampleNextArrow = ({ style, onClick }) => {
    return (
        <span
            className=" absolute right-0 top-[35%] !flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(0,0,0,0.10)] hover:bg-[rgba(0,0,0,0.77)] sm:h-10 sm:w-10 lg:h-16  lg:w-16"
            style={{
                ...style,
            }}
            onClick={onClick}
        >
            <RxTriangleRight className="text-2xl text-white" />
        </span>
    );
};

export default SampleNextArrow;
