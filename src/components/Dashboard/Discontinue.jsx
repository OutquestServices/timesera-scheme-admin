"use client";

import React, { useEffect, useState } from 'react'

const Discontinue = () => {

    const [discontinue, setDiscontinue] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDuelist = async () => {
            try {
                const response = await fetch('/api/memberdiscontinue/todaymembers');
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                const data = await response.json();
                setDiscontinue(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDuelist();
    }, []);

    //if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error}</p>;

    return (
        <div className='p-[5px]'>
            <div className='flex justify-between items-center w-full mb-2'>
                <h2 className='text-center text-[14px] font-semibold'>Today Discontinues</h2>
                <p className='text-[14px] font-semibold'>Total: {discontinue?.length}</p>
            </div>
            <table className='w-full text-left text-[12px]'>
                <thead>
                    <tr className='px-1'>
                        <th className='border py-2'>S.No</th>
                        <th className='border py-2'>Card No</th>
                        <th className='border py-2'>Scheme Type</th>
                        <th className='border py-2'>Scheme Name</th>
                        <th className='border py-2'>Voucher No</th>
                    </tr>
                </thead>
                <tbody>
                    {discontinue.map((dis, index) => (
                        <tr className='px-1' key={index}>
                            <td className='border  py-2'>{index + 1}</td>
                            <td className='border  py-2'>{dis.CardNo}</td>
                            <td className='border  py-2'>{dis.SchemeType}</td>
                            <td className='border  py-2'>{dis.SchemeName}</td>
                            <td className='border  py-2'>{dis.VoucherNo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Discontinue
