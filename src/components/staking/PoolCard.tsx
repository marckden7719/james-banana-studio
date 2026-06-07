// src/components/staking/PoolCard.tsx
import { motion } from "framer-motion";
import { Sparkles, Clock, TrendingUp, Lock } from "lucide-react";
import type { ReactNode } from "react";

interface PoolCardProps {
  poolId: number;
  duration: string;
  lockPeriodSeconds: number;
  rewardPercent: number;
  description: string;
  index: number;
  onStake: (poolId: number) => void;
  disabled?: boolean;
}

export function PoolCard({
  poolId,
  duration,
  lockPeriodSeconds,
  rewardPercent,
  description,
  index,
  onStake,
  disabled = false,
}: PoolCardProps) {
  // Dynamic reward calculation example: 1 MON staked
  const exampleReward = (rewardPercent / 100).toFixed(2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={disabled ? {} : { y: -6 }}
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ${
        disabled
          ? "border-white/5 bg-white/[0.02] opacity-60"
          : "border-banana/15 bg-white/[0.04] hover:border-banana/40 hover:shadow-[0_0_40px_oklch(0.88_0.2_95_/_15%)]"
      }`}
    >
      {/* Top gradient bar */}
      <div className="h-1 w-full bg-gradient-to-r from-banana via-orange-pop to-neon-green opacity-60" />

      <div className="p-6 sm:p-8">
        {/* Pool header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-banana/70" />
            <span className="text-xs font-bold uppercase tracking-wider text-banana/70">
              Pool {poolId + 1}
            </span>
          </div>
          <div className="rounded-full bg-banana/10 px-3 py-1">
            <span className="text-xs font-bold text-banana">Active</span>
          </div>
        </div>

        {/* Duration */}
        <div className="mb-2">
          <h3 className="text-2xl font-black text-foreground">{duration}</h3>
          <p className="text-sm text-muted-foreground">Lock Period</p>
        </div>

        {/* Reward */}
        <div className="mb-6">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-banana-gradient">{rewardPercent}%</span>
          </div>
          <p className="text-sm text-muted-foreground">Reward Rate</p>
        </div>

        {/* Stats grid */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
            <div className="mb-1 flex items-center gap-1.5">
              <Clock className="h-3 w-3 text-neon-green/70" />
              <span className="text-[10px] font-semibold uppercase text-muted-foreground">Duration</span>
            </div>
            <p className="text-sm font-bold text-foreground">{duration}</p>
          </div>
          <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
            <div className="mb-1 flex items-center gap-1.5">
              <TrendingUp className="h-3 w-3 text-orange-pop/70" />
              <span className="text-[10px] font-semibold uppercase text-muted-foreground">Reward</span>
            </div>
            <p className="text-sm font-bold text-foreground">{rewardPercent}%</p>
          </div>
        </div>

        {/* Expected reward note */}
        <div className="mb-6 rounded-lg border border-neon-green/15 bg-neon-green/[0.04] p-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-neon-green" />
            <span className="text-sm text-neon-green">
              Stake 1 MON → Earn {exampleReward} MON worth of JAMES
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="mb-6 text-sm text-muted-foreground">{description}</p>

        {/* Stake button */}
        <button
          onClick={() => onStake(poolId)}
          disabled={disabled}
          className={`w-full py-3 text-sm font-bold transition-all duration-200 ${
            disabled
              ? "cursor-not-allowed rounded-xl border border-white/10 bg-white/[0.03] text-muted-foreground"
              : "btn-banana"
          }`}
        >
          {disabled ? "Not Eligible" : "Stake"}
        </button>
      </div>
    </motion.div>
  );
}
