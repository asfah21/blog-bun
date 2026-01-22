import { Ad } from "@prisma/client";

import AdsForm from "./components/AdsForm";

import { getAllAds } from "@/app/actions/ads";

export default async function AdsPage() {
  const { data: ads } = await getAllAds();

  const topAd = ads?.find((a: Ad) => a.position === "top_banner");
  const bottomFloatingAd = ads?.find(
    (a: Ad) => a.position === "bottom_floating",
  );
  const contentFlexibleAd = ads?.find(
    (a: Ad) => a.position === "content_flexible",
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Ads Management</h1>
      <div className="grid gap-8">
        {/* Top Banner */}
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Top Banner (728x90)</h2>
          <AdsForm
            initialData={topAd}
            position="top_banner"
            previewMaxWidth="100%"
          />
        </div>

        {/* Content Flexible Banner */}
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-lg font-semibold mb-4">
            Content Flexible Banner (970x90 - 970x300 | Default 970x256)
          </h2>
          <AdsForm
            initialData={contentFlexibleAd}
            position="content_flexible"
            previewMaxWidth="100%"
          />
        </div>

        {/* Bottom Floating Banner */}
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-lg font-semibold mb-4">
            Bottom Floating Banner (Suggest 970x90)
          </h2>
          <AdsForm
            initialData={bottomFloatingAd}
            position="bottom_floating"
            previewMaxWidth="100%"
          />
        </div>
      </div>
    </div>
  );
}
