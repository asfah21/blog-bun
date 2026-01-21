import { getAllAds, upsertAd } from "@/app/actions/ads";
import AdsForm from "./components/AdsForm";
import { Ad } from "@prisma/client";

export default async function AdsPage() {
    const { data: ads } = await getAllAds();

    const leftAd = ads?.find((a: Ad) => a.position === "left_sidebar");
    const rightAd = ads?.find((a: Ad) => a.position === "right_sidebar");
    const topAd = ads?.find((a: Ad) => a.position === "top_banner");
    const bottomFloatingAd = ads?.find((a: Ad) => a.position === "bottom_floating");

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Ads Management</h1>
            <div className="grid gap-8">
                {/* Top Banner */}
                <div className="col-span-1 md:col-span-2">
                    <h2 className="text-lg font-semibold mb-4">Top Banner (728x90)</h2>
                    <AdsForm position="top_banner" initialData={topAd} previewMaxWidth="100%" />
                </div>

                {/* Bottom Floating Banner */}
                <div className="col-span-1 md:col-span-2">
                    <h2 className="text-lg font-semibold mb-4">Bottom Floating Banner (Suggest 970x90)</h2>
                    <AdsForm position="bottom_floating" initialData={bottomFloatingAd} previewMaxWidth="100%" />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Left Sidebar (160x600)</h2>
                        <AdsForm position="left_sidebar" initialData={leftAd} />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Right Sidebar (160x600)</h2>
                        <AdsForm position="right_sidebar" initialData={rightAd} />
                    </div>
                </div>
            </div>
        </div>
    );
}
