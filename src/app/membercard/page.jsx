"use client";

import MemberList from '@/components/MemberList/MemberCard'
import Sidebar from '@/components/Navbar/Navbar';
import React, { useState } from 'react'

const page = () => {

    const [isOpen, setIsOpen] = useState(true);

    return (

        <div className="flex w-full max-h-screen overflow-y-auto custom-scrollbar2 ">
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className={`flex-1 w-full transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-16'}`}>
                <div className='w-full flex flex-col gap-[10px]'>
                    <MemberList />
                </div>
            </div>
        </div>
    )
}

export default page
