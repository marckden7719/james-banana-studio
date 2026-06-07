// src/components/staking/StakeModal.tsx
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, Loader2, CheckCircle2 } from "lucide-react";
import { parseEther, formatEther } from "viem";
import {
  useAccount,
  useWriteContract,
  useSimulateContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { STAKING_POOLS, contracts } from "@/lib/contracts";
import { toast } from "sonner";

interface StakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  poolId: number;
}

export function StakeModal({ isOpen, onClose, poolId }: StakeModalProps) {
  const { address } = useAccount();
  const pool = STAKING_POOLS[poolId];
  const [amount, setAmount] = useState("");
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>();
  const [step, setStep] = useState<
    "form" | "confirming" | "pending" | "success" | "error"
  >("form");

  const amountWei = useMemo(() => {
    try {
      return parseEther(amount || "0");
    } catch {
      return BigInt(0);
    }
  }, [amount]);

  const validAmount = amountWei > BigInt(0);
  const rewardAmount = validAmount
    ? (Number(formatEther(amountWei)) * (pool?.rewardPercent ?? 0)) / 100
    : 0;
  const unlockDate = pool
    ? new Date(Date.now() + pool.lockPeriodSeconds * 1000).toLocaleDateString()
    : "-";

  // Simulate
  const { data: simData, isLoading: simLoading } = useSimulateContract({
    address: contracts.staking.address,
    abi: contracts.staking.abi,
    functionName: "stake",
    args: [poolId],
    value: amountWei,
    query: { enabled: isOpen && validAmount && step === "form" && !!address },
  });

  // Write
  const { writeContractAsync } = useWriteContract();

  // Wait for receipt
  const { isSuccess: txSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
    query: { enabled: !!txHash },
  });

  const handleStake = async () => {
    if (!validAmount || !address) return;
    try {
      setStep("confirming");
      const hash = await writeContractAsync({
        address: contracts.staking.address,
        abi: contracts.staking.abi,
        functionName: "stake",
        args: [poolId],
        value: amountWei,
      });
      setTxHash(hash);
      setStep("pending");
    } catch (err: any) {
      setStep("error");
      toast.error(err?.shortMessage || "Transaction rejected");
    }
  };

  if (txSuccess && step === "pending") {
    setStep("success");
    toast.success("Stake successful!");
  }

  const resetAndClose = () => {
    setAmount("");
    setTxHash(undefined);
    setStep("form");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={resetAndClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card glow-border relative w-full max-w-md rounded-2xl p-6 sm:p-8"
          >
            <button
              onClick={resetAndClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {step === "form" && (
              <>
                <h2 className="mb-1 text-2xl font-black text-banana">Stake MON</h2>
                <p className="mb-6 text-sm text-muted-foreground">
                  Pool: {pool?.duration} — {pool?.rewardPercent}% reward
                </p>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Amount (MON)
                </label>
                <div className="relative mb-6">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.0"
                    min="0"
                    step="0.01"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-lg font-bold text-foreground placeholder:text-muted-foreground/40 focus:border-banana/50 focus:outline-none focus:ring-1 focus:ring-banana/30"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground">
                    MON
                  </span>
                </div>
                <div className="mb-6 space-y-2 rounded-xl border border-white/5 bg-white/[0.02] p-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Stake Amount</span>
                    <span className="font-bold text-foreground">{amount || "0"} MON</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Reward</span>
                    <span className="font-bold text-neon-green">
                      {rewardAmount.toFixed(4)} MON in JAMES
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Unlock Date</span>
                    <span className="font-bold text-foreground">{unlockDate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Required Holding</span>
                    <span className="font-bold text-banana">500,000 JAMES</span>
                  </div>
                  {simData?.request && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Est. Gas</span>
                      <span className="font-bold text-foreground">~0.001 MON</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={handleStake}
                  disabled={!validAmount || simLoading}
                  className="btn-banana w-full py-3 text-sm disabled:opacity-50"
                >
                  {simLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" /> Simulating...
                    </span>
                  ) : (
                    "Confirm Stake"
                  )}
                </button>
              </>
            )}

            {step === "confirming" && (
              <div className="flex flex-col items-center gap-4 py-8">
                <Loader2 className="h-12 w-12 animate-spin text-banana" />
                <p className="text-center text-sm text-muted-foreground">
                  Confirm transaction in your wallet...
                </p>
              </div>
            )}

            {step === "pending" && (
              <div className="flex flex-col items-center gap-4 py-8">
                <Loader2 className="h-12 w-12 animate-spin text-banana" />
                <p className="text-center text-sm text-muted-foreground">
                  Transaction pending...
                </p>
                {txHash && (
                  <p className="text-xs text-muted-foreground/60 font-mono">
                    {txHash.slice(0, 10)}...{txHash.slice(-6)}
                  </p>
                )}
              </div>
            )}

            {step === "success" && (
              <div className="flex flex-col items-center gap-4 py-8">
                <CheckCircle2 className="h-12 w-12 text-neon-green" />
                <p className="text-lg font-bold text-neon-green">Stake Successful!</p>
                <p className="text-center text-sm text-muted-foreground">
                  Your stake is now active. Check the Active Stakes section.
                </p>
                <button onClick={resetAndClose} className="btn-banana px-6 py-2 text-sm">
                  Done
                </button>
              </div>
            )}

            {step === "error" && (
              <div className="flex flex-col items-center gap-4 py-8">
                <AlertTriangle className="h-12 w-12 text-orange-pop" />
                <p className="text-lg font-bold text-orange-pop">Transaction Failed</p>
                <p className="text-center text-sm text-muted-foreground">
                  Something went wrong. Please try again.
                </p>
                <div className="flex gap-3">
                  <button onClick={() => setStep("form")} className="btn-neon px-6 py-2 text-sm">
                    Retry
                  </button>
                  <button onClick={resetAndClose} className="text-sm text-muted-foreground hover:text-foreground">
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
