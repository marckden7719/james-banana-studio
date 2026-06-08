// src/lib/wagmi-config.ts
import { http, createConfig } from "wagmi";
import { metaMask, walletConnect, injected, safe } from "wagmi/connectors";
import type { Chain } from "viem";

export const monadChain: Chain = {
  id: 10143,
  name: "Monad",
  nativeCurrency: {
    name: "MON",
    symbol: "MON",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.monad.xyz"],
    },
  },
  blockExplorers: {
    default: {
      name: "Monad Explorer",
      url: "https://explorer.monad.xyz",
    },
  },
};

const projectId = "14a6012ffc42d98b14cc3637e1c3c924";

export const wagmiConfig = createConfig({
  chains: [monadChain],
  connectors: [
    metaMask({ dappMetadata: { name: "James Banana" } }),
    safe(),
    walletConnect({
      projectId,
      showQrModal: true,
      metadata: {
        name: "James Banana Staking",
        description: "Stake MON, Earn JAMES",
        url: "https://james-banana-studio.vercel.app",
        icons: ["https://james-banana-studio.vercel.app/logobanana.jpg"],
      },
    }),
  ],
  transports: {
    [monadChain.id]: http("https://rpc.monad.xyz", {
      timeout: 10000,
      retryCount: 1,
    }),
  },
  ssr: false,
});
