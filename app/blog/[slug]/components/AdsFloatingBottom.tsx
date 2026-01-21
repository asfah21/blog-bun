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

    const content = imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={imageUrl}
            alt="Advertisement"
            className="max-w-full h-auto max-h-[90px] object-contain mx-auto"
        />
    ) : (
        <div className="w-full h-[90px] flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 text-neutral-400 text-sm border border-neutral-200 dark:border-neutral-700">
            Ads Space - Fixed Bottom (970x90)
        </div>
    );

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] pointer-events-none">
            <div className="bg-white dark:bg-neutral-900 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] border-t border-neutral-200 dark:border-neutral-800 w-full pointer-events-auto">
                <div className="relative mx-auto max-w-[970px] pr-3 py-0 flex justify-center items-center">
                    {/* Close Button */}
                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute top-1 right-1 md:top-2 md:right-2 bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black/70 text-neutral-600 dark:text-neutral-200 p-1 rounded-full transition-colors backdrop-blur-sm z-10"
                        aria-label="Close ad"
                    >
                        <X size={16} />
                    </button>

                    {/* Ad Content */}
                    <div className="w-full flex justify-center">
                        {linkUrl ? (
                            <a
                                href={linkUrl}
                                target="_blank"
                                rel="nofollow noopener noreferrer"
                                className="block hover:opacity-95 transition-opacity w-full flex justify-center"
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
