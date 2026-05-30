import { motion } from "framer-motion";

const EMOJIS = ["🍌", "🐱", "🤣", "🔥", "🚀", "😂", "✨", "💛", "🎬", "🍿"];

export function FloatingEmojis({ count = 18 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const emoji = EMOJIS[i % EMOJIS.length];
        const left = (i * 37) % 100;
        const delay = (i * 0.7) % 6;
        const duration = 8 + (i % 5) * 2;
        const size = 20 + (i % 4) * 12;
        return (
          <motion.div
            key={i}
            className="absolute select-none"
            style={{ left: `${left}%`, fontSize: size, top: "100%" }}
            initial={{ y: 0, opacity: 0, rotate: 0 }}
            animate={{
              y: "-120vh",
              opacity: [0, 1, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {emoji}
          </motion.div>
        );
      })}
    </div>
  );
}