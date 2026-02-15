import { Navbar } from "@/components/navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import CategorySlider, { Category } from "@/components/home/CategorySlider";
import HeroAlpha from "@/components/home/HeroAlpha";
import Fonts from "@/components/home/Font";
import { getCategories } from "@/lib/categories";

export default async function Home() {
  const categories = (await getCategories()) as Category[];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <CategorySlider initialCategories={categories} />
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
