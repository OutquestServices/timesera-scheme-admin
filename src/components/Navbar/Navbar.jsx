"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import { FaHome, FaUser, FaChartBar, FaCog, FaIdCard, FaUserSlash, FaHandshake, FaFileInvoice, FaClipboardList, FaMoneyCheckAlt, FaFileContract, FaFileAlt, FaFileExport, FaFileImport, FaReceipt } from 'react-icons/fa';
import { GiHamburgerMenu } from "react-icons/gi";

const Sidebar = ({ isOpen, setIsOpen }) => {
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const [clickReports, setClickReports] = useState(false);

    const handleClickReports = () => setClickReports(!clickReports);

    return (
        <div className={`h-screen overflow-y-auto custom-scrollbar2 bg-[#182456] text-white flex flex-col fixed transition-all duration-300 ${isOpen ? ' w-64' : 'w-16'}`}>
            <div className="sticky top-0 w-full bg-gray-800 flex flex-col items-center">
                <div className={`flex w-full items-end ${isOpen ? "justify-end" : "justify-center"}`}>
                    <button
                        className="bg-gray-700 z-20 hover:bg-gray-500 text-white py-2 px-2 rounded-full mt-2"
                        onClick={toggleSidebar}
                    >
                        <GiHamburgerMenu size={25} />
                    </button>
                </div>

                <div className={`bg-[#182456] w-full py-2 -z-30 flex flex-col items-center ${isOpen ? "-mt-[40px]" : "-mt-[0px]"} mt-2`}>
                    <a href={"/"} className='max-w-[150px] mx-auto flex flex-col items-center justify-center gap-1'>
                        <img
                            src="/tlogo.png"
                            alt="Logo"
                        />
                        {isOpen && <span><img src="/textLogo.png" alt="Text Logo" /></span>}
                    </a>
                </div>
            </div>
            <div className="mt-4 w-full">
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
                {/* <Link href={"/memberlist"} className="flex items-center py-4 pl-4 hover:bg-gray-700 cursor-pointer">
                    <FaClipboardList />
                    {isOpen && <span className="ml-4">Member List</span>}
                </Link>
                <Link href={"/duelist"} className="flex items-center py-4 pl-4 hover:bg-gray-700 cursor-pointer">
                    <FaMoneyCheckAlt />
                    {isOpen && <span className="ml-4">Due List</span>}
                </Link> */}
                <button onClick={handleClickReports} className="flex w-full items-center py-4 pl-4 hover:bg-gray-700 cursor-pointer">
                    <FaReceipt />
                    {isOpen && <span className="ml-4">Reports</span>}
                </button>
                {
                    (clickReports) && (
                        <div className='flex flex-col'>
                            <Link href={"/memberreport"} className="flex border-b border-[#4FC997] items-center py-4 pl-4 hover:bg-gray-700 cursor-pointer">
                                {/* <FaFileContract /> */}
                                {isOpen && <span className="ml-4">Member Report</span>}
                            </Link>
                            <Link href={"/settlementreport"} className="flex border-b border-[#4FC997] items-center py-4 pl-4 hover:bg-gray-700 cursor-pointer">
                                {/* <FaFileAlt /> */}
                                {isOpen && <span className="ml-4">Settlement Report</span>}
                            </Link>
                            <Link href={"/discontinuereport"} className="flex border-b border-[#4FC997] items-center py-4 pl-4 hover:bg-gray-700 cursor-pointer">
                                {/* <FaFileExport /> */}
                                {isOpen && <span className="ml-4">Discontinue Report</span>}
                            </Link>
                            <Link href={"/duereport"} className="flex border-b border-[#4FC997] items-center py-4 pl-4 hover:bg-gray-700 cursor-pointer">
                                {/* <FaFileImport /> */}
                                {isOpen && <span className="ml-4">Due Report</span>}
                            </Link>
                            <Link href={"/receiptreport"} className="flex border-b border-[#4FC997] items-center py-4 pl-4 hover:bg-gray-700 cursor-pointer">
                                {/* <FaReceipt /> */}
                                {isOpen && <span className="ml-4">Receipt Report</span>}
                            </Link>
                        </div>
                    )
                }

            </div>
        </div>
    );
};

export default Sidebar;
