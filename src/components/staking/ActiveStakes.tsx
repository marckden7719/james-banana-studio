// src/components/staking/ActiveStakes.tsx
import { motion } from "framer-motion";
import { Wallet, Clock, Gift, AlertCircle, CheckCircle2 } from "lucide-react";
import { useAccount, useReadContract } from "wagmi";
import { formatEther } from "viem";
import { contracts, STAKING_POOLS } from "@/lib/contracts";
import { CountdownTimer } from "./CountdownTimer";

interface StakeData {
  staker: string;
  amount: bigint;
  poolId: number;
  startTime: number;
  claimed: boolean;
}

export function ActiveStakes() {
  const { address, isConnected } = useAccount();

  const { data: stakeCount } = useReadContract({
    address: contracts.staking.address,
    abi: contracts.staking.abi,
    functionName: "getStakeCount",
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const count = stakeCount ? Number(stakeCount) : 0;

  // Read each stake
  const stakeIds = Array.from({ length: count }, (_, i) => BigInt(i));

  if (!isConnected) return null;

  return (
    <section className="px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-5xl"
      >
        {/* Section header */}
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-black uppercase tracking-[0.3em] text-neon-green">
            Your Positions
          </p>
          <h2 className="text-4xl sm:text-5xl font-black">
            <span className="text-banana-gradient">Active Stakes</span>
          </h2>
        </div>

        {count === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center">
            <Wallet className="mx-auto mb-4 h-12 w-12 text-muted-foreground/40" />
            <p className="text-lg font-bold text-muted-foreground">No active stakes</p>
            <p className="text-sm text-muted-foreground/60 mt-1">
              Choose a pool above to start staking
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {stakeIds.map((id) => (
              <StakeRow key={String(id)} stakeId={id} />
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}

function StakeRow({ stakeId }: { stakeId: bigint }) {
  const { data: stakeData } = useReadContract({
    address: contracts.staking.address,
    abi: contracts.staking.abi,
    functionName: "getStake",
    args: [stakeId],
    query: { enabled: true },
  });

  const { data: pendingReward } = useReadContract({
    address: contracts.staking.address,
    abi: contracts.staking.abi,
    functionName: "pendingReward",
    args: [stakeId],
    query: { enabled: true },
  });

  if (!stakeData) return null;

  const [staker, amount, poolIdTemp, startTime, claimed] = stakeData as unknown as [string, bigint, number, number, boolean];
  const poolId = Number(poolIdTemp);
  const pool = STAKING_POOLS[poolId];
  if (!pool) return null;

  const amountFormatted = Number(formatEther(amount)).toFixed(4);
  const rewardFormatted = pendingReward
    ? (Number(formatEther(pendingReward)) * pool.rewardPercent / 100).toFixed(4)
    : "0.0000";
  const unlockTimestamp = Number(startTime) + pool.lockPeriodSeconds;
  const isUnlocked = Date.now() / 1000 >= unlockTimestamp;
  const startDate = new Date(Number(startTime) * 1000).toLocaleDateString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card rounded-2xl p-5 sm:p-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: stake info */}
        <div className="flex flex-wrap gap-4 sm:gap-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Amount</p>
            <p className="text-sm font-black text-banana">{amountFormatted} MON</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Reward</p>
            <p className="text-sm font-black text-neon-green">{rewardFormatted} MON</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Pool</p>
            <p className="text-sm font-bold text-foreground">{pool.duration} ({pool.rewardPercent}%)</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Start Date</p>
            <p className="text-sm font-bold text-foreground">{startDate}</p>
          </div>
        </div>

        {/* Right: status / countdown / claim */}
        <div className="flex items-center gap-3">
          {isUnlocked ? (
            claimed ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-bold text-muted-foreground">
                <CheckCircle2 className="h-3.5 w-3.5" /> Claimed
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-neon-green/30 bg-neon-green/10 px-4 py-2 text-xs font-bold text-neon-green">
                <Gift className="h-3.5 w-3.5" /> Claimable
              </span>
            )
          ) : (
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-orange-pop" />
              <CountdownTimer targetTimestamp={unlockTimestamp} />
            </div>
          )}
        </div>
      </div>

      {/* Claim action buttons */}
      <div className="mt-4 flex gap-3">
        {isUnlocked && !claimed && (
          <button className="btn-neon px-6 py-2.5 text-xs">
            Claim Rewards
          </button>
        )}
        {!isUnlocked && (
          <button className="rounded-lg border border-orange-pop/30 bg-orange-pop/10 px-6 py-2.5 text-xs font-bold text-orange-pop hover:bg-orange-pop/20 transition-colors">
            Early Claim (20% Burn)
          </button>
        )}
      </div>
    </motion.div>
  );
}
