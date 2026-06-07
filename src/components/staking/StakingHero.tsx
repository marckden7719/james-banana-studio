// src/components/staking/StakingHero.tsx
import { motion } from "framer-motion";
import { useAccount, useChainId, useSwitchChain } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { monadChain } from "@/lib/wagmi-config";

export function StakingHero() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const isMonad = chainId === monadChain.id;

  return (
    <section className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-12">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-banana/10 blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-neon-green/8 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-4 text-sm font-black uppercase tracking-[0.3em] text-neon-green"
        >
          James Banana
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mb-6 text-5xl sm:text-6xl md:text-7xl font-black leading-[0.9] tracking-tight"
        >
          <span className="text-banana-gradient">STAKING</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mx-auto mb-8 max-w-2xl text-lg sm:text-xl text-muted-foreground"
        >
          Stake <span className="font-bold text-banana">MON</span>. Earn{" "}
          <span className="font-bold text-banana">JAMES</span>. Unlock Exclusive Rewards.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-col items-center gap-4"
        >
          {!isConnected ? (
            <ConnectButton.Custom>
              {({ openConnectModal }) => (
                <button onClick={openConnectModal} className="btn-banana px-8 py-4 text-lg">
                  Connect Wallet
                </button>
              )}
            </ConnectButton.Custom>
          ) : !isMonad ? (
            <button
              onClick={() => switchChain({ chainId: monadChain.id })}
              className="btn-neon px-8 py-4 text-lg"
            >
              Switch to Monad Network
            </button>
          ) : (
            <a href="#stake-now" className="btn-banana px-8 py-4 text-lg">
              Stake Now
            </a>
          )}

          {!isConnected && (
            <p className="text-sm text-muted-foreground">
              Connect your wallet to start staking
            </p>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
