"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const TodayReceipts = () => {
  const [receipts, setReceipts] = useState([]);
  const [tenantName, setTenantName] = useState(null);
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("tenantName")) {
      router.push("/");
    }
    setTenantName(localStorage.getItem("tenantName"));
  }, []);

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const response = await fetch(`/api/receipt/fetchtodayreceipts`, {
          method: "GET",
          headers: {
            tn: tenantName,
          },
        });
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        const data = await response.json();
        setReceipts(data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchReceipts();
  }, [tenantName]);

  return (
    <div className="">
      <div className="flex justify-between items-center w-full bg-gray-200 p-[5px] px-[30px]">
        <h2 className="text-center text-[14px] font-semibold">
          Today Receipts
        </h2>
        <p className="text-[14px] font-semibold">Total: {receipts?.length}</p>
      </div>
      <table className="w-full text-left text-[12px]">
        <thead>
          <tr className="px-1 bg-blue-400">
            {/* <th className='border py-2'>S.No</th> */}
            <th className="border py-2 text-center">Card No</th>
            <th className="border py-2 text-center">Member Name</th>
            <th className="border py-2 text-center">Scheme Name</th>
            <th className="border py-2 text-center">Amount</th>
          </tr>
        </thead>
        <tbody>
          {receipts.map((receipt, index) => (
            <tr
              className={`px-1 text-[10px] ${index % 2 == 0 ? "bg-white" : "bg-gray-100"
                }`}
              key={index}
            >
              {/* <td className='border  py-2'>{index + 1}</td> */}
              <td className="border  py-1 text-center">{receipt.CardNo}</td>
              <td className="border  py-1">{receipt.MemberName}</td>
              <td className="border  py-1">{receipt.SchemeName}</td>
              <td className="border  py-1 text-center">{receipt.Amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodayReceipts;
