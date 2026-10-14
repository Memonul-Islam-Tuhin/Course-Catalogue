import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Controls from "@/components/Controls";
import Catalogue from "@/components/Catalogue";
import Features from "@/components/Features";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <Hero />
      <Marquee />
      <Controls />
      <Catalogue />
      <Features />
    </div>
  );
}
