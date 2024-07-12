"use client";

import React, { useEffect, useState } from "react";
import "./Styling.css";

const MemberList = () => {
  const [SchemeData, setShemeData] = useState([null]);
  const [Cardno, setCardno] = useState(null);

  const fetchmember = async (cardno) => {
    try {
      const response = await fetch("/api/schememember/fetchmember", {
        method: "POST",
        body: JSON.stringify({
          cardno: cardno,
        }),
        headers: {
          "Content-Type": "application/json",
          tn: localStorage.getItem("tenantName"),
        },
      });
      const data = await response.json();
      setShemeData(data);
    } catch (e) {
      console.error(e);
    }
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="w-full max-h-[98vh] overflow-auto custom-scrollbar">
      <div className="w-full h-full flex flex-col">
        <div className="px-[10px] sm:px-[20px] lg:px-[20px] py-[5px] sm:py-[10px] lg:py-[10px]">
          <div
            className="w-full h-full px-[15px] sm:px-[30px] lg:px-[45px] py-[10px] sm:py-[10px] lg:py-[10px] rounded-md flex items-center gap-[10px] sm:gap-[15px] lg:gap-[20px]"
            style={{
              background:
                "linear-gradient(270deg, #0A0E16 5.64%, #182456 97.55%)",
            }}
          >
            <div className="basis-[60%] flex items-center justify-between w-full h-full">
              <h1 className="flex-1 text-[#fff] text-[20px] sm:text-[24px] lg:text-[20px] font-semibold pl-[10px] border-l-8 rounded-s-md border-[#52BD91]">
                Member Card
              </h1>

              <div className="flex-1 flex items-center text-center justify-center gap-[3px] sm:gap-[6px] lg:gap-[9px]">
                <p className="text-white text-[14px] sm:text-[15px] lg:text-[14px] font-semibold">
                  Gold Rate
                </p>
                <div className="h-[30px] max-w-[130px] rounded-md w-full px-[5px] sm:px-[10px] lg:px-[15px] bg-white"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-[10px] sm:px-[20px] lg:px-[20px] py-[5px] sm:py-[10px] lg:py-[5px] w-full max-h-full flex gap-[10px] sm:gap-[15px] lg:gap-[20px]">
          <div className="basis-[75%] w-full flex flex-col gap-[5px] sm:gap-[10px] lg:gap-[15px]">
            <div className="flex w-full gap-[5px] sm:gap-[10px] lg:gap-[15px]">
              <div className="basis-[25%] w-full flex items-center justify-start gap-[10px]">
                <p className="text-[12px] sm:text-[12px] lg:text-[12px] text-[#182456] font-semibold">
                  Card No
                </p>
                <input
                  type="text"
                  value={Cardno}
                  className="h-full py-[2px] max-w-[120px] text-center bg-[#4FC997] text-white font-bold focus:outline-none rounded-lg text-[14px] border border-[#000] px-[5px] sm:px-[5px] lg:px-[5px]"
                  onChange={(e) => setCardno(e.target.value)}
                />
              </div>
              <button
                className="basis-[10%] bg-[#182456] text-white h-full py-[2px] border-2 rounded-lg cursor-pointer text-[12px] border-black flex items-center justify-center "
                onClick={() => fetchmember(Cardno)}
              >
                Submit
              </button>
              <div className="basis-[50%] w-full flex items-center justify-between gap-[5px] sm:gap-[7px] lg:gap-[10px]">
                <p className="basis-[20%] text-[12px] sm:text-[12px] lg:text-[12px] text-[#182456] font-semibold">
                  Scheme Type
                </p>
                <div className="basis-[80%]">
                  <input
                    type="text"
                    value={SchemeData?.member?.SchemeType}
                    className="w-full max-w-[200px] h-full py-[2px] focus:outline-none text-[14px] rounded-md border border-[#000] px-[5px] sm:px-[10px] lg:px-[15px]"
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex gap-[7px] sm:gap-[14px] lg:gap-[10px]">
              <div className="basis-[35%] flex w-full col-span-1 items-center justify-between">
                <p className="basis-[35%] text-[12px] sm:text-[12px] lg:text-[12px] text-[#182456] font-semibold">
                  Member Name
                </p>
                <input
                  type="text"
                  value={SchemeData?.member?.MemberName}
                  className="basis-[65%] text-[12px] py-[2px] focus:outline-none rounded-md border border-[#000] px-[5px] sm:px-[10px] lg:px-[5px]"
                  readOnly
                />
              </div>

              <div className="basis-[35%] w-full flex col-span-1 items-center justify-between gap-[5px] sm:gap-[7px] lg:gap-[10px]">
                <p className="basis-[30%] text-[12px] sm:text-[14px] lg:text-[12px] text-[#182456] font-semibold">
                  Scheme Name
                </p>
                <div className="basis-[67%]">
                  <input
                    type="text"
                    value={SchemeData?.member?.SchemeName}
                    className="w-full h-full py-[2px] focus:outline-none text-[12px] rounded-md border border-[#000] px-[5px] sm:px-[10px] lg:px-[15px]"
                    readOnly
                  />
                </div>
              </div>
              <div className="basis-[30%] w-full flex items-center justify-center gap-[5px] sm:gap-[7px] lg:gap-[10px]">
                <p className="basis-[40%] text-[12px] sm:text-[12px] text-[#182456] font-semibold">
                  No. of Months
                </p>
                <div className="basis-[60%]">
                  <input
                    type="text"
                    value={SchemeData?.scheme?.SchemeDuration}
                    className="w-full h-full py-[2px] focus:outline-none text-[12px] rounded-md border border-[#000] px-[5px] sm:px-[10px] lg:px-[15px]"
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="w-full my-[10px] sm:my-[15px] lg:my-[10px] max-h-[380px] overflow-auto custom-scrollbar2">
              <table className="table-auto w-full text-[14px] sm:text-[12px] h-full">
                <tr className="bg-[#4FC997] text-white">
                  <th className="py-[5px] sm:py-[10px] lg:py-[15px] px-[3px] sm:px-[6px] lg:px-[9px]">
                    Sno
                  </th>
                  <th className="py-[5px] sm:py-[10px] lg:py-[15px] px-[3px] sm:px-[6px] lg:px-[9px]">
                    Month
                  </th>
                  <th className="py-[5px] sm:py-[10px] lg:py-[15px] px-[3px] sm:px-[6px] lg:px-[9px]">
                    Rec No
                  </th>
                  <th className="py-[5px] sm:py-[10px] lg:py-[15px] px-[3px] sm:px-[6px] lg:px-[9px]">
                    Rec Date
                  </th>
                  <th className="py-[5px] sm:py-[10px] lg:py-[15px] px-[3px] sm:px-[6px] lg:px-[9px]">
                    Rec Amount
                  </th>
                  <th className="py-[5px] sm:py-[10px] lg:py-[15px] px-[3px] sm:px-[6px] lg:px-[9px]">
                    Gold Wt
                  </th>
                  <th className="py-[5px] sm:py-[10px] lg:py-[15px] px-[3px] sm:px-[6px] lg:px-[9px]">
                    Gold(1 Gram)
                  </th>
                  <th className="py-[5px] sm:py-[10px] lg:py-[15px] px-[3px] sm:px-[6px] lg:px-[9px]">
                    Mode Of Pay
                  </th>
                  <th className="py-[5px] sm:py-[10px] lg:py-[15px] px-[3px] sm:px-[6px] lg:px-[9px]">
                    Balance
                  </th>
                </tr>
                {SchemeData?.receipt?.map((item, index) => (
                  <>
                    <tr
                      className={`px-1 text-[12px] text-[#172561] ${
                        index % 2 == 0 ? "bg-white" : "bg-[#EAFFF6]"
                      }`}
                    >
                      <th className="py-[5px] sm:py-[10px] lg:py-[15px] px-[3px] sm:px-[6px] lg:px-[9px]">
                        {index + 1}
                      </th>
                      <th className="py-[5px] sm:py-[10px] lg:py-[15px] px-[3px] sm:px-[6px] lg:px-[9px]">
                        {SchemeData?.member?.JoinDate &&
                          (() => {
                            const joinDate = new Date(
                              SchemeData?.member?.JoinDate
                            );
                            joinDate.setMonth(joinDate.getMonth() + index);
                            const formattedDate = `${joinDate.getDate()}-${
                              joinDate.getMonth() + 1
                            }-${joinDate.getFullYear()}`;
                            return formattedDate;
                          })()}
                      </th>
                      <th className="py-[5px] sm:py-[10px] lg:py-[15px] px-[3px] sm:px-[6px] lg:px-[9px]">
                        {item.ReceiptNo}
                      </th>
                      <th className="py-[5px] sm:py-[10px] lg:py-[15px] px-[3px] sm:px-[6px] lg:px-[9px]">
                        {formatDate(item.ReceiptDate)}
                      </th>
                      <th className="py-[5px] sm:py-[10px] lg:py-[15px] px-[3px] sm:px-[6px] lg:px-[9px]">
                        {item.Amount}
                      </th>
                      <th className="py-[5px] sm:py-[10px] lg:py-[15px] px-[3px] sm:px-[6px] lg:px-[9px]">
                        {item.GoldWt}
                      </th>
                      <th className="py-[5px] sm:py-[10px] lg:py-[15px] px-[3px] sm:px-[6px] lg:px-[9px]">
                        {item.GoldAmount}
                      </th>
                      <th className="py-[5px] sm:py-[10px] lg:py-[15px] px-[3px] sm:px-[6px] lg:px-[9px]">
                        {item.PaymentMode}
                      </th>
                      <th className="py-[5px] sm:py-[10px] lg:py-[15px] px-[3px] sm:px-[6px] lg:px-[9px]">
                        -
                      </th>
                    </tr>
                  </>
                ))}
                {Array.from({
                  length:
                    (SchemeData?.scheme?.SchemeDuration || 0) -
                    (Object.keys(SchemeData?.receipt || {})?.length || 0),
                }).map((_, index) => (
                  <>
                    <tr
                      className={`px-1 text-[12px] text-[#172561] ${
                        index % 2 == 0 ? "bg-white" : "bg-[#EAFFF6]"
                      }`}
                    >
                      <th className="py-[5px] sm:py-[10px] lg:py-[15px] px-[3px] sm:px-[6px] lg:px-[9px]">
                        {(Object.keys(SchemeData?.receipt || {})?.length || 0) +
                          index +
                          1}
                      </th>
                      <th className="py-[5px] sm:py-[10px] lg:py-[15px] px-[3px] sm:px-[6px] lg:px-[9px]">
                        {SchemeData?.member?.JoinDate &&
                          (() => {
                            const joinDate = new Date(
                              SchemeData?.member?.JoinDate
                            );
                            joinDate.setMonth(
                              joinDate.getMonth() +
                                (Object.keys(SchemeData?.receipt || {})
                                  ?.length || 0) +
                                index +
                                1
                            );
                            const formattedDate = `${joinDate.getDate()}-${joinDate.getMonth()}-${joinDate.getFullYear()}`;
                            return formattedDate;
                          })()}
                      </th>
                      <th className="py-[5px] sm:py-[10px] lg:py-[15px] px-[3px] sm:px-[6px] lg:px-[9px]">
                        -
                      </th>
                      <th className="py-[5px] sm:py-[10px] lg:py-[15px] px-[3px] sm:px-[6px] lg:px-[9px]">
                        -
                      </th>
                      <th className="py-[5px] sm:py-[10px] lg:py-[15px] px-[3px] sm:px-[6px] lg:px-[9px]">
                        -
                      </th>
                      <th className="py-[5px] sm:py-[10px] lg:py-[15px] px-[3px] sm:px-[6px] lg:px-[9px]">
                        -
                      </th>
                      <th className="py-[5px] sm:py-[10px] lg:py-[15px] px-[3px] sm:px-[6px] lg:px-[9px]">
                        -
                      </th>
                      <th className="py-[5px] sm:py-[10px] lg:py-[15px] px-[3px] sm:px-[6px] lg:px-[9px]">
                        -
                      </th>
                      <th className="py-[5px] sm:py-[10px] lg:py-[15px] px-[3px] sm:px-[6px] lg:px-[9px]">
                        {SchemeData?.scheme?.SchemeAmount}
                      </th>
                    </tr>
                  </>
                ))}
              </table>
            </div>

            <div className="w-full grid grid-cols-3 bg-[#4FC997] py-2 gap-[7px] sm:gap-[14px] lg:gap-[20px] px-[20px]">
              <div className="w-full flex items-center justify-center gap-[5px] sm:gap-[7px] lg:gap-[10px]">
                <p className="text-[12px] sm:text-[12px] text-[#182456] font-semibold">
                  Scheme Amount
                </p>
                <div className="flex-1">
                  <input
                    type="text"
                    value={
                      SchemeData?.scheme?.SchemeValue -
                      (SchemeData?.scheme?.BonusAmount || 0)
                    }
                    className="max-w-[150px] w-full h-full py-[2px] text-right focus:outline-none rounded-md border border-[#000] px-[5px] sm:px-[10px] lg:px-[15px]"
                    readOnly
                  />
                </div>
              </div>
              <div className="w-full flex items-center justify-center gap-[5px] sm:gap-[7px] lg:gap-[10px]">
                <p className="text-[12px] sm:text-[12px] text-[#182456] font-semibold">
                  Tot.GoldWT
                </p>
                <div className="max-w-[150px]">
                  <input
                    type="text"
                    value={
                      SchemeData?.receipt?.reduce(
                        (accumulator, currentItem) =>
                          accumulator + currentItem.GoldWt,
                        0
                      ) || []
                    }
                    className="w-full h-full py-[2px] text-right focus:outline-none rounded-md border border-[#000] px-[5px] sm:px-[10px] lg:px-[15px]"
                    readOnly
                  />
                </div>
              </div>
              <div className="w-full flex items-center justify-center gap-[5px] sm:gap-[7px] lg:gap-[10px]">
                <p className="text-[12px] sm:text-[12px] text-[#182456] font-semibold">
                  Total Paid
                </p>
                <div className="max-w-[150px]">
                  <input
                    type="text"
                    value={
                      SchemeData?.receipt?.reduce(
                        (accumulator, currentItem) =>
                          accumulator + currentItem.Amount,
                        0
                      ) || []
                    }
                    className="w-full text-right h-full py-[2px] focus:outline-none rounded-md border border-[#000] px-[5px] sm:px-[10px] lg:px-[15px]"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="basis-[25%] border-l-2 border-black flex flex-col gap-[10px] sm:gap-[13px] lg:gap-[7px]">
            <div className="flex flex-col gap-[3px] sm:gap-[5px] lg:gap-[3px] px-[10px]">
              <h1 className="text-[14px] sm:text-[14px] lg:text-[14px] font-bold underline text-[#182456]">
                Scheme Details
              </h1>
              <div className="w-full flex flex-col items-center justify-start gap-[7px] sm:gap-[14px] lg:gap-[7px]">
                <div
                  style={{
                    background:
                      "radial-gradient(35.46% 49.1% at 49.1% 50%, #EEF2FF 0%, #DAE2FF 100%)",
                  }}
                  className="rounded-md flex flex-row items-center justify-between gap-[5px] border-gray-500 h-full w-full p-[4px]"
                >
                  <p className="text-[12px] font-semibold">Scheme Join Date:</p>
                  <p className="text-[12px]">{SchemeData?.member?.JoinDate}</p>
                </div>

                <div
                  style={{
                    background:
                      "radial-gradient(35.46% 49.1% at 49.1% 50%, #EEF2FF 0%, #DAE2FF 100%)",
                  }}
                  className="rounded-md flex flex-row items-center justify-between gap-[5px] border-gray-500 h-full w-full p-[4px]"
                >
                  <p className="text-[12px] font-semibold">Scheme Amount:</p>
                  <p className="text-[12px]">
                    {SchemeData?.scheme?.SchemeAmount}
                  </p>
                </div>

                <div
                  style={{
                    background:
                      "radial-gradient(35.46% 49.1% at 49.1% 50%, #EEF2FF 0%, #DAE2FF 100%)",
                  }}
                  className="rounded-md flex flex-row items-center justify-between gap-[5px] border-gray-500 h-full w-full p-[4px]"
                >
                  <p className="text-[12px] font-semibold">Bonus Amount:</p>
                  <p className="text-[12px]">
                    {SchemeData?.scheme?.BonusAmount}
                  </p>
                </div>

                <div
                  style={{
                    background:
                      "radial-gradient(35.46% 49.1% at 49.1% 50%, #EEF2FF 0%, #DAE2FF 100%)",
                  }}
                  className="rounded-md flex flex-row items-center justify-between gap-[5px] border-gray-500 h-full w-full p-[4px]"
                >
                  <p className="text-[12px] font-semibold">
                    Total Scheme Amount:
                  </p>
                  <p className="text-[12px]">
                    {SchemeData?.scheme?.SchemeValue}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[3px] sm:gap-[5px] lg:gap-[3px] px-[10px]">
              <h1 className="text-[14px] sm:text-[14px] lg:text-[14px] font-bold underline text-[#182456]">
                Pending Dues
              </h1>
              <div className="w-full flex flex-col items-center justify-start gap-[7px] sm:gap-[14px] lg:gap-[7px]">
                <div
                  style={{
                    background:
                      "radial-gradient(35.46% 49.1% at 49.1% 50%, #EEF2FF 0%, #DAE2FF 100%)",
                  }}
                  className="rounded-md flex flex-row items-center justify-between gap-[5px] border-gray-500 h-full w-full p-[4px]"
                >
                  <p className="text-[12px] font-semibold">Pending Dues:</p>
                  <p className="text-[12px]">
                    {(SchemeData &&
                      SchemeData.receipt &&
                      Object.keys(SchemeData.receipt).length) *
                      (SchemeData &&
                        SchemeData.scheme &&
                        SchemeData.scheme.SchemeAmount) -
                      (SchemeData?.receipt?.reduce(
                        (accumulator, currentItem) =>
                          accumulator + currentItem.Amount,
                        0
                      ) || []) || []}
                  </p>
                </div>

                <div
                  style={{
                    background:
                      "radial-gradient(35.46% 49.1% at 49.1% 50%, #EEF2FF 0%, #DAE2FF 100%)",
                  }}
                  className="rounded-md flex flex-row items-center justify-between gap-[5px] border-gray-500 h-full w-full p-[4px]"
                >
                  <p className="text-[12px] font-semibold">Paid Months:</p>
                  <p className="text-[12px]">
                    {Object.keys(SchemeData?.receipt || {})?.length || 0}
                  </p>
                </div>

                <div
                  style={{
                    background:
                      "radial-gradient(35.46% 49.1% at 49.1% 50%, #EEF2FF 0%, #DAE2FF 100%)",
                  }}
                  className="rounded-md flex flex-row items-center justify-between gap-[5px] border-gray-500 h-full w-full p-[4px]"
                >
                  <p className="text-[12px] font-semibold">Balance Months:</p>
                  <p className="text-[12px]">
                    {(SchemeData?.scheme?.SchemeDuration || 0) -
                      (Object.keys(SchemeData?.receipt || {})?.length || 0)}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[3px] sm:gap-[5px] lg:gap-[3px] px-[10px]">
              <h1 className="text-[14px] sm:text-[14px] lg:text-[14px] font-bold underline text-[#182456]">
                Bill Details
              </h1>
              <div className="w-full flex flex-col items-center justify-start gap-[7px] sm:gap-[14px] lg:gap-[7px]">
                <div
                  style={{
                    background:
                      "radial-gradient(35.46% 49.1% at 49.1% 50%, #EEF2FF 0%, #DAE2FF 100%)",
                  }}
                  className="rounded-md flex flex-row items-center justify-between gap-[5px] border-gray-500 h-full w-full p-[4px]"
                >
                  <p className="text-[12px] font-semibold">Bill No:</p>
                  <p className="text-[12px]">
                    {SchemeData?.receipt && SchemeData.receipt.length > 0
                      ? SchemeData.receipt[SchemeData.receipt.length - 1]
                          .ReceiptNo
                      : ""}
                  </p>
                </div>

                <div
                  style={{
                    background:
                      "radial-gradient(35.46% 49.1% at 49.1% 50%, #EEF2FF 0%, #DAE2FF 100%)",
                  }}
                  className="rounded-md flex flex-row items-center justify-between gap-[5px] border-gray-500 h-full w-full p-[4px]"
                >
                  <p className="text-[12px] font-semibold">Bill Date:</p>
                  <p className="text-[12px]">
                    {SchemeData?.receipt && SchemeData.receipt.length > 0
                      ? SchemeData.receipt[SchemeData.receipt.length - 1]
                          .ReceiptDate
                      : ""}
                  </p>
                </div>

                <div
                  style={{
                    background:
                      "radial-gradient(35.46% 49.1% at 49.1% 50%, #EEF2FF 0%, #DAE2FF 100%)",
                  }}
                  className="rounded-md flex flex-row items-center justify-between gap-[5px] border-gray-500 h-full w-full p-[4px]"
                >
                  <p className="text-[12px] font-semibold">Jewel Type:</p>
                  <p className="text-[12px]">
                    {SchemeData?.receipt && SchemeData.receipt.length > 0
                      ? SchemeData.receipt[SchemeData.receipt.length - 1].GoldWt
                      : ""}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[3px] sm:gap-[5px] lg:gap-[3px] px-[10px]">
              <h1 className="text-[14px] sm:text-[14px] lg:text-[14px] font-bold underline text-[#182456]">
                Settlement Detail{" "}
              </h1>
              <div className="w-full flex flex-col items-center justify-start gap-[7px] sm:gap-[14px] lg:gap-[7px]">
                <div
                  style={{
                    background:
                      "radial-gradient(35.46% 49.1% at 49.1% 50%, #EEF2FF 0%, #DAE2FF 100%)",
                  }}
                  className="rounded-md flex flex-row items-center justify-between gap-[5px] border-gray-500 h-full w-full p-[4px]"
                >
                  <p className="text-[12px] font-semibold">Settlement No:</p>
                  <p className="text-[12px]">
                    {SchemeData?.settlement?.id || "-"}
                  </p>
                </div>

                <div
                  style={{
                    background:
                      "radial-gradient(35.46% 49.1% at 49.1% 50%, #EEF2FF 0%, #DAE2FF 100%)",
                  }}
                  className="rounded-md flex flex-row items-center justify-between gap-[5px] border-gray-500 h-full w-full p-[4px]"
                >
                  <p className="text-[12px] font-semibold">Settlement Date:</p>
                  <p className="text-[12px]">
                    {(SchemeData?.settlement?.Date &&
                      formatDate(SchemeData?.settlement?.Date)) ||
                      "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberList;
