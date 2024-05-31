"use client";

import React, { useEffect, useState } from "react";

const SchemeType = () => {
    const [schemeType, setSchemeType] = useState("");
    const [goldScheme, setGoldScheme] = useState("");

    const [schemeTypes, setSchemeTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSchemeTypes = async () => {
            try {
                const response = await fetch('/api/schemetype/gettypes', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setSchemeTypes(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSchemeTypes();
    }, []);

    const handleDelete = async (schemeType) => {
        try {
            const response = await fetch(`/api/schemetype/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ schemeType }),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.error);  // Show the error message
                return;
            }

            // Remove the deleted item from the state
            setSchemeTypes(schemeTypes.filter((type) => type.SchemeType !== schemeType));
            alert('Scheme type deleted successfully');
            window.location.reload();
        } catch (error) {
            console.error('Error deleting scheme type:', error);
            alert('An error occurred while deleting the scheme type. Please try again.');
        }
    };


    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    // if (error) {
    //     return <div>Error: {error}</div>;
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            type: schemeType,
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
                setSchemeType("");
                window.location.reload();
            } else {
                alert("Failed to save data");
                setGoldScheme("");
                setSchemeType("");
            }
        } catch (error) {
            console.error(error);
            setGoldScheme("");
            setSchemeType("");
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
                        className="w-full h-full px-[15px] sm:px-[30px] lg:px-[45px] py-[10px] sm:py-[10px] lg:py-[15px] rounded-md flex items-center gap-[10px] sm:gap-[15px] lg:gap-[20px]"
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
                    <div className="max-w-[750px] w-full flex flex-col m-auto max-h-full border-2 border-[#182456] rounded-xl overflow-hidden">
                        <div
                            className="w-full h-[100px] flex items-center justify-center"
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

                        <div className="w-full p-[10px] sm:p-[15px] lg:p-[20px] bg-[#F6F8FF] flex flex-col gap-[5px] sm:gap-[10px] lg:gap-[15px] text-[14px] sm:text-[16px] lg:text-[14px] text-[#182456]">
                            <div className="w-full flex items-center justify-between">
                                <p className="basis-[40%]  font-semibold  ">
                                    Scheme Type:
                                </p>
                                <input
                                    type="text"
                                    value={schemeType}
                                    className="basis-[60%] w-full focus:outline-none p-[4px] sm:p-[5px] lg:p-[5px] rounded-xl border-2 border-[#182456] "
                                    onChange={(e) => setSchemeType(e.target.value)}
                                />
                            </div>
                            {/* <div className="w-full flex items-center justify-between">
                                <p className="basis-[40%]  font-semibold underline ">
                                    Group Code:
                                </p>
                                <input
                                    type="text"
                                    value={groupCode}
                                    className="basis-[60%] w-full focus:outline-none p-[4px] sm:p-[7px] lg:p-[10px] rounded-xl border-2 border-[#182456] "
                                    onChange={(e) => setGroupCode(e.target.value)}
                                />
                            </div> */}
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

                <div className="w-full max-h-full overflow-y-auto custom-scrollbar2 p-[20px]">
                    <table className="w-full table-auto text-center max-w-[750px] mx-auto border border-black">
                        <thead className="w-full border border-black">
                            <tr>
                                <th className="border border-black p-2">ID</th>
                                <th className="border border-black p-2">Scheme Type</th>
                                <th className="border border-black p-2">Scheme Mode</th>
                                <th className="border border-black p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="w-full border border-black">
                            {schemeTypes.map((type) => (
                                <tr key={type.id} className="border border-black">
                                    <td className="border border-black p-2">{type.id}</td>
                                    <td className="border border-black p-2">{type.SchemeType}</td>
                                    <td className="border border-black p-2">{type.SchemeMode}</td>
                                    <td className="border border-black p-2">
                                        <button className="text-red-700" onClick={() => handleDelete(type.SchemeType)}>Delete</button>
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
