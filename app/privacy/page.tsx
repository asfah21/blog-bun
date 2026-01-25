import PrivacyClientPage from "@/app/privacy/PrivacyClientPage";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy - Listofont.com",
  description:
    "Read the Privacy Policy for Listofont.com to understand how we handle your data.",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <PrivacyClientPage />
      </main>
      <Footer />
    </div>
  );
}
