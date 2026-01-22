import React from "react";

interface AdsFlexibleProps {
    imageUrl?: string | null;
    linkUrl?: string | null;
}

const AdsFlexible = ({ imageUrl, linkUrl }: AdsFlexibleProps) => {
    if (imageUrl) {
        const content = (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                src={imageUrl}
                alt="Advertisement"
                className="w-full h-auto max-w-[970px] mx-auto object-contain rounded-lg"
                style={{ maxHeight: '300px', minHeight: '90px' }}
            />
        );

        if (linkUrl) {
            return (
                <a
                    href={linkUrl}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="block w-full hover:opacity-95 transition-opacity my-6"
                >
                    {content}
                </a>
            );
        }

        return <div className="w-full my-6">{content}</div>;
    }

    // Placeholder if no ads
    return (
        <div className="w-full max-w-[970px] mx-auto h-[256px] bg-neutral-100 dark:bg-neutral-800 border-2 border-dashed border-neutral-200 dark:border-neutral-700 rounded-lg flex items-center justify-center my-6">
            <span className="text-neutral-400 font-medium">
                Content Ad (970x256 Default - Responsive)
            </span>
        </div>
    );
};

export default AdsFlexible;
