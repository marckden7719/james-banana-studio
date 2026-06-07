// src/components/Navbar.tsx
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logobanana.jpg";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "#about" },
    { label: "Studio", href: "#studio" },
    { label: "Banana TV", href: "#tv" },
    { label: "Story", href: "#story" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <>
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

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-sm font-bold text-foreground/80 hover:text-banana transition-colors">
                {l.label}
              </a>
            ))}
            <Link to="/staking" className="text-sm font-bold text-banana hover:text-banana/80 transition-colors">
              Staking
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <a href="https://x.com/jamescatbanana" target="_blank" rel="noreferrer" className="btn-banana rounded-full px-4 py-2 text-sm hidden sm:inline-flex">
              Follow
            </a>
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-foreground/80 hover:text-banana transition-colors"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mobile-nav-overlay md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}>
                {l.label}
              </a>
            ))}
            <Link to="/staking" onClick={() => setMobileOpen(false)} className="text-banana">
              Staking
            </Link>
            <a
              href="https://x.com/jamescatbanana"
              target="_blank"
              rel="noreferrer"
              className="btn-banana rounded-full px-6 py-2 text-sm"
            >
              Follow
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
