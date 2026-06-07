// src/components/staking/ClaimModal.tsx
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { contracts, STAKING_POOLS } from "@/lib/contracts";
import { toast } from "sonner";

interface ClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  stakeId: bigint;
  poolId: number;
  rewardAmount: string;
}

export function ClaimModal({ isOpen, onClose, stakeId, poolId, rewardAmount }: ClaimModalProps) {
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>();
  const [step, setStep] = useState<"confirm" | "pending" | "success" | "error">("confirm");

  const { writeContractAsync } = useWriteContract();
  const { isSuccess: txSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
    query: { enabled: !!txHash },
  });

  const handleClaim = async () => {
    try {
      setStep("pending");
      const hash = await writeContractAsync({
        address: contracts.staking.address,
        abi: contracts.staking.abi,
        functionName: "claim",
        args: [stakeId],
      });
      setTxHash(hash);
    } catch (err: any) {
      setStep("error");
      toast.error(err?.shortMessage || "Claim failed");
    }
  };

  if (txSuccess && step === "pending") {
    setStep("success");
    toast.success("Rewards claimed!");
  }

  const resetAndClose = () => {
    setTxHash(undefined);
    setStep("confirm");
    onClose();
  };

  const pool = STAKING_POOLS[poolId];

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
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            {step === "confirm" && (
              <>
                <h2 className="mb-1 text-2xl font-black text-banana">Claim Rewards</h2>
                <p className="mb-6 text-sm text-muted-foreground">
                  Pool: {pool?.duration} — {pool?.rewardPercent}% reward
                </p>

                <div className="mb-6 space-y-2 rounded-xl border border-white/5 bg-white/[0.02] p-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Stake ID</span>
                    <span className="font-bold text-foreground">#{String(stakeId)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Claimable Reward</span>
                    <span className="font-bold text-neon-green">{rewardAmount} MON in JAMES</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Burn Penalty</span>
                    <span className="font-bold text-neon-green">None (unlocked)</span>
                  </div>
                </div>

                <button onClick={handleClaim} className="btn-neon w-full py-3 text-sm">
                  Confirm Claim
                </button>
              </>
            )}

            {step === "pending" && (
              <div className="flex flex-col items-center gap-4 py-8">
                <Loader2 className="h-12 w-12 animate-spin text-banana" />
                <p className="text-sm text-muted-foreground">Claiming rewards...</p>
              </div>
            )}

            {step === "success" && (
              <div className="flex flex-col items-center gap-4 py-8">
                <CheckCircle2 className="h-12 w-12 text-neon-green" />
                <p className="text-lg font-black text-neon-green">Claim Successful!</p>
                <p className="text-center text-sm text-muted-foreground">
                  Rewards have been sent to your wallet.
                </p>
                <button onClick={resetAndClose} className="btn-banana px-6 py-2 text-sm">
                  Done
                </button>
              </div>
            )}

            {step === "error" && (
              <div className="flex flex-col items-center gap-4 py-8">
                <AlertTriangle className="h-12 w-12 text-orange-pop" />
                <p className="text-lg font-bold text-orange-pop">Claim Failed</p>
                <div className="flex gap-3">
                  <button onClick={() => setStep("confirm")} className="btn-neon px-6 py-2 text-sm">
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
