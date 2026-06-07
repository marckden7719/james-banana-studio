import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const QA = [
  { q: "What is James Banana?", a: "James Banana is an AI Meme Video Generator platform built on Monad — a cat trapped in a banana peel turned viral meme ecosystem." },
  { q: "How does the AI Meme Generator work?", a: "Upload any image, choose your style, and our AI animates it into a viral-ready video with captions, sound, and chaos." },
  { q: "Why Monad?", a: "Monad is fast, cheap, and built for consumer-scale viral apps — perfect for a meme video factory." },
  { q: "Can anyone create videos?", a: "Yes. No editing skills, no signup friction. If you can pick a meme, you can ship a video." },
  { q: "How do I join the community?", a: "Follow @jamescatbanana on X and jump into the Banana Army. Memes are the only password." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12 space-y-3">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-neon-green">Banana FAQ</p>
          <h2 className="text-5xl md:text-6xl font-black text-banana-gradient">Questions?</h2>
        </div>
        <div className="space-y-3">
          {QA.map((item, i) => (
            <div key={i} className="glass-card rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left font-bold text-lg hover:text-banana transition"
              >
                <span>{item.q}</span>
                <span className="text-2xl text-banana shrink-0">{open === i ? "−" : "+"}</span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-muted-foreground">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}