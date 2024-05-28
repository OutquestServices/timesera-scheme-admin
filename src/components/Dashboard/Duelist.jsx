"use client";

import React, { useEffect, useState } from 'react'

const Duelist = () => {

    const [duelist, setDuelist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDuelist = async () => {
            try {
                const response = await fetch('/api/duelist');
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                const data = await response.json();
                setDuelist(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDuelist();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className='p-[5px]'>
            <div className='flex justify-between items-center w-full mb-2'>
                <h2 className='text-center text-[14px] font-semibold'>Today Duelists</h2>
                <p className='text-[14px] font-semibold'>Total: {duelist?.length}</p>
            </div>
            <table className='w-full text-left text-[12px]'>
                <thead>
                    <tr className='px-1'>
                        <th className='border py-2'>S.No</th>
                        <th className='border py-2'>Card No</th>
                        <th className='border py-2'>Member Name</th>
                        <th className='border py-2'>Scheme Name</th>
                        <th className='border py-2'>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {duelist.map((due, index) => (
                        <tr className='px-1' key={index}>
                            <td className='border  py-2'>{index + 1}</td>
                            <td className='border  py-2'>{due.CardNo}</td>
                            <td className='border  py-2'>{due.MemberName}</td>
                            <td className='border  py-2'>{due.SchemeName}</td>
                            <td className='border  py-2'>{due.Amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Duelist
