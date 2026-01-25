"use client";

import DisclaimerHero from "./components/DisclaimerHero";

export default function DisclaimerClientPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-default-100 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto px-4 md:px-0">
        <DisclaimerHero fadeIn={fadeIn} staggerContainer={staggerContainer} />
      </div>
    </div>
  );
}
