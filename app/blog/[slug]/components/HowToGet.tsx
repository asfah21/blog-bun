"use client";

import { PackageOpen, Download, ListChecks, BadgeCheck } from "lucide-react";
import { useState, useEffect } from "react";

import {
  incrementDownloadCount,
  incrementBuyCount,
} from "@/app/actions/tracking";

interface HowToGetProps {
  post: {
    slug: string;
    title: string;
    link?: string | null;
    buy?: string | null;
    category?: string | null;
    downloadCount?: number;
    buyCount?: number;
  };
}

export default function HowToGet({ post }: HowToGetProps) {
  const [downloadCount, setDownloadCount] = useState(post.downloadCount || 0);
  const [buyCount, setBuyCount] = useState(post.buyCount || 0);
  const [fakeDownloadHref, setFakeDownloadHref] = useState("#");
  const [fakeBuyHref, setFakeBuyHref] = useState("#");

  useEffect(() => {
    const updateFakeHrefs = () => {
      const randomStr1 = Math.random().toString(36).substring(7);
      const randomStr2 = Math.random().toString(36).substring(7);

      setFakeDownloadHref(`/download-font/${randomStr1}`);
      setFakeBuyHref(`/buy-font/${randomStr2}`);
    };

    updateFakeHrefs();
    const interval = setInterval(updateFakeHrefs, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleDownload = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (post.link) {
      window.open(post.link, "_blank", "noopener,noreferrer");
      setDownloadCount((prev) => prev + 1);
      await incrementDownloadCount(post.slug);
    }
  };

  const handleBuy = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (post.buy) {
      window.open(post.buy, "_blank", "noopener,noreferrer");
      setBuyCount((prev) => prev + 1);
      await incrementBuyCount(post.slug);
    }
  };

  return (
    <section className="space-y-4 !mt-0 !mb-6">
      <h2 className="inline-flex items-center gap-2">
        <Download className="w-5 h-5 opacity-80" /> How to Download
      </h2>
      <p>
        {" "}
        It&apos;s easy to get the <strong>{post.title}</strong>, and depending
        on the distributor, it can be free for personal use or include a
        commercial license option. While some websites may include it as part of
        a paid font bundle, others may offer it for free.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="rounded-lg border border-neutral-300 dark:border-white/10 bg-neutral-50/80 dark:bg-white/[0.06] backdrop-blur p-4 shadow-sm text-sm leading-relaxed">
          <h3 className="text-base md:text-lg font-semibold inline-flex items-center gap-2 !mt-0">
            <PackageOpen className="w-4 h-4 opacity-80" /> Font Details
          </h3>
          <ul className="mt-2 space-y-1.5 list-disc pl-4">
            <li>File types: OTF, TTF, ZIP archive</li>
            <li>License: Personal or Commercial License</li>
            <li>Downloaded: {downloadCount}x</li>
            {post.buy && <li>Visited: {buyCount}x</li>}
          </ul>
        </div>

        <div className="rounded-lg border border-neutral-300 dark:border-white/10 bg-neutral-50/80 dark:bg-white/[0.06] backdrop-blur p-4 shadow-sm text-sm leading-relaxed">
          <h3 className="text-base md:text-lg font-semibold inline-flex items-center gap-2 !mt-0">
            <ListChecks className="w-4 h-4 opacity-80" /> Installation Steps
          </h3>
          <ol className="mt-2 space-y-1.5 list-decimal pl-4">
            <li>Unzip the font package after downloading it.</li>
            <li>
              Choose Install when you right-click the .otf or .ttf file on
              Windows.
            </li>
            <li>
              Double-click the font file on a Mac, then select Install Font.
            </li>
          </ol>
        </div>
      </div>

      <p>
        After installation, creative programs such as Adobe Photoshop,
        Illustrator, Figma, Canva, and even Microsoft Word will automatically
        display the <strong>{post.title}</strong>
      </p>

      <div className="mt-6 text-center flex justify-center gap-2">
        <a
          className="btn inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-xl bg-success text-white hover:bg-success/90 transition-colors shadow-sm ring-1 ring-neutral-200 dark:ring-white/20 cursor-pointer"
          href={fakeDownloadHref}
          rel="noopener noreferrer"
          onClick={handleDownload}
        >
          <Download className="w-4 h-4" />
          <span>Download Font</span>
        </a>

        {post.buy && (
          <a
            className="btn inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors shadow-sm ring-1 ring-neutral-200 dark:ring-white/20 cursor-pointer"
            href={fakeBuyHref}
            rel="noopener noreferrer"
            onClick={handleBuy}
          >
            <BadgeCheck className="w-4 h-4" />
            <span>Buy License</span>
          </a>
        )}
      </div>
    </section>
  );
}
