'use client';
import React, { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';

const LoadingScreen = () => {
    const [loadingProgress, setLoadingProgress] = useState(0);

    useEffect(() => {
        const handleProgress = () => {
            const total = document.getElementsByTagName('*').length;
            const loaded = document.querySelectorAll(':not(img):not(script):not(audio):not(video):not(iframe):not(svg)').length;
            const progress = (loaded / total) * 100;
            setLoadingProgress(progress);
        };

        window.addEventListener('DOMContentLoaded', handleProgress);

        return () => {
            window.removeEventListener('DOMContentLoaded', handleProgress);
        };
    }, []);


    return (
        <div className="w-screen h-[100vh] overflow-hidden flex justify-center items-center bg-transparent">
            {/* Video element */}
            {/* <div className="flex justify-center items-center fixed top-0 left-0 w-full h-full bg-[#172561]bg-opacity-90 z-50">
                <div className="text-center text-[24px] sm:text-[36px] text-white font-overlock animate-pulse">
                    <div>TimesEra Software Solutions</div>
                </div>
            </div> */}
            <ReactLoading type="spin" color="#172561" height={50} width={50} />
        </div>
    );
};

export default LoadingScreen;
