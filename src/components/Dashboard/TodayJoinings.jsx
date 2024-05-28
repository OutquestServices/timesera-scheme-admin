"use client";

import React, { useEffect, useState } from 'react'

const TodayJoinings = () => {

    const [data, setData] = useState({ totalJoinedToday: 0, users: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJoinedUsers = async () => {
            try {
                const response = await fetch('/api/schememember/fetchjoinings');
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJoinedUsers();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className='p-[5px]'>
            <div className='flex justify-between items-center w-full mb-2'>
                <h2 className='text-center text-[14px] font-semibold'>Today Joinings</h2>
                <p className='text-[14px] font-semibold'>Total: {data.totalJoinedToday}</p>
            </div>
            <table className='w-full table-auto h-full text-[12px] text-center'>
                <thead>
                    <tr className='px-1'>
                        <th className='border py-2'>S.No</th>
                        <th className='border py-2'>Card No</th>
                        <th className='border py-2'>Member Name</th>
                        <th className='border py-2'>Scheme Name</th>
                    </tr>
                </thead>
                <tbody>
                    {data.users.map((user, index) => (
                        <tr key={index} className='px-1'>
                            <td className='border py-2'>{index + 1}</td>
                            <td className='border py-2'>{user.CardNo}</td>
                            <td className='border py-2'>{user.MemberName}</td>
                            <td className='border  py-2'>{user.SchemeName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TodayJoinings
