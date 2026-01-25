import DisclaimerClientPage from "@/app/disclaimer/DisclaimerClientPage";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Disclaimer - Listofont.com",
  description:
    "Read the disclaimer for Listofont.com regarding our font collection and services.",
};

export default function DisclaimerPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <DisclaimerClientPage />
      </main>
      <Footer />
    </div>
  );
}
