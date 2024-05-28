import React from 'react'
import "./Styling.css";
import Duelist from './Duelist';
import Discontinue from './Discontinue';

const MemberList = () => {

    

    return (
        <div className='w-full max-h-[5000px]'>
            <div className='px-[20px] w-full h-full flex gap-[20px]'>
                <div className='basis-[33%] w-full h-[300px] overflow-y-auto custom-scrollbar border border-black rounded-lg'>
                    <Duelist />
                </div>
                <div className='basis-[33%] w-full h-[300px] overflow-y-auto custom-scrollbar border border-black rounded-lg'>
                    <Discontinue />
                </div>
                <div className='basis-[34%] w-full h-[300px] overflow-y-auto custom-scrollbar border border-black rounded-lg'>

                </div>
            </div>
        </div>
    )
}

export default MemberList
