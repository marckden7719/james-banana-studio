import { motion } from "framer-motion";
import logo from "@/assets/logobanana.jpg";

const STEPS = [
  { n: "01", icon: "📤", label: "Upload Meme" },
  { n: "02", icon: "✨", label: "Generate Animation" },
  { n: "03", icon: "🎙️", label: "Add Funny Voice" },
  { n: "04", icon: "💬", label: "Add Captions" },
  { n: "05", icon: "📼", label: "Export Video" },
  { n: "06", icon: "🚀", label: "Share Instantly" },
];

export function Studio() {
  return (
    <section id="studio" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 space-y-3">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-neon-green">The Lab</p>
          <h2 className="text-5xl md:text-6xl font-black text-banana-gradient">Banana Studio</h2>
          <p className="text-xl text-muted-foreground">Create Chaos In Seconds</p>
        </div>

        <div className="glass-card glow-border rounded-[2rem] p-6 md:p-10 relative overflow-hidden">
          {/* Mock window bar */}
          <div className="flex items-center gap-2 mb-6">
            <span className="size-3 rounded-full bg-destructive" />
            <span className="size-3 rounded-full bg-orange-pop" />
            <span className="size-3 rounded-full bg-neon-green" />
            <span className="ml-4 text-xs text-muted-foreground font-mono">banana.studio/dashboard</span>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1 glass-card rounded-2xl p-4 space-y-3">
              <p className="text-xs font-black uppercase text-muted-foreground">Preview</p>
              <div className="aspect-square rounded-xl overflow-hidden bg-deep-purple">
                <motion.img
                  src={logo}
                  alt=""
                  animate={{ scale: [1, 1.05, 1], rotate: [0, 3, -3, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-2">
                <button className="btn-banana rounded-lg px-3 py-2 text-xs flex-1">▶ Generate</button>
              </div>
            </div>

            <div className="md:col-span-2 grid sm:grid-cols-2 gap-4">
              {STEPS.map((s, i) => (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card rounded-2xl p-4 flex items-center gap-4 hover:border-banana transition group"
                >
                  <div className="text-3xl group-hover:animate-wiggle">{s.icon}</div>
                  <div>
                    <p className="text-xs text-orange-pop font-black">STEP {s.n}</p>
                    <p className="font-bold">{s.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}