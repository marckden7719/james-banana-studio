import { motion } from "framer-motion";
import logo from "@/assets/logobanana.jpg";

export function Navbar() {
  const links = [
    { label: "About", href: "#about" },
    { label: "Studio", href: "#studio" },
    { label: "Banana TV", href: "#tv" },
    { label: "Story", href: "#story" },
    { label: "FAQ", href: "#faq" },
  ];
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 80 }}
      className="fixed top-0 left-0 right-0 z-50 glass-card"
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <a href="#" className="flex items-center gap-3">
          <img src={logo} alt="James Banana" className="h-10 w-10 rounded-full ring-2 ring-banana animate-wiggle" />
          <span className="text-banana-gradient text-xl font-black tracking-tight">JAMES BANANA</span>
        </a>
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-bold text-foreground/80 hover:text-banana transition-colors">
              {l.label}
            </a>
          ))}
        </div>
        <a href="https://x.com/jamescatbanana" target="_blank" rel="noreferrer" className="btn-banana rounded-full px-4 py-2 text-sm">
          🐦 Follow
        </a>
      </div>
    </motion.nav>
  );
}