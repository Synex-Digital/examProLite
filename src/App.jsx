import { useState } from "react";
import "./App.css"
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    createRoutesFromElements,
} from "react-router-dom";
import SignIn from "./components/pages/SignIn";
import UserDashboard from "./components/pages/UserDashboard";
import Rotlayout from "./components/layout/Rotlayout";
import IqTest from "./components/pages/IqTest";
import Exam from "./components/pages/Exam";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Result from "./components/pages/Result";
import Show from "./components/pages/Show";
import Address from "./components/pages/Address";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<SignIn />}></Route>
            <Route path="/user" element={<Rotlayout />}>
                <Route path="dashboard" element={<UserDashboard />}></Route>
                <Route path="iqtest" element={<IqTest />}></Route>
                <Route path="exam" element={<Exam />}></Route>
                <Route path="result" element={<Result />}></Route>
                <Route path="show" element={<Show />}></Route>
                <Route path="address" element={<Address />}></Route>
            </Route>
        </Route>
    )
);

function App() {
    return (
        <>
            <RouterProvider router={router} />
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <ToastContainer />
        </>
    );
}

export default App;
