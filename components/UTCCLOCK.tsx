'use client';

import { useEffect, useState } from 'react';
import { calculateJulianDate, calculateModifiedJulianDate } from '@/lib/julianDate';

export default function UTCCLOCK() {
  const [mounted, setMounted] = useState(false);
  const [utcTime, setUtcTime] = useState('');
  const [utcDate, setUtcDate] = useState('');
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
      <div className="flex min-h-screen items-center justify-center bg-black text-white font-mono">
        <div className="text-center">
          <div className="text-8xl mb-8">--:--:--</div>
          <div className="text-2xl mb-4">---- -- --</div>
          <div className="text-xl">JD: ----</div>
          <div className="text-xl">MJD: ----</div>
        </div>
      </div>
    );
  }

  const formatJulianDate = (value: number | null): string => {
    if (value === null) return '----';
    return value.toFixed(5);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white font-mono">
      <div className="text-center">
        {/* Large UTC Clock */}
        <div className="text-8xl mb-8 tracking-tighter">{utcTime}</div>
        
        {/* UTC Date */}
        <div className="text-2xl mb-12 tracking-wide">{utcDate}</div>
        
        {/* Julian Date Information */}
        <div className="grid grid-cols-1 gap-4 text-xl">
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
  );
}

