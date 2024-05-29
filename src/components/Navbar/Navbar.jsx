"use client";

import Link from 'next/link';
import React from 'react';
import { FaHome, FaUser, FaChartBar, FaCog, FaQuestionCircle, FaEnvelope, FaBell, FaFolder, FaClipboard, FaSignOutAlt } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Sidebar = ({ isOpen, setIsOpen }) => {
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`h-screen bg-gray-800 text-white flex flex-col items-center fixed transition-all duration-300 ${isOpen ? ' w-64' : 'w-16'}`}>
            <button
                className="bg-gray-700 hover:bg-gray-600 text-white ml-auto py-2 px-2 rounded-full"
                onClick={toggleSidebar}
            >
                {isOpen ? <IoIosArrowBack size={20} /> : <IoIosArrowForward size={20} />}
            </button>

            <div className="-mt-1">
                <div className={`flex flex-row-reverse ${isOpen ? "p-5" : "p-1"} justify-center items-center`}>
                    <a href={"/"} className='max-w-[150px] mx-auto flex flex-col items-center justify-center gap-1'>
                        <img
                            src="/tlogo.png"
                            alt="Logo"
                        />
                        {isOpen && <span className=""><img src="/textLogo.png" alt="" /></span>}
                    </a>
                </div>
            </div>

            <div className="mt-2 w-full">
                <Link href={"/"} className="flex items-center py-4 pl-4 hover:bg-gray-700 cursor-pointer">
                    <FaHome />
                    {isOpen && <span className="ml-4">Home</span>}
                </Link>
                <Link href={"/schemetype"} className="flex items-center py-4 pl-4 hover:bg-gray-700 cursor-pointer">
                    <FaUser />
                    {isOpen && <span className="ml-4">Scheme Type</span>}
                </Link>
                <Link href={"/schemename"} className="flex items-center py-4 pl-4 hover:bg-gray-700 cursor-pointer">
                    <FaChartBar />
                    {isOpen && <span className="ml-4">Scheme Name</span>}
                </Link>
                <Link href={"/schememember"} className="flex items-center py-4 pl-4 hover:bg-gray-700 cursor-pointer">
                    <FaCog />
                    {isOpen && <span className="ml-4">Scheme Member</span>}
                </Link>
                <Link href={"/membercard"} className="flex items-center py-4 pl-4 hover:bg-gray-700 cursor-pointer">
                    <FaQuestionCircle />
                    {isOpen && <span className="ml-4">Member Card</span>}
                </Link>
                <Link href={"/memberdiscontinue"} className="flex items-center py-4 pl-4 hover:bg-gray-700 cursor-pointer">
                    <FaEnvelope />
                    {isOpen && <span className="ml-4">Member Discontinue</span>}
                </Link>
                <Link href={"/schemesettlement"} className="flex items-center py-4 pl-4 hover:bg-gray-700 cursor-pointer">
                    <FaBell />
                    {isOpen && <span className="ml-4">Scheme Settlement</span>}
                </Link>
                <Link href={"/receiptentry"} className="flex items-center py-4 pl-4 hover:bg-gray-700 cursor-pointer">
                    <FaFolder />
                    {isOpen && <span className="ml-4">Receipt Entry</span>}
                </Link>
                <Link href={"/memberlist"} className="flex items-center py-4 pl-4 hover:bg-gray-700 cursor-pointer">
                    <FaClipboard />
                    {isOpen && <span className="ml-4">Member List</span>}
                </Link>
                <Link href={"/duelist"} className="flex items-center py-4 pl-4 hover:bg-gray-700 cursor-pointer">
                    <FaSignOutAlt />
                    {isOpen && <span className="ml-4">Due List</span>}
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
