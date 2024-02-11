/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            screens: {
                smalldevice: "350px",
            },
            colors: {
                cGrey: "#767676",
                cbg: "#F2F2F2",
                cdrop: "#262626",
                bcolor: "#D1D1D1",
                btncolor: "#3888F9",
                tbcolor: "#0C0C0C",
                tgcolor: "#32B548",
            },
            fontFamily: {
                rb: ["Roboto", "sans-serif"],
            },
        },
    },
    plugins: [],
};
