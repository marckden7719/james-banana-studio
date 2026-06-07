// src/components/staking/StatsCard.tsx
import { motion } from "framer-motion";
import { useReadContract } from "wagmi";
import { formatEther } from "viem";
import { contracts } from "@/lib/contracts";

export function StatsDashboard() {
  const { data: totalStaked } = useReadContract({
    address: contracts.staking.address,
    abi: contracts.staking.abi,
    functionName: "totalStaked",
  });

  return (
    <section className="px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-5xl"
      >
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-black uppercase tracking-[0.3em] text-neon-green">
            Protocol Stats
          </p>
          <h2 className="text-4xl sm:text-5xl font-black">
            <span className="text-banana-gradient">Statistics</span>
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatItem
            label="Total MON Staked"
            value={totalStaked ? `${Number(formatEther(totalStaked)).toLocaleString()} MON` : "—"}
            delay={0}
          />
          <StatItem label="Total Stakers" value="—" delay={0.1} />
          <StatItem label="Total Rewards Distributed" value="—" delay={0.2} />
          <StatItem label="Current APR" value="Up to 40%" delay={0.3} highlight />
        </div>
      </motion.div>
    </section>
  );
}

function StatItem({
  label,
  value,
  delay,
  highlight = false,
}: {
  label: string;
  value: string;
  delay: number;
  highlight?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="glass-card rounded-xl p-5 text-center"
    >
      <p className="mb-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className={`text-2xl font-black ${highlight ? "text-banana-gradient" : "text-foreground"}`}>
        {value}
      </p>
    </motion.div>
  );
}
