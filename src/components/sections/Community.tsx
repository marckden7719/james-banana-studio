import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef } from "react";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, {
      duration: 2.5,
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.floor(v).toLocaleString() + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix, mv]);

  return <span ref={ref}>0{suffix}</span>;
}

const STATS = [
  { v: 42000, s: "+", label: "Banana Videos Generated" },
  { v: 128000, s: "+", label: "Memes Created" },
  { v: 15600, s: "", label: "Community Members" },
  { v: 3200000, s: "+", label: "Views Generated" },
];

export function Community() {
  return (
    <section id="community" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 space-y-3">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-neon-green">By The Numbers</p>
          <h2 className="text-5xl md:text-6xl font-black text-banana-gradient">The Banana Army</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-3xl p-6 text-center"
            >
              <div className="text-4xl md:text-5xl font-black text-banana-gradient">
                <Counter to={s.v} suffix={s.s} />
              </div>
              <p className="text-sm md:text-base text-muted-foreground mt-2 font-bold">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}