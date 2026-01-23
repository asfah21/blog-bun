import { Navbar } from "@/components/navbar";
import Footer from "@/components/Footer";
import PolicyClientPage from "./PolicyClientPage";

export const metadata = {
  title: "About PT GSI",
};

export default function PolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <PolicyClientPage />
      </main>
      <Footer />
    </div>
  );
}
