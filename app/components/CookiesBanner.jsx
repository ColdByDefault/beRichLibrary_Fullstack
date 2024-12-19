// Code: CookiesBanner component to display a banner to inform users about cookies 
// usage and ask for their consent to accept cookies.
// Related file: app/banner/page.jsx
// CSR compatible

'use client';

import React, { useState, useEffect } from 'react';

export default function CookiesBanner() {
    const [showCookiesBanner, setShowCookiesBanner] = useState(false);

    useEffect(() => {
        const cookiesAccepted = localStorage.getItem('cookiesAccepted');
        if (!cookiesAccepted) {
            setShowCookiesBanner(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookiesAccepted', 'true');
        setShowCookiesBanner(false);
    };

    if (!showCookiesBanner) {
        return null; // Don't render the banner if cookies are already accepted
    }

    return (
        <div
            className="fixed bottom-0 left-0 right-0 z-50 bg-yellow-400 p-4 rounded-lg text-center shadow-md"
            aria-live="assertive"
        >
            <div>
                This website uses cookies to enhance your experience. Learn more in our{' '}
                <button className="underline text-blue-600">Privacy Policy</button>.
            </div>
            <button
                onClick={handleAccept}
                className="mt-2 bg-black text-white px-4 py-2 rounded"
            >
                Accept
            </button>
        </div>
    );
}
