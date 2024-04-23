import React from 'react'

const page = () => {
    return (
        <div className='w-full h-screen flex flex-col items-center justify-center gap-[10px]'>
            <form action="" className='flex flex-col gap-[10px]'>
                <div className='flex gap-[10px] items-center '>
                    <label htmlFor="schemtype">Scheme Type:</label>
                    <input type="text" name='schemetype' placeholder='Enter Scheme Type' className='focus:outline-none p-[5px] rounded-lg border border-black' />
                </div>
                <div className='flex gap-[10px] items-center '>
                    <label htmlFor="schemtype">Group Code:</label>
                    <input type="text" name='schemetype' placeholder='Enter Group Code' className='focus:outline-none p-[5px] rounded-lg border border-black' />
                </div>
                <div className='flex gap-[10px] items-center mx-auto'>
                    <select name="scheme" id="" className='mx-auto focus:outline-none border border-black p-[5px] rounded-lg'>
                        <option value="">Select Scheme</option>
                        <option value="gold">Gold Scheme</option>
                        <option value="gold">Cash Scheme</option>
                    </select>
                </div>
                <div className='flex gap-[10px] items-center justify-center '>
                    <input type="submit" className='border border-black p-[5px] rounded-md px-[20px]' />
                </div>
            </form>
        </div>
    )
}

export default page
