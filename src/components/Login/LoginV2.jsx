"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

// const loginUser = async (username, password, router) => {
//     try {
//         const response = await fetch('/api/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 username,
//                 password,
//             }),
//         });

//         const data = await response.json();

//         if (response.ok) {
//             // Set the username cookie with an expiration of 7 days
//             Cookies.set('username', username, { expires: 7 });
//             alert('Login successful');
//             router.push('/');
//             // Handle successful login (e.g., redirect to dashboard)
//         } else {
//             alert(data.error);
//             // Handle login error (e.g., show error message)
//         }
//     } catch (error) {
//         console.error('Error logging in:', error);
//         alert('An error occurred. Please try again.');
//     }
// };

const LoginV2 = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://www.erpser.timeserasoftware.in/api/Tenant/CheckValidTenant?userName=${encodeURIComponent(userName)}&password=${encodeURIComponent(password)}`, {
                method: 'GET'
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            if (data && data.tenantName) {
                // Store tenantName in local storage
                localStorage.setItem('tenantName', data.tenantName);

                // Redirect to dashboard or another page
                router.push('/');
            } else {
                alert('Invalid credentials or tenantName is null.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('An error occurred during login. Please try again.');
        }
    };

    useEffect(() => {
        const tenantName = localStorage.getItem('tenantName');
        if (tenantName) {
            router.push('/');
        }
    })
    // useEffect(() => {
    //     const username = Cookies.get('username');
    //     if (username) {
    //         router.push('/');
    //     }
    // }, []);

    return (
        <div className='w-full h-[100vh] overflow-hidden flex bg-[#52BD91]'>
            <div className='flex-1 flex items-center justify-center'>
                <div className='max-w-[500px] h-[400px] relative w-full mx-auto'>
                    <Image src={"/logindashboard.png"} alt='' fill />
                </div>
            </div>
            <div className='flex-1 flex flex-col items-center justify-center gap-[20px]'>
                <div className='flex flex-col items-center justify-center bg-[#172561] p-[75px] px-[150px] rounded-2xl gap-[20px]'>
                    <div className='max-w-[150px] flex flex-col mx-auto items-center justify-center gap-[5px] pl-[15px]'>
                        <img src="/tlogo.png" alt="Logo" />
                        <img src="/textLogo.png" alt="" />
                    </div>
                    <p className='text-[22px] text-white font-medium mx-auto'>Login to your account</p>
                    <div className='w-full'>
                        <form className='flex flex-col gap-[20px] max-w-[250px] mx-auto' onSubmit={handleLogin}>
                            <input type="text" placeholder='Enter your username' className='p-[15px] rounded-md border border-white bg-transparent focus:border-[#52BD91] text-white focus:outline-0' value={userName} onChange={(e) => setUserName(e.target.value)} />
                            <input type="password" placeholder='Enter your password' className='p-[15px] rounded-md border border-white bg-transparent focus:border-[#52BD91] text-white focus:outline-0' value={password} onChange={(e) => setPassword(e.target.value)} />
                            <input type="submit" className='cursor-pointer p-[15px] text-white w-[150px] mx-auto rounded-md bg-[#52BD91]' value="Submit" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginV2;
