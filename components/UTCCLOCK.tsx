'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { calculateJulianDate, calculateModifiedJulianDate } from '@/lib/julianDate';

export default function UTCCLOCK() {
  const [mounted, setMounted] = useState(false);
  const [utcTime, setUtcTime] = useState('');
  const [utcDate, setUtcDate] = useState('');
  const [datetimeISO, setDatetimeISO] = useState('');
  const [jd, setJd] = useState<number | null>(null);
  const [mjd, setMjd] = useState<number | null>(null);

  useEffect(() => {
    // Handle client-side hydration
    setMounted(true);
    
    const updateTime = () => {
      const now = new Date();
      
      // Format UTC time as HH:MM:SS
      const hours = String(now.getUTCHours()).padStart(2, '0');
      const minutes = String(now.getUTCMinutes()).padStart(2, '0');
      const seconds = String(now.getUTCSeconds()).padStart(2, '0');
      setUtcTime(`${hours}:${minutes}:${seconds}`);
      
      // Format UTC date as YYYY-MM-DD
      const year = now.getUTCFullYear();
      const month = String(now.getUTCMonth() + 1).padStart(2, '0');
      const day = String(now.getUTCDate()).padStart(2, '0');
      setUtcDate(`${year}-${month}-${day}`);
      
      // ISO 8601 datetime string for <time> tag datetime attribute
      setDatetimeISO(now.toISOString());
      
      // Calculate Julian dates
      setJd(calculateJulianDate(now));
      setMjd(calculateModifiedJulianDate(now));
    };

    // Initial update
    updateTime();

    // Update every second
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen bg-black text-white font-mono relative py-6 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-8 sm:mb-12 md:mb-16">
            <div className="text-center">
              <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6 sm:mb-8">--:--:--</div>
              <div className="text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6">---- -- --</div>
              <div className="text-base sm:text-lg md:text-xl">JD: ----</div>
              <div className="text-base sm:text-lg md:text-xl">MJD: ----</div>
            </div>
          </div>
        </div>
        <Link 
          href="/radio"
          className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 text-xs border border-white px-3 py-1.5 hover:bg-white hover:text-black transition-colors uppercase tracking-wide bg-black z-10"
        >
          Radio
        </Link>
      </div>
    );
  }

  const formatJulianDate = (value: number | null): string => {
    if (value === null) return '----';
    return value.toFixed(5);
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono relative py-6 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Clock Section */}
        <div className="flex items-center justify-center mb-8 sm:mb-12 md:mb-16">
          <div className="text-center w-full max-w-2xl">
            {/* Large UTC Clock */}
            <time 
              dateTime={datetimeISO}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-4 sm:mb-6 md:mb-8 tracking-tighter block"
              aria-label={`Current UTC time: ${utcTime}`}
            >
              {utcTime}
            </time>
            
            {/* UTC Date */}
            <time 
              dateTime={datetimeISO}
              className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 md:mb-12 tracking-wide block"
              aria-label={`Current UTC date: ${utcDate}`}
            >
              {utcDate}
            </time>
            
            {/* Julian Date Information */}
            <div className="grid grid-cols-1 gap-3 sm:gap-4 text-base sm:text-lg md:text-xl">
              <div>
                <span className="opacity-70">JD: </span>
                <span>{formatJulianDate(jd)}</span>
              </div>
              <div>
                <span className="opacity-70">MJD: </span>
                <span>{formatJulianDate(mjd)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <section className="max-w-4xl mx-auto px-2 sm:px-4 mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6 text-center border-b-2 border-white pb-3 sm:pb-4">
            About Julian Date and Military Time
          </h2>
          
          <div className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 space-y-3 sm:space-y-4">
            <p>
              Julian dates are a continuous count of days since the beginning of the Julian Period (January 1, 4713 BCE). 
              This system is widely used in logistics, food safety, and scientific applications where precise day tracking 
              is essential. Julian dates eliminate the complexity of calendar months and years, providing a simple numeric 
              value that increases by one each day. In food safety and logistics, Julian dates help track expiration dates, 
              manufacturing dates, and batch numbers efficiently.
            </p>
          </div>

          {/* FAQ Section */}
          <div className="space-y-3 sm:space-y-4">
            <details className="border-2 border-white p-3 sm:p-4">
              <summary className="cursor-pointer text-base sm:text-lg md:text-xl font-semibold mb-2 list-none">
                <span className="select-none">What is the Julian date today?</span>
              </summary>
              <div className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg leading-relaxed">
                <p>
                  The Julian date today is a numeric value representing the current day in the continuous Julian calendar system. 
                  It is displayed above as "JD" (Julian Date) and "MJD" (Modified Julian Date). The Julian Date counts the 
                  number of days since January 1, 4713 BCE, while the Modified Julian Date is a simplified version that counts 
                  days since November 17, 1858. These values update in real-time and are commonly used in astronomy, logistics, 
                  food safety, and scientific data recording for precise date tracking without calendar complications.
                </p>
              </div>
            </details>

            <details className="border-2 border-white p-3 sm:p-4">
              <summary className="cursor-pointer text-base sm:text-lg md:text-xl font-semibold mb-2 list-none">
                <span className="select-none">How to read military time?</span>
              </summary>
              <div className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg leading-relaxed">
                <p>
                  Military time, also known as 24-hour time format, uses a 24-hour clock instead of the 12-hour AM/PM system. 
                  Hours are displayed as two digits from 00 to 23, where 00:00 represents midnight and 23:59 represents 11:59 PM. 
                  To convert: hours from 01:00 to 12:00 are the same as standard time, while hours from 13:00 to 23:00 subtract 
                  12 to get PM times (e.g., 13:00 = 1:00 PM, 20:00 = 8:00 PM). Minutes and seconds follow standard notation 
                  (00-59). Military time eliminates AM/PM confusion and is the standard format used by the military, emergency 
                  services, and in international contexts. The UTC time displayed above uses this 24-hour military time format.
                </p>
              </div>
            </details>
          </div>
        </section>
      </div>
      
      {/* Radio Link Button */}
      <Link 
        href="/radio"
        className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 text-xs border border-white px-3 py-1.5 hover:bg-white hover:text-black transition-colors uppercase tracking-wide bg-black z-10"
      >
        Radio
      </Link>
    </div>
  );
}

