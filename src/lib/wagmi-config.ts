// src/lib/wagmi-config.ts
import { createConfig, http } from "wagmi";
import { mainnet } from "wagmi/chains";
import { metaMask, walletConnect } from "wagmi/connectors";

// Custom Monad chain - minimal definition
export const monadChain = {
  id: 10143,
  name: "Monad",
  network: "monad",
  nativeCurrency: {
    name: "MON",
    symbol: "MON",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://rpc.monad.xyz"] },
    public: { http: ["https://rpc.monad.xyz"] },
  },
  blockExplorers: {
    default: { name: "Monad Explorer", url: "https://explorer.monad.xyz" },
  },
} as const;

export const projectId = "14a6012ffc42d98b14cc3637e1c3c924";

export const wagmiConfig = createConfig({
  chains: [monadChain],
  connectors: [
    metaMask(),
    walletConnect({
      projectId,
      showQrModal: true,
    }),
  ],
  transports: {
    [10143]: http(),
  },
  ssr: false,
});
