// src/components/staking/WalletInfoCard.tsx
import { motion } from "framer-motion";
import { useAccount, useBalance, useChainId, useReadContract } from "wagmi";
import { formatEther } from "viem";
import { monadChain } from "@/lib/wagmi-config";
import { JAMES_TOKEN_ADDRESS, JAMES_DECIMALS, MINIMUM_HOLDING } from "@/lib/contracts";
import { useStaking } from "@/hooks/useStaking";

export function WalletInfoCard() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const isMonad = chainId === monadChain.id;

  // MON Balance
  const { data: monBalance } = useBalance({ address });

  // JAMES Balance
  const { data: jamesBalance } = useReadContract({
    address: JAMES_TOKEN_ADDRESS,
    abi: [
      {
        name: "balanceOf",
        type: "function" as const,
        stateMutability: "view" as const,
        inputs: [{ name: "account", type: "address" as const }],
        outputs: [{ type: "uint256" as const }],
      },
    ],
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  // Staking data
  const { activeStakeCount, totalRewards } = useStaking();

  const jamesBal = jamesBalance ? BigInt(jamesBalance.toString()) : BigInt(0);
  const isEligible = jamesBal >= MINIMUM_HOLDING;
  const jamesFormatted = jamesBal > BigInt(0)
    ? Number(formatEther(jamesBal)).toLocaleString(undefined, { maximumFractionDigits: 2 })
    : "0";

  if (!isConnected) return null;

  const rows = [
    { label: "Wallet Address", value: address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "-" },
    { label: "MON Balance", value: monBalance ? `${Number(formatEther(monBalance.value)).toFixed(4)} MON` : "-" },
    { label: "JAMES Balance", value: `${jamesFormatted} JAMES` },
    { label: "Network", value: isMonad ? "Monad" : "Wrong Network" },
    { label: "Active Stakes", value: String(activeStakeCount) },
    { label: "Est. Rewards", value: `${totalRewards} JAMES` },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-4xl px-4 py-8"
    >
      {/* Eligibility Badge */}
      <div className="mb-6 flex justify-center">
        {isEligible ? (
          <div className="inline-flex items-center gap-2 rounded-full border border-neon-green/40 bg-neon-green/10 px-5 py-2">
            <div className="h-2.5 w-2.5 rounded-full bg-neon-green animate-pulse" />
            <span className="text-sm font-bold text-neon-green">Eligible for Staking</span>
            <span className="text-sm text-muted-foreground">(500,000+ JAMES)</span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-pop/40 bg-orange-pop/10 px-5 py-2">
            <div className="h-2.5 w-2.5 rounded-full bg-orange-pop" />
            <span className="text-sm font-bold text-orange-pop">
              You need at least 500,000 JAMES to create a staking position
            </span>
          </div>
        )}
      </div>

      {/* Card */}
      <div className="glass-card glow-border rounded-2xl p-6 sm:p-8">
        <h3 className="mb-6 text-xl font-black text-banana">Wallet Information</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((row) => (
            <div
              key={row.label}
              className="rounded-xl border border-white/5 bg-white/[0.03] p-4"
            >
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {row.label}
              </p>
              <p className="text-sm font-bold text-foreground">
                {row.label === "Network" && !isMonad ? (
                  <span className="text-orange-pop">{row.value}</span>
                ) : (
                  row.value
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
