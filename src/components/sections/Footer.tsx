import logo from "@/assets/logobanana.jpg";

export function Footer() {
  return (
    <footer className="py-16 px-4 border-t border-foreground/10 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="James Banana" className="size-14 rounded-full ring-2 ring-banana" />
              <span className="text-banana-gradient text-2xl font-black">JAMES BANANA</span>
            </div>
            <p className="text-muted-foreground max-w-sm">The First AI Meme Video Generator on Monad. Made with chaos, captions, and pure banana energy.</p>
          </div>
          <div>
            <p className="font-black mb-3 text-banana">Community</p>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#community" className="hover:text-banana">Banana Army</a></li>
              <li><a href="#story" className="hover:text-banana">The Story</a></li>
            </ul>
          </div>
          <div>
            <p className="font-black mb-3 text-banana">Project</p>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#studio" className="hover:text-banana">Studio</a></li>
              <li><a href="#tv" className="hover:text-banana">Banana TV</a></li>
              <li><a href="#faq" className="hover:text-banana">FAQ</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-foreground/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-muted-foreground">
          <p>© 2026 James Banana. Ticker: $JAMES on Monad.</p>
          <p className="italic">🍌 No bananas were harmed during meme production. 🍌</p>
        </div>
      </div>
    </footer>
  );
}