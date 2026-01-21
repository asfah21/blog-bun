import React from "react";

interface AdsSideProps {
    imageUrl?: string | null;
    linkUrl?: string | null;
}

const AdsSide = ({ imageUrl, linkUrl }: AdsSideProps) => {
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
                    className="block w-[160px] h-[600px] hover:opacity-95 transition-opacity"
                >
                    {content}
                </a>
            );
        }

        return <div className="w-[160px] h-[600px]">{content}</div>;
    }

    // Placeholder if no ads
    return (
        <div className="w-[160px] h-[600px] bg-none border-none">
            <span className="text-center">
                {/* No Ads */}
            </span>
        </div>
    );
};

export default AdsSide;
