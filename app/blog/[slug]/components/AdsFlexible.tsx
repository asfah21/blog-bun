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
        alt="Advertisement"
        className="max-w-full h-auto max-w-[970px] object-contain rounded-lg"
        src={imageUrl}
        style={{ maxHeight: "300px" }}
      />
    );

    if (linkUrl) {
      return (
        <a
          className="flex justify-center w-full hover:opacity-95 transition-opacity !mt-0"
          href={linkUrl}
          rel="nofollow noopener noreferrer"
          target="_blank"
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
