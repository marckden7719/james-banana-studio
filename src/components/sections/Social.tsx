import { motion } from "framer-motion";
import logo from "@/assets/logobanana.jpg";

export function Social() {
  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card glow-border rounded-[2rem] p-10 md:p-14 text-center relative overflow-hidden"
        >
          <img src={logo} alt="" className="absolute -top-10 -right-10 w-48 opacity-20 animate-spin-slow" />
          <p className="text-sm font-black uppercase tracking-[0.3em] text-orange-pop mb-3">Join Us</p>
          <h2 className="text-5xl md:text-7xl font-black text-banana-gradient mb-4">@jamescatbanana</h2>
          <p className="text-xl text-muted-foreground mb-8">The Banana Army wants you. Bring memes.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://x.com/jamescatbanana" target="_blank" rel="noreferrer" className="btn-banana rounded-2xl px-6 py-3">🐦 Follow On X</a>
            <a href="#community" className="btn-neon rounded-2xl px-6 py-3">🍌 Join Banana Army</a>
            <a href="#studio" className="rounded-2xl border-2 border-foreground/20 bg-foreground/5 px-6 py-3 font-bold hover:bg-foreground/10 transition">🎬 Create Your First Meme</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}