import { motion } from "framer-motion";

export function VideoShowcase({
  id,
  eyebrow,
  title,
  subtitle,
  floatingReactions = false,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle: string;
  floatingReactions?: boolean;
}) {
  return (
    <section id={id} className="relative py-20 px-4">
      <div className="container mx-auto max-w-5xl text-center space-y-6">
        {eyebrow && (
          <p className="text-sm font-black uppercase tracking-[0.3em] text-orange-pop">{eyebrow}</p>
        )}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-black text-banana-gradient"
        >
          {title}
        </motion.h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative mt-10"
        >
          <div className="glass-card glow-border rounded-3xl p-3 relative">
            <video
              src="/videobanana.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full rounded-2xl"
            />
            {floatingReactions && (
              <>
                {["🤣", "😂", "🍌", "🚀", "🔥", "✨"].map((e, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-5xl"
                    style={{
                      top: `${10 + (i * 13) % 70}%`,
                      left: i % 2 === 0 ? "-8%" : "100%",
                    }}
                    animate={{ y: [0, -25, 0], rotate: [-10, 10, -10] }}
                    transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
                  >
                    {e}
                  </motion.div>
                ))}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}