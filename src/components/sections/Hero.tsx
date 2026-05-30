import { motion } from "framer-motion";
import logo from "@/assets/logobanana.jpg";
import { FloatingEmojis } from "@/components/FloatingEmojis";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-12">
      <FloatingEmojis count={20} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,oklch(0.88_0.2_95/0.15),transparent_50%),radial-gradient(circle_at_70%_60%,oklch(0.85_0.28_140/0.15),transparent_50%)]" />

      <div className="container relative z-10 mx-auto grid md:grid-cols-2 gap-10 px-4 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full glass-card px-4 py-2 text-xs font-bold uppercase tracking-widest text-neon-green">
            <span className="size-2 rounded-full bg-neon-green animate-pulse" />
            Live on Monad
          </div>
          <h1 className="text-6xl md:text-8xl font-black leading-[0.85] tracking-tight">
            <span className="text-banana-gradient">JAMES</span>
            <br />
            <span className="text-foreground">BANANA</span>
            <span className="inline-block animate-wiggle ml-2">🍌</span>
          </h1>
          <p className="text-2xl md:text-3xl font-bold text-neon-green">
            The First AI Meme Video Generator On Monad
          </p>
          <div className="space-y-2 mb-4">
            <p className="text-lg text-neon-green font-bold">Name: JAMES THE BANANA</p>
            <p className="text-lg text-banana font-bold">Ticker: $JAMES</p>
            <p className="text-sm text-muted-foreground bg-foreground/5 px-4 py-2 rounded-xl font-mono break-all">
              CA: 0xC613cFB15278ce6F3aC510BDB51a856Ae60E7777
            </p>
          </div>
          <p className="text-lg text-muted-foreground max-w-xl">
            Create hilarious AI-powered meme videos in seconds and unleash chaos across the internet.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a href="https://nad.fun/tokens/0xC613cFB15278ce6F3aC510BDB51a856Ae60E7777" target="_blank" rel="noreferrer" className="btn-banana rounded-2xl px-6 py-3">💰 BUY $JAMES</a>
            <a href="#studio" className="btn-neon rounded-2xl px-6 py-3">🍌 Create Meme Video</a>
            <a href="#community" className="btn-neon rounded-2xl px-6 py-3">🚀 Join Community</a>
            <a href="https://x.com/jamescatbanana" target="_blank" rel="noreferrer" className="rounded-2xl border-2 border-foreground/20 bg-foreground/5 backdrop-blur px-6 py-3 font-bold hover:bg-foreground/10 transition">🐦 Follow On X</a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: "spring" }}
          className="relative flex items-center justify-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-banana via-neon-green to-orange-pop blur-3xl opacity-40"
          />
          <motion.img
            src={logo}
            alt="James Banana mascot"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 w-full max-w-md rounded-full animate-glow-pulse"
          />
          {["🍌", "✨", "🔥", "💛"].map((e, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl"
              style={{
                top: `${20 + i * 20}%`,
                left: i % 2 === 0 ? "-5%" : "95%",
              }}
              animate={{ y: [0, -15, 0], rotate: [0, 20, -20, 0] }}
              transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.3 }}
            >
              {e}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}