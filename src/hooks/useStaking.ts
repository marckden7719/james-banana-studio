// src/hooks/useStaking.ts
import { useReadContract } from "wagmi";
import { useAccount } from "wagmi";
import { contracts } from "@/lib/contracts";
import { formatEther } from "viem";

export function useStaking() {
  const { address } = useAccount();

  const { data: stakeCount } = useReadContract({
    address: contracts.staking.address,
    abi: contracts.staking.abi,
    functionName: "getStakeCount",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const count = stakeCount ? Number(stakeCount) : 0;

  // For simplicity, aggregate pending rewards from all stakes
  // In production, you'd map through each stake ID
  const totalRewards = "0";

  return {
    activeStakeCount: count,
    totalRewards,
  };
}
