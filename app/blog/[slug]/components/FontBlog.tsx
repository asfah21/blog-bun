"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, Input, Button, Tooltip } from "@heroui/react";
import {
  MagnifyingGlassIcon,
  ArrowPathIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";

import { downloadFont, getFontPreview } from "@/app/actions/font";

type FontVariant = {
  name: string;
  file: string;
};

type Font = {
  name: string;
  variants: FontVariant[];
};

interface FontBlogProps {
  post?: {
    title: string;
    slug: string;
    link?: string | null;
  };
}

export default function FontBlog({ post }: FontBlogProps) {
  const [previewText, setPreviewText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [downloading, setDownloading] = useState<boolean>(false);
  const [fontUrl, setFontUrl] = useState<string | null>(null);
  const [fontError, setFontError] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState<number>(75);
  const [textColor, setTextColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");

  // Load font preview data
  useEffect(() => {
    let isMounted = true;
    const fetchFont = async () => {
      if (!post?.link) {
        setLoading(false);

        return;
      }
      try {
        setLoading(true);
        const res = await getFontPreview(post.link);

        if (isMounted) {
          if (res.success && res.url) {
            setFontUrl(res.url);
          } else {
            setFontError(res.error || "Failed to load font");
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchFont();

    return () => {
      isMounted = false;
    };
  }, [post?.link]);

  // Construct font object only if we have a loaded URL
  const font: Font | null =
    post && fontUrl
      ? {
          name: post.title,
          variants: [
            {
              name: post.title,
              file: fontUrl,
            },
          ],
        }
      : null;

  // Initialize colors based on theme
  useEffect(() => {
    // Function to update colors based on theme
    const updateColors = (isDark: boolean) => {
      if (isDark) {
        setBackgroundColor("#0c0c0cff");
        setTextColor("#ffffff");
      } else {
        setBackgroundColor("#ffffff");
        setTextColor("#000000");
      }
    };

    // Check initial theme
    const isDark = document.documentElement.classList.contains("dark");

    updateColors(isDark);

    // Observer for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const isDarkNow = document.documentElement.classList.contains("dark");

          updateColors(isDarkNow);
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  const resetSettings = () => {
    setFontSize(55);
    setPreviewText("");
    const isDark = document.documentElement.classList.contains("dark");

    if (isDark) {
      setBackgroundColor("#000000");
      setTextColor("#ffffff");
    } else {
      setBackgroundColor("#ffffff");
      setTextColor("#000000");
    }
  };

  const handleDownload = async () => {
    if (!post?.link || !post?.slug) return;
    try {
      setDownloading(true);
      const res = await downloadFont(post.link, post.slug);

      if (res.success && res.data) {
        // Create a blob from base64
        const byteCharacters = atob(res.data);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: res.type });

        // Trigger download
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        // Try to guess extension or default to zip/ttf based on mime?
        // We'll trust the user wants the file name from title or link
        const extension = post.link.split(".").pop() || "zip";

        link.download = `${post.slug}.${extension}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        alert("Failed to download: " + res.error);
      }
    } catch (error) {
      console.error(error);
      alert("Download error");
    } finally {
      setDownloading(false);
    }
  };

  if (!font) return null;

  return (
    <div className="w-full max-w-screen-2xl">
      <Card
        className="w-full bg-background/60 dark:bg-default-100/50 backdrop-blur-lg border border-default-200 p-2 md:p-5"
        radius="lg"
        shadow="sm"
      >
        <div className="flex flex-col gap-6">
          {/* Toolbar */}
          <div className="flex flex-wrap md:flex-nowrap gap-4 items-center bg-default-100/50 p-2 md:p-3 rounded-xl justify-between">
            <div className="w-full md:w-64 lg:w-80">
              <Input
                classNames={{
                  inputWrapper: "bg-default-200/50 shadow-none",
                }}
                placeholder="Type your own text..."
                size="md"
                startContent={
                  <MagnifyingGlassIcon className="w-4 h-3 text-default-400" />
                }
                value={previewText}
                onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                  e.target.style.outline = "none";
                }}
                onValueChange={setPreviewText}
              />
            </div>

            <div className="flex-1 flex justify-center px-4 min-w-[30%]">
              <div className="flex items-center gap-3 w-full max-w-[150px]">
                <input
                  className="w-full h-1.5 bg-default-300 rounded-lg appearance-none cursor-pointer accent-primary"
                  max={200}
                  min={20}
                  type="range"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="flex items-center gap-4 md:gap-6 flex-none justify-end">
              <div className="flex items-center gap-3">
                <div className="flex flex-col gap-1 items-center">
                  <div className="relative overflow-hidden w-6 h-6 rounded-md border border-default-300 cursor-pointer shadow-sm hover:scale-105 transition-transform bg-white">
                    <input
                      className="absolute -top-2 -left-2 w-[200%] h-[200%] cursor-pointer p-0 border-0"
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1 items-center">
                  <div className="relative overflow-hidden w-6 h-6 rounded-md border border-default-300 cursor-pointer shadow-sm hover:scale-105 transition-transform bg-black">
                    <input
                      className="absolute -top-2 -left-2 w-[200%] h-[200%] cursor-pointer p-0 border-0"
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="h-6 w-px bg-default-300 hidden md:block" />

              <div className="flex items-center gap-1">
                <Tooltip content="Reset Settings">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onPress={resetSettings}
                  >
                    <ArrowPathIcon className="w-5 h-5 text-default-500" />
                  </Button>
                </Tooltip>
                <Tooltip content="Share">
                  <Button isIconOnly size="sm" variant="light">
                    <ShareIcon className="w-5 h-5 text-default-500" />
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>

          {/* Font Grid */}
          <div className="grid grid-cols-1 gap-6">
            {loading ? (
              Array.from({ length: 1 }).map((_, i) => (
                <div
                  key={i}
                  className="h-40 w-full animate-pulse rounded-xl bg-default-100/50"
                />
              ))
            ) : (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="group relative overflow-hidden rounded-xl bg-content1 shadow-sm transition-all hover:shadow-md hover:border-primary/50"
                initial={{ opacity: 0, y: 10 }}
              >
                <style>{`
                  @font-face {
                    font-family: "${font.name}";
                    src: url("${font.variants[0].file}");
                  }
                `}</style>

                <div className="p-4 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-default-100 rounded-md text-xs font-medium text-default-600 border border-default-200">
                        {font.name}
                      </span>
                    </div>

                    {/* <Button
                                            color="primary"
                                            isLoading={downloading}
                                            size="sm"
                                            startContent={
                                                !downloading && <ArrowDownTrayIcon className="w-4 h-4" />
                                            }
                                            variant="flat"
                                            onPress={handleDownload}
                                        >
                                            {downloading ? "Downloading..." : "Download"}
                                        </Button> */}
                  </div>

                  <div
                    className="w-full overflow-hidden text-ellipsis whitespace-nowrap py-4 px-4 rounded-lg transition-colors border border-dashed border-default-300"
                    style={{
                      fontFamily: `"${font.name}", sans-serif`,
                      fontSize: `${fontSize}px`,
                      color: textColor,
                      backgroundColor: backgroundColor,
                    }}
                  >
                    {previewText || font.name}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
