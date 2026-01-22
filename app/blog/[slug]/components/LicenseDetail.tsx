"use client";

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

export default function LicenseDetail({ post }: HowToGetProps) {
  return (
    <section className="space-y-4 !mt-4">
      <p>It is simple to embed for use on the web by:</p>
      <ul className="list-none mt-1 space-y-1.5 ml-2 text-sm leading-relaxed">
        <li className="flex gap-3 items-start">
          <span className="mt-0.5 h-4.5 w-4.5 shrink-0 rounded-full bg-primary/15 text-primary/80 dark:bg-primary/20 flex items-center justify-center text-[10px] font-semibold">
            1
          </span>
          <p className="m-0">
            For fast global loading, include a{" "}
            <code className="px-1.5 py-0.5 rounded bg-black/30 border border-white/10">
              &lt;tag&gt;
            </code>{" "}
            in your HTML head.
          </p>
        </li>
        <li className="flex gap-3 items-start">
          <span className="mt-0.5 h-4.5 w-4.5 shrink-0 rounded-full bg-primary/15 text-primary/80 dark:bg-primary/20 flex items-center justify-center text-[10px] font-semibold">
            2
          </span>
          <p className="m-0">
            For optimal performance, place{" "}
            <code className="px-1.5 py-0.5 rounded bg-black/30 border border-white/10">
              @import
            </code>{" "}
            @at the top of your CSS.
          </p>
        </li>
        <li className="flex gap-3 items-start">
          <span className="mt-0.5 h-4.5 w-4.5 shrink-0 rounded-full bg-primary/15 text-primary/80 dark:bg-primary/20 flex items-center justify-center text-[10px] font-semibold">
            3
          </span>
          <p className="m-0">
            Define a unique{" "}
            <code className="px-1.5 py-0.5 rounded bg-black/30 border border-white/10">
              @font-face
            </code>{" "}
            for font-display control, fallbacks, and formats.
          </p>
        </li>
      </ul>

      <div className="rounded-lg border border-neutral-300 dark:border-white/10 bg-neutral-50/80 dark:bg-white/[0.04] p-4 text-sm leading-relaxed">
        <h3 className="text-base md:text-lg font-semibold !mt-0">
          Details of the License{" "}
        </h3>
        <p className="mt-2">
          Although <strong>{post.title}</strong> is frequently offered as a free
          font, before using it for commercial purposes, make sure to review the
          license terms from the source. While some websites offer the complete
          license for free, others charge a nominal price for commercial use.
        </p>
        <p className="mt-1.5">
          Either way, you&apos;ll get a professional-grade font with outstanding
          kerning, flowing vectors, and consistent baseline alignment—perfect
          for projects like product packaging, digital ads, and printed
          materials for both you and your clients.
        </p>
      </div>
    </section>
  );
}
