'use client';

import { useEffect, useState } from 'react';

/**
 * Calculate the day of the year (1-365/366)
 */
function getDayOfYear(date: Date): number {
  const start = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / 86400000) + 1;
}

/**
 * Calculate day of year modulo 100 for SINCGARS
 */
function getSincgarsDate(date: Date): number {
  return getDayOfYear(date) % 100;
}

export default function RadioPage() {
  const [mounted, setMounted] = useState(false);
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [sincgarsDate, setSincgarsDate] = useState<number | null>(null);
  const [fullDate, setFullDate] = useState('');
  const [fullTime, setFullTime] = useState('');
  const [datetimeISO, setDatetimeISO] = useState('');

  useEffect(() => {
    // Handle client-side hydration
    setMounted(true);

    const updateTime = () => {
      const now = new Date();

      // Format UTC time components
      const h = String(now.getUTCHours()).padStart(2, '0');
      const m = String(now.getUTCMinutes()).padStart(2, '0');
      const s = String(now.getUTCSeconds()).padStart(2, '0');
      setHours(h);
      setMinutes(m);
      setSeconds(s);

      // Calculate SINCGARS date (day of year mod 100)
      setSincgarsDate(getSincgarsDate(now));

      // Format full UTC date and time for reference
      const year = now.getUTCFullYear();
      const month = String(now.getUTCMonth() + 1).padStart(2, '0');
      const day = String(now.getUTCDate()).padStart(2, '0');
      setFullDate(`${year}-${month}-${day}`);
      setFullTime(`${h}:${m}:${s}`);
      
      // ISO 8601 datetime string for <time> tag datetime attribute
      setDatetimeISO(now.toISOString());
    };

    // Initial update
    updateTime();

    // Update every second
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-black text-white font-mono flex items-center justify-center py-6 sm:py-12 px-4">
        <div className="w-full max-w-4xl text-center space-y-6 sm:space-y-8">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <div className="border-2 border-white p-3 sm:p-4 md:p-6 w-full sm:w-auto">
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">00</div>
              <div className="text-xs sm:text-sm mt-2 tracking-wider">HOURS (ZULU)</div>
            </div>
            <div className="border-2 border-white p-3 sm:p-4 md:p-6 w-full sm:w-auto">
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">00</div>
              <div className="text-xs sm:text-sm mt-2 tracking-wider">MINUTES</div>
            </div>
            <div className="border-2 border-white p-3 sm:p-4 md:p-6 w-full sm:w-auto">
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">00</div>
              <div className="text-xs sm:text-sm mt-2 tracking-wider">SECONDS</div>
            </div>
          </div>
          <div className="border-2 border-white p-4 sm:p-6 md:p-8">
            <div className="text-xs sm:text-sm mb-3 sm:mb-4 tracking-wider">SINCGARS DATE (DAY MOD 100)</div>
            <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl">00</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-mono flex items-center justify-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl space-y-8 sm:space-y-10 md:space-y-12">
        {/* 6-Block Zulu Time Display */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center">
          {/* HOURS Block */}
          <div className="border-2 border-white p-3 sm:p-4 md:p-6 w-full sm:w-auto text-center">
            <time 
              dateTime={datetimeISO}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-mono tabular-nums block"
              aria-label={`Hours: ${hours}`}
            >
              {hours}
            </time>
            <div className="text-xs sm:text-sm mt-2 tracking-wider uppercase">HOURS (ZULU)</div>
          </div>

          {/* MINUTES Block */}
          <div className="border-2 border-white p-3 sm:p-4 md:p-6 w-full sm:w-auto text-center">
            <time 
              dateTime={datetimeISO}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-mono tabular-nums block"
              aria-label={`Minutes: ${minutes}`}
            >
              {minutes}
            </time>
            <div className="text-xs sm:text-sm mt-2 tracking-wider uppercase">MINUTES</div>
          </div>

          {/* SECONDS Block */}
          <div className="border-2 border-white p-3 sm:p-4 md:p-6 w-full sm:w-auto text-center">
            <time 
              dateTime={datetimeISO}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-mono tabular-nums block"
              aria-label={`Seconds: ${seconds}`}
            >
              {seconds}
            </time>
            <div className="text-xs sm:text-sm mt-2 tracking-wider uppercase">SECONDS</div>
          </div>
        </div>

        {/* SINCGARS Julian Date */}
        <div className="border-2 border-white p-4 sm:p-6 md:p-8 text-center">
          <div className="text-xs sm:text-sm mb-3 sm:mb-4 tracking-wider uppercase">SINCGARS DATE (DAY MOD 100)</div>
          <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-mono tabular-nums">
            {sincgarsDate !== null ? String(sincgarsDate).padStart(2, '0') : '00'}
          </div>
        </div>

        {/* Standard Reference */}
        <div className="text-center border-t-2 border-white pt-4 sm:pt-6 space-y-2">
          <div className="text-xs sm:text-sm md:text-base tracking-wide">
            <span className="opacity-70">REFERENCE: </span>
            <time 
              dateTime={datetimeISO}
              aria-label={`UTC reference time: ${fullDate} ${fullTime}`}
            >
              {fullDate} {fullTime}
            </time>
          </div>
        </div>
      </div>
    </div>
  );
}

