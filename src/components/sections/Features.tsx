import { motion } from "framer-motion";

const FEATURES = [
  { icon: "🎬", title: "AI Meme Video Generator", desc: "Transform static images into animated viral videos." },
  { icon: "🚀", title: "Built For Virality", desc: "Content optimized for X, Telegram, TikTok and Instagram." },
  { icon: "👥", title: "Community Driven", desc: "The community decides the next meme trend." },
  { icon: "⚡", title: "Monad Powered", desc: "Built on the fastest blockchain ecosystem." },
  { icon: "♾️", title: "Infinite Creativity", desc: "Generate endless meme possibilities." },
  { icon: "🌐", title: "Internet Native", desc: "Made by internet culture for internet culture." },
];

export function Features() {
  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 space-y-4">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-orange-pop">Why James Banana</p>
          <h2 className="text-5xl md:text-6xl font-black text-banana-gradient">Powers Of The Banana</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -8, rotate: i % 2 ? 2 : -2 }}
              className="glass-card rounded-3xl p-6 group hover:border-banana transition-all"
            >
              <div className="text-5xl mb-4 group-hover:scale-125 transition-transform inline-block">{f.icon}</div>
              <h3 className="text-xl font-black mb-2 text-banana">{f.title}</h3>
              <p className="text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}