import { motion } from "framer-motion";

const REASONS = [
  { icon: "⚡", t: "Lightning Fast", d: "10,000+ TPS for instant meme deployment." },
  { icon: "📈", t: "Massive Scalability", d: "Built to handle viral-grade traffic." },
  { icon: "💸", t: "Low Fees", d: "Mint memes for fractions of a cent." },
  { icon: "🔮", t: "Future Ready", d: "Parallel execution for the next era." },
  { icon: "🏗️", t: "Modern Infrastructure", d: "EVM-compatible with zero compromise." },
  { icon: "🚀", t: "Built For Viral Apps", d: "Made for consumer-scale chaos." },
];

export function Monad() {
  return (
    <section className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,oklch(0.85_0.28_140/0.1),transparent_60%)]" />
      <div className="container mx-auto max-w-6xl relative">
        <div className="text-center mb-12 space-y-3">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-orange-pop">Ecosystem</p>
          <h2 className="text-5xl md:text-6xl font-black text-banana-gradient">Why James Chose Monad</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REASONS.map((r, i) => (
            <motion.div
              key={r.t}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              className="glass-card rounded-3xl p-6 border-neon-green/30 hover:shadow-[0_0_40px_oklch(0.85_0.28_140/0.4)] transition"
            >
              <div className="text-4xl mb-3">{r.icon}</div>
              <h3 className="text-xl font-black text-neon-green">{r.t}</h3>
              <p className="text-muted-foreground mt-2">{r.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}