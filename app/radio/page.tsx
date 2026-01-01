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
      <div className="flex min-h-screen items-center justify-center bg-black text-white font-mono">
        <div className="text-center space-y-8">
          <div className="flex gap-4 justify-center">
            <div className="border-2 border-white p-4">
              <div className="text-6xl">00</div>
              <div className="text-xs mt-2 tracking-wider">HOURS (ZULU)</div>
            </div>
            <div className="border-2 border-white p-4">
              <div className="text-6xl">00</div>
              <div className="text-xs mt-2 tracking-wider">MINUTES</div>
            </div>
            <div className="border-2 border-white p-4">
              <div className="text-6xl">00</div>
              <div className="text-xs mt-2 tracking-wider">SECONDS</div>
            </div>
          </div>
          <div className="border-2 border-white p-6">
            <div className="text-xs mb-2 tracking-wider">SINCGARS DATE (DAY MOD 100)</div>
            <div className="text-7xl">00</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white font-mono p-4">
      <div className="w-full max-w-4xl space-y-12">
        {/* 6-Block Zulu Time Display */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* HOURS Block */}
          <div className="border-2 border-white p-4 sm:p-6 w-full sm:w-auto text-center">
            <div className="text-5xl sm:text-6xl md:text-7xl font-mono tabular-nums">{hours}</div>
            <div className="text-xs sm:text-sm mt-2 tracking-wider uppercase">HOURS (ZULU)</div>
          </div>

          {/* MINUTES Block */}
          <div className="border-2 border-white p-4 sm:p-6 w-full sm:w-auto text-center">
            <div className="text-5xl sm:text-6xl md:text-7xl font-mono tabular-nums">{minutes}</div>
            <div className="text-xs sm:text-sm mt-2 tracking-wider uppercase">MINUTES</div>
          </div>

          {/* SECONDS Block */}
          <div className="border-2 border-white p-4 sm:p-6 w-full sm:w-auto text-center">
            <div className="text-5xl sm:text-6xl md:text-7xl font-mono tabular-nums">{seconds}</div>
            <div className="text-xs sm:text-sm mt-2 tracking-wider uppercase">SECONDS</div>
          </div>
        </div>

        {/* SINCGARS Julian Date */}
        <div className="border-2 border-white p-6 sm:p-8 text-center">
          <div className="text-xs sm:text-sm mb-4 tracking-wider uppercase">SINCGARS DATE (DAY MOD 100)</div>
          <div className="text-6xl sm:text-7xl md:text-8xl font-mono tabular-nums">
            {sincgarsDate !== null ? String(sincgarsDate).padStart(2, '0') : '00'}
          </div>
        </div>

        {/* Standard Reference */}
        <div className="text-center border-t-2 border-white pt-6 space-y-2">
          <div className="text-sm sm:text-base tracking-wide">
            <span className="opacity-70">REFERENCE: </span>
            <span>{fullDate} {fullTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

