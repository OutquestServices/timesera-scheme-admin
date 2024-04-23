import React from 'react'

const page = () => {
    return (
        <div className='w-full h-screen flex flex-col items-center justify-center gap-[10px]'>
            <form action="" className='flex flex-col gap-[10px]'>
                <div className='flex gap-[10px] items-center '>
                    <label htmlFor="schemtype">Scheme Type:</label>
                    <select name="schemetype" id="" className='mx-auto focus:outline-none border border-black p-[5px] rounded-lg'>
                        <option value="">Select Scheme</option>
                        <option value="gold">Gold Wallet</option>
                        <option value="gold">Silver Wallet</option>
                    </select>
                </div>
                <div className='flex gap-[10px] items-center '>
                    <label htmlFor="schemename">Scheme Name:</label>
                    <input type="text" name='schemename' placeholder='Enter Scheme Name' className='focus:outline-none p-[5px] rounded-lg border border-black' />
                </div>
                <div className='flex gap-[10px] items-center '>
                    <label htmlFor="schemeamount">Scheme Amount:</label>
                    <input type="number" name='schemeamount' placeholder='Enter Scheme amount' className='focus:outline-none p-[5px] rounded-lg border border-black' />
                </div>
                <div className='flex gap-[10px] items-center '>
                    <label htmlFor="schemeduration">Scheme Duration:</label>
                    <input type="number" name='schemeduration' placeholder='Enter Scheme duration' className='focus:outline-none p-[5px] rounded-lg border border-black' />
                </div>
                <div className='flex gap-[10px] items-center '>
                    <label htmlFor="schemepeople">No.Of Persons:</label>
                    <input type="number" name='schemepeople' placeholder='Enter no of people' className='focus:outline-none p-[5px] rounded-lg border border-black' />
                </div>
                <div className='flex gap-[10px] items-center '>
                    <label htmlFor="schemebonus">Bonus Amount:</label>
                    <input type="number" name='schemebonus' placeholder='Enter Bonus Amount' className='focus:outline-none p-[5px] rounded-lg border border-black' />
                </div>
                <div className='flex gap-[10px] items-center '>
                    <label htmlFor="schemebonusmonths">Bonus Months:</label>
                    <input type="number" name='schemebonusmonths' placeholder='Enter Bonus Months' className='focus:outline-none p-[5px] rounded-lg border border-black' />
                </div>
                <div className='flex gap-[10px] items-center '>
                    <label htmlFor="schemevalue">Scheme Value:</label>
                    <input type="number" name='schemevalue' placeholder='Enter Scheme Value' className='focus:outline-none p-[5px] rounded-lg border border-black' />
                </div>
                <div className='flex gap-[10px] items-center justify-center '>
                    <input type="submit" className='border border-black p-[5px] rounded-md px-[20px]' />
                </div>
            </form>
        </div>
    )
}

export default page
