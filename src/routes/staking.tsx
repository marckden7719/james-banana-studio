// src/routes/staking.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { FloatingEmojis } from "@/components/FloatingEmojis";
import { StakingHero } from "@/components/staking/StakingHero";
import { WalletInfoCard } from "@/components/staking/WalletInfoCard";
import { PoolCard } from "@/components/staking/PoolCard";
import { StakeModal } from "@/components/staking/StakeModal";
import { ActiveStakes } from "@/components/staking/ActiveStakes";
import { StatsDashboard } from "@/components/staking/StatsCard";
import { VaultStatusCard } from "@/components/staking/VaultStatusCard";
import { STAKING_POOLS, MINIMUM_HOLDING } from "@/lib/contracts";
import { useReadContract } from "wagmi";
import { JAMES_TOKEN_ADDRESS } from "@/lib/contracts";
import { motion } from "framer-motion";

export const Route = createFileRoute("/staking")({
  component: StakingPage,
});

function StakingPage() {
  const [selectedPool, setSelectedPool] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleStake = (poolId: number) => {
    setSelectedPool(poolId);
    setModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[oklch(0.12_0.05_300)]">
      {/* Background gradient */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse at top, oklch(0.25 0.12 300) 0%, oklch(0.08 0.05 300) 60%, oklch(0.05 0.02 300) 100%)",
        }}
      />

      <Navbar />
      <FloatingEmojis count={8} />

      <div className="relative z-10">
        {/* Hero */}
        <StakingHero />

        {/* Wallet Info + Eligibility */}
        <WalletInfoCard />

        {/* Staking Pools */}
        <section id="stake-now" className="px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-5xl"
          >
            <div className="mb-10 text-center">
              <p className="mb-2 text-sm font-black uppercase tracking-[0.3em] text-neon-green">
                Choose Your Pool
              </p>
              <h2 className="text-4xl sm:text-5xl font-black">
                <span className="text-banana-gradient">Staking Pools</span>
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {STAKING_POOLS.map((pool, i) => (
                <PoolCard
                  key={pool.id}
                  poolId={pool.id}
                  duration={pool.duration}
                  lockPeriodSeconds={pool.lockPeriodSeconds}
                  rewardPercent={pool.rewardPercent}
                  description={pool.description}
                  index={i}
                  onStake={handleStake}
                />
              ))}
            </div>
          </motion.div>
        </section>

        {/* Active Stakes */}
        <ActiveStakes />

        {/* Stats Dashboard */}
        <StatsDashboard />

        {/* Vault Status */}
        <VaultStatusCard />

        {/* Burn Info Footer */}
        <section className="px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-5xl text-center"
          >
            <div className="glass-card rounded-2xl p-6 sm:p-8">
              <h3 className="mb-4 text-lg font-black text-banana">Penalty Burn Address</h3>
              <p className="mb-2 font-mono text-sm text-muted-foreground break-all">
                0x000000000000000000000000000000000000dEaD
              </p>
              <p className="text-xs text-muted-foreground/60">
                Burned tokens are permanently removed from circulation.
              </p>
            </div>
          </motion.div>
        </section>
      </div>

      {/* Stake Modal */}
      {selectedPool !== null && (
        <StakeModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedPool(null);
          }}
          poolId={selectedPool}
        />
      )}
    </div>
  );
}
