import { motion } from "framer-motion";

const CHAPTERS = [
  { n: 1, title: "The Lonely Cat", desc: "A lonely cat discovers a banana peel.", icon: "🐱" },
  { n: 2, title: "AI Experiment", desc: "A mysterious AI experiment changes everything.", icon: "🧪" },
  { n: 3, title: "First Meme", desc: "The first Banana Meme is born.", icon: "🍌" },
  { n: 4, title: "Monad Arrives", desc: "Monad embraces the chaos.", icon: "⚡" },
  { n: 5, title: "Falls In Love", desc: "The internet falls in love.", icon: "💛" },
];

export function Story() {
  return (
    <section id="story" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16 space-y-3">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-neon-green">Comic Book</p>
          <h2 className="text-5xl md:text-6xl font-black text-banana-gradient">The James Banana Story</h2>
        </div>
        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-banana via-neon-green to-orange-pop opacity-50" />
          {CHAPTERS.map((c, i) => (
            <motion.div
              key={c.n}
              initial={{ opacity: 0, x: i % 2 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`relative mb-10 md:w-1/2 ${i % 2 ? "md:ml-auto md:pl-12" : "md:pr-12 md:text-right"} pl-20 md:pl-0`}
            >
              <div className={`absolute top-4 z-10 size-16 rounded-full bg-gradient-to-tr from-banana to-neon-green flex items-center justify-center text-3xl border-4 border-deep-purple ${i % 2 ? "left-0 md:-left-8" : "left-0 md:-right-8 md:left-auto"}`}>
                {c.icon}
              </div>
              <div className="glass-card rounded-3xl p-6 hover:border-banana transition">
                <p className="text-xs font-black text-orange-pop uppercase tracking-widest">Chapter {c.n}</p>
                <h3 className="text-2xl font-black mt-1 text-banana">{c.title}</h3>
                <p className="text-muted-foreground mt-2">{c.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}