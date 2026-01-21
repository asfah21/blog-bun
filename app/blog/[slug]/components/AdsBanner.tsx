import React from "react";

interface AdsBannerProps {
    imageUrl?: string | null;
    linkUrl?: string | null;
}

const AdsBanner = ({ imageUrl, linkUrl }: AdsBannerProps) => {
    if (imageUrl) {
        const content = (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                src={imageUrl}
                alt="Advertisement"
                className="w-full h-full object-cover rounded-lg"
            />
        );

        if (linkUrl) {
            return (
                <a
                    href={linkUrl}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="block w-[728px] h-[90px] hover:opacity-95 transition-opacity"
                >
                    {content}
                </a>
            );
        }

        return <div className="w-[728px] h-[90px]">{content}</div>;
    }

    // Placeholder if no ads
    return (
        <div className="w-[728px] h-[1px] bg-none border-none">
            <span className="text-center">
                {/* Ads Space
                <br />
                728 x 90 */}
            </span>
        </div>
    );
};

export default AdsBanner;
