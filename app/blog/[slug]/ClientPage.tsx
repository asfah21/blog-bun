import { notFound } from "next/navigation";
import { Calendar, User2, Tag } from "lucide-react";

import HowToGet from "./components/HowToGet";
// import ImageSlider from "./components/ImageSlider";
// import BackButton from "./components/BackButton";
import FontBlog from "./components/FontBlog";
import AdsBanner from "./components/AdsBanner";
import AdsFloatingBottom from "./components/AdsFloatingBottom";
import { getAds } from "@/app/actions/ads";

import { prisma } from "@/lib/prisma";
import AdsFlexible from "./components/AdsFlexible";
import LicenseDetail from "./components/LicenseDetail";

export interface BlogClientArticleProps {
  post: {
    id: string;
    title: string;
    createdAt: Date;
    category?: string | null;
    description?: string | null;
    content: string;
    coverImage?: string | null;
    images?: string[] | null;
    authorName?: string | null;
    authorHandle?: string | null;
    authorAvatar?: string | null;
    link?: string | null;
  };
}

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

type Props = { params: { slug: string } };

const sectionImports = [
  () => import("./sections/SectionA"),
  () => import("./sections/SectionB"),
  () => import("./sections/SectionC"),
  // () => import("./sections/SectionD"),
];

function getLastDigitFromid(id: string): number | null {
  for (let i = id.length - 1; i >= 0; i--) {
    const ch = id[i];

    if (ch >= "0" && ch <= "9") {
      return Number(ch);
    }
  }

  return null;
}

function fallbackDigitFromString(id: string): number | null {
  let sum = 0;

  for (let i = 0; i < id.length; i++) sum += id.charCodeAt(i);

  return sum % 10;
}

export default async function ClientPage({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { author: true },
  });

  const { data: ads } = await getAds();
  const topAd = ads?.find((a) => a.position === "top_banner");
  const bottomFloatingAd = ads?.find((a) => a.position === "bottom_floating");
  const contentFlexibleAd = ads?.find((a) => a.position === "content_flexible");

  if (!post) {
    return notFound();
  }
  const date = formatDate(post.createdAt);

  const rawId = String(post.id ?? "");

  if (!rawId) {
    return notFound();
  }

  const len = sectionImports.length;
  const digit =
    getLastDigitFromid(rawId) ?? fallbackDigitFromString(rawId) ?? 0;
  const index = (((digit - 1) % len) + len) % len;

  const mod = await sectionImports[index]();
  const SectionComponent = mod?.default;

  return (
    <>
      <div className="container mx-auto px-4 py-8 text-neutral-800 dark:text-foreground">
        <div className="container mx-auto px-4 py-8 text-neutral-800 dark:text-foreground">
          {/* Main Content */}
          <div className="max-w-[970px] w-full mx-auto">
            {/* Back link */}
            {/* <div className="mb-6">
            <BackButton />
          </div> */}

            {/* Title */}
            <h1 className="mb-5 text-center text-3xl md:text-4xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-600 dark:from-white dark:via-white dark:to-white/70 bg-clip-text text-transparent">
              {post.title}{" "}
              <span className="text-xs font-semibold text-gray-200 dark:text-gray-800">
                [{index}]
              </span>
            </h1>



            {/* Top Ads */}
            <div className="flex justify-center mt-6">
              <AdsBanner imageUrl={topAd?.imageUrl} linkUrl={topAd?.linkUrl} />
            </div>

            {/* Hero image - Constrained width */}
            <div className="mt-8 max-w-3xl mx-auto rounded-xl overflow-hidden border border-neutral-300 dark:border-white/10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)] dark:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)]">
              <div className="relative aspect-[16/9]">
                {post.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    alt={post.title}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                    src={post.coverImage}
                  />
                ) : (
                  <div className="absolute inset-0 p-6 flex items-center justify-center bg-gradient-to-br from-neutral-100 via-neutral-200 to-neutral-300 dark:from-[#0D0F16] dark:via-[#141724] dark:to-[#1A1D2B]">
                    <div className="mx-auto max-w-lg text-center">
                      <p className="text-2xl font-semibold">{post.title}</p>
                      <p className="text-sm text-foreground/70 mt-2">
                        {post.description}
                      </p>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/10 via-neutral-900/5 to-transparent dark:from-black/40 dark:via-black/10 dark:to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Meta - Compact & Centered */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-foreground/70 my-8">
              <div className="flex items-center gap-2">
                {post.author?.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    alt={post.author?.name ?? "Author"}
                    className="h-6 w-6 rounded-full ring-1 ring-neutral-200 dark:ring-white/10 object-cover"
                    src={post.author?.avatar}
                  />
                ) : (
                  <div className="h-6 w-6 rounded-full bg-neutral-200 dark:bg-white/10 ring-1 ring-neutral-200 dark:ring-white/10" />
                )}
                <span className="font-semibold text-foreground/90">
                  {post.author?.name ?? "Creative Font"}
                </span>
              </div>

              <div className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-600" />

              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 opacity-70" />
                <span>{date ?? "General"}</span>
              </div>

              <div className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-600" />

              <div className="flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 opacity-70" />
                <span>{post.category ?? "General"}</span>
              </div>
            </div>

            {/* Content */}
            <article className="prose dark:prose-invert max-w-none mt-10 [&_p]:text-justify [&_li]:text-justify [&_h2]:mt-12 [&_h2]:scroll-mt-24 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h3]:mt-6 [&_h3]:text-xl [&_code]:text-xs space-y-12 [&_a:not(.btn)]:text-primary [&_a:not(.btn):hover]:opacity-90">
              {/* Dynamic (CMS) content */}
              <div
                dangerouslySetInnerHTML={{ __html: post.content }}
                className="text-justify prose max-w-none"
              />

              {/* Structured sections dynamic */}
              {/* <SectionComponent post={post} /> */}

              <FontBlog post={post} />

              {/* <ImageSlider images={post.images ?? []} /> */}

              {post.description && (
                <section>
                  <blockquote className="mt-2 border-l-4 pl-4 text-foreground/80 italic">
                    {post.description}
                  </blockquote>
                </section>
              )}

              <HowToGet post={post} ad={contentFlexibleAd} />
              <AdsFlexible imageUrl={contentFlexibleAd?.imageUrl} linkUrl={contentFlexibleAd?.linkUrl} />
              <LicenseDetail post={post} />
            </article>
          </div>

        </div>

      </div>
      {/* Floating Bottom Ad - Outside container for better fixed positioning behavior */}
      <AdsFloatingBottom
        imageUrl={bottomFloatingAd?.imageUrl}
        linkUrl={bottomFloatingAd?.linkUrl}
      />
    </>
  );
}
