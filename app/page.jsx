// Created by ColdByDefault on 18/12/2024
// CopyRight: All rights reserved {ColdByDefault}
// Version: 3.1.1
// NOT TO BE USED WITHOUT PERMISSION FROM THE AUTHOR (www.coldbydefault.com {ColdByDefault})
// Code: Home Page
// This is the main page of the application. It contains the main content and the cookies banner.
// The page also contains a loading screen that is displayed while the application is loading.


import React from 'react';
import CookiesBannerPage from "./pages/banner/page";
import LoadingScreen from "./components/LoadingScreen";
import IntroPage from "./pages/intro/page";

export default function Home() {

    return (
        <>
            <div>
                <LoadingScreen />
            </div>
            <div>
                <CookiesBannerPage />
            </div>
            <div>
                <IntroPage />
            </div>
        </>
    );
}
