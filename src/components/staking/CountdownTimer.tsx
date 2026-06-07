// src/components/staking/CountdownTimer.tsx
import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetTimestamp: number; // unix seconds
  onComplete?: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(target: number): TimeLeft {
  const now = Math.floor(Date.now() / 1000);
  const diff = Math.max(0, target - now);
  return {
    days: Math.floor(diff / 86400),
    hours: Math.floor((diff % 86400) / 3600),
    minutes: Math.floor((diff % 3600) / 60),
    seconds: diff % 60,
  };
}

export function CountdownTimer({ targetTimestamp, onComplete }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calcTimeLeft(targetTimestamp));

  useEffect(() => {
    const id = setInterval(() => {
      const tl = calcTimeLeft(targetTimestamp);
      setTimeLeft(tl);
      if (tl.days === 0 && tl.hours === 0 && tl.minutes === 0 && tl.seconds === 0) {
        clearInterval(id);
        onComplete?.();
      }
    }, 1000);
    return () => clearInterval(id);
  }, [targetTimestamp, onComplete]);

  const blocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-2 sm:gap-3">
      {blocks.map((b) => (
        <div
          key={b.label}
          className="flex flex-col items-center rounded-lg border border-banana/20 bg-background/60 px-2 py-1.5 sm:px-3 sm:py-2 backdrop-blur-sm"
        >
          <span className="text-lg sm:text-2xl font-black text-banana tabular-nums">
            {String(b.value).padStart(2, "0")}
          </span>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {b.label}
          </span>
        </div>
      ))}
    </div>
  );
}
