import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { VideoShowcase } from "@/components/sections/VideoShowcase";
import { About } from "@/components/sections/About";
import { Features } from "@/components/sections/Features";
import { Studio } from "@/components/sections/Studio";
import { Gallery } from "@/components/sections/Gallery";
import { Story } from "@/components/sections/Story";
import { Monad } from "@/components/sections/Monad";
import { Community } from "@/components/sections/Community";
import { MemeWall } from "@/components/sections/MemeWall";
import { FAQ } from "@/components/sections/FAQ";
import { Social } from "@/components/sections/Social";
import { Footer } from "@/components/sections/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JAMES BANANA | AI Meme Video Generator On Monad" },
      { name: "description", content: "Create hilarious AI-generated meme videos with James Banana, the internet's favorite banana cat built on Monad." },
      { property: "og:title", content: "JAMES BANANA | AI Meme Video Generator On Monad" },
      { property: "og:description", content: "Create hilarious AI-generated meme videos with James Banana, the internet's favorite banana cat built on Monad." },
      { property: "og:image", content: "/logobanana.jpg" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/logobanana.jpg" },
      { name: "twitter:site", content: "@jamescatbanana" },
    ],
    links: [
      { rel: "icon", href: "/logobanana.jpg" },
      { rel: "apple-touch-icon", href: "/logobanana.jpg" },
      { rel: "canonical", href: "/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800;900&family=Bangers&display=swap" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <VideoShowcase id="watch" eyebrow="Hero Preview" title="Watch The Chaos Begin" subtitle="See how James Banana transforms ordinary memes into viral video content." />
      <About />
      <Features />
      <Studio />
      <VideoShowcase id="tv" eyebrow="Live Channel" title="Banana TV" subtitle="Watch the latest chaos created by the James Banana community." floatingReactions />
      <Gallery />
      <Story />
      <Monad />
      <Community />
      <MemeWall />
      <FAQ />
      <Social />
      <Footer />
    </main>
  );
}
