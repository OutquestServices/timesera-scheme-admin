"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const SchemeType = () => {
  const [schemeType, setSchemeType] = useState("");
  const [goldScheme, setGoldScheme] = useState("Cash Scheme");

  const [schemeTypes, setSchemeTypes] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchSchemeTypes = async () => {
      try {
        const response = await fetch("/api/schemetype/gettypes", {
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
        setSchemeTypes(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchSchemeTypes();
  }, []);

  const handleDelete = async (schemeType) => {
    try {
      const response = await fetch(`/api/schemetype/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          tn: localStorage.getItem("tenantName"),
        },
        body: JSON.stringify({ schemeType }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error);
        return;
      }

      setSchemeTypes(
        schemeTypes.filter((type) => type.SchemeType !== schemeType)
      );
      alert("Scheme type deleted successfully");
    } catch (error) {
      console.error("Error deleting scheme type:", error);
      alert(
        "An error occurred while deleting the scheme type. Please try again."
      );
    }
  };

  const handleEdit = (type) => {
    setSchemeType(type.SchemeType);
    setGoldScheme(type.SchemeMode);
    setEditing(true);
    setEditingId(type.id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      type: schemeType,
      mode: goldScheme,
    };

    if (data.type === "") {
      alert("Enter Scheme Type");
    } else {
      try {
        let response;
        if (editing) {
          response = await fetch(`/api/schemetype/update`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              tn: localStorage.getItem("tenantName"),
            },
            body: JSON.stringify({ ...data, id: editingId }),
          });
        } else {
          response = await fetch("/api/schemetype", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              tn: localStorage.getItem("tenantName"),
            },
            body: JSON.stringify(data),
          });
        }

        const result = await response.json();

        if (response.ok) {
          alert("Data saved successfully");
          setGoldScheme("Cash Scheme");
          setSchemeType("");
          setEditing(false);
          setEditingId(null);
        } else {
          alert(result.error || "Failed to save data");
          setGoldScheme("Cash Scheme");
          setSchemeType("");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred. Please try again.");
        setGoldScheme("Cash Scheme");
        setSchemeType("");
      }
    }
  };

  return (
    <div
      className="w-full min-h-screen"
      style={{ background: "url(/banner.png) lightgray 50% / cover no-repeat" }}
    >
      <div className="w-full h-full">
        <div className="px-[10px] sm:px-[20px] lg:px-[40px] py-[5px] sm:py-[10px] lg:py-[15px]">
          <div
            className="w-full h-full px-[15px] sm:px-[30px] lg:px-[45px] py-[10px] sm:py-[10px] lg:py-[10px] rounded-md flex items-center gap-[10px] sm:gap-[15px] lg:gap-[20px]"
            style={{
              background:
                "linear-gradient(270deg, #0A0E16 5.64%, #182456 97.55%)",
            }}
          >
            <div className="basis-[60%] flex items-center justify-between w-full h-full">
              <h1 className="flex-1 text-[#fff] text-[20px] sm:text-[16px] lg:text-[20px] font-semibold pl-[10px] border-l-8 rounded-s-md border-[#52BD91]">
                Scheme Type
              </h1>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-[10px] sm:gap-[15px] lg:gap-[20px] items-center justify-center">
          <div className="max-w-[550px] w-full flex flex-col m-auto max-h-full border border-[#182456] rounded-xl overflow-hidden">
            <div
              className="w-full h-[50px] flex items-center justify-center"
              style={{
                background: "url(/receiptbanner.png)",
              }}
            ></div>

            <div className="w-full p-[10px] sm:p-[15px] lg:p-[20px] bg-[#F6F8FF] flex flex-col gap-[5px] sm:gap-[10px] lg:gap-[15px] text-[14px] sm:text-[16px] lg:text-[14px] text-[#182456]">
              <div className="w-full flex items-center justify-center gap-[20px]">
                <p className="basis-[40%] font-semibold  flex items-center justify-center">
                  Scheme Type:
                </p>
                <input
                  type="text"
                  value={schemeType}
                  className="basis-[60%] max-w-[250px] w-full focus:outline-none p-[4px] sm:p-[3px] lg:p-[3px] text-[12px] rounded-md border border-gray-500 "
                  onChange={(e) => setSchemeType(e.target.value)}
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
                    checked={goldScheme === "Gold Scheme"}
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
                    checked={goldScheme === "Cash Scheme"}
                  />
                  <label htmlFor="cashscheme" className="font-semibold">
                    Cash Scheme
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full text-[14px] flex items-center justify-center gap-[10px] sm:gap-[15px] lg:gap-[20px]">
            <button
              className="px-[20px] w-[120px] sm:px-[30px] rounded-md py-[2px] sm:py-[5px] bg-[#52BD91] text-white font-semibold flex items-center justify-center cursor-pointer"
              onClick={handleSubmit}
            >
              {editing ? "UPDATE" : "SAVE"}
            </button>

            <div className="px-[20px] w-[120px] sm:px-[30px] rounded-md py-[2px] sm:py-[5px] bg-[#182456] text-white font-semibold flex items-center justify-center cursor-pointer">
              CANCEL
            </div>
          </div>
        </div>

        <div className="w-full max-h-full overflow-y-auto custom-scrollbar2 p-[20px]">
          <table className="w-full table-auto text-center max-w-[750px] mx-auto border border-black">
            <thead className="w-full border border-black">
              <tr className="bg-[#4FC997]">
                <th className="border border-black p-2">ID</th>
                <th className="border border-black p-2">Scheme Type</th>
                <th className="border border-black p-2">Scheme Mode</th>
                <th className="border border-black p-2">Actions</th>
              </tr>
            </thead>
            <tbody className="w-full border border-black">
              {schemeTypes.map((type, index) => (
                <tr
                  key={type.id}
                  className={`px-1 text-[12px] ${
                    index % 2 == 0 ? "bg-white" : "bg-gray-100"
                  } font-medium`}
                >
                  <td className="border border-black p-2">{type.id}</td>
                  <td className="border border-black p-2">{type.SchemeType}</td>
                  <td className="border border-black p-2">{type.SchemeMode}</td>
                  <td className="border border-black p-2 text-[14px]">
                    <button
                      className="text-blue-700 mr-2"
                      onClick={() => handleEdit(type)}
                    >
                      <FaRegEdit />
                    </button>
                    <button
                      className="text-red-700"
                      onClick={() => handleDelete(type.SchemeType)}
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
  );
};

export default SchemeType;
