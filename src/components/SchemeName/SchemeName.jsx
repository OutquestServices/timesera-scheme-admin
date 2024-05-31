"use client";

import React, { useEffect, useRef, useState } from "react";

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

  const [schemeNames, setSchemeNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [continuous, setContinuous] = useState(false);

  useEffect(() => {
    const fetchSchemeNames = async () => {
      try {
        const response = await fetch('/api/schemename/getnames', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setSchemeNames(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSchemeNames();
  }, []);

  const handleDelete = async (schemeName) => {
    try {
      const response = await fetch(`/api/schemename/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ schemeName }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error);  // Show the error message
        return;
      }

      // Remove the deleted item from the state
      setSchemeNames(schemeNames.filter((type) => type.SchemeName !== schemeName));
      alert('Scheme Name deleted successfully');
      window.location.reload();
    } catch (error) {
      console.error('Error deleting scheme name:', error);
      alert('An error occurred while deleting the scheme name. Please try again.');
    }
  };


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

  const pushSchemeName = async () => {
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
          continuous: continuous
        }),
      });

      if (!response.ok) {
        throw new Error("Network response is not ok in scheme name");
      }

      const ans = await response.json();
      alert(ans?.message);
      window.location.reload();
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

  useEffect(() => { }, [duration, amount, bonus, bonusmonths]);

  const inputRefs = {
    schemeType: useRef(null),
    schemeName: useRef(null),
    duration: useRef(null),
    amount: useRef(null),
    persons: useRef(null),
    bonus: useRef(null),
    bonusmonths: useRef(null),
    code: useRef(null),
    comm: useRef(null)
  };

  // Function to handle key down event and move to next input on Enter key
  const handleKeyDown = (e, nextField) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputRefs[nextField]) {
        inputRefs[nextField].current.focus();
      }
    }
  };

  return (
    <>
      <div
        className="w-full min-h-screen"
        style={{ background: "url(/banner.png) lightgray 50% / cover no-repeat" }}
      >
        <div className="w-full h-full">
          <div className="px-[10px] sm:px-[20px] lg:px-[40px] py-[5px] sm:py-[10px] lg:py-[15px]">
            <div
              className="w-full h-full px-[15px] sm:px-[30px] lg:px-[45px] py-[10px] sm:py-[15px] lg:py-[15px] rounded-md flex items-center gap-[10px] sm:gap-[15px] lg:gap-[20px]"
              style={{
                background:
                  "linear-gradient(270deg, #0A0E16 5.64%, #182456 97.55%)",
              }}
            >
              <div className="basis-[60%] flex items-center justify-between w-full h-full">
                <h1 className="flex-1 text-[#fff] text-[20px] sm:text-[24px] lg:text-[20px] font-semibold pl-[10px] border-l-8 rounded-s-md border-[#52BD91]">
                  Scheme Name
                </h1>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-[10px] sm:gap-[15px] lg:gap-[20px] items-center justify-center">
            <div className="max-w-[750px] w-full flex flex-col m-auto max-h-full border-2 border-[#182456] rounded-xl overflow-hidden">
              <div
                className="w-full h-[100px] flex flex-col gap-[10px] sm:gap-[15px] lg:gap-[20px] items-center justify-center"
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

              <div className="w-full py-[10px] px-[20px] font-semibold bg-[#F6F8FF] flex flex-col gap-[5px] sm:gap-[10px] lg:gap-[15px] text-[14px] sm:text-[16px] lg:text-[14px] text-[#182456]">
                <div className="w-full flex gap-[5px] items-center justify-between">
                  <div className="basis-[50%] flex items-center justify-center gap-[5px] sm:gap-[10px]">
                    <p className="font-semibold text-[14px] sm:text-[16px] lg:text-[14px]">
                      Scheme Type:
                    </p>
                    <select
                      name="schemetype"
                      className="p-[10px] sm:p-[5px] rounded-lg focus:outline-none border border-black"
                      onChange={(e) => setSchemeType(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, 'schemeName')}
                      ref={inputRefs.schemeType}
                    >
                      <option value="">Select Scheme Type</option>
                      {schemeTypes?.map((type) => (
                        <option key={type?.id} value={type?.SchemeType}>
                          {type?.SchemeType}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="basis-[50%]">
                    <label htmlFor="schemename">Scheme name</label>
                    <input
                      type="text"
                      className="p-[5px] focus:outline-none border text-[14px] border-black rounded-lg w-full"
                      placeholder="Enter Scheme Name"
                      value={schemeName}
                      onChange={(e) => setSchemeName(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, 'duration')}
                      ref={inputRefs.schemeName}
                    />
                  </div>
                </div>
                <div className="w-full flex items-center justify-center gap-[10px] sm:gap-[15px]">
                  <div className="basis-[33%]">
                    <label htmlFor="duration">Duration</label>
                    <input
                      type="text"
                      className="p-[5px] focus:outline-none border border-black rounded-lg w-full"
                      placeholder="Enter Duration"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, 'amount')}
                      ref={inputRefs.duration}
                    />
                  </div>
                  <div className="basis-[33%]">
                    <label htmlFor="amount">Amount</label>
                    <input
                      type="text"
                      className="p-[5px] focus:outline-none border border-black rounded-lg w-full"
                      placeholder="Enter Amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, 'persons')}
                      ref={inputRefs.amount}
                    />
                  </div>
                  <div className="basis-[33%]">
                    <label htmlFor="persons">No.of Persons</label>
                    <input
                      type="text"
                      name="persons"
                      value={persons}
                      className="p-[5px] focus:outline-none border border-black rounded-lg w-full"
                      placeholder="Enter Capacity"
                      onChange={(e) => setPersons(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, 'bonus')}
                      ref={inputRefs.persons}
                    />
                  </div>
                </div>
                <div className="w-full flex items-center justify-center gap-[10px] sm:gap-[15px]">
                  <div className="basis-[33%]">
                    <label htmlFor="bonus">Bonus Amount</label>
                    <input
                      type="text"
                      className="p-[5px] focus:outline-none border border-black rounded-lg w-full"
                      placeholder="Enter Bonus Amount"
                      value={bonus}
                      onChange={(e) => setBonus(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, 'bonusmonths')}
                      ref={inputRefs.bonus}
                    />
                  </div>
                  <div className="basis-[33%]">
                    <label htmlFor="months">Bonus Months</label>
                    <input
                      type="text"
                      name="months"
                      className="p-[5px] focus:outline-none border border-black rounded-lg w-full"
                      placeholder="Enter Bonus Months"
                      value={bonusmonths}
                      onChange={(e) => setBonusMonths(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, 'code')}
                      ref={inputRefs.bonusmonths}
                    />
                  </div>
                  <div className="basis-[33%]">
                    <label htmlFor="schemevalue">Scheme Value</label>
                    <input
                      type="text"
                      className="p-[5px] focus:outline-none border border-black rounded-lg w-full"
                      placeholder=" Scheme Value"
                      value={duration * amount + bonusmonths * bonus}
                      readOnly
                    />
                  </div>
                </div>
                <div className="w-full flex items-center justify-center gap-[10px] sm:gap-[15px]">
                  <div className="basis-[33%]">
                    <label htmlFor="comm">Scheme Code</label>
                    <input
                      type="text"
                      className="p-[5px] focus:outline-none border border-black rounded-lg w-full"
                      placeholder="Enter Code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, 'comm')}
                      ref={inputRefs.code}
                    />
                  </div>
                  <div className="basis-[33%]">
                    <label htmlFor="comm">Emp Comm(%)</label>
                    <input
                      type="text"
                      className="p-[5px] focus:outline-none border border-black rounded-lg w-full"
                      placeholder="Enter Emp Comm"
                      value={comm}
                      onChange={(e) => setComm(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, 'saveButton')}
                      ref={inputRefs.comm}
                    />
                    <p className="text-[12px]">
                      Employee Commission will be:-{" "}
                      {(comm * (duration * amount + bonusmonths * bonus)) / 100}
                    </p>
                  </div>
                  <div className="basis-[33%] flex items-center justify-center gap-[10px]">
                    <label htmlFor="continuous">Continuous Card No</label>
                    <input
                      type="checkbox"
                      name="continuous"
                      checked={continuous}
                      onChange={(e) => setContinuous(e.target.checked)}
                      className="p-[5px] focus:outline-none border border-black rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex items-center justify-center gap-[10px] sm:gap-[15px] lg:gap-[20px]">
              <button
                onClick={() => pushSchemeName()}
                className="px-[20px] sm:px-[30px] rounded-md py-[5px] sm:py-[10px] bg-[#52BD91] text-white font-semibold flex items-center justify-center cursor-pointer"
                ref={inputRefs.saveButton}
              >
                SAVE
              </button>

              <div className="px-[20px] sm:px-[30px] rounded-md py-[5px] sm:py-[10px] bg-[#182456] text-white font-semibold flex items-center justify-center cursor-pointer">
                CANCEL
              </div>
            </div>
          </div>


          <div className="w-full max-h-full overflow-y-auto custom-scrollbar2 p-[20px]">
            <table className="w-full table-auto text-center max-w-[1350px] mx-auto border border-black">
              <thead className="w-full border border-black">
                <tr>
                  <th className="border border-black p-2">ID</th>
                  <th className="border border-black p-2">Scheme Code</th>
                  <th className="border border-black p-2">Scheme Type</th>
                  <th className="border border-black p-2">Scheme Name</th>
                  <th className="border border-black p-2">Scheme Amount</th>
                  <th className="border border-black p-2">Scheme Duration</th>
                  <th className="border border-black p-2">Scheme Persons</th>
                  <th className="border border-black p-2">Bonus Months</th>
                  <th className="border border-black p-2">Bonus Amount</th>
                  <th className="border border-black p-2">Scheme Value</th>
                  <th className="border border-black p-2">Commission Per</th>
                  <th className="border border-black p-2">Commission Amount</th>
                  <th className="border border-black p-2">Actions</th>
                </tr>
              </thead>
              <tbody className="w-full border border-black">
                {schemeNames.map((type) => (
                  <tr key={type.id} className="border border-black">
                    <td className="border border-black p-2">{type.id}</td>
                    <td className="border border-black p-2">{type.SchemeCode}</td>
                    <td className="border border-black p-2">{type.SchemeType}</td>
                    <td className="border border-black p-2">{type.SchemeName}</td>
                    <td className="border border-black p-2">{type.SchemeAmount}</td>
                    <td className="border border-black p-2">{type.SchemeDuration}</td>
                    <td className="border border-black p-2">{type.SchemePersons}</td>
                    <td className="border border-black p-2">{type.BonusMonth}</td>
                    <td className="border border-black p-2">{type.BonusAmount}</td>
                    <td className="border border-black p-2">{type.SchemeValue}</td>
                    <td className="border border-black p-2">{type.Commper}</td>
                    <td className="border border-black p-2">{type.Commamt}</td>
                    <td className="border border-black p-2">
                      <button className="text-red-700" onClick={() => handleDelete(type.SchemeName)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


        </div>
      </div>
    </>
  );
};

export default SchemeName;
