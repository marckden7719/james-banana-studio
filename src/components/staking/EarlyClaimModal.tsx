// src/components/staking/EarlyClaimModal.tsx
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, Loader2, CheckCircle2, Flame } from "lucide-react";
import { useState } from "react";
import { useWriteContract, useWaitForTransactionReceipt, useReadContract } from "wagmi";
import { formatEther } from "viem";
import { contracts, BURN_ADDRESS } from "@/lib/contracts";
import { toast } from "sonner";

interface EarlyClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  stakeId: bigint;
  jamesBalance: bigint;
}

export function EarlyClaimModal({ isOpen, onClose, stakeId, jamesBalance }: EarlyClaimModalProps) {
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>();
  const [step, setStep] = useState<"warning" | "approve" | "pending" | "success" | "error">("warning");

  const { writeContractAsync } = useWriteContract();
  const { isSuccess: txSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
    query: { enabled: !!txHash },
  });

  // Check JAMES allowance for staking contract
  const { data: allowance } = useReadContract({
    address: contracts.staking.address, // JAMES token address in production
    abi: [
      {
        name: "allowance",
        type: "function" as const,
        stateMutability: "view" as const,
        inputs: [
          { name: "owner", type: "address" as const },
          { name: "spender", type: "address" as const },
        ],
        outputs: [{ type: "uint256" as const }],
      },
    ] as const,
    functionName: "allowance",
    query: { enabled: isOpen },
  });

  // Required burn = 20% of JAMES balance
  const burnAmount = jamesBalance / BigInt(5);
  const burnFormatted = Number(formatEther(burnAmount)).toLocaleString(undefined, { maximumFractionDigits: 2 });
  const balanceFormatted = Number(formatEther(jamesBalance)).toLocaleString(undefined, { maximumFractionDigits: 2 });

  const needsApproval = true; // Simplified — check allowance properly in production

  const handleApprove = async () => {
    try {
      setStep("approve");
      const hash = await writeContractAsync({
        address: contracts.staking.address,
        abi: contracts.staking.abi,
        functionName: "approve",
        args: [contracts.staking.address, jamesBalance],
      });
      setTxHash(hash);
    } catch (err: any) {
      setStep("error");
      toast.error("Approval failed");
    }
  };

  const handleEarlyClaim = async () => {
    try {
      setStep("pending");
      const hash = await writeContractAsync({
        address: contracts.staking.address,
        abi: contracts.staking.abi,
        functionName: "earlyClaim",
        args: [stakeId],
      });
      setTxHash(hash);
    } catch (err: any) {
      setStep("error");
      toast.error(err?.shortMessage || "Early claim failed");
    }
  };

  if (txSuccess && step !== "warning") {
    if (step === "approve") {
      setStep("warning"); // Go back to allow early claim
      toast.success("JAMES approved!");
    } else {
      setStep("success");
      toast.success("Early claim successful!");
    }
  }

  const resetAndClose = () => {
    setTxHash(undefined);
    setStep("warning");
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
            className="glass-card glow-border relative w-full max-w-md rounded-2xl border-orange-pop/20 p-6 sm:p-8"
          >
            <button
              onClick={resetAndClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            {step === "warning" && (
              <>
                {/* Warning header */}
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-pop/15">
                    <AlertTriangle className="h-6 w-6 text-orange-pop" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-orange-pop">WARNING</h2>
                    <p className="text-xs text-muted-foreground">Early Claim Penalty</p>
                  </div>
                </div>

                <div className="mb-6 rounded-xl border border-orange-pop/20 bg-orange-pop/[0.06] p-4">
                  <p className="text-sm font-semibold text-orange-pop">
                    Claiming before unlock requires burning 20% of your snapshot JAMES balance.
                  </p>
                </div>

                <div className="mb-6 space-y-2 rounded-xl border border-white/5 bg-white/[0.02] p-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Penalty Amount</span>
                    <span className="font-bold text-orange-pop">{burnFormatted} JAMES</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Current Balance</span>
                    <span className="font-bold text-foreground">{balanceFormatted} JAMES</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Burn Address</span>
                    <span className="font-mono text-xs text-muted-foreground/60">{BURN_ADDRESS.slice(0, 10)}...</span>
                  </div>
                </div>

                {/* Burn info */}
                <div className="mb-6 flex items-start gap-2">
                  <Flame className="mt-0.5 h-4 w-4 shrink-0 text-orange-pop/50" />
                  <p className="text-xs text-muted-foreground">
                    Burned tokens are permanently removed from circulation. This action cannot be undone.
                  </p>
                </div>

                <div className="flex gap-3">
                  {needsApproval ? (
                    <>
                      <button onClick={handleApprove} className="btn-banana flex-1 py-3 text-sm">
                        Approve JAMES
                      </button>
                      <button onClick={handleEarlyClaim} className="btn-neon flex-1 py-3 text-sm">
                        Early Claim
                      </button>
                    </>
                  ) : (
                    <button onClick={handleEarlyClaim} className="btn-orange flex-1 py-3 text-sm">
                      Confirm Early Claim
                    </button>
                  )}
                </div>
              </>
            )}

            {step === "approve" && (
              <div className="flex flex-col items-center gap-4 py-8">
                <Loader2 className="h-12 w-12 animate-spin text-banana" />
                <p className="text-sm text-muted-foreground">Approving JAMES...</p>
              </div>
            )}

            {step === "pending" && (
              <div className="flex flex-col items-center gap-4 py-8">
                <Loader2 className="h-12 w-12 animate-spin text-orange-pop" />
                <p className="text-sm text-muted-foreground">Processing early claim...</p>
              </div>
            )}

            {step === "success" && (
              <div className="flex flex-col items-center gap-4 py-8">
                <CheckCircle2 className="h-12 w-12 text-neon-green" />
                <p className="text-lg font-black text-neon-green">Early Claim Successful!</p>
                <p className="text-center text-sm text-muted-foreground">
                  Rewards claimed with 20% burn applied.
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
                <div className="flex gap-3">
                  <button onClick={() => setStep("warning")} className="btn-neon px-6 py-2 text-sm">
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
