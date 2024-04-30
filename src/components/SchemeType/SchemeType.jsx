"use client";

import React, { useState } from "react";

const SchemeType = () => {
  const [schemeType, setSchemeType] = useState("");
  const [groupCode, setGroupCode] = useState("");
  const [goldScheme, setGoldScheme] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      type: schemeType,
      code: groupCode,
      mode: goldScheme,
    };

    try {
      const response = await fetch("/api/schemetype", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Data saved successfully");
        setGoldScheme("");
        setGroupCode("");
        setSchemeType("");
      } else {
        alert("Failed to save data");
        setGoldScheme("");
        setGroupCode("");
        setSchemeType("");
      }
    } catch (error) {
      console.error(error);
      setGoldScheme("");
      setGroupCode("");
      setSchemeType("");
    }
  };

  return (
    <div
      className="w-full h-screen"
      style={{ background: "url(/banner.png) lightgray 50% / cover no-repeat" }}
    >
      <div className="w-full h-full">
        <div className="px-[10px] sm:px-[20px] lg:px-[40px] py-[5px] sm:py-[10px] lg:py-[15px]">
          <div
            className="w-full h-full px-[15px] sm:px-[30px] lg:px-[45px] py-[10px] sm:py-[15px] lg:py-[20px] rounded-md flex items-center gap-[10px] sm:gap-[15px] lg:gap-[20px]"
            style={{
              background:
                "linear-gradient(270deg, #0A0E16 5.64%, #182456 97.55%)",
            }}
          >
            <div className="basis-[60%] flex items-center justify-between w-full h-full">
              <h1 className="flex-1 text-[#fff] text-[20px] sm:text-[24px] lg:text-[28px] font-semibold pl-[10px] border-l-8 rounded-s-md border-[#52BD91]">
                Scheme Type
              </h1>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-[10px] sm:gap-[15px] lg:gap-[20px] items-center justify-center">
          <div className="max-w-[750px] w-full flex flex-col m-auto max-h-full border-2 border-[#182456] rounded-xl overflow-hidden">
            <div
              className="w-full h-[150px] flex items-center justify-center"
              style={{
                background:
                  "radial-gradient(50% 50% at 50% 50%, rgba(44, 67, 161, 0.00) 0%, rgba(44, 67, 161, 0.18) 100%), url(/receiptbanner.png) lightgray 0px -110.255px / 100% 221.945% no-repeat",
              }}
            >
              <div className="flex items-center justify-center gap-[2px] sm:gap-[4px] lg:gap-[6px]">
                <img src="/tlogo.png" alt="" />
                <img src="/textLogo.png" alt="" className="max-w-[170px]" />
              </div>
            </div>

            <div className="w-full p-[15px] sm:p-[30px] lg:p-[45px] bg-[#F6F8FF] flex flex-col gap-[5px] sm:gap-[10px] lg:gap-[15px] text-[14px] sm:text-[16px] lg:text-[18px] text-[#182456]">
              <div className="w-full flex items-center justify-between">
                <p className="basis-[40%]  font-semibold underline ">
                  Scheme Type:
                </p>
                <input
                  type="text"
                  value={schemeType}
                  className="basis-[60%] w-full focus:outline-none p-[4px] sm:p-[7px] lg:p-[10px] rounded-xl border-2 border-[#182456] "
                  onChange={(e) => setSchemeType(e.target.value)}
                />
              </div>
              <div className="w-full flex items-center justify-between">
                <p className="basis-[40%]  font-semibold underline ">
                  Group Code:
                </p>
                <input
                  type="text"
                  value={groupCode}
                  className="basis-[60%] w-full focus:outline-none p-[4px] sm:p-[7px] lg:p-[10px] rounded-xl border-2 border-[#182456] "
                  onChange={(e) => setGroupCode(e.target.value)}
                />
              </div>
              <div className="w-full flex items-center justify-center gap-[5px] sm:gap-[10px] lg:gap-[15px]">
                <div className="flex items-center justify-center gap-[2px] sm:gap-[4px] lg:gap-[6px]">
                  <input
                    type="radio"
                    name="scheme"
                    id="goldscheme"
                    value="Gold Scheme"
                    onChange={(e) => setGoldScheme(e.target.value)}
                  />
                  <label htmlFor="goldscheme" className="font-semibold">
                    Gold Scheme
                  </label>
                </div>
                <div className="flex items-center justify-center gap-[2px] sm:gap-[4px] lg:gap-[6px]">
                  <input
                    type="radio"
                    name="scheme"
                    id="cashscheme"
                    value="Cash Scheme"
                    onChange={(e) => setGoldScheme(e.target.value)}
                  />
                  <label htmlFor="cashscheme" className="font-semibold">
                    Cash Scheme
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex items-center justify-center gap-[10px] sm:gap-[15px] lg:gap-[20px]">
            <button
              className="px-[20px] sm:px-[30px] rounded-md py-[5px] sm:py-[10px] bg-[#52BD91] text-white font-semibold flex items-center justify-center cursor-pointer"
              onClick={handleSubmit}
            >
              SAVE
            </button>

            <div className="px-[20px] sm:px-[30px] rounded-md py-[5px] sm:py-[10px] bg-[#182456] text-white font-semibold flex items-center justify-center cursor-pointer">
              CANCEL
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemeType;
