import React from 'react'

const SchemeMember = () => {
    return (
        <div className='w-full min-h-screen' style={{ background: "url(/banner.png) lightgray 50% / cover no-repeat" }}>
            <div className='w-full h-full'>
                <div className="px-[10px] sm:px-[20px] lg:px-[40px] py-[5px] sm:py-[10px] lg:py-[15px]">
                    <div
                        className="w-full h-full px-[15px] sm:px-[30px] lg:px-[45px] py-[10px] sm:py-[15px] lg:py-[20px] rounded-md flex items-center gap-[10px] sm:gap-[15px] lg:gap-[20px]"
                        style={{
                            background:
                                "linear-gradient(270deg, #0A0E16 5.64%, #182456 97.55%)",
                        }}
                    >
                        <div className="basis-[60%] flex items-center justify-between w-full h-full">
                            <h1 className="flex-1 text-[#fff] text-[20px] sm:text-[24px] lg:text-[28px] font-semibold pl-[10px] border-l-8 rounded-s-md border-[#52BD91]">
                                Scheme Type
                            </h1>
                        </div>
                    </div>
                </div>

                <div className="w-full pb-[40px] flex flex-col gap-[10px] sm:gap-[15px] lg:gap-[20px] items-center justify-center">
                    <div className="max-w-[1050px] bg-white w-full flex flex-col m-auto max-h-full border-2 border-[#182456] rounded-xl overflow-hidden">
                        <div
                            className="w-full h-[150px] flex flex-col gap-[10px] sm:gap-[15px] lg:gap-[20px] items-center justify-center"
                            style={{
                                background:
                                    "radial-gradient(50% 50% at 50% 50%, rgba(44, 67, 161, 0.00) 0%, rgba(44, 67, 161, 0.18) 100%), url(/receiptbanner.png) lightgray 0px -110.255px / 100% 221.945% no-repeat",
                            }}
                        >
                            <div className="flex items-center justify-center gap-[2px] sm:gap-[4px] lg:gap-[6px]">
                                <img src="/tlogo.png" alt="" />
                                <img src="/textLogo.png" alt="" className="max-w-[170px]" />
                            </div>


                            <div className="flex items-center justify-center gap-[5px] sm:gap-[10px]">
                                <p className="font-semibold underline text-[14px] sm:text-[16px] lg:text-[18px]">
                                    Scheme Type:
                                </p>
                                <select name="schemetype" id="" className='p-[10px] sm:p-[10px] rounded-lg focus:outline-none border border-black' >
                                    <option value="">Select Scheme Type</option>
                                    <option value="">Gold Wallet</option>
                                </select>
                            </div>
                        </div>

                        <div className='w-full h-full flex p-[20px] sm:p-[30px] lg:p-[40px] gap-[10px] sm:gap-[15px] lg:gap-[20px]'>
                            <div className='flex-1 w-full flex flex-col gap-[3px] sm:gap-[5px] lg:gap-[7px]'>
                                <div className='flex items-center justify-between'>
                                    <p className='basis-[50%] text-[14px] sm:text-[16px] lg:text-[18px] text-[#182456] font-semibold'>Scheme Name</p>
                                    <select name="" id="" className='basis-[50%] w-full p-[10px] rounded-lg focus:outline-none border border-black'>
                                        <option value="">Select Name</option>
                                        <option value="">GS-10000</option>
                                        <option value="">GS-1000</option>
                                    </select>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p className='basis-[50%] text-[14px] sm:text-[16px] lg:text-[18px] text-[#182456] font-semibold'>Member Name</p>
                                    <input type='text' id="" className='basis-[50%] w-full p-[10px] rounded-lg focus:outline-none border border-black' placeholder='Enter Member Name'>
                                    </input>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p className='basis-[50%] text-[14px] sm:text-[16px] lg:text-[18px] text-[#182456] font-semibold'>Card No</p>
                                    <input type='text' id="" className='basis-[50%] w-full p-[10px] rounded-lg focus:outline-none border border-black' placeholder='Enter Card No'>
                                    </input>
                                </div>

                                <div className='flex items-center justify-between text-[14px] sm:text-[16px] lg:text-[18px] text-[#182456] font-semibold'>
                                    <p className='basis-[50%] text-[14px] sm:text-[16px] lg:text-[18px] text-[#182456] font-semibold'>Gender</p>
                                    <div className='flex gap-[4px]'>
                                        <input type="checkbox" name="" id="" />
                                        <p className=''>Male</p>
                                    </div>
                                    <div className='flex gap-[4px]'>
                                        <input type="checkbox" name="" id="" />
                                        <p className=''>Female</p>
                                    </div>
                                </div>

                                

                                <div className='flex items-center justify-between'>
                                    <p className='basis-[50%] text-[14px] sm:text-[16px] lg:text-[18px] text-[#182456] font-semibold'>City</p>
                                    <input type='text' id="" className='basis-[50%] w-full p-[10px] rounded-lg focus:outline-none border border-black' placeholder='Enter City'>
                                    </input>
                                </div>

                                <div className='flex items-center justify-between'>
                                    <p className='basis-[50%] text-[14px] sm:text-[16px] lg:text-[18px] text-[#182456] font-semibold'>Address</p>
                                    <textarea rows={2} type='text' id="" className='basis-[50%] w-full p-[10px] rounded-lg focus:outline-none border border-black' placeholder='Enter Your Address'>
                                    </textarea>
                                </div>

                                <div className='flex items-center justify-between'>
                                    <p className='basis-[50%] text-[14px] sm:text-[16px] lg:text-[18px] text-[#182456] font-semibold'>Pincode</p>
                                    <input type='text' id="" className='basis-[50%] w-full p-[10px] rounded-lg focus:outline-none border border-black' placeholder='Enter Pincode'>
                                    </input>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p className='basis-[50%] text-[14px] sm:text-[16px] lg:text-[18px] text-[#182456] font-semibold'>State</p>
                                    <input type='text' id="" className='basis-[50%] w-full p-[10px] rounded-lg focus:outline-none border border-black' placeholder='Enter State'>
                                    </input>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p className='basis-[50%] text-[14px] sm:text-[16px] lg:text-[18px] text-[#182456] font-semibold'>District</p>
                                    <input type='text' id="" className='basis-[50%] w-full p-[10px] rounded-lg focus:outline-none border border-black' placeholder='Enter Member Name'>
                                    </input>
                                </div>

                                <div className='flex items-center justify-between text-[14px] sm:text-[16px] lg:text-[18px] text-[#182456] font-semibold'>
                                    <p className='basis-[50%] text-[14px] sm:text-[16px] lg:text-[18px] text-[#182456] font-semibold'>Collection Point</p>
                                    <div className='flex gap-[4px]'>
                                        <input type="checkbox" name="" id="" />
                                        <p className=''>Shop</p>
                                    </div>
                                    <div className='flex gap-[4px]'>
                                        <input type="checkbox" name="" id="" />
                                        <p className=''>Home</p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex-1 w-full flex flex-col gap-[3px] sm:gap-[5px] lg:gap-[7px]'>
                                <div className='flex items-center justify-between'>
                                    <p className='basis-[50%] text-[14px] sm:text-[16px] lg:text-[18px] text-[#182456] font-semibold'>Land No</p>
                                    <input type='text' id="" className='basis-[50%] w-full p-[10px] rounded-lg focus:outline-none border border-black' placeholder='Enter Member Name'>
                                    </input>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p className='basis-[50%] text-[14px] sm:text-[16px] lg:text-[18px] text-[#182456] font-semibold'>Mobile No1</p>
                                    <input type='text' id="" className='basis-[50%] w-full p-[10px] rounded-lg focus:outline-none border border-black' placeholder='Enter Card No'>
                                    </input>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p className='basis-[50%] text-[14px] sm:text-[16px] lg:text-[18px] text-[#182456] font-semibold'>Mobile No2</p>
                                    <input type='text' id="" className='basis-[50%] w-full p-[10px] rounded-lg focus:outline-none border border-black' placeholder='Enter Card No'>
                                    </input>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p className='basis-[50%] text-[14px] sm:text-[16px] lg:text-[18px] text-[#182456] font-semibold'>Email</p>
                                    <input type='email' id="" className='basis-[50%] w-full p-[10px] rounded-lg focus:outline-none border border-black' placeholder='Enter Card No'>
                                    </input>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p className='basis-[50%] text-[14px] sm:text-[16px] lg:text-[18px] text-[#182456] font-semibold'>DOB</p>
                                    <input type='date' id="" className='basis-[50%] w-full p-[10px] rounded-lg focus:outline-none border border-black' placeholder='Enter City'>
                                    </input>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p className='basis-[50%] text-[14px] sm:text-[16px] lg:text-[18px] text-[#182456] font-semibold'>Anniversary</p>
                                    <input type='date' id="" className='basis-[50%] w-full p-[10px] rounded-lg focus:outline-none border border-black' placeholder='Enter Card No'>
                                    </input>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p className='basis-[50%] text-[14px] sm:text-[16px] lg:text-[18px] text-[#182456] font-semibold'>Nominee</p>
                                    <input type='text' id="" className='basis-[50%] w-full p-[10px] rounded-lg focus:outline-none border border-black' placeholder='Enter Pincode'>
                                    </input>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p className='basis-[50%] text-[14px] sm:text-[16px] lg:text-[18px] text-[#182456] font-semibold'>Mobile No</p>
                                    <input type='text' id="" className='basis-[50%] w-full p-[10px] rounded-lg focus:outline-none border border-black' placeholder='Enter State'>
                                    </input>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p className='basis-[50%] text-[14px] sm:text-[16px] lg:text-[18px] text-[#182456] font-semibold'>Incharge</p>
                                    <input type='text' id="" className='basis-[50%] w-full p-[10px] rounded-lg focus:outline-none border border-black' placeholder='Enter State'>
                                    </input>
                                </div>

                                <div className='flex items-center justify-between'>
                                    <p className='basis-[50%] text-[14px] sm:text-[16px] lg:text-[18px] text-[#182456] font-semibold'>Joining Date</p>
                                    <input type='date' id="" className='basis-[50%] w-full p-[10px] rounded-lg focus:outline-none border border-black' placeholder='Enter Card No'>
                                    </input>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex items-center justify-center gap-[10px] sm:gap-[15px] lg:gap-[20px]">
                        <button
                            className="px-[20px] sm:px-[30px] rounded-md py-[5px] sm:py-[10px] bg-[#52BD91] text-white font-semibold flex items-center justify-center cursor-pointer"
                        >
                            SAVE
                        </button>

                        <div className="px-[20px] sm:px-[30px] rounded-md py-[5px] sm:py-[10px] bg-[#182456] text-white font-semibold flex items-center justify-center cursor-pointer">
                            CANCEL
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SchemeMember
