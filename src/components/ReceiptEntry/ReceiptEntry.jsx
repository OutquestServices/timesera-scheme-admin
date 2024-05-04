"use client";

import React, { useState } from "react";

const ReceiptEntry = () => {
  const [CardNo, setCardNo] = useState("");
  const [ShemeData, setShemeData] = useState({});
  const [receiptData, setReceiptData] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [receiptNo, setReceiptNo] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [paymentMode, setPaymentMode] = useState("");
  const [amount, setAmount] = useState(null);
  const [GoldWt, setGoldWt] = useState(null);
  const [GoldAmount, setGoldAmount] = useState(null);
  const [Description, setDescription] = useState("");
  const [Incharge, setIncharge] = useState("");
  const [accno, setAccno] = useState("");

  const fetchmember = async () => {
    try {
      const response = await fetch("/api/schememember/fetchmember", {
        method: "POST",
        body: JSON.stringify({
          cardno: CardNo,
        }),
      });
      const data = await response.json();
      setShemeData(data);
    } catch (e) {
      console.error(e);
    }
  };

  const createReceipt = async () => {
    try {
      const response = await fetch("/api/receipt/createreceipt", {
        method: "POST",
        body: JSON.stringify({
          rno: receiptNo + "-" + ShemeData?.receipt?.length + 1,
          cardno: CardNo,
          rdate: receiptData,
          mno: ShemeData?.member?.Mobile1,
          mname: ShemeData?.member?.MemberName,
          address: ShemeData?.member?.Address,
          cpoint: selectedOption,
          pmode: paymentMode,
          accno: accno,
          desc: Description,
          amount: parseFloat(amount),
          gamount: parseFloat(GoldAmount),
          incharge: Incharge,
          gweight: parseFloat(GoldWt),
        }),
      });
      const data = await response.json();
      window.alert("Receipt Created Successfully");
      setAccno("");
      setAmount("");
      setDescription("");
      setGoldAmount("");
      setGoldWt("");
      setIncharge("");
      setPaymentMode("");
      setReceiptData(new Date().toISOString().split("T")[0]);
      setReceiptNo("");
      setSelectedOption(null);
      setShemeData({});
      setCardNo("");
    } catch (e) {
      console.error(e);
      window.alert("Error Occured while creating Receipt");
      setAccno("");
      setAmount("");
      setDescription("");
      setGoldAmount("");
      setGoldWt("");
      setIncharge("");
      setPaymentMode("");
      setReceiptData(new Date().toISOString().split("T")[0]);
      setReceiptNo("");
      setSelectedOption(null);
      setShemeData({});
      setCardNo("");
    }
  };

  return (
    <div className="w-full max-h-[100000px]">
      <div className="w-full h-full flex flex-col gap-[10px] sm:gap-[15px] lg:gap-[20px]">
        <div className="px-[10px] sm:px-[20px] lg:px-[40px] py-[5px] sm:py-[10px] lg:py-[15px]">
          <div
            className="w-full h-full px-[15px] sm:px-[30px] lg:px-[45px] py-[10px] sm:py-[15px] lg:py-[20px] rounded-md flex items-center gap-[5px] sm:gap-[8px] lg:gap-[12px]"
            style={{
              background:
                "linear-gradient(270deg, #0A0E16 5.64%, #182456 97.55%)",
            }}
          >
            <div className="basis-[50%] flex items-center justify-between w-full h-full">
              <h1 className="text-[#fff] text-[20px] sm:text-[24px] lg:text-[28px] font-semibold pl-[10px] border-l-8 rounded-s-md border-[#52BD91]">
                Receipt Entry
              </h1>

              <div className="flex flex-col items-center text-center justify-center">
                <p className="text-white text-[14px] sm:text-[15px] lg:text-[16px] font-semibold">
                  Financial Year
                </p>
                <p className="text-[#52BD91] text-[16px] sm:text-[17px] lg:text-[18px] font-bold">
                  {new Date().getFullYear()}-{new Date().getFullYear() + 1}
                </p>
              </div>
            </div>
            <div className="basis-[50%] w-full h-full flex items-center gap-[10px] sm:gap-[20px] lg:gap-[30px]">
              <div className="grid grid-cols-4 w-full h-full items-center justify-center gap-[5px] sm:gap-[8px] lg:gap-[12px]">
                <div className="cursor-pointer h-[45px] w-full px-[5px] sm:px-[10px] lg:px-[15px] flex items-center justify-center gap-[5px] bg-[#52BD91] rounded-md">
                  <p className="text-white font-bold">ADD</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0.149414 9C0.149414 4.30545 3.97146 0.5 8.68649 0.5C13.4015 0.5 17.2236 4.30545 17.2236 9C17.2236 13.6946 13.4015 17.5 8.68649 17.5C3.97146 17.5 0.149414 13.6946 0.149414 9ZM8.68649 2.2C6.87515 2.2 5.138 2.91643 3.85719 4.19167C2.57638 5.46692 1.85683 7.19653 1.85683 9C1.85683 10.8035 2.57638 12.5331 3.85719 13.8083C5.138 15.0836 6.87515 15.8 8.68649 15.8C10.4978 15.8 12.235 15.0836 13.5158 13.8083C14.7966 12.5331 15.5161 10.8035 15.5161 9C15.5161 7.19653 14.7966 5.46692 13.5158 4.19167C12.235 2.91643 10.4978 2.2 8.68649 2.2Z"
                      fill="#F8F8F8"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9.5404 4.74999C9.5404 4.52456 9.45046 4.30836 9.29036 4.14895C9.13026 3.98955 8.91311 3.89999 8.6867 3.89999C8.46028 3.89999 8.24313 3.98955 8.08303 4.14895C7.92293 4.30836 7.83299 4.52456 7.83299 4.74999V8.14999H4.41816C4.19174 8.14999 3.9746 8.23955 3.8145 8.39895C3.6544 8.55836 3.56445 8.77456 3.56445 8.99999C3.56445 9.22543 3.6544 9.44163 3.8145 9.60103C3.9746 9.76044 4.19174 9.84999 4.41816 9.84999H7.83299V13.25C7.83299 13.4754 7.92293 13.6916 8.08303 13.851C8.24313 14.0104 8.46028 14.1 8.6867 14.1C8.91311 14.1 9.13026 14.0104 9.29036 13.851C9.45046 13.6916 9.5404 13.4754 9.5404 13.25V9.84999H12.9552C13.1816 9.84999 13.3988 9.76044 13.5589 9.60103C13.719 9.44163 13.8089 9.22543 13.8089 8.99999C13.8089 8.77456 13.719 8.55836 13.5589 8.39895C13.3988 8.23955 13.1816 8.14999 12.9552 8.14999H9.5404V4.74999Z"
                      fill="#F8F8F8"
                    />
                  </svg>
                </div>

                <div className="cursor-pointer h-[45px] w-full px-[5px] sm:px-[10px] lg:px-[15px] flex items-center justify-center gap-[5px] bg-[#52BD91] rounded-md">
                  <p className="text-white font-bold">MODIFY</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="17"
                    viewBox="0 0 19 17"
                    fill="none"
                  >
                    <mask
                      id="mask0_215_507"
                      style={{ maskType: "luminance" }}
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="19"
                      height="17"
                    >
                      <path
                        d="M7.78768 2.88939L5.90308 1.22913C5.73645 1.08242 5.51049 1 5.27488 1C5.03927 1 4.8133 1.08242 4.64667 1.22913L2.13342 3.44268C2.05088 3.51536 1.98539 3.60164 1.94072 3.69661C1.89604 3.79158 1.87305 3.89337 1.87305 3.99617C1.87305 4.09896 1.89604 4.20076 1.94072 4.29572C1.98539 4.39069 2.05088 4.47698 2.13342 4.54965L4.01847 6.20952M11.7235 13.7783L13.6081 15.4386C13.6906 15.5113 13.7886 15.569 13.8964 15.6083C14.0042 15.6477 14.1198 15.6679 14.2365 15.6679C14.3532 15.6679 14.4688 15.6477 14.5766 15.6083C14.6845 15.569 14.7824 15.5113 14.8649 15.4386L17.3782 13.225C17.5448 13.0783 17.6384 12.8793 17.6384 12.6717C17.6384 12.4642 17.5448 12.2652 17.3782 12.1185L15.4932 10.4582"
                        stroke="white"
                        stroke-width="1.56518"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M17.3876 3.8258L14.8744 1.6123C14.5274 1.30668 13.9648 1.30668 13.6178 1.6123L1.68016 12.1264C1.33316 12.432 1.33316 12.9275 1.68016 13.2331L4.19335 15.4466C4.54035 15.7523 5.10294 15.7523 5.44994 15.4466L17.3876 4.93254C17.7346 4.62692 17.7346 4.13142 17.3876 3.8258Z"
                        fill="white"
                        stroke="white"
                        stroke-width="1.56518"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9.53405 9.31209C10.0248 9.31209 10.4226 8.96172 10.4226 8.52951C10.4226 8.09729 10.0248 7.74692 9.53405 7.74692C9.04332 7.74692 8.64551 8.09729 8.64551 8.52951C8.64551 8.96172 9.04332 9.31209 9.53405 9.31209Z"
                        fill="black"
                      />
                      <path
                        d="M7.75671 10.8773C8.24744 10.8773 8.64526 10.5269 8.64526 10.0947C8.64526 9.66248 8.24744 9.3121 7.75671 9.3121C7.26598 9.3121 6.86816 9.66248 6.86816 10.0947C6.86816 10.5269 7.26598 10.8773 7.75671 10.8773Z"
                        fill="black"
                      />
                      <path
                        d="M11.3114 7.74691C11.8021 7.74691 12.1999 7.39653 12.1999 6.96432C12.1999 6.53211 11.8021 6.18173 11.3114 6.18173C10.8207 6.18173 10.4229 6.53211 10.4229 6.96432C10.4229 7.39653 10.8207 7.74691 11.3114 7.74691Z"
                        fill="black"
                      />
                    </mask>
                    <g mask="url(#mask0_215_507)">
                      <path
                        d="M-1.13086 -2H20.1942V16.7821H-1.13086V-2Z"
                        fill="white"
                      />
                    </g>
                  </svg>
                </div>

                <div className="cursor-pointer h-[45px] w-full px-[5px] sm:px-[10px] lg:px-[15px] flex items-center justify-center gap-[5px] bg-[#52BD91] rounded-md">
                  <p className="text-white font-bold">DELETE</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="16"
                    viewBox="0 0 18 16"
                    fill="none"
                  >
                    <path
                      d="M7.08775 2.57143V2.85714H10.3317V2.57143C10.3317 2.19255 10.1608 1.82919 9.85666 1.56128C9.55248 1.29337 9.13992 1.14286 8.70974 1.14286C8.27956 1.14286 7.867 1.29337 7.56282 1.56128C7.25864 1.82919 7.08775 2.19255 7.08775 2.57143ZM5.79016 2.85714V2.57143C5.79016 1.88944 6.09776 1.23539 6.64529 0.753154C7.19281 0.270918 7.93542 0 8.70974 0C9.48407 0 10.2267 0.270918 10.7742 0.753154C11.3217 1.23539 11.6293 1.88944 11.6293 2.57143V2.85714H16.4953C16.6674 2.85714 16.8324 2.91735 16.9541 3.02451C17.0757 3.13167 17.1441 3.27702 17.1441 3.42857C17.1441 3.58012 17.0757 3.72547 16.9541 3.83263C16.8324 3.9398 16.6674 4 16.4953 4H15.5169L14.2894 13.4674C14.1989 14.1647 13.8202 14.8082 13.2255 15.2753C12.6308 15.7424 11.8617 16.0003 11.0649 16H6.35461C5.5578 16.0003 4.78872 15.7424 4.19402 15.2753C3.59933 14.8082 3.22061 14.1647 3.13009 13.4674L1.90257 4H0.924187C0.752115 4 0.587092 3.9398 0.465419 3.83263C0.343746 3.72547 0.275391 3.58012 0.275391 3.42857C0.275391 3.27702 0.343746 3.13167 0.465419 3.02451C0.587092 2.91735 0.752115 2.85714 0.924187 2.85714H5.79016ZM7.41215 6.57143C7.41215 6.41988 7.3438 6.27453 7.22212 6.16737C7.10045 6.0602 6.93543 6 6.76335 6C6.59128 6 6.42626 6.0602 6.30459 6.16737C6.18291 6.27453 6.11456 6.41988 6.11456 6.57143V12.2857C6.11456 12.4373 6.18291 12.5826 6.30459 12.6898C6.42626 12.7969 6.59128 12.8571 6.76335 12.8571C6.93543 12.8571 7.10045 12.7969 7.22212 12.6898C7.3438 12.5826 7.41215 12.4373 7.41215 12.2857V6.57143ZM10.6561 6C10.4841 6 10.319 6.0602 10.1974 6.16737C10.0757 6.27453 10.0073 6.41988 10.0073 6.57143V12.2857C10.0073 12.4373 10.0757 12.5826 10.1974 12.6898C10.319 12.7969 10.4841 12.8571 10.6561 12.8571C10.8282 12.8571 10.9932 12.7969 11.1149 12.6898C11.2366 12.5826 11.3049 12.4373 11.3049 12.2857V6.57143C11.3049 6.41988 11.2366 6.27453 11.1149 6.16737C10.9932 6.0602 10.8282 6 10.6561 6Z"
                      fill="#F8F8F8"
                    />
                  </svg>
                </div>

                <div className="cursor-pointer h-[45px] w-full px-[5px] sm:px-[10px] lg:px-[15px] flex items-center justify-center gap-[5px] bg-[#52BD91] rounded-md">
                  <p className="text-white font-bold">EXIT</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="18"
                    viewBox="0 0 21 18"
                    fill="none"
                  >
                    <path
                      d="M10.3875 1.875C10.7263 1.875 11.0512 1.99353 11.2907 2.2045C11.5303 2.41548 11.6649 2.70163 11.6649 3C11.6649 3.29837 11.5303 3.58452 11.2907 3.7955C11.0512 4.00647 10.7263 4.125 10.3875 4.125H6.12982C6.0169 4.125 5.9086 4.16451 5.82876 4.23484C5.74891 4.30516 5.70405 4.40054 5.70405 4.5V13.5C5.70405 13.5995 5.74891 13.6948 5.82876 13.7652C5.9086 13.8355 6.0169 13.875 6.12982 13.875H9.96178C10.3005 13.875 10.6254 13.9935 10.865 14.2045C11.1045 14.4155 11.2391 14.7016 11.2391 15C11.2391 15.2984 11.1045 15.5845 10.865 15.7955C10.6254 16.0065 10.3005 16.125 9.96178 16.125H6.12982C5.33937 16.125 4.58129 15.8484 4.02236 15.3562C3.46342 14.8639 3.14941 14.1962 3.14941 13.5V4.5C3.14941 3.80381 3.46342 3.13613 4.02236 2.64384C4.58129 2.15156 5.33937 1.875 6.12982 1.875H10.3875ZM15.5479 6.0825L17.9569 8.205C18.1961 8.41594 18.3305 8.70187 18.3305 9C18.3305 9.29813 18.1961 9.58406 17.9569 9.795L15.5488 11.9175C15.3091 12.1285 14.9841 12.2471 14.6453 12.2471C14.3064 12.2471 13.9814 12.1285 13.7418 11.9175C13.5022 11.7065 13.3675 11.4202 13.3675 11.1217C13.3675 10.8233 13.5022 10.537 13.7418 10.326L13.97 10.125H10.3875C10.0488 10.125 9.72389 10.0065 9.48435 9.7955C9.2448 9.58452 9.11023 9.29837 9.11023 9C9.11023 8.70163 9.2448 8.41548 9.48435 8.2045C9.72389 7.99353 10.0488 7.875 10.3875 7.875H13.97L13.7418 7.674C13.6232 7.5695 13.5291 7.44545 13.465 7.30894C13.4008 7.17242 13.3678 7.02611 13.3678 6.87836C13.3679 6.73061 13.401 6.58431 13.4652 6.44782C13.5294 6.31134 13.6236 6.18733 13.7422 6.08288C13.8609 5.97843 14.0017 5.89558 14.1567 5.83907C14.3117 5.78256 14.4778 5.75349 14.6456 5.75353C14.8133 5.75356 14.9794 5.7827 15.1344 5.83927C15.2894 5.89585 15.4302 5.97875 15.5488 6.08325L15.5479 6.0825Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full px-[20px] sm:px-[50px] lg:px-[100px] max-h-full mb-[20px]">
          <div className="w-full h-full flex gap-[5px] sm:gap-[10px] lg:gap-[15px]">
            <div className="basis-[50%] border-2 border-[#182456] rounded-xl overflow-hidden">
              <div
                className="w-full h-[190px] flex flex-col gap-[5px] sm:gap-[9px] lg:gap-[13px] items-center justify-center"
                style={{
                  background:
                    "radial-gradient(50% 50% at 50% 50%, rgba(44, 67, 161, 0.00) 0%, rgba(44, 67, 161, 0.18) 100%), url(/receiptbanner.png) lightgray 0px -110.255px / 100% 221.945% no-repeat",
                }}
              >
                <div className="flex items-center justify-center gap-[2px] sm:gap-[4px] lg:gap-[6px]">
                  <img src="/tlogo.png" alt="" />
                  <img src="/textLogo.png" alt="" className="max-w-[170px]" />
                </div>

                <div className="flex items-center justify-center gap-[10px] sm:gap-[15px] lg:gap-[20px] text-[14px] sm:text-[16px] lg:text-[18px] font-semibold text-[#0D1327]">
                  <div className="flex flex-col justify-start items-start text-start">
                    <h1 className="underline pb-[2px] sm:px-[3px] lg:px-[4px]">
                      Rec Date
                    </h1>
                    <input
                      type="date"
                      value={receiptData}
                      onChange={(e) => setReceiptData(e.target.value)}
                      className="rounded-md focus:outline-none px-[5px] sm:px-[10px] lg:px-[15px] py-[2px] sm:py-[4px] lg:py-[6px] max-w-[250px]"
                    />
                  </div>

                  <div className="flex flex-col justify-start items-start text-start">
                    <h1 className="underline pb-[2px] sm:px-[3px] lg:px-[4px]">
                      Receipt No
                    </h1>
                    <input
                      type="text"
                      value={receiptNo}
                      onChange={(e) => setReceiptNo(e.target.value)}
                      className="rounded-md focus:outline-none px-[5px] sm:px-[10px] lg:px-[15px] py-[2px] sm:py-[4px] lg:py-[6px] max-w-[250px]"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-col items-center justify-between gap-[5px] sm:gap-[7px] lg:gap-[10px] text-[14px] sm:text-[16px] lg:text-[18px] font-semibold text-[#0D1327] py-[10px] sm:py-[15px] lg:py-[20px] px-[20px] sm:px-[50px] lg:px-[100px]">
                <div className="flex items-center justify-between w-full">
                  <div className="flex gap-[5px] sm:gap-[7px] lg:gap-[9px] items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="34"
                      height="34"
                      viewBox="0 0 34 34"
                      fill="none"
                    >
                      <path
                        d="M15.6 12.8C15.6 15.124 13.724 17 11.4 17C9.076 17 7.2 15.124 7.2 12.8C7.2 10.476 9.076 8.60005 11.4 8.60005C13.724 8.60005 15.6 10.476 15.6 12.8ZM19.8 28.2H3V25.4C3 22.306 6.766 19.8 11.4 19.8C16.034 19.8 19.8 22.306 19.8 25.4M31 17V19.8H18.4V17M31 11.4V14.2H18.4V11.4M31 5.80005V8.60005H18.4V5.80005H31Z"
                        fill="#182456"
                      />
                    </svg>
                    <p className="text-[20px] sm:text-[24px] lg:text-[28px] text-[#182456]">
                      Card Details
                    </p>
                  </div>

                  <div className="flex flex-col gap-[2px] sm:gap-[5px]">
                    <p className="underline text-[14px] sm:text-[16px] lg:text-[18px]">
                      Card No
                    </p>
                    <input
                      type="text"
                      value={CardNo}
                      onChange={(e) => setCardNo(e.target.value)}
                      className="px-[5px] sm:px-[10px] lg:px-[15px] py-[3px] sm:py-[5px] text-[20px] sm:text-[24px] lg:text-[28px] text-[#52BD91] focus:outline-none border border-black rounded-xl max-w-[110px]"
                    />
                  </div>
                  <button
                    className="bg-[#52BD91] text-white px-[5px] sm:px-[10px] lg:px-[15px] py-[3px] sm:py-[5px] rounded-xl"
                    onClick={() => fetchmember()}
                  >
                    Search
                  </button>
                </div>

                <div className="w-full flex flex-col gap-[3px] sm:gap-[5px]">
                  <p className="underline text-[16px] sm:text-[18px] lg:text-[20px] text-[#182456] font-normal">
                    Scheme
                  </p>
                  <div className="grid grid-cols-2 w-full gap-[10px] sm:gap-[15px] lg:gap-[20px]">
                    <input
                      type="text"
                      value={ShemeData?.member?.SchemeType}
                      className="w-full focus:outline-none px-[10px] sm:px-[15px] py-[3px] sm:py-[5px] lg:py-[10px] border border-black rounded-lg text-[14px] sm:text-[16px] "
                      readOnly
                    />

                    <input
                      type="text"
                      value={ShemeData?.member?.SchemeName}
                      className="w-full focus:outline-none px-[10px] sm:px-[15px] py-[3px] sm:py-[5px] lg:py-[10px] border border-black rounded-lg text-[14px] sm:text-[16px] "
                    ></input>
                  </div>
                </div>

                <div className="w-full flex flex-col gap-[5px] sm:gap-[10px] lg:gap-[12px] pt-[10px]">
                  <div className="flex text-[14px] sm:text-[16px] lg:text-[18px] items-center justify-between gap-[5px] sm:gap-[10px] lg:gap-[15px]">
                    <p className=" ">Mobile No</p>
                    <input
                      type="text"
                      value={ShemeData?.member?.Mobile1}
                      className="px-[5px] sm:px-[10px] lg:px-[15px] py-[3px] sm:py-[5px] focus:outline-none border border-black rounded-lg max-w-[350px] w-full"
                      readOnly
                    />
                  </div>

                  <div className="flex text-[14px] sm:text-[16px] lg:text-[18px] items-center justify-between gap-[5px] sm:gap-[10px] lg:gap-[15px]">
                    <p className=" ">Name</p>
                    <input
                      type="text"
                      value={ShemeData?.member?.MemberName}
                      className="px-[5px] sm:px-[10px] lg:px-[15px] py-[3px] sm:py-[5px] focus:outline-none border border-black rounded-lg max-w-[350px] w-full"
                      readOnly
                    />
                  </div>

                  <div className="flex text-[14px] sm:text-[16px] lg:text-[18px] items-center justify-between gap-[5px] sm:gap-[10px] lg:gap-[15px]">
                    <p className=" ">Address</p>
                    <textarea
                      name=""
                      id=""
                      rows={4}
                      value={ShemeData?.member?.Address}
                      className="max-w-[350px] w-full px-[5px] sm:px-[10px] lg:px-[15px] py-[3px] sm:py-[5px] focus:outline-none border border-black rounded-lg"
                      readOnly
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-[10px] sm:gap-[15px] lg:gap-[20px] py-[10px] sm:py-[15px] lg:py-[20px]">
                <h1 className="px-[20px] sm:px-[50px] lg:px-[100px] text-[20px] sm:text-[24px] lg:text-[28px] text-[#182456] font-semibold">
                  Scheme Details
                </h1>

                <div className="flex flex-col gap-[4px] sm:gap-[8px] px-[10px] sm:px-[20px] lg:px-[40px]">
                  <div className="w-full flex gap-[5px] sm:gap-[10px] lg:gap-[15px]">
                    <div className="flex-1 flex text-[14px] sm:text-[16px] w-full lg:text-[18px] items-center justify-between gap-[5px] sm:gap-[10px] lg:gap-[15px]">
                      <p className=" ">Amount</p>
                      <input
                        type="text"
                        value={ShemeData?.scheme?.SchemeAmount}
                        className=" px-[3px] py-[3px] sm:py-[5px] focus:outline-none border border-black rounded-lg max-w-[150px] w-full"
                      />
                    </div>

                    <div className="flex-1 flex text-[14px] sm:text-[16px] w-full lg:text-[18px] items-center justify-between gap-[5px] sm:gap-[10px] lg:gap-[15px]">
                      <p className=" ">Scheme Duration</p>
                      <input
                        type="text"
                        value={ShemeData?.scheme?.SchemeDuration}
                        className=" px-[3px] py-[3px] sm:py-[5px] focus:outline-none border border-black rounded-lg max-w-[150px] w-full"
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="w-full flex gap-[5px] sm:gap-[10px] lg:gap-[15px]">
                    <div className="flex-1 flex text-[14px] sm:text-[16px] w-full lg:text-[18px] items-center justify-between gap-[5px] sm:gap-[10px] lg:gap-[15px]">
                      <p className=" ">Scheme Amount</p>
                      <input
                        type="text"
                        value={ShemeData?.scheme?.SchemeValue}
                        className=" px-[3px] py-[3px] sm:py-[5px] focus:outline-none border border-black rounded-lg max-w-[150px] w-full"
                        readOnly
                      />
                    </div>

                    <div className="flex-1 flex text-[14px] sm:text-[16px] w-full lg:text-[18px] items-center justify-between gap-[5px] sm:gap-[10px] lg:gap-[15px]">
                      <p className=" ">Bonus Months</p>
                      <input
                        type="text"
                        value={ShemeData?.scheme?.BonusMonth}
                        className=" px-[3px] py-[3px] sm:py-[5px] focus:outline-none border border-black rounded-lg max-w-[150px] w-full"
                      />
                    </div>
                  </div>
                  <div className="w-full flex gap-[5px] sm:gap-[10px] lg:gap-[15px]">
                    <div className="flex-1 flex text-[14px] sm:text-[16px] w-full lg:text-[18px] items-center justify-between gap-[5px] sm:gap-[10px] lg:gap-[15px]">
                      <p className=" ">Bonus Amount</p>
                      <input
                        type="text"
                        value={ShemeData?.scheme?.BonusAmount}
                        className=" px-[3px] py-[3px] sm:py-[5px] focus:outline-none border border-black rounded-lg max-w-[150px] w-full"
                      />
                    </div>

                    <div className="flex-1 flex text-[14px] sm:text-[16px] w-full lg:text-[18px] items-center justify-between gap-[5px] sm:gap-[10px] lg:gap-[15px]">
                      <p className=" ">Gift Vouchers</p>
                      <input
                        type="text"
                        className=" px-[3px] py-[3px] sm:py-[5px] focus:outline-none border border-black rounded-lg max-w-[150px] w-full"
                      />
                    </div>
                  </div>
                  <div className="w-full flex gap-[5px] sm:gap-[10px] lg:gap-[15px]">
                    <div className="flex-1 flex text-[14px] sm:text-[16px] w-full lg:text-[18px] items-center justify-between gap-[5px] sm:gap-[10px] lg:gap-[15px]">
                      <p className=" ">Scheme Value</p>
                      <input
                        type="text"
                        value={ShemeData?.scheme?.SchemeValue}
                        className=" px-[3px] py-[3px] sm:py-[5px] focus:outline-none border border-black rounded-lg max-w-[150px] w-full"
                        readOnly
                      />
                    </div>

                    <div className="flex-1 flex text-[14px] sm:text-[16px] w-full lg:text-[18px] items-center justify-between gap-[5px] sm:gap-[10px] lg:gap-[15px]">
                      <p className=" ">Scheme Join Date</p>
                      <input
                        type="text"
                        value={ShemeData?.member?.JoinDate}
                        className=" px-[3px] py-[3px] sm:py-[5px] focus:outline-none border border-black rounded-lg max-w-[150px] w-full"
                      />
                    </div>
                  </div>
                  <div className="w-full flex gap-[5px] sm:gap-[10px] lg:gap-[15px]">
                    <div className="flex-1 flex text-[14px] sm:text-[16px] w-full lg:text-[18px] items-center justify-between gap-[5px] sm:gap-[10px] lg:gap-[15px]">
                      <p className=" ">Paid Months</p>
                      <input
                        type="text"
                        value={ShemeData?.receipt?.length}
                        className=" px-[3px] py-[3px] sm:py-[5px] focus:outline-none border border-black rounded-lg max-w-[150px] w-full"
                        readOnly
                      />
                    </div>

                    <div className="flex-1 flex text-[14px] sm:text-[16px] w-full lg:text-[18px] items-center justify-between gap-[5px] sm:gap-[10px] lg:gap-[15px]">
                      <p className=" ">Paid Amount</p>
                      <input
                        type="text"
                        value={
                          ShemeData?.receipt?.reduce(
                            (accumulator, currentItem) =>
                              accumulator + currentItem.Amount,
                            0
                          ) || [0]
                        }
                        className=" px-[3px] py-[3px] sm:py-[5px] focus:outline-none border border-black rounded-lg max-w-[150px] w-full"
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="w-full flex gap-[5px] sm:gap-[10px] lg:gap-[15px]">
                    <div className="flex-1 flex text-[14px] sm:text-[16px] w-full lg:text-[18px] items-center justify-between gap-[5px] sm:gap-[10px] lg:gap-[15px]">
                      <p className=" ">Balance Month</p>
                      <input
                        type="text"
                        value={
                          ShemeData?.scheme?.SchemeDuration -
                          ShemeData?.receipt?.length
                        }
                        className=" px-[3px] py-[3px] sm:py-[5px] focus:outline-none border border-black rounded-lg max-w-[150px] w-full"
                        readOnly
                      />
                    </div>

                    <div className="flex-1 flex text-[14px] sm:text-[16px] w-full lg:text-[18px] items-center justify-between gap-[5px] sm:gap-[10px] lg:gap-[15px]">
                      <p className=" ">Balance Amount</p>
                      <input
                        type="text"
                        value={
                          ShemeData?.scheme?.SchemeValue -
                            ShemeData?.receipt?.reduce(
                              (accumulator, currentItem) =>
                                accumulator + currentItem.Amount,
                              0
                            ) || [0]
                        }
                        className=" px-[3px] py-[3px] sm:py-[5px] focus:outline-none border border-black rounded-lg max-w-[150px] w-full"
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="w-full flex gap-[5px] items-center justify-center sm:gap-[10px] lg:gap-[15px]">
                    <div className=" flex text-[14px] sm:text-[16px] w-full lg:text-[18px] items-center justify-center gap-[5px] sm:gap-[10px] lg:gap-[15px]">
                      <p className=" ">Installment No</p>
                      <input
                        type="text"
                        value={ShemeData?.receipt?.length + 1}
                        className=" px-[3px] py-[3px] sm:py-[5px] focus:outline-none border border-black rounded-lg max-w-[150px] w-full"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-[50%] flex flex-col gap-[20px]  border-2 border-[#182456] rounded-xl py-[10px] sm:py-[20px] lg:py-[30px]">
              <h1 className="px-[20px] sm:px-[50px] lg:px-[100px] text-[20px] sm:text-[24px] lg:text-[28px] text-[#182456] font-semibold">
                Receipt Details
              </h1>

              <div className="flex flex-col gap-[4px] sm:gap-[8px] px-[10px] sm:px-[20px] lg:px-[40px]">
                <div className="w-full flex gap-[5px] sm:gap-[7px] lg:gap-[10px]">
                  <div className="flex flex-col text-[14px] sm:text-[16px] w-full lg:text-[18px] items-center justify-between gap-[5px] sm:gap-[10px] lg:gap-[15px]">
                    <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-semibold text-[#182456]">
                      Collection Point
                    </p>
                    <div className="flex flex-col gap-[5px] text-[18px] font-semibold">
                      <div className="flex items-center justify-center gap-[5px]">
                        <input
                          type="radio"
                          name="group1"
                          id="shop"
                          onChange={() => setSelectedOption(true)}
                        />
                        <label htmlFor="shop">Shop</label>
                      </div>
                      <div className="flex items-center justify-center gap-[5px]">
                        <input
                          type="radio"
                          name="group1"
                          id="staff"
                          onChange={() => setSelectedOption(false)}
                        />
                        <label htmlFor="staff">Staff</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full flex gap-[5px] sm:gap-[10px] lg:gap-[15px]">
                  <div className="flex-1 flex text-[14px] sm:text-[16px] w-full lg:text-[18px] items-center justify-between gap-[5px] sm:gap-[10px] lg:gap-[15px]">
                    <p className=" ">Scheme Code</p>
                    <input
                      type="text"
                      value={ShemeData?.member?.SchemeCode}
                      className=" px-[3px] py-[3px] sm:py-[5px] focus:outline-none border border-black rounded-lg max-w-[150px] w-full"
                      readOnly
                    />
                  </div>

                  <div className="flex-1 flex text-[14px] sm:text-[16px] w-full lg:text-[18px] items-center justify-between gap-[5px] sm:gap-[10px] lg:gap-[15px]">
                    <p className=" ">Card No</p>
                    <input
                      type="text"
                      value={CardNo}
                      className=" px-[3px] py-[3px] sm:py-[5px] focus:outline-none border border-black rounded-lg max-w-[150px] w-full"
                      readOnly
                    />
                  </div>
                </div>
                <div className="w-full flex gap-[5px] sm:gap-[10px] lg:gap-[15px] mt-[20px]">
                  <div className="flex-1 flex text-[14px] sm:text-[16px] w-full lg:text-[18px] items-center justify-between gap-[5px] sm:gap-[10px] lg:gap-[15px]">
                    <p className=" ">Paid Amount</p>
                    <input
                      type="text"
                      value={amount}
                      className=" px-[3px] py-[3px] sm:py-[5px] focus:outline-none border border-black rounded-lg max-w-[150px] w-full"
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>

                  <div className="flex-1 flex text-[14px] sm:text-[16px] w-full lg:text-[18px] items-center justify-between gap-[5px] sm:gap-[10px] lg:gap-[15px]">
                    <p className=" ">Payment Mode</p>
                    <input
                      type="text"
                      value={paymentMode}
                      className=" px-[3px] py-[3px] sm:py-[5px] focus:outline-none border border-black rounded-lg max-w-[150px] w-full"
                      onChange={(e) => setPaymentMode(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full flex gap-[5px] sm:gap-[10px] lg:gap-[15px] mt-[20px]">
                  <div className="flex-1 flex text-[14px] sm:text-[16px] w-full lg:text-[18px] items-center justify-between gap-[5px] sm:gap-[10px] lg:gap-[15px]">
                    <p className=" ">Account No</p>
                    <input
                      type="text"
                      value={accno}
                      className=" px-[3px] py-[3px] sm:py-[5px] focus:outline-none border border-black rounded-lg w-[70%]"
                      onChange={(e) => setAccno(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="w-full px-[10px] sm:px-[20px] lg:px-[40px] mt-[20px]">
                <div className="w-full h-[350px] overflow-auto border border-[#000] rounded-md">
                  <table className="w-full table-auto">
                    <tr className="bg-[#182456] text-white">
                      <th className="p-[15px]">Sno</th>
                      <th className="p-[15px]">Payment Mode</th>
                      <th className="p-[15px]">Account No</th>
                      <th className="p-[15px]">Description</th>
                      <th className="p-[15px]">Amount</th>
                    </tr>
                    {ShemeData?.receipt?.map((item, index) => (
                      <tr className="text-center" key={index}>
                        <td className="p-[15px]">{index + 1}</td>
                        <td className="p-[15px]">{item.PaymentMode}</td>
                        <td className="p-[15px]">{item.AccNo}</td>
                        <td className="p-[15px]">{item.Description}</td>
                        <td className="p-[15px]">{item.Amount}</td>
                      </tr>
                    ))}
                  </table>
                </div>
              </div>

              <div className="flex flex-col gap-[20px] w-full px-[10px] sm:px-[20px] lg:px-[40px]">
                <div className="w-full flex flex-col gap-[3px] sm:gap-[5px]">
                  <div className="flex gap-[25%] sm:gap-[35%] lg:gap-[45%]">
                    <p className="underline text-[16px] sm:text-[18px] lg:text-[20px] text-[#182456] font-normal">
                      Gold Wt
                    </p>
                    <p className="underline text-[16px] sm:text-[18px] lg:text-[20px] text-[#182456] font-normal">
                      Gold Amount
                    </p>
                  </div>
                  <div className="grid grid-cols-2 w-full gap-[10px] sm:gap-[15px] lg:gap-[20px]">
                    <input
                      type="text"
                      value={GoldWt}
                      className="w-full focus:outline-none px-[10px] sm:px-[15px] py-[3px] sm:py-[5px] lg:py-[10px] border border-black rounded-lg text-[14px] sm:text-[16px] "
                      onChange={(e) => setGoldWt(e.target.value)}
                    />

                    <input
                      type="text"
                      value={GoldAmount}
                      className="w-full focus:outline-none px-[10px] sm:px-[15px] py-[3px] sm:py-[5px] lg:py-[10px] border border-black rounded-lg text-[14px] sm:text-[16px] "
                      onChange={(e) => setGoldAmount(e.target.value)}
                    />
                  </div>
                </div>

                <div className="w-full flex flex-col gap-[5px] sm:gap-[10px] lg:gap-[12px] pt-[10px]">
                  <div className="flex text-[14px] sm:text-[16px] lg:text-[18px] items-center justify-between gap-[5px] sm:gap-[10px] lg:gap-[15px]">
                    <p className="font-semibold">Incharge</p>
                    <input
                      type="text"
                      value={Incharge}
                      className="px-[5px] sm:px-[10px] lg:px-[15px] py-[3px] sm:py-[5px] focus:outline-none border border-black rounded-lg max-w-[350px] w-full"
                      onChange={(e) => setIncharge(e.target.value)}
                    />
                  </div>

                  <div className="flex text-[14px] sm:text-[16px] lg:text-[18px] items-center justify-between gap-[5px] sm:gap-[10px] lg:gap-[15px]">
                    <p className="font-semibold">Narration</p>
                    <textarea
                      name=""
                      id=""
                      rows={3}
                      value={Description}
                      className="max-w-[350px] w-full px-[5px] sm:px-[10px] lg:px-[15px] py-[3px] sm:py-[5px] focus:outline-none border border-black rounded-lg"
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="w-full px-[10px] sm:px-[20px] lg:px-[40px]">
                <div className="grid grid-cols-4 w-full h-full items-center justify-center gap-[5px] sm:gap-[8px] lg:gap-[12px]">
                  <div className="cursor-pointer h-[45px] w-full px-[5px] sm:px-[10px] lg:px-[15px] flex items-center justify-center gap-[5px] bg-[#172561] rounded-md">
                    <p className="text-white font-bold">SEARCH</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M0.149414 9C0.149414 4.30545 3.97146 0.5 8.68649 0.5C13.4015 0.5 17.2236 4.30545 17.2236 9C17.2236 13.6946 13.4015 17.5 8.68649 17.5C3.97146 17.5 0.149414 13.6946 0.149414 9ZM8.68649 2.2C6.87515 2.2 5.138 2.91643 3.85719 4.19167C2.57638 5.46692 1.85683 7.19653 1.85683 9C1.85683 10.8035 2.57638 12.5331 3.85719 13.8083C5.138 15.0836 6.87515 15.8 8.68649 15.8C10.4978 15.8 12.235 15.0836 13.5158 13.8083C14.7966 12.5331 15.5161 10.8035 15.5161 9C15.5161 7.19653 14.7966 5.46692 13.5158 4.19167C12.235 2.91643 10.4978 2.2 8.68649 2.2Z"
                        fill="#F8F8F8"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M9.5404 4.74999C9.5404 4.52456 9.45046 4.30836 9.29036 4.14895C9.13026 3.98955 8.91311 3.89999 8.6867 3.89999C8.46028 3.89999 8.24313 3.98955 8.08303 4.14895C7.92293 4.30836 7.83299 4.52456 7.83299 4.74999V8.14999H4.41816C4.19174 8.14999 3.9746 8.23955 3.8145 8.39895C3.6544 8.55836 3.56445 8.77456 3.56445 8.99999C3.56445 9.22543 3.6544 9.44163 3.8145 9.60103C3.9746 9.76044 4.19174 9.84999 4.41816 9.84999H7.83299V13.25C7.83299 13.4754 7.92293 13.6916 8.08303 13.851C8.24313 14.0104 8.46028 14.1 8.6867 14.1C8.91311 14.1 9.13026 14.0104 9.29036 13.851C9.45046 13.6916 9.5404 13.4754 9.5404 13.25V9.84999H12.9552C13.1816 9.84999 13.3988 9.76044 13.5589 9.60103C13.719 9.44163 13.8089 9.22543 13.8089 8.99999C13.8089 8.77456 13.719 8.55836 13.5589 8.39895C13.3988 8.23955 13.1816 8.14999 12.9552 8.14999H9.5404V4.74999Z"
                        fill="#F8F8F8"
                      />
                    </svg>
                  </div>

                  <div className="cursor-pointer h-[45px] w-full px-[5px] sm:px-[10px] lg:px-[15px] flex items-center justify-center gap-[5px] bg-[#172561] rounded-md">
                    <button
                      className="text-white font-bold"
                      onClick={() => createReceipt()}
                    >
                      SAVE
                    </button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="19"
                      height="17"
                      viewBox="0 0 19 17"
                      fill="none"
                    >
                      <mask
                        id="mask0_215_507"
                        style={{ maskType: "luminance" }}
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="19"
                        height="17"
                      >
                        <path
                          d="M7.78768 2.88939L5.90308 1.22913C5.73645 1.08242 5.51049 1 5.27488 1C5.03927 1 4.8133 1.08242 4.64667 1.22913L2.13342 3.44268C2.05088 3.51536 1.98539 3.60164 1.94072 3.69661C1.89604 3.79158 1.87305 3.89337 1.87305 3.99617C1.87305 4.09896 1.89604 4.20076 1.94072 4.29572C1.98539 4.39069 2.05088 4.47698 2.13342 4.54965L4.01847 6.20952M11.7235 13.7783L13.6081 15.4386C13.6906 15.5113 13.7886 15.569 13.8964 15.6083C14.0042 15.6477 14.1198 15.6679 14.2365 15.6679C14.3532 15.6679 14.4688 15.6477 14.5766 15.6083C14.6845 15.569 14.7824 15.5113 14.8649 15.4386L17.3782 13.225C17.5448 13.0783 17.6384 12.8793 17.6384 12.6717C17.6384 12.4642 17.5448 12.2652 17.3782 12.1185L15.4932 10.4582"
                          stroke="white"
                          stroke-width="1.56518"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M17.3876 3.8258L14.8744 1.6123C14.5274 1.30668 13.9648 1.30668 13.6178 1.6123L1.68016 12.1264C1.33316 12.432 1.33316 12.9275 1.68016 13.2331L4.19335 15.4466C4.54035 15.7523 5.10294 15.7523 5.44994 15.4466L17.3876 4.93254C17.7346 4.62692 17.7346 4.13142 17.3876 3.8258Z"
                          fill="white"
                          stroke="white"
                          stroke-width="1.56518"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M9.53405 9.31209C10.0248 9.31209 10.4226 8.96172 10.4226 8.52951C10.4226 8.09729 10.0248 7.74692 9.53405 7.74692C9.04332 7.74692 8.64551 8.09729 8.64551 8.52951C8.64551 8.96172 9.04332 9.31209 9.53405 9.31209Z"
                          fill="black"
                        />
                        <path
                          d="M7.75671 10.8773C8.24744 10.8773 8.64526 10.5269 8.64526 10.0947C8.64526 9.66248 8.24744 9.3121 7.75671 9.3121C7.26598 9.3121 6.86816 9.66248 6.86816 10.0947C6.86816 10.5269 7.26598 10.8773 7.75671 10.8773Z"
                          fill="black"
                        />
                        <path
                          d="M11.3114 7.74691C11.8021 7.74691 12.1999 7.39653 12.1999 6.96432C12.1999 6.53211 11.8021 6.18173 11.3114 6.18173C10.8207 6.18173 10.4229 6.53211 10.4229 6.96432C10.4229 7.39653 10.8207 7.74691 11.3114 7.74691Z"
                          fill="black"
                        />
                      </mask>
                      <g mask="url(#mask0_215_507)">
                        <path
                          d="M-1.13086 -2H20.1942V16.7821H-1.13086V-2Z"
                          fill="white"
                        />
                      </g>
                    </svg>
                  </div>

                  <div className="cursor-pointer h-[45px] w-full px-[5px] sm:px-[10px] lg:px-[15px] flex items-center justify-center gap-[5px] bg-[#172561] rounded-md">
                    <p className="text-white font-bold">SAVE & PRINT</p>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                                            <path d="M7.08775 2.57143V2.85714H10.3317V2.57143C10.3317 2.19255 10.1608 1.82919 9.85666 1.56128C9.55248 1.29337 9.13992 1.14286 8.70974 1.14286C8.27956 1.14286 7.867 1.29337 7.56282 1.56128C7.25864 1.82919 7.08775 2.19255 7.08775 2.57143ZM5.79016 2.85714V2.57143C5.79016 1.88944 6.09776 1.23539 6.64529 0.753154C7.19281 0.270918 7.93542 0 8.70974 0C9.48407 0 10.2267 0.270918 10.7742 0.753154C11.3217 1.23539 11.6293 1.88944 11.6293 2.57143V2.85714H16.4953C16.6674 2.85714 16.8324 2.91735 16.9541 3.02451C17.0757 3.13167 17.1441 3.27702 17.1441 3.42857C17.1441 3.58012 17.0757 3.72547 16.9541 3.83263C16.8324 3.9398 16.6674 4 16.4953 4H15.5169L14.2894 13.4674C14.1989 14.1647 13.8202 14.8082 13.2255 15.2753C12.6308 15.7424 11.8617 16.0003 11.0649 16H6.35461C5.5578 16.0003 4.78872 15.7424 4.19402 15.2753C3.59933 14.8082 3.22061 14.1647 3.13009 13.4674L1.90257 4H0.924187C0.752115 4 0.587092 3.9398 0.465419 3.83263C0.343746 3.72547 0.275391 3.58012 0.275391 3.42857C0.275391 3.27702 0.343746 3.13167 0.465419 3.02451C0.587092 2.91735 0.752115 2.85714 0.924187 2.85714H5.79016ZM7.41215 6.57143C7.41215 6.41988 7.3438 6.27453 7.22212 6.16737C7.10045 6.0602 6.93543 6 6.76335 6C6.59128 6 6.42626 6.0602 6.30459 6.16737C6.18291 6.27453 6.11456 6.41988 6.11456 6.57143V12.2857C6.11456 12.4373 6.18291 12.5826 6.30459 12.6898C6.42626 12.7969 6.59128 12.8571 6.76335 12.8571C6.93543 12.8571 7.10045 12.7969 7.22212 12.6898C7.3438 12.5826 7.41215 12.4373 7.41215 12.2857V6.57143ZM10.6561 6C10.4841 6 10.319 6.0602 10.1974 6.16737C10.0757 6.27453 10.0073 6.41988 10.0073 6.57143V12.2857C10.0073 12.4373 10.0757 12.5826 10.1974 12.6898C10.319 12.7969 10.4841 12.8571 10.6561 12.8571C10.8282 12.8571 10.9932 12.7969 11.1149 12.6898C11.2366 12.5826 11.3049 12.4373 11.3049 12.2857V6.57143C11.3049 6.41988 11.2366 6.27453 11.1149 6.16737C10.9932 6.0602 10.8282 6 10.6561 6Z" fill="#F8F8F8" />
                                        </svg> */}
                  </div>

                  <div className="cursor-pointer h-[45px] w-full px-[5px] sm:px-[10px] lg:px-[15px] flex items-center justify-center gap-[5px] bg-[#172561] rounded-md">
                    <p className="text-white font-bold">CANCEL</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="18"
                      viewBox="0 0 21 18"
                      fill="none"
                    >
                      <path
                        d="M10.3875 1.875C10.7263 1.875 11.0512 1.99353 11.2907 2.2045C11.5303 2.41548 11.6649 2.70163 11.6649 3C11.6649 3.29837 11.5303 3.58452 11.2907 3.7955C11.0512 4.00647 10.7263 4.125 10.3875 4.125H6.12982C6.0169 4.125 5.9086 4.16451 5.82876 4.23484C5.74891 4.30516 5.70405 4.40054 5.70405 4.5V13.5C5.70405 13.5995 5.74891 13.6948 5.82876 13.7652C5.9086 13.8355 6.0169 13.875 6.12982 13.875H9.96178C10.3005 13.875 10.6254 13.9935 10.865 14.2045C11.1045 14.4155 11.2391 14.7016 11.2391 15C11.2391 15.2984 11.1045 15.5845 10.865 15.7955C10.6254 16.0065 10.3005 16.125 9.96178 16.125H6.12982C5.33937 16.125 4.58129 15.8484 4.02236 15.3562C3.46342 14.8639 3.14941 14.1962 3.14941 13.5V4.5C3.14941 3.80381 3.46342 3.13613 4.02236 2.64384C4.58129 2.15156 5.33937 1.875 6.12982 1.875H10.3875ZM15.5479 6.0825L17.9569 8.205C18.1961 8.41594 18.3305 8.70187 18.3305 9C18.3305 9.29813 18.1961 9.58406 17.9569 9.795L15.5488 11.9175C15.3091 12.1285 14.9841 12.2471 14.6453 12.2471C14.3064 12.2471 13.9814 12.1285 13.7418 11.9175C13.5022 11.7065 13.3675 11.4202 13.3675 11.1217C13.3675 10.8233 13.5022 10.537 13.7418 10.326L13.97 10.125H10.3875C10.0488 10.125 9.72389 10.0065 9.48435 9.7955C9.2448 9.58452 9.11023 9.29837 9.11023 9C9.11023 8.70163 9.2448 8.41548 9.48435 8.2045C9.72389 7.99353 10.0488 7.875 10.3875 7.875H13.97L13.7418 7.674C13.6232 7.5695 13.5291 7.44545 13.465 7.30894C13.4008 7.17242 13.3678 7.02611 13.3678 6.87836C13.3679 6.73061 13.401 6.58431 13.4652 6.44782C13.5294 6.31134 13.6236 6.18733 13.7422 6.08288C13.8609 5.97843 14.0017 5.89558 14.1567 5.83907C14.3117 5.78256 14.4778 5.75349 14.6456 5.75353C14.8133 5.75356 14.9794 5.7827 15.1344 5.83927C15.2894 5.89585 15.4302 5.97875 15.5488 6.08325L15.5479 6.0825Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReceiptEntry;
