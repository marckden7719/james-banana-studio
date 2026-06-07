// src/lib/contracts.ts
// James Banana Staking - Contract Configuration

export const MONAD_CHAIN_ID = 10143;

export const contracts = {
  staking: {
    address: "0x0000000000000000000000000000000000000000" as `0x${string}`,
    abi: [
      // Write functions
      {
        name: "stake",
        type: "function" as const,
        stateMutability: "payable" as const,
        inputs: [{ name: "_poolId", type: "uint8" as const }],
        outputs: [],
      },
      {
        name: "claim",
        type: "function" as const,
        stateMutability: "nonpayable" as const,
        inputs: [{ name: "_stakeId", type: "uint256" as const }],
        outputs: [],
      },
      {
        name: "earlyClaim",
        type: "function" as const,
        stateMutability: "nonpayable" as const,
        inputs: [{ name: "_stakeId", type: "uint256" as const }],
        outputs: [],
      },
      {
        name: "approve",
        type: "function" as const,
        stateMutability: "nonpayable" as const,
        inputs: [
          { name: "spender", type: "address" as const },
          { name: "amount", type: "uint256" as const },
        ],
        outputs: [{ type: "bool" as const }],
      },
      // Read functions
      {
        name: "getStake",
        type: "function" as const,
        stateMutability: "view" as const,
        inputs: [{ name: "_stakeId", type: "uint256" as const }],
        outputs: [
          {
            type: "tuple" as const,
            components: [
              { name: "staker", type: "address" as const },
              { name: "amount", type: "uint256" as const },
              { name: "poolId", type: "uint8" as const },
              { name: "startTime", type: "uint40" as const },
              { name: "claimed", type: "bool" as const },
            ],
          },
        ],
      },
      {
        name: "getStakeCount",
        type: "function" as const,
        stateMutability: "view" as const,
        inputs: [{ name: "_user", type: "address" as const }],
        outputs: [{ type: "uint256" as const }],
      },
      {
        name: "pendingReward",
        type: "function" as const,
        stateMutability: "view" as const,
        inputs: [{ name: "_stakeId", type: "uint256" as const }],
        outputs: [{ type: "uint256" as const }],
      },
      {
        name: "requiredBurnAmount",
        type: "function" as const,
        stateMutability: "view" as const,
        inputs: [{ name: "_user", type: "address" as const }],
        outputs: [{ type: "uint256" as const }],
      },
      {
        name: "totalStaked",
        type: "function" as const,
        stateMutability: "view" as const,
        inputs: [],
        outputs: [{ type: "uint256" as const }],
      },
      {
        name: "rewardToken",
        type: "function" as const,
        stateMutability: "view" as const,
        inputs: [],
        outputs: [{ type: "address" as const }],
      },
      {
        name: "vaultWallet",
        type: "function" as const,
        stateMutability: "view" as const,
        inputs: [],
        outputs: [{ type: "address" as const }],
      },
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
      {
        name: "pools",
        type: "function" as const,
        stateMutability: "view" as const,
        inputs: [{ name: "", type: "uint8" as const }],
        outputs: [
          { name: "lockPeriod", type: "uint40" as const },
          { name: "rewardPercent", type: "uint16" as const },
          { name: "active", type: "bool" as const },
        ],
      },
    ],
  },
} as const;

export const JAMES_TOKEN_ADDRESS =
  "0x0000000000000000000000000000000000000000" as `0x${string}`;
export const VAULT_ADDRESS =
  "0x0000000000000000000000000000000000000000" as `0x${string}`;
export const BURN_ADDRESS =
  "0x000000000000000000000000000000000000dEaD" as `0x${string}`;

export const JAMES_DECIMALS = 18;
export const MINIMUM_HOLDING = BigInt(500000) * BigInt(10 ** JAMES_DECIMALS);

// Staking pools config (matches contract)
export const STAKING_POOLS = [
  {
    id: 0,
    duration: "7 Days",
    lockPeriodSeconds: 7 * 24 * 60 * 60,
    rewardPercent: 5,
    description: "Short-term staking with flexible unlock",
  },
  {
    id: 1,
    duration: "15 Days",
    lockPeriodSeconds: 15 * 24 * 60 * 60,
    rewardPercent: 15,
    description: "Medium-term staking with balanced rewards",
  },
  {
    id: 2,
    duration: "30 Days",
    lockPeriodSeconds: 30 * 24 * 60 * 60,
    rewardPercent: 40,
    description: "Long-term staking with maximum rewards",
  },
] as const;
