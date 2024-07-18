"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

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

  const [continuous, setContinuous] = useState(false);

  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchSchemeNames = async () => {
      try {
        const response = await fetch("/api/schemename/getnames", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            tn: localStorage.getItem("tenantName"),
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setSchemeNames(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchSchemeNames();
  }, []);

  const handleDelete = async (schemeName) => {
    try {
      const response = await fetch(`/api/schemename/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          tn: localStorage.getItem("tenantName"),
        },
        body: JSON.stringify({ schemeName }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error); // Show the error message
        return;
      }

      setSchemeNames(
        schemeNames.filter((type) => type.SchemeName !== schemeName)
      );
      alert("Scheme Name deleted successfully");
    } catch (error) {
      console.error("Error deleting scheme name:", error);
      alert(
        "An error occurred while deleting the scheme name. Please try again."
      );
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("/api/schemetype/gettypes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          tn: localStorage.getItem("tenantName"),
        },
      });
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

  const handleEdit = (scheme) => {
    setEditing(true);
    setEditingId(scheme.id);
    setSchemeType(scheme.SchemeType);
    setSchemeName(scheme.SchemeName);
    setDuration(scheme.SchemeDuration);
    setAmount(scheme.SchemeAmount);
    setPersons(scheme.SchemePersons);
    setBonus(scheme.BonusAmount);
    setBonusMonths(scheme.BonusMonth);
    setComm(scheme.Commper);
    setCode(scheme.SchemeCode);
  };

  const pushSchemeName = async () => {
    const data = {
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
      continuous: continuous,
    };

    try {
      let response;

      if (editing) {
        response = await fetch("/api/schemename/update", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            tn: localStorage.getItem("tenantName"),
          },
          body: JSON.stringify({ ...data, id: editingId }),
        });
      } else {
        response = await fetch("/api/schemename", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            tn: localStorage.getItem("tenantName"),
          },
        });
      }

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

  const inputRefs = {
    schemeType: useRef(null),
    schemeName: useRef(null),
    duration: useRef(null),
    amount: useRef(null),
    persons: useRef(null),
    bonus: useRef(null),
    bonusmonths: useRef(null),
    code: useRef(null),
    comm: useRef(null),
  };

  const handleKeyDown = (e, nextField) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (inputRefs[nextField]) {
        inputRefs[nextField].current.focus();
      }
    }
  };

  useEffect(() => {}, [
    schemeName,
    duration,
    amount,
    persons,
    bonus,
    bonusmonths,
    comm,
    code,
    editing,
    editingId,
  ]);

  return (
    <>
      <div
        className="w-full min-h-screen"
        style={{
          background: "url(/banner.png) lightgray 50% / cover no-repeat",
        }}
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
            <div className="max-w-[750px] w-full flex flex-col m-auto max-h-full border border-[#182456] rounded-xl overflow-hidden">
              <div
                className="w-full h-[60px] flex flex-col gap-[10px] sm:gap-[15px] lg:gap-[20px] items-center justify-center bg-center bg-cover bg-no-repeat"
                style={{
                  background: "url(/receiptbanner.png)",
                }}
              ></div>

              <div className="w-full py-[10px] px-[20px] font-semibold bg-[#F6F8FF] flex flex-col gap-[5px] sm:gap-[10px] lg:gap-[15px] text-[14px] sm:text-[16px] lg:text-[14px] text-[#182456]">
                <div className="w-full flex gap-[5px] items-center justify-between">
                  <div className="basis-[50%] flex flex-col items-start justify-center">
                    <p className="font-bold text-[14px] sm:text-[15px] lg:text-[15px]">
                      Scheme Type:
                    </p>
                    <select
                      name="schemetype"
                      className="p-[10px] text-[12px] sm:p-[5px] max-w-[300px] w-full rounded-lg focus:outline-none border border-gray-500"
                      value={schemeType}
                      onChange={(e) => setSchemeType(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, "schemeName")}
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
                    <label htmlFor="schemename" className="text-[15px]">
                      Scheme name
                    </label>
                    <input
                      type="text"
                      className=" p-[4px] focus:outline-none border max-w-[300px] text-[12px] border-black rounded-md w-full"
                      placeholder="Enter Scheme Name"
                      value={schemeName}
                      onChange={(e) => setSchemeName(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, "duration")}
                      ref={inputRefs.schemeName}
                    />
                  </div>
                </div>
                <div className="w-full flex items-center justify-center gap-[10px] sm:gap-[15px]">
                  <div className="basis-[33%]">
                    <label htmlFor="duration" className="text-[15px]">
                      Duration
                    </label>
                    <input
                      type="text"
                      className=" p-[4px] focus:outline-none text-[12px] border border-gray-500 rounded-md w-full"
                      placeholder="Enter Duration"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, "amount")}
                      ref={inputRefs.duration}
                    />
                  </div>
                  <div className="basis-[33%]">
                    <label htmlFor="amount" className="text-[15px]">
                      Amount
                    </label>
                    <input
                      type="text"
                      className=" p-[4px] focus:outline-none text-[12px] border border-gray-500 rounded-md w-full"
                      placeholder="Enter Amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, "persons")}
                      ref={inputRefs.amount}
                    />
                  </div>
                  <div className="basis-[33%]">
                    <label htmlFor="persons" className="text-[15px]">
                      No.of Persons
                    </label>
                    <input
                      type="text"
                      name="persons"
                      value={persons}
                      className=" p-[4px] focus:outline-none border border-gray-500 text-[12px] rounded-md w-full"
                      placeholder="Enter Capacity"
                      onChange={(e) => setPersons(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, "bonus")}
                      ref={inputRefs.persons}
                    />
                  </div>
                </div>
                <div className="w-full flex items-center justify-center gap-[10px] sm:gap-[15px]">
                  <div className="basis-[33%]">
                    <label htmlFor="bonus" className="text-[15px]">
                      Bonus Amount
                    </label>
                    <input
                      type="text"
                      className=" p-[4px] focus:outline-none border border-gray-500 text-[12px] rounded-md w-full"
                      placeholder="Enter Bonus Amount"
                      value={bonus}
                      onChange={(e) => setBonus(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, "bonusmonths")}
                      ref={inputRefs.bonus}
                    />
                  </div>
                  <div className="basis-[33%]">
                    <label htmlFor="months" className="text-[15px]">
                      Bonus Months
                    </label>
                    <input
                      type="text"
                      name="months"
                      className=" p-[4px] focus:outline-none border border-gray-500 text-[12px] rounded-md w-full"
                      placeholder="Enter Bonus Months"
                      value={bonusmonths}
                      onChange={(e) => setBonusMonths(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, "code")}
                      ref={inputRefs.bonusmonths}
                    />
                  </div>
                  <div className="basis-[33%]">
                    <label htmlFor="schemevalue" className="text-[15px]">
                      Scheme Value
                    </label>
                    <input
                      type="text"
                      className=" p-[4px] focus:outline-none border border-gray-500 rounded-md text-[12px] w-full"
                      placeholder=" Scheme Value"
                      value={duration * amount + bonusmonths * bonus}
                      readOnly
                    />
                  </div>
                </div>
                <div className="w-full flex items-center justify-center gap-[10px] sm:gap-[15px]">
                  <div className="basis-[66%] w-full flex items-start justify-center gap-[10px] sm:gap-[15px]">
                    <div className="basis-[50%] w-full">
                      <label htmlFor="comm" className="text-[15px]">
                        Scheme Code
                      </label>
                      <input
                        type="text"
                        className=" p-[4px] focus:outline-none border border-gray-500 rounded-md text-[12px] w-full"
                        placeholder="Enter Code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, "comm")}
                        ref={inputRefs.code}
                      />
                    </div>
                    <div className="basis-[50%] w-full">
                      <label htmlFor="comm" className="text-[15px]">
                        Emp Comm(%)
                      </label>
                      <input
                        type="text"
                        className=" p-[4px] focus:outline-none border border-gray-500 rounded-md text-[12px] w-full"
                        placeholder="Enter Emp Comm"
                        value={comm}
                        onChange={(e) => setComm(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, "saveButton")}
                        ref={inputRefs.comm}
                      />
                      <p className="text-[12px]">
                        Employee Commission will be:-{" "}
                        {(comm * (duration * amount + bonusmonths * bonus)) /
                          100}
                      </p>
                    </div>
                  </div>

                  <div className="basis-[33%] h-full flex items-center justify-center gap-[10px]">
                    <label htmlFor="continuous" className="text-[15px]">
                      Continuous Card No
                    </label>
                    <input
                      type="checkbox"
                      name="continuous"
                      checked={continuous}
                      onChange={(e) => setContinuous(e.target.checked)}
                      value={continuous}
                      className=" p-[4px] focus:outline-none border border-gray-500 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full text-[14px] flex items-center justify-center gap-[10px] sm:gap-[15px] lg:gap-[20px]">
              <button
                onClick={() => pushSchemeName()}
                className="px-[20px] sm:px-[30px] w-[120px] rounded-md py-[2px] sm:py-[5px] bg-[#52BD91] text-white font-semibold flex items-center justify-center cursor-pointer"
                ref={inputRefs.saveButton}
              >
                {editing ? "UPDATE" : "SAVE"}
              </button>

              <div className="px-[20px] sm:px-[30px] w-[120px] rounded-md py-[2px] sm:py-[5px] bg-[#182456] text-white font-semibold flex items-center justify-center cursor-pointer">
                CANCEL
              </div>
            </div>
          </div>

          <div className="w-full max-h-full overflow-y-auto custom-scrollbar2 p-[20px]">
            <table className="w-full table-auto text-center max-w-[1350px] mx-auto border border-black">
              <thead className="w-full border border-black text-[12px] bg-[#4FC997]">
                <tr>
                  <th className="border border-black p-1">ID</th>
                  <th className="border border-black p-1">Scheme Code</th>
                  <th className="border border-black p-1">Scheme Type</th>
                  <th className="border border-black p-1">Scheme Name</th>
                  <th className="border border-black p-1">Scheme Amount</th>
                  <th className="border border-black p-1">Scheme Duration</th>
                  <th className="border border-black p-1">Scheme Persons</th>
                  <th className="border border-black p-1">Bonus Months</th>
                  <th className="border border-black p-1">Bonus Amount</th>
                  <th className="border border-black p-1">Scheme Value</th>
                  <th className="border border-black p-1">Commission Per</th>
                  <th className="border border-black p-1">Commission Amount</th>
                  <th className="border border-black p-1">Actions</th>
                </tr>
              </thead>
              <tbody className="w-full border border-black">
                {schemeNames.map((type, index) => (
                  <tr
                    key={type.id}
                    className={`px-1 text-[12px] font-medium ${
                      index % 2 == 0 ? "bg-white" : "bg-gray-100 "
                    }`}
                  >
                    <td className="border border-black p-1">{type.id}</td>
                    <td className="border border-black p-1">
                      {type.SchemeCode}
                    </td>
                    <td className="border border-black p-1">
                      {type.SchemeType}
                    </td>
                    <td className="border border-black p-1">
                      {type.SchemeName}
                    </td>
                    <td className="border border-black p-1">
                      {type.SchemeAmount}
                    </td>
                    <td className="border border-black p-1">
                      {type.SchemeDuration}
                    </td>
                    <td className="border border-black p-1">
                      {type.SchemePersons}
                    </td>
                    <td className="border border-black p-1">
                      {type.BonusMonth}
                    </td>
                    <td className="border border-black p-1">
                      {type.BonusAmount}
                    </td>
                    <td className="border border-black p-1">
                      {type.SchemeValue}
                    </td>
                    <td className="border border-black p-1">{type.Commper}</td>
                    <td className="border border-black p-1">{type.Commamt}</td>
                    <td className="border border-black p-1 text-[14px]">
                      <button
                        className="text-blue-700 "
                        onClick={() => handleEdit(type)}
                      >
                        <FaRegEdit />
                      </button>
                      <button
                        className="text-red-700"
                        onClick={() => handleDelete(type.SchemeName)}
                      >
                        <MdDelete />
                      </button>
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
