import logo from "@/assets/logobanana.jpg";
import a1 from "@/assets/assets1.jpg";
import a2 from "@/assets/assets2.jpeg";
import banner from "@/assets/bannerbanana.jpeg";

const ITEMS = [logo, a2, a1, banner, logo, a2, a1, banner];

export function MemeWall() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto max-w-6xl px-4 text-center mb-10 space-y-3">
        <p className="text-sm font-black uppercase tracking-[0.3em] text-orange-pop">Never Ending Feed</p>
        <h2 className="text-5xl md:text-6xl font-black text-banana-gradient">Meme Wall</h2>
      </div>
      <div className="relative overflow-hidden py-6">
        <div className="flex gap-6 animate-marquee w-max">
          {[...ITEMS, ...ITEMS].map((src, i) => (
            <div key={i} className="size-56 md:size-72 rounded-3xl overflow-hidden glass-card shrink-0 hover:scale-105 transition-transform">
              <img src={src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
      <div className="relative overflow-hidden py-6">
        <div className="flex gap-6 animate-marquee w-max" style={{ animationDirection: "reverse", animationDuration: "55s" }}>
          {[...ITEMS.slice().reverse(), ...ITEMS].map((src, i) => (
            <div key={i} className="size-56 md:size-72 rounded-3xl overflow-hidden glass-card shrink-0">
              <img src={src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}