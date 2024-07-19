"use client";

import React, { useEffect, useState } from "react";

const TodayJoinings = () => {
  const [data, setData] = useState({ totalJoinedToday: 0, users: [] });

  useEffect(() => {
    const fetchJoinedUsers = async () => {
      try {
        const response = await fetch("/api/schememember/fetchjoinings", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            tn: localStorage.getItem("tenantName"),
          },
        });
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error("Error fetching joined users:", err.message);
      }
    };

    fetchJoinedUsers();
  }, []);

  return (
    <div className=" ">
      <div className="flex justify-between items-center w-full bg-gray-200 p-[5px] px-[30px]">
        <h2 className="text-center text-[14px] font-semibold">
          Today Joinings
        </h2>
        <p className="text-[14px] font-semibold">
          Total: {data.totalJoinedToday}
        </p>
      </div>
      <table className="w-full table-auto h-full text-[12px] text-center">
        <thead>
          <tr className="px-1 bg-amber-400">
            {/* <th className='border py-2 '>S.No</th> */}
            <th className="border py-2   text-center">Card No</th>
            <th className="border py-2   text-center">Member Name</th>
            <th className="border py-2   text-center">Scheme Name</th>
          </tr>
        </thead>
        <tbody>
          {data.users.map((user, index) => (
            <tr
              key={index}
              className={`px-1 text-[10px] ${
                index % 2 == 0 ? "bg-white" : "bg-gray-100"
              }`}
            >
              {/* <td className='border py-2'>{index + 1}</td> */}
              <td className="border py-1  text-center">{user.CardNo}</td>
              <td className="border py-1">{user.MemberName}</td>
              <td className="border py-1" style={{ width: "100px" }}>
                {user.SchemeName}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodayJoinings;
