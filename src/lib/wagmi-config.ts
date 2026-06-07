// src/lib/wagmi-config.ts
import { http, createConfig } from "wagmi";
import { metaMask, walletConnect, injected } from "wagmi/connectors";
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

const projectId = "james-banana-staking";

export const wagmiConfig = createConfig({
  chains: [monadChain],
  connectors: [
    metaMask(),
    injected({ target: "rabby" }),
    injected({ target: "okxWallet" }),
    injected({ target: "backpack" }),
    walletConnect({ projectId }),
  ],
  transports: {
    [monadChain.id]: http("https://rpc.monad.xyz"),
  },
  ssr: false,
});
