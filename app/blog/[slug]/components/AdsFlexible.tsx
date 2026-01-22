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
                className="max-w-full h-auto max-w-[970px] object-contain rounded-lg"
                style={{ maxHeight: '300px' }}
            />
        );

        if (linkUrl) {
            return (
                <a
                    href={linkUrl}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="flex justify-center w-full hover:opacity-95 transition-opacity !mt-0"
                >
                    {content}
                </a>
            );
        }

        return <div className="flex justify-center w-full my-6">{content}</div>;
    }

    return null;
};

export default AdsFlexible;
