"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

interface AdsFloatingBottomProps {
  imageUrl?: string | null;
  linkUrl?: string | null;
}

const AdsFloatingBottom = ({ imageUrl, linkUrl }: AdsFloatingBottomProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  if (!imageUrl) return null;

  const content = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt="Advertisement"
      className="max-w-full h-auto max-h-[90px] object-contain mx-auto"
      src={imageUrl}
    />
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] pointer-events-none">
      <div className="bg-white dark:bg-neutral-900 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] border-none w-full pointer-events-auto">
        <div className="relative mx-auto max-w-[970px] py-0 flex justify-center items-center">
          {/* Close Button */}
          <button
            aria-label="Close ad"
            className="absolute left-full top-0 ml-[2px] bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-400 p-1 rounded-md transition-colors"
            onClick={() => setIsVisible(false)}
          >
            <X size={16} />
          </button>

          {/* Ad Content */}
          <div className="w-full flex justify-center">
            {linkUrl ? (
              <a
                className="block hover:opacity-95 transition-opacity w-full flex justify-center"
                href={linkUrl}
                rel="nofollow noopener noreferrer"
                target="_blank"
              >
                {content}
              </a>
            ) : (
              <div className="w-full">{content}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdsFloatingBottom;
