import React, { useEffect, useRef, useState } from 'react';

/**
 * StatCard - monochrome, animated count-up
 * props:
 *  - label (string)
 *  - value (number or string)
 *  - suffix (string)
 *  - duration (ms)
 */
export default function StatCard({ label, value, suffix = '', duration = 900 }) {
  const isNumber = typeof value === 'number';
  const [display, setDisplay] = useState(isNumber ? 0 : value);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!isNumber) {
      setDisplay(value);
      return;
    }
    let start = null;
    const from = 0;
    const to = value;
    const ease = t => 1 - Math.pow(1 - t, 3);

    function step(ts) {
      if (!start) start = ts;
      const elapsed = ts - start;
      const t = Math.min(1, elapsed / duration);
      const curr = Math.round(from + (to - from) * ease(t));
      setDisplay(curr);
      if (t < 1) rafRef.current = requestAnimationFrame(step);
    }
    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [value, duration, isNumber]);

  return (
    <div className="card p-4 flex flex-col justify-between" style={{ minWidth: 180 }}>
      <div className="small text-[color:inherit] text-opacity-80">{label}</div>
      <div className="mt-3 flex items-end gap-3">
        <div className="text-2xl md:text-3xl font-bold leading-none">{display}{suffix}</div>
        <div className="hidden md:block h-6 w-px bg-[currentColor] opacity-10" />
      </div>
    </div>
  );
}
