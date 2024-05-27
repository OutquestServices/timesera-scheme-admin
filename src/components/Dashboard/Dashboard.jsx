"use client";

import React, { useState } from 'react';
import Sidebar from '../Navbar/Navbar';
import Banner from './Banner';
import Payments from './Payments';
import "./Styling.css";

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex w-full max-h-screen overflow-y-auto custom-scrollbar2 ">
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className={`flex-1 w-full transition-all duration-300 ${isOpen ? 'ml-48' : 'ml-16'}`}>
                <div className='p-[20px] w-full flex flex-col gap-[10px]'>
                    {/* Header */}
                    <div className='max-h-full w-full flex justify-between items-center'>
                        <div className='flex gap-[5px] items-center justify-center'>
                            <h1 className='text-[16px] lg:text-[24px] text-[#182456] font-semibold px-[12px] border-8 border-[#52BD91] border-t-0 border-r-0 border-b-0 rounded-lg '>DASHBOARD</h1>
                        </div>

                        <div className='flex items-center justify-between gap-[15px]'>
                            <div className='h-[35px] w-[35px] bg-black rounded-full'></div>
                            <a href='/' className='bg-[#172561] text-[#52BD91] py-[5px] px-[20px] rounded-md font-semibold'>Logout</a>
                        </div>
                    </div>

                    {/* Banner */}
                    <Banner />

                    {/* Payments */}
                    <Payments />
                </div>
            </div>
        </div>

    )
}

export default Dashboard
