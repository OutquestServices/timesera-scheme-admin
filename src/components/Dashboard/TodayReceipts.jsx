"use client";

import React, { useEffect, useState } from 'react';

const TodayReceipts = () => {
    const [receipts, setReceipts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReceipts = async () => {
            try {
                const response = await fetch('/api/receipt/fetchtodayreceipts');
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                const data = await response.json();
                setReceipts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReceipts();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className='p-[5px]'>
            <div className='flex justify-between items-center w-full mb-2'>
                <h2 className='text-center text-[14px] font-semibold'>Today Receipts</h2>
                <p className='text-[14px] font-semibold'>Total: {receipts?.length}</p>
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
                    {receipts.map((receipt, index) => (
                        <tr className='px-1' key={index}>
                            <td className='border  py-2'>{index + 1}</td>
                            <td className='border  py-2'>{receipt.CardNo}</td>
                            <td className='border  py-2'>{receipt.MemberName}</td>
                            <td className='border  py-2'>{receipt.SchemeName}</td>
                            <td className='border  py-2'>{receipt.Amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TodayReceipts;
