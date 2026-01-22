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
        alt="Advertisement"
        className="w-full h-full object-cover rounded-lg"
        src={imageUrl}
      />
    );

    if (linkUrl) {
      return (
        <a
          className="block w-[728px] h-[90px] hover:opacity-95 transition-opacity"
          href={linkUrl}
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          {content}
        </a>
      );
    }

    return <div className="w-[728px] h-[90px]">{content}</div>;
  }

  // Return null if no ads to avoid layout shift or placeholders
  return null;
};

export default AdsBanner;
