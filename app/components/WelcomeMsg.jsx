'user client';

import React from 'react'
import { useSearchParams } from 'next/navigation';

function WelcomeMsg ()  {
    let welcome = null;

    // Ensure this only runs in the browser
    if (typeof window !== 'undefined') {
      const searchParams = useSearchParams();
      welcome = searchParams.get('welcome'); // Retrieve the 'welcome' query parameter
    }
    
  return (
    <div>
        {welcome === 'true' && (
          <div className="w-full text-white">
            <h3 className="text-xl font-semibold">Welcome Back!</h3>
          </div>
        )}
    </div>
  )
}

export default WelcomeMsg