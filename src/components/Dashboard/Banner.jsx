"use client";

import React, { useEffect, useState } from 'react'
import CheckBox from './CheckBoxes'
import { Swiper, SwiperSlide } from 'swiper/react';
import "./Styling.css";

// Import Swiper styles
import 'swiper/css';

import { Autoplay } from "swiper/modules";
import PaymentMethods from './PaymentMethods';

const Banner = () => {

    const [todayRates, setTodayRates] = useState([]);

    const [userAddress, setUserAddress] = useState(null);

    useEffect(() => {
        const fetchUserAddress = async () => {
            try {
                const tenantName = localStorage.getItem('tenantName');

                if (!tenantName) {
                    throw new Error('Tenant name is not available in local storage');
                }

                const response = await fetch('https://www.erpser.timeserasoftware.in/GetUserAddress', {
                    method: 'GET',
                    headers: {
                        'tenantName': tenantName
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setUserAddress(data);
            } catch (error) {
                console.error('Error fetching user address:', error);
                alert('An error occurred while fetching user address. Please try again.');
            }
        };

        fetchUserAddress();
    }, []);


    function getFormattedDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const date = getFormattedDate();

    const formatRupees = (value) => {
        const roundedValue = parseFloat(value).toFixed(2);
        return roundedValue.includes('.') ? roundedValue : `${roundedValue}.00`;
    }

    const formatWeight = (value) => {
        const roundedValue = parseFloat(value).toFixed(3);
        return roundedValue.includes('.') ? roundedValue : `${roundedValue}.000`;
    }

    const fetchRates = (date) => {
        fetch(`https://www.erpser.timeserasoftware.in/api/DashBoard/GetDailyRates?date=${date}`, {
            headers: { 'tenantName': "ORIGIN_JST" }
        }).then((res) => res.json()).then((data) => { setTodayRates(data) }).catch((error) => { console.error('Error fetching data in dashboard todayRates:', error); })
    }

    useEffect(() => {
        fetchRates(date);
    }, [date]);



    // console.log(todayRates)

    return (
        <div>
            <div className='flex w-full h-full gap-[10px] lg:gap-[25px] xl:gap-[40px] items-start justify-start'>
                <div className='basis-[40%] w-full h-full flex flex-col items-center justify-center'>
                    <div className='w-full h-[180px] overflow-hidden rounded-2xl bg-[#EEF2FF] relative -z-30'>
                        <div className='w-full h-full flex items-center justify-center py-[5px] px-[20px] gap-[10px]'>
                            <div className='w-full h-full flex items-center justify-start flex-col'>
                                <p className='text-[22px] text-[#172561] font-semibold '>{userAddress?.firmName}</p>
                                <p className='text-[12px] text-[#172561] font-semibold'>{userAddress?.address1}</p>
                                <p className='text-[12px] text-[#172561] font-semibold'>{userAddress?.address2}</p>
                                <p className='text-[13px] text-[#172561] font-semibold'><span className='font-bold'>Contact:</span>{userAddress?.fMobile}</p>
                                <p className='text-[14px] text-[#172561] font-semibold'><span className='font-bold'>GST:</span> {userAddress?.tinno}</p>

                            </div>
                        </div>
                    </div>

                    <div className='w-full px-[20px] flex -mt-[60px] items-center justify-center gap-[5px] '>
                        <div className='w-full max-w-[120px] max-h-[120px] overflow-hidden rounded-md flex flex-col items-center justify-center '>
                            <div className='h-[45px] w-[45px] rounded-[50%] bg-[#182456] flex items-center justify-center relative z-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                    <path d="M20.014 2.72913H16.7657C16.7007 2.72913 16.6383 2.75497 16.5923 2.80097C16.5463 2.84698 16.5204 2.90937 16.5204 2.97443C16.5204 3.01623 16.5336 3.05363 16.5518 3.08773V4.95663C16.5518 5.02512 16.5384 5.09295 16.5122 5.15624C16.486 5.21954 16.4476 5.27704 16.3992 5.32547C16.3508 5.3739 16.2933 5.41231 16.23 5.43848C16.1667 5.46466 16.0988 5.4781 16.0304 5.47803H15.0195C14.9559 5.47803 14.893 5.46551 14.8342 5.44118C14.7755 5.41686 14.7222 5.38121 14.6772 5.33627C14.6323 5.29132 14.5966 5.23797 14.5723 5.17925C14.548 5.12052 14.5355 5.05759 14.5355 4.99403V3.11798C14.5679 3.07705 14.5861 3.02664 14.5872 2.97443C14.5872 2.94219 14.5809 2.91026 14.5686 2.88047C14.5563 2.85067 14.5383 2.8236 14.5155 2.80081C14.4927 2.77802 14.4656 2.75995 14.4358 2.74765C14.406 2.73535 14.3741 2.72905 14.3419 2.72913H7.79411C7.72905 2.72913 7.66666 2.75497 7.62065 2.80097C7.57465 2.84698 7.54881 2.90937 7.54881 2.97443C7.54881 3.01238 7.55926 3.04703 7.57466 3.07948V4.96983C7.57466 5.03664 7.5615 5.10279 7.53593 5.16452C7.51037 5.22624 7.47289 5.28233 7.42565 5.32957C7.37841 5.37681 7.32232 5.41428 7.2606 5.43985C7.19887 5.46542 7.13272 5.47858 7.06591 5.47858H6.16831C6.03207 5.47858 5.9014 5.42445 5.80507 5.32812C5.70873 5.23178 5.65461 5.10112 5.65461 4.96488V3.09323C5.67645 3.05738 5.6884 3.01639 5.68926 2.97443C5.68933 2.94219 5.68304 2.91026 5.67073 2.88047C5.65843 2.85067 5.64037 2.8236 5.61757 2.80081C5.59478 2.77802 5.56771 2.75995 5.53792 2.74765C5.50812 2.73535 5.47619 2.72905 5.44396 2.72913H2.02131C1.87675 2.72927 1.73814 2.78673 1.63587 2.8889C1.53359 2.99106 1.476 3.12961 1.47571 3.27418V19.5179C1.47571 19.8193 1.72046 20.064 2.02131 20.064H20.014C20.1587 20.0637 20.2973 20.0061 20.3995 19.9037C20.5017 19.8013 20.5591 19.6625 20.5591 19.5179V3.27418C20.5588 3.12971 20.5013 2.99124 20.3991 2.88909C20.2969 2.78694 20.1585 2.72942 20.014 2.72913ZM20.014 19.5734H2.02131C2.01404 19.5734 2.00684 19.572 2.00013 19.5692C1.99342 19.5664 1.98734 19.5623 1.98222 19.5571C1.97711 19.552 1.97307 19.5458 1.97034 19.5391C1.9676 19.5324 1.96624 19.5251 1.96631 19.5179V7.26773H20.0685V19.5173C20.0686 19.5246 20.0673 19.5318 20.0646 19.5386C20.062 19.5453 20.058 19.5515 20.0529 19.5567C20.0479 19.562 20.0418 19.5661 20.0351 19.569C20.0285 19.5718 20.0213 19.5734 20.014 19.5734Z" fill="white" />
                                    <path d="M6.68088 4.91926C6.81618 4.91926 6.92618 4.80926 6.92618 4.67396V1.37506C6.92618 1.34285 6.91983 1.31095 6.90751 1.28119C6.89518 1.25143 6.87711 1.22439 6.85433 1.20161C6.83155 1.17883 6.80451 1.16076 6.77475 1.14843C6.74499 1.13611 6.71309 1.12976 6.68088 1.12976C6.64866 1.12976 6.61677 1.13611 6.58701 1.14843C6.55724 1.16076 6.5302 1.17883 6.50742 1.20161C6.48465 1.22439 6.46658 1.25143 6.45425 1.28119C6.44192 1.31095 6.43558 1.34285 6.43558 1.37506V4.67451C6.43558 4.80981 6.54558 4.91926 6.68088 4.91926ZM15.5656 4.91926C15.7009 4.91926 15.8109 4.80926 15.8109 4.67396V1.37506C15.8109 1.34285 15.8045 1.31095 15.7922 1.28119C15.7799 1.25143 15.7618 1.22439 15.739 1.20161C15.7163 1.17883 15.6892 1.16076 15.6594 1.14843C15.6297 1.13611 15.5978 1.12976 15.5656 1.12976C15.5334 1.12976 15.5015 1.13611 15.4717 1.14843C15.4419 1.16076 15.4149 1.17883 15.3921 1.20161C15.3693 1.22439 15.3513 1.25143 15.339 1.28119C15.3266 1.31095 15.3203 1.34285 15.3203 1.37506V4.67451C15.3203 4.80981 15.4297 4.91926 15.5656 4.91926Z" fill="white" />
                                    <path d="M5.41318 10.9786C6.15981 10.9786 6.76508 10.3733 6.76508 9.62668C6.76508 8.88005 6.15981 8.27478 5.41318 8.27478C4.66655 8.27478 4.06128 8.88005 4.06128 9.62668C4.06128 10.3733 4.66655 10.9786 5.41318 10.9786Z" fill="white" />
                                    <path d="M9.29837 10.9786C10.045 10.9786 10.6503 10.3733 10.6503 9.62668C10.6503 8.88005 10.045 8.27478 9.29837 8.27478C8.55174 8.27478 7.94647 8.88005 7.94647 9.62668C7.94647 10.3733 8.55174 10.9786 9.29837 10.9786Z" fill="white" />
                                    <path d="M13.183 10.9786C13.9296 10.9786 14.5349 10.3733 14.5349 9.62668C14.5349 8.88005 13.9296 8.27478 13.183 8.27478C12.4364 8.27478 11.8311 8.88005 11.8311 9.62668C11.8311 10.3733 12.4364 10.9786 13.183 10.9786Z" fill="white" />
                                    <path d="M5.41318 14.7434C6.15981 14.7434 6.76508 14.1381 6.76508 13.3915C6.76508 12.6448 6.15981 12.0396 5.41318 12.0396C4.66655 12.0396 4.06128 12.6448 4.06128 13.3915C4.06128 14.1381 4.66655 14.7434 5.41318 14.7434Z" fill="white" />
                                    <path d="M9.29837 14.7434C10.045 14.7434 10.6503 14.1381 10.6503 13.3915C10.6503 12.6448 10.045 12.0396 9.29837 12.0396C8.55174 12.0396 7.94647 12.6448 7.94647 13.3915C7.94647 14.1381 8.55174 14.7434 9.29837 14.7434Z" fill="white" />
                                    <path d="M13.183 14.7434C13.9296 14.7434 14.5349 14.1381 14.5349 13.3915C14.5349 12.6448 13.9296 12.0396 13.183 12.0396C12.4364 12.0396 11.8311 12.6448 11.8311 13.3915C11.8311 14.1381 12.4364 14.7434 13.183 14.7434Z" fill="white" />
                                    <path d="M5.41318 18.5081C6.15981 18.5081 6.76508 17.9029 6.76508 17.1562C6.76508 16.4096 6.15981 15.8043 5.41318 15.8043C4.66655 15.8043 4.06128 16.4096 4.06128 17.1562C4.06128 17.9029 4.66655 18.5081 5.41318 18.5081Z" fill="white" />
                                    <path d="M9.29837 18.5081C10.045 18.5081 10.6503 17.9029 10.6503 17.1562C10.6503 16.4096 10.045 15.8043 9.29837 15.8043C8.55174 15.8043 7.94647 16.4096 7.94647 17.1562C7.94647 17.9029 8.55174 18.5081 9.29837 18.5081Z" fill="white" />
                                    <path d="M13.183 18.5081C13.9296 18.5081 14.5349 17.9029 14.5349 17.1562C14.5349 16.4096 13.9296 15.8043 13.183 15.8043C12.4364 15.8043 11.8311 16.4096 11.8311 17.1562C11.8311 17.9029 12.4364 18.5081 13.183 18.5081Z" fill="white" />
                                    <path d="M16.9769 10.9786C17.7235 10.9786 18.3288 10.3733 18.3288 9.62668C18.3288 8.88005 17.7235 8.27478 16.9769 8.27478C16.2302 8.27478 15.625 8.88005 15.625 9.62668C15.625 10.3733 16.2302 10.9786 16.9769 10.9786Z" fill="white" />
                                    <path d="M16.9769 14.7434C17.7235 14.7434 18.3288 14.1381 18.3288 13.3915C18.3288 12.6448 17.7235 12.0396 16.9769 12.0396C16.2302 12.0396 15.625 12.6448 15.625 13.3915C15.625 14.1381 16.2302 14.7434 16.9769 14.7434Z" fill="white" />
                                    <path d="M16.9769 18.5081C17.7235 18.5081 18.3288 17.9029 18.3288 17.1562C18.3288 16.4096 17.7235 15.8043 16.9769 15.8043C16.2302 15.8043 15.625 16.4096 15.625 17.1562C15.625 17.9029 16.2302 18.5081 16.9769 18.5081Z" fill="white" />
                                </svg>
                            </div>
                            <div className='w-full h-[70px] bg-white border border-black rounded-md -mt-[15px] -z-20 '>
                                <div className='relative -z-10'>
                                    <div className='absolute top-0 left-0'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="37" height="45" viewBox="0 0 37 45" fill="none">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.37579 44.583C22.0985 44.583 36.4656 30.2159 36.4656 12.4932C36.4656 -5.22948 22.0985 -19.5966 4.37579 -19.5966C-13.3469 -19.5966 -27.714 -5.22948 -27.714 12.4932C-27.714 30.2159 -13.3469 44.583 4.37579 44.583ZM4.69676 34.3143C16.571 34.3143 26.1969 24.6883 26.1969 12.8141C26.1969 0.939917 16.571 -8.68603 4.69676 -8.68603C-7.17744 -8.68603 -16.8034 0.939917 -16.8034 12.8141C-16.8034 24.6883 -7.17744 34.3143 4.69676 34.3143Z" fill="#C9D0E8" />
                                        </svg>
                                    </div>
                                </div>
                                <div className='w-full h-full p-[5px] mt-[5px] flex flex-col items-center justify-center text-center  relative z-30 text-black'>
                                    <p className='text-[12px] font-medium text-[#000] '>Financial Year</p>
                                    <p className='text-[14px] font-bold text-[#182456]'>{userAddress?.fYear}</p>
                                </div>
                            </div>
                        </div>


                        <div className='w-full max-w-[120px] max-h-[120px] overflow-hidden rounded-md flex flex-col items-center justify-center '>
                            <div className='h-[45px] w-[45px] rounded-[50%] bg-[#52BD91] flex items-center justify-center relative z-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                    <path d="M20.7463 10.6614L19.8869 11.3906M4.44417 10.7135L5.30355 11.4427M7.5848 8.05725L8.16813 9.02079M12.5535 6.76038V7.88538M12.741 16.3541L17.5483 7.91663M22.6577 14.2708C22.6577 14.8233 22.4382 15.3532 22.0475 15.7439C21.6568 16.1346 21.1269 16.3541 20.5744 16.3541H4.42855C3.87601 16.3541 3.34611 16.1346 2.95541 15.7439C2.56471 15.3532 2.34521 14.8233 2.34521 14.2708" stroke="white" stroke-width="0.520833" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M20.5744 3.70325H4.42855C3.27795 3.70325 2.34521 4.63599 2.34521 5.78658V19.271C2.34521 20.4215 3.27795 21.3543 4.42855 21.3543H20.5744C21.725 21.3543 22.6577 20.4215 22.6577 19.271V5.78658C22.6577 4.63599 21.725 3.70325 20.5744 3.70325Z" stroke="white" stroke-width="0.520833" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M14.2876 18.4844C14.5033 18.4844 14.6782 18.3095 14.6782 18.0938C14.6782 17.8781 14.5033 17.7032 14.2876 17.7032C14.0719 17.7032 13.897 17.8781 13.897 18.0938C13.897 18.3095 14.0719 18.4844 14.2876 18.4844Z" fill="white" />
                                    <path d="M15.8291 18.4844C16.0448 18.4844 16.2197 18.3095 16.2197 18.0938C16.2197 17.8781 16.0448 17.7032 15.8291 17.7032C15.6134 17.7032 15.4385 17.8781 15.4385 18.0938C15.4385 18.3095 15.6134 18.4844 15.8291 18.4844Z" fill="white" />
                                    <path d="M17.3701 18.4844C17.5859 18.4844 17.7607 18.3095 17.7607 18.0938C17.7607 17.8781 17.5859 17.7032 17.3701 17.7032C17.1544 17.7032 16.9795 17.8781 16.9795 18.0938C16.9795 18.3095 17.1544 18.4844 17.3701 18.4844Z" fill="white" />
                                    <path d="M18.9121 18.4844C19.1278 18.4844 19.3027 18.3095 19.3027 18.0938C19.3027 17.8781 19.1278 17.7032 18.9121 17.7032C18.6964 17.7032 18.5215 17.8781 18.5215 18.0938C18.5215 18.3095 18.6964 18.4844 18.9121 18.4844Z" fill="white" />
                                    <path d="M20.4536 18.4844C20.6693 18.4844 20.8442 18.3095 20.8442 18.0938C20.8442 17.8781 20.6693 17.7032 20.4536 17.7032C20.2379 17.7032 20.063 17.8781 20.063 18.0938C20.063 18.3095 20.2379 18.4844 20.4536 18.4844Z" fill="white" />
                                    <path d="M14.2876 20.0053C14.5033 20.0053 14.6782 19.8304 14.6782 19.6147C14.6782 19.3989 14.5033 19.2241 14.2876 19.2241C14.0719 19.2241 13.897 19.3989 13.897 19.6147C13.897 19.8304 14.0719 20.0053 14.2876 20.0053Z" fill="white" />
                                    <path d="M15.8291 20.0053C16.0448 20.0053 16.2197 19.8304 16.2197 19.6147C16.2197 19.3989 16.0448 19.2241 15.8291 19.2241C15.6134 19.2241 15.4385 19.3989 15.4385 19.6147C15.4385 19.8304 15.6134 20.0053 15.8291 20.0053Z" fill="white" />
                                    <path d="M17.3701 20.0053C17.5859 20.0053 17.7607 19.8304 17.7607 19.6147C17.7607 19.3989 17.5859 19.2241 17.3701 19.2241C17.1544 19.2241 16.9795 19.3989 16.9795 19.6147C16.9795 19.8304 17.1544 20.0053 17.3701 20.0053Z" fill="white" />
                                    <path d="M18.9121 20.0053C19.1278 20.0053 19.3027 19.8304 19.3027 19.6147C19.3027 19.3989 19.1278 19.2241 18.9121 19.2241C18.6964 19.2241 18.5215 19.3989 18.5215 19.6147C18.5215 19.8304 18.6964 20.0053 18.9121 20.0053Z" fill="white" />
                                    <path d="M20.4536 20.0053C20.6693 20.0053 20.8442 19.8304 20.8442 19.6147C20.8442 19.3989 20.6693 19.2241 20.4536 19.2241C20.2379 19.2241 20.063 19.3989 20.063 19.6147C20.063 19.8304 20.2379 20.0053 20.4536 20.0053Z" fill="white" />
                                </svg>
                            </div>
                            <div className='w-full h-[70px] bg-white border border-black rounded-md -mt-[15px] -z-20 '>
                                <div className='relative -z-10'>
                                    <div className='absolute top-0 left-0'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="37" height="45" viewBox="0 0 37 45" fill="none">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.37579 44.583C22.0985 44.583 36.4656 30.2159 36.4656 12.4932C36.4656 -5.22948 22.0985 -19.5966 4.37579 -19.5966C-13.3469 -19.5966 -27.714 -5.22948 -27.714 12.4932C-27.714 30.2159 -13.3469 44.583 4.37579 44.583ZM4.69676 34.3143C16.571 34.3143 26.1969 24.6883 26.1969 12.8141C26.1969 0.939917 16.571 -8.68603 4.69676 -8.68603C-7.17744 -8.68603 -16.8034 0.939917 -16.8034 12.8141C-16.8034 24.6883 -7.17744 34.3143 4.69676 34.3143Z" fill="#C9D0E8" />
                                        </svg>
                                    </div>
                                </div>
                                <div className='w-full h-full p-[5px] flex flex-col items-center justify-center text-center  relative z-30 text-black mt-[5px]'>
                                    <p className='text-[12px] font-medium text-[#000] '>GST Type</p>
                                    <p className='text-[14px] font-bold text-[#52BD91]'>Regular</p>
                                </div>
                            </div>
                        </div>





                        <div className='w-full max-w-[120px] max-h-[120px] overflow-hidden rounded-md flex flex-col items-center justify-center '>
                            <div className='h-[45px] w-[45px] rounded-[50%] bg-[#FF0803] flex items-center justify-center relative z-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M13.5 9.75C13.5 9.55109 13.421 9.36032 13.2803 9.21967C13.1397 9.07902 12.9489 9 12.75 9H6.75C6.55109 9 6.36032 9.07902 6.21967 9.21967C6.07902 9.36032 6 9.55109 6 9.75C6 9.94891 6.07902 10.1397 6.21967 10.2803C6.36032 10.421 6.55109 10.5 6.75 10.5H12.75C12.9489 10.5 13.1397 10.421 13.2803 10.2803C13.421 10.1397 13.5 9.94891 13.5 9.75ZM12.5 12.75C12.5 12.5511 12.421 12.3603 12.2803 12.2197C12.1397 12.079 11.9489 12 11.75 12H6.75C6.55109 12 6.36032 12.079 6.21967 12.2197C6.07902 12.3603 6 12.5511 6 12.75C6 12.9489 6.07902 13.1397 6.21967 13.2803C6.36032 13.421 6.55109 13.5 6.75 13.5H11.75C11.9489 13.5 12.1397 13.421 12.2803 13.2803C12.421 13.1397 12.5 12.9489 12.5 12.75ZM12.75 15C12.9489 15 13.1397 15.079 13.2803 15.2197C13.421 15.3603 13.5 15.5511 13.5 15.75C13.5 15.9489 13.421 16.1397 13.2803 16.2803C13.1397 16.421 12.9489 16.5 12.75 16.5H6.75C6.55109 16.5 6.36032 16.421 6.21967 16.2803C6.07902 16.1397 6 15.9489 6 15.75C6 15.5511 6.07902 15.3603 6.21967 15.2197C6.36032 15.079 6.55109 15 6.75 15H12.75Z" fill="white" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6 21.75H19C19.7293 21.75 20.4288 21.4603 20.9445 20.9445C21.4603 20.4288 21.75 19.7293 21.75 19V13.5C21.75 13.3011 21.671 13.1103 21.5303 12.9697C21.3897 12.829 21.1989 12.75 21 12.75H17.75V4.943C17.75 3.52 16.141 2.692 14.983 3.519L14.808 3.644C14.4248 3.91602 13.9663 4.06182 13.4964 4.06111C13.0264 4.06039 12.5684 3.91319 12.186 3.64C11.5476 3.18567 10.7835 2.94153 10 2.94153C9.21645 2.94153 8.45238 3.18567 7.814 3.64C7.43162 3.91319 6.97359 4.06039 6.50364 4.06111C6.03369 4.06182 5.57521 3.91602 5.192 3.644L5.017 3.519C3.859 2.692 2.25 3.519 2.25 4.943V18C2.25 18.9946 2.64509 19.9484 3.34835 20.6516C4.05161 21.3549 5.00544 21.75 6 21.75ZM8.686 4.86C9.06995 4.58744 9.52915 4.44102 10 4.44102C10.4709 4.44102 10.9301 4.58744 11.314 4.86C11.9507 5.31512 12.7136 5.56021 13.4962 5.56111C14.2788 5.562 15.0423 5.31866 15.68 4.865L15.855 4.74C15.8923 4.71341 15.9363 4.6976 15.982 4.6943C16.0277 4.691 16.0735 4.70034 16.1143 4.7213C16.1551 4.74225 16.1893 4.77402 16.2132 4.81312C16.2372 4.85222 16.2499 4.89715 16.25 4.943V19C16.25 19.45 16.358 19.875 16.55 20.25H6C5.40326 20.25 4.83097 20.0129 4.40901 19.591C3.98705 19.169 3.75 18.5967 3.75 18V4.943C3.75012 4.89715 3.76284 4.85222 3.78678 4.81312C3.81072 4.77402 3.84495 4.74225 3.88573 4.7213C3.9265 4.70034 3.97226 4.691 4.01798 4.6943C4.06371 4.6976 4.10765 4.71341 4.145 4.74L4.32 4.865C4.95775 5.31866 5.72116 5.562 6.5038 5.56111C7.28644 5.56021 8.04929 5.31512 8.686 4.86ZM17.75 19V14.25H20.25V19C20.25 19.3315 20.1183 19.6495 19.8839 19.8839C19.6495 20.1183 19.3315 20.25 19 20.25C18.6685 20.25 18.3505 20.1183 18.1161 19.8839C17.8817 19.6495 17.75 19.3315 17.75 19Z" fill="white" />
                                </svg>
                            </div>
                            <div className='w-full h-[70px] bg-white border border-black rounded-md -mt-[15px] -z-20 '>
                                <div className='relative -z-10'>
                                    <div className='absolute top-0 left-0'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="37" height="45" viewBox="0 0 37 45" fill="none">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.37579 44.583C22.0985 44.583 36.4656 30.2159 36.4656 12.4932C36.4656 -5.22948 22.0985 -19.5966 4.37579 -19.5966C-13.3469 -19.5966 -27.714 -5.22948 -27.714 12.4932C-27.714 30.2159 -13.3469 44.583 4.37579 44.583ZM4.69676 34.3143C16.571 34.3143 26.1969 24.6883 26.1969 12.8141C26.1969 0.939917 16.571 -8.68603 4.69676 -8.68603C-7.17744 -8.68603 -16.8034 0.939917 -16.8034 12.8141C-16.8034 24.6883 -7.17744 34.3143 4.69676 34.3143Z" fill="#C9D0E8" />
                                        </svg>
                                    </div>
                                </div>
                                <div className='w-full h-full p-[5px] flex flex-col items-center justify-center text-center  relative z-30 text-black mt-[5px]'>
                                    <p className='text-[12px] font-medium text-[#000] '>Receipt Number</p>
                                    <p className='text-[14px] font-bold text-[#FF0803]'>#01283</p>
                                </div>
                            </div>
                        </div>




                        {/* <div className='w-full max-h-[120px] overflow-hidden rounded-md flex flex-col items-center justify-center '>
                            <div className='h-[45px] w-[45px] rounded-[50%] bg-[#2C43A1] flex items-center justify-center relative z-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M19 21.5H6C5.07174 21.5 4.1815 21.1312 3.52513 20.4749C2.86875 19.8185 2.5 18.9282 2.5 18V4.94298C2.5 3.87598 3.556 3.19898 4.485 3.52098C4.618 3.56698 4.748 3.63398 4.872 3.72298L5.047 3.84798C5.47266 4.15001 5.98188 4.31183 6.5038 4.31094C7.02572 4.31004 7.53438 4.14647 7.959 3.84298C8.55504 3.41879 9.26843 3.19086 10 3.19086C10.7316 3.19086 11.445 3.41879 12.041 3.84298C12.4656 4.14647 12.9743 4.31004 13.4962 4.31094C14.0181 4.31183 14.5273 4.15001 14.953 3.84798L15.128 3.72298C16.121 3.01298 17.5 3.72298 17.5 4.94298V12.5H21C21.1989 12.5 21.3897 12.579 21.5303 12.7197C21.671 12.8603 21.75 13.0511 21.75 13.25V18.75C21.75 19.4793 21.4603 20.1788 20.9445 20.6945C20.4288 21.2102 19.7293 21.5 19 21.5ZM17.75 14V18.75C17.75 19.0815 17.8817 19.3994 18.1161 19.6339C18.3505 19.8683 18.6685 20 19 20C19.3315 20 19.6495 19.8683 19.8839 19.6339C20.1183 19.3994 20.25 19.0815 20.25 18.75V14H17.75ZM13.5 9.74998C13.5 9.55107 13.421 9.3603 13.2803 9.21965C13.1397 9.079 12.9489 8.99998 12.75 8.99998H6.75C6.55109 8.99998 6.36032 9.079 6.21967 9.21965C6.07902 9.3603 6 9.55107 6 9.74998C6 9.94889 6.07902 10.1397 6.21967 10.2803C6.36032 10.421 6.55109 10.5 6.75 10.5H12.75C12.9489 10.5 13.1397 10.421 13.2803 10.2803C13.421 10.1397 13.5 9.94889 13.5 9.74998ZM12.5 12.75C12.5 12.5511 12.421 12.3603 12.2803 12.2197C12.1397 12.079 11.9489 12 11.75 12H6.75C6.55109 12 6.36032 12.079 6.21967 12.2197C6.07902 12.3603 6 12.5511 6 12.75C6 12.9489 6.07902 13.1397 6.21967 13.2803C6.36032 13.421 6.55109 13.5 6.75 13.5H11.75C11.9489 13.5 12.1397 13.421 12.2803 13.2803C12.421 13.1397 12.5 12.9489 12.5 12.75ZM12.75 15C12.9489 15 13.1397 15.079 13.2803 15.2197C13.421 15.3603 13.5 15.5511 13.5 15.75C13.5 15.9489 13.421 16.1397 13.2803 16.2803C13.1397 16.421 12.9489 16.5 12.75 16.5H6.75C6.55109 16.5 6.36032 16.421 6.21967 16.2803C6.07902 16.1397 6 15.9489 6 15.75C6 15.5511 6.07902 15.3603 6.21967 15.2197C6.36032 15.079 6.55109 15 6.75 15H12.75Z" fill="white" />
                                </svg>
                            </div>
                            <div className='w-full h-[70px] bg-white border border-black rounded-md -mt-[15px] -z-20 '>
                                <div className='relative -z-10'>
                                    <div className='absolute top-0 left-0'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="37" height="45" viewBox="0 0 37 45" fill="none">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.37579 44.583C22.0985 44.583 36.4656 30.2159 36.4656 12.4932C36.4656 -5.22948 22.0985 -19.5966 4.37579 -19.5966C-13.3469 -19.5966 -27.714 -5.22948 -27.714 12.4932C-27.714 30.2159 -13.3469 44.583 4.37579 44.583ZM4.69676 34.3143C16.571 34.3143 26.1969 24.6883 26.1969 12.8141C26.1969 0.939917 16.571 -8.68603 4.69676 -8.68603C-7.17744 -8.68603 -16.8034 0.939917 -16.8034 12.8141C-16.8034 24.6883 -7.17744 34.3143 4.69676 34.3143Z" fill="#C9D0E8" />
                                        </svg>
                                    </div>
                                </div>
                                <div className='w-full h-full p-[5px] flex flex-col items-center justify-center text-center  relative z-30 text-black'>
                                    <p className='text-[12px] font-medium text-[#000] '>Total Invoices</p>
                                    <p className='text-[18px] font-bold text-[#2C43A1]'>1024</p>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>

                <div className='basis-[60%]  flex w-full h-full gap-[25px]'>
                    <div className='basis-[63%] w-full h-full '>
                        <CheckBox />
                    </div>
                    <div className='max-w-[280px] w-full ml-auto h-full -mt-3'>
                        <div className='w-full h-full ml-auto overflow-y-auto custom-scrollbar max-h-[200px] p-[10px] rounded-xl border border-[#52bd91b3] flex flex-col gap-[17px]'>
                            {/* <p className='text-[18px] text-[#000] font-semibold underline'>Today Rates</p>
                            <div className='flex flex-col w-full'>
                                <div className='flex '>
                                    <Swiper
                                        spaceBetween={0}
                                        slidesPerView={1}
                                        autoplay={{
                                            delay: 1000
                                        }}
                                        centeredSlides={true}
                                        onSlideChange={() => { }}
                                        modules={[Autoplay]}
                                        onSwiper={(swiper) => { }}
                                        className=''
                                    >
                                        {
                                            todayRates.map((item, index) => (
                                                <SwiperSlide>
                                                    <div key={index} className='flex flex-col gap-[3px]'>
                                                        <p className='text-[16px] font-medium'>{item?.prefix + " " + item?.mainproduct}</p>
                                                        <p className='text-[18px] font-semibold'>{"₹" + " " + formatRupees(item?.rate)}</p>
                                                    </div>
                                                </SwiperSlide>

                                            ))
                                        }
                                    </Swiper>

                                </div>
                            </div> */}


                            <PaymentMethods />


                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Banner
