import { motion } from "framer-motion";
import { useState } from "react";
import a1 from "@/assets/assets1.jpg";
import a2 from "@/assets/assets2.jpeg";
import banner from "@/assets/bannerbanana.jpeg";
import logo from "@/assets/logobanana.jpg";

const IMAGES = [
  { src: banner, caption: "The King Meme arrives" },
  { src: a1, caption: "Behind the design desk" },
  { src: a2, caption: "James in the wild — gMonad ☕" },
  { src: logo, caption: "The legendary sticker" },
];

export function Gallery() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 space-y-3">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-orange-pop">Archives</p>
          <h2 className="text-5xl md:text-6xl font-black text-banana-gradient">The Banana Archives</h2>
          <p className="text-xl text-muted-foreground">Legendary Moments From The James Banana Universe</p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {IMAGES.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-2xl glass-card"
              onClick={() => setActive(img.src)}
            >
              <img src={img.src} alt={img.caption} className="w-full transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-purple/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                <p className="font-bold text-foreground">{img.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 bg-deep-purple/95 backdrop-blur-xl flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setActive(null)}
        >
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={active}
            alt=""
            className="max-h-[90vh] max-w-full rounded-2xl glow-border"
          />
        </div>
      )}
    </section>
  );
}