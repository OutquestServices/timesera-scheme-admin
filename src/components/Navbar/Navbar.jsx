"use client";

import Link from 'next/link';
import React from 'react';
import { FaHome, FaUser, FaChartBar, FaCog, FaIdCard, FaUserSlash, FaHandshake, FaFileInvoice, FaClipboardList, FaMoneyCheckAlt, FaFileContract, FaFileAlt, FaFileExport, FaFileImport, FaReceipt } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";


const Sidebar = ({ isOpen, setIsOpen }) => {
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`h-screen overflow-y-auto custom-scrollbar2 bg-gray-800 text-white flex flex-col items-center fixed transition-all duration-300 ${isOpen ? ' w-64' : 'w-16'}`}>
            <button
                className="bg-gray-700 hover:bg-gray-500 text-white ml-auto py-2 px-2 rounded-full"
                onClick={toggleSidebar}
            >
                {isOpen ? <GiHamburgerMenu size={25} /> : <GiHamburgerMenu size={25} />}
            </button>

            <div className="-mt-1">
                <div className={`flex flex-row-reverse ${isOpen ? "p-5 -mt-[35px]" : "p-1 -mt-[0px]"} justify-center items-center`}>
                    <a href={"/"} className='max-w-[150px] mx-auto flex flex-col items-center justify-center gap-1'>
                        <img
                            src="/tlogo.png"
                            alt="Logo"
                        />
                        {isOpen && <span className=""><img src="/textLogo.png" alt="" /></span>}
                    </a>
                </div>
            </div>

            <div className="mt-0 w-full">
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
                    <FaIdCard />
                    {isOpen && <span className="ml-4">Member Card</span>}
                </Link>
                <Link href={"/memberdiscontinue"} className="flex items-center py-4 pl-4 hover:bg-gray-700 cursor-pointer">
                    <FaUserSlash />
                    {isOpen && <span className="ml-4">Member Discontinue</span>}
                </Link>
                <Link href={"/schemesettlement"} className="flex items-center py-4 pl-4 hover:bg-gray-700 cursor-pointer">
                    <FaHandshake />
                    {isOpen && <span className="ml-4">Scheme Settlement</span>}
                </Link>
                <Link href={"/receiptentry"} className="flex items-center py-4 pl-4 hover:bg-gray-700 cursor-pointer">
                    <FaFileInvoice />
                    {isOpen && <span className="ml-4">Receipt Entry</span>}
                </Link>
                <Link href={"/memberlist"} className="flex items-center py-4 pl-4 hover:bg-gray-700 cursor-pointer">
                    <FaClipboardList />
                    {isOpen && <span className="ml-4">Member List</span>}
                </Link>
                <Link href={"/duelist"} className="flex items-center py-4 pl-4 hover:bg-gray-700 cursor-pointer">
                    <FaMoneyCheckAlt />
                    {isOpen && <span className="ml-4">Due List</span>}
                </Link>
                <Link href={"/memberreport"} className="flex items-center py-4 pl-4 hover:bg-gray-700 cursor-pointer">
                    <FaFileContract />
                    {isOpen && <span className="ml-4">Member Report</span>}
                </Link>
                <Link href={"/settlementreport"} className="flex items-center py-4 pl-4 hover:bg-gray-700 cursor-pointer">
                    <FaFileAlt />
                    {isOpen && <span className="ml-4">Settlement Report</span>}
                </Link>
                <Link href={"/discontinuereport"} className="flex items-center py-4 pl-4 hover:bg-gray-700 cursor-pointer">
                    <FaFileExport />
                    {isOpen && <span className="ml-4">Discontinue Report</span>}
                </Link>
                <Link href={"/duereport"} className="flex items-center py-4 pl-4 hover:bg-gray-700 cursor-pointer">
                    <FaFileImport />
                    {isOpen && <span className="ml-4">Due Report</span>}
                </Link>
                <Link href={"/receiptreport"} className="flex items-center py-4 pl-4 hover:bg-gray-700 cursor-pointer">
                    <FaReceipt />
                    {isOpen && <span className="ml-4">Receipt Report</span>}
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
