import React from "react";

const Footar = () => {
    return (
        <section className="mt-16 bg-[#EFF5F5]">
            <div className="flex justify-between items-center px-5 container mx-auto py-4 text-sm text-gray-700 ">
                <div>Copyright © 2024 iCAN Academy</div>{" "}
                <div>
                    Developed by{" "}
                    <a href="https://synexdigital.com/" target="_blank" className="text-[#0a6e40]">
                        Synex Digital
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Footar;
