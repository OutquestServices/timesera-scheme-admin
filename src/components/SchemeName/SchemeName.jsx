"use client";

import React, { useEffect, useState } from "react";

const SchemeName = () => {
  const [schemeTypes, setSchemeTypes] = useState([]);

  const [schemeType, setSchemeType] = useState("");
  const [schemeName, setSchemeName] = useState("");
  const [duration, setDuration] = useState(null);
  const [amount, setAmount] = useState(null);
  const [persons, setPersons] = useState(null);
  const [bonus, setBonus] = useState(null);
  const [bonusmonths, setBonusMonths] = useState(null);
  const [comm, setComm] = useState(null);
  const [schemevalue, setSchemeValue] = useState(0);
  const [commamt, setCommAmt] = useState(0);
  const [code, setCode] = useState();

  const fetchData = async () => {
    try {
      const response = await fetch("/api/schemetype/gettypes");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      setSchemeTypes(data);

      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  const pushScheneName = async () => {
    try {
      const response = await fetch("/api/schemename", {
        method: "POST",
        body: JSON.stringify({
          sname: schemeName,
          schemetype: schemeType,
          samount: parseFloat(amount),
          sduration: parseFloat(duration),
          spersons: parseFloat(persons),
          bmonth: parseFloat(bonusmonths),
          bamount: parseFloat(bonus),
          svalue: parseFloat(duration * amount + bonusmonths * bonus),
          commper: parseFloat(comm),
          commamt: (comm * (duration * amount + bonusmonths * bonus)) / 100,
          code: code,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response is not ok in scheme name");
      }

      const ans = await response.json();
      alert(ans?.message);
      setSchemeName("");
      setDuration(null);
      setAmount(null);
      setPersons(null);
      setBonus(null);
      setBonusMonths(null);
      setComm(null);
      setCommAmt(0);
      setSchemeValue(0);
      setCode("");
    } catch (error) {
      console.error(error);
      setSchemeName("");
      setDuration(null);
      setAmount(null);
      setPersons(null);
      setBonus(null);
      setBonusMonths(null);
      setComm(null);
      setCommAmt(0);
      setSchemeValue(0);
      setCode("");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {}, [duration, amount, bonus, bonusmonths]);

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
                Scheme Name
              </h1>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-[10px] sm:gap-[15px] lg:gap-[20px] items-center justify-center">
          <div className="max-w-[750px] w-full flex flex-col m-auto max-h-full border-2 border-[#182456] rounded-xl overflow-hidden">
            <div
              className="w-full h-[150px] flex flex-col gap-[10px] sm:gap-[15px] lg:gap-[20px] items-center justify-center"
              style={{
                background:
                  "radial-gradient(50% 50% at 50% 50%, rgba(44, 67, 161, 0.00) 0%, rgba(44, 67, 161, 0.18) 100%), url(/receiptbanner.png) lightgray 0px -110.255px / 100% 221.945% no-repeat",
              }}
            >
              <div className="flex items-center justify-center gap-[2px] sm:gap-[4px] lg:gap-[6px]">
                <img src="/tlogo.png" alt="" />
                <img src="/textLogo.png" alt="" className="max-w-[170px]" />
              </div>

              <div className="flex items-center justify-center gap-[5px] sm:gap-[10px]">
                <p className="font-semibold underline text-[14px] sm:text-[16px] lg:text-[18px]">
                  Scheme Type:
                </p>
                <select
                  name="schemetype"
                  id=""
                  className="p-[10px] sm:p-[10px] rounded-lg focus:outline-none border border-black"
                  onChange={(e) => setSchemeType(e.target.value)}
                >
                  <option value="">Select Scheme Type</option>
                  {schemeTypes?.map((type) => (
                    <option key={type?.id} value={type?.SchemeType}>
                      {type?.SchemeType}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="w-full p-[10px] sm:p-[15px] lg:p-[20px] font-semibold bg-[#F6F8FF] flex flex-col gap-[5px] sm:gap-[10px] lg:gap-[15px] text-[14px] sm:text-[16px] lg:text-[18px] text-[#182456]">
              <div className="w-full flex flex-col gap-[5px] items-start justify-center">
                <label htmlFor="schemename">Scheme name</label>
                <input
                  type="text"
                  className="p-[5px] focus:outline-none border border-black rounded-lg w-full"
                  placeholder="Enter Scheme Name"
                  value={schemeName}
                  onChange={(e) => setSchemeName(e.target.value)}
                />
              </div>
              <div className="w-full flex items-center justify-center gap-[10px] sm:gap-[15px]">
                <div className="basis-[50%]">
                  <label htmlFor="duration">Duration</label>
                  <input
                    type="text"
                    className="p-[5px] focus:outline-none border border-black rounded-lg w-full"
                    placeholder="Enter Duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>
                <div className="basis-[50%]">
                  <label htmlFor="amount">Amount</label>
                  <input
                    type="text"
                    className="p-[5px] focus:outline-none border border-black rounded-lg w-full"
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full flex items-center justify-center gap-[10px] sm:gap-[15px]">
                <div className="basis-[50%]">
                  <label htmlFor="persons">No.of Persons</label>
                  <input
                    type="text"
                    name="persons"
                    value={persons}
                    className="p-[5px] focus:outline-none border border-black rounded-lg w-full"
                    placeholder="Enter Capacity"
                    onChange={(e) => setPersons(e.target.value)}
                  />
                </div>
                <div className="basis-[50%]">
                  <label htmlFor="amount">Bonus Amount</label>
                  <input
                    type="text"
                    className="p-[5px] focus:outline-none border border-black rounded-lg w-full"
                    placeholder="Enter Bonus Amount"
                    value={bonus}
                    onChange={(e) => setBonus(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full flex items-center justify-center gap-[10px] sm:gap-[15px]">
                <div className="basis-[50%]">
                  <label htmlFor="months">Bonus Months</label>
                  <input
                    type="text"
                    name="months"
                    className="p-[5px] focus:outline-none border border-black rounded-lg w-full"
                    placeholder="Enter Bonus Months"
                    value={bonusmonths}
                    onChange={(e) => setBonusMonths(e.target.value)}
                  />
                </div>
                <div className="basis-[50%]">
                  <label htmlFor="comm">Emp Comm(%)</label>
                  <input
                    type="text"
                    className="p-[5px] focus:outline-none border border-black rounded-lg w-full"
                    placeholder="Enter Emp Comm"
                    value={comm}
                    onChange={(e) => setComm(e.target.value)}
                  />
                  <p className="text-[12px]">
                    Employee Commision will be:-{" "}
                    {(comm * (duration * amount + bonusmonths * bonus)) / 100}
                  </p>
                </div>
              </div>
              <div className="w-full flex items-center justify-center gap-[10px] sm:gap-[15px]">
                <div className="basis-[50%]">
                  <label htmlFor="schemevalue">Scheme Value</label>
                  <input
                    type="text"
                    className="p-[5px] focus:outline-none border border-black rounded-lg w-full"
                    placeholder=" Scheme Value"
                    value={duration * amount + bonusmonths * bonus}
                    readOnly
                  />
                </div>
                <div className="basis-[50%]">
                  <label htmlFor="comm">Scheme Code</label>
                  <input
                    type="text"
                    className="p-[5px] focus:outline-none border border-black rounded-lg w-full"
                    placeholder="Enter Code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex items-center justify-center gap-[10px] sm:gap-[15px] lg:gap-[20px]">
            <button
              onClick={() => pushScheneName()}
              className="px-[20px] sm:px-[30px] rounded-md py-[5px] sm:py-[10px] bg-[#52BD91] text-white font-semibold flex items-center justify-center cursor-pointer"
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

export default SchemeName;
