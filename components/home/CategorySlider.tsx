"use client";

import { ScrollShadow } from "@heroui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode, useState } from "react";

export interface Category {
  name: string;
  id: string;
  link?: string;
  icon?: ReactNode;
  count?: number;
}

const FALLBACK_CATEGORIES: Category[] = [
  {
    name: "Serif",
    id: "serif",
    link: "/category/serif",
  },
  {
    name: "Script",
    id: "script",
    link: "/category/script",
  },
  {
    name: "Display",
    id: "display",
    link: "/category/display",
  },
  {
    name: "Family",
    id: "family",
    link: "/category/family",
  },
  {
    name: "Duo",
    id: "duo",
    link: "/category/duo",
  },
  {
    name: "Typeface",
    id: "typeface",
    link: "/category/typeface",
  },
  {
    name: "Handwritten",
    id: "handwritten",
    link: "/category/handwritten",
  },
  {
    name: "Signature",
    id: "signature",
    link: "/category/signature",
  },
  {
    name: "Brush",
    id: "brush",
    link: "/category/brush",
  },
  {
    name: "Calligraphy",
    id: "calligraphy",
    link: "/category/calligraphy",
  },
];

export default function CategorySlider({
  initialCategories,
}: {
  initialCategories?: Category[];
}) {
  const [categories, setCategories] = useState<Category[]>(() => {
    if (initialCategories && initialCategories.length > 0) {
      return initialCategories.map((dbCat) => {
        const fallback = FALLBACK_CATEGORIES.find(
          (f) => f.name.toLowerCase() === dbCat.name.toLowerCase(),
        );

        return {
          ...dbCat,
          icon: fallback?.icon || dbCat.icon,
          link: fallback?.link || dbCat.link,
        };
      });
    }

    return FALLBACK_CATEGORIES;
  });

  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className="px-6 md:px-20 flex flex-col items-center justify-center pb-1"
      initial={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="w-full max-w-screen-2xl px-6">
        <ScrollShadow
          hideScrollBar
          className="w-full py-4"
          offset={10}
          orientation="horizontal"
        >
          <div className="flex w-max space-x-16 px-2 items-center">
            {categories.map((category) => (
              <Link
                key={category.id}
                className="group flex items-center gap-2 text-small font-small text-default-500 hover:text-foreground transition-colors cursor-pointer select-none"
                href={category.link || "#"}
              >
                {category.icon && (
                  <span className="text-xl group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </span>
                )}
                <span className="relative">
                  {category.name}
                  {/* Animated underline on hover */}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-foreground transition-all duration-300 group-hover:w-full rounded-full" />
                </span>
              </Link>
            ))}
          </div>
        </ScrollShadow>
      </div>
    </motion.section>
  );
}
