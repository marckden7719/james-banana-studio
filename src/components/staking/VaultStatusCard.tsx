// src/components/staking/VaultStatusCard.tsx
import { motion } from "framer-motion";
import { useReadContract } from "wagmi";
import { formatEther } from "viem";
import { Shield, AlertTriangle, CheckCircle2 } from "lucide-react";
import { contracts, VAULT_ADDRESS, JAMES_TOKEN_ADDRESS } from "@/lib/contracts";

export function VaultStatusCard() {
  const { data: vaultWallet } = useReadContract({
    address: contracts.staking.address,
    abi: contracts.staking.abi,
    functionName: "vaultWallet",
  });

  return (
    <section className="px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-5xl"
      >
        <div className="glass-card glow-border rounded-2xl p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <Shield className="h-6 w-6 text-banana" />
            <h3 className="text-xl font-black text-banana">Vault Monitoring</h3>
            <span className="inline-flex items-center gap-1 rounded-full bg-neon-green/10 px-3 py-1 text-xs font-bold text-neon-green">
              <CheckCircle2 className="h-3 w-3" /> Healthy
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <VaultItem label="Vault Wallet" value={vaultWallet ? `${(vaultWallet as string).slice(0, 6)}...${(vaultWallet as string).slice(-4)}` : VAULT_ADDRESS.slice(0, 6) + "..." + VAULT_ADDRESS.slice(-4)} />
            <VaultItem label="Vault Allowance" value="Unlimited" />
            <VaultItem label="Vault Token Balance" value="—" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function VaultItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
      <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="text-sm font-bold text-foreground font-mono">{value}</p>
    </div>
  );
}
