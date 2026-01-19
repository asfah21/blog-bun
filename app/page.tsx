import { Navbar } from "@/components/navbar";
// import Navbar from "@/components/navbar-client";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import CategorySlider from "@/components/home/CategorySlider";
import HeroAlpha from "@/components/home/HeroAlpha";
import Fonts from "@/components/home/Font";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <CategorySlider />
        <Hero />
        <Fonts />
        <HeroAlpha />
        {/* <HeroGamma /> */}
        {/* <WithLove /> */}
        {/* <CardBawah /> */}
        {/* <HeroDelta /> */}
        {/* <FooterBefore /> */}
      </main>
      <Footer />
    </div>
  );
}
