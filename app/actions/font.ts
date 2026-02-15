"use server";

import AdmZip from "adm-zip";

import { incrementDownloadCount } from "./tracking";

export async function getFontPreview(url: string) {
  if (!url) return { success: false, error: "No URL provided" };

  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error("Failed to fetch font source");

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let fontBuffer: Buffer | null = null;
    let mimeType = "application/octet-stream";

    // Simple check for ZIP magic bytes (PK..) or extension
    const isZip =
      url.toLowerCase().endsWith(".zip") ||
      (buffer[0] === 0x50 && buffer[1] === 0x4b);

    const fonts: { name: string; url: string }[] = [];

    if (isZip) {
      const zip = new AdmZip(buffer);
      const entries = zip.getEntries();

      // Find all font files
      const fontEntries = entries.filter(
        (e: any) =>
          /\.(ttf|otf|woff|woff2)$/i.test(e.entryName) &&
          !e.entryName.startsWith("__MACOSX") &&
          !e.isDirectory,
      );

      // Group by filename without extension to deduplicate variants (e.g. .ttf vs .otf)
      const uniqueFontsMap = new Map<string, any[]>();

      for (const entry of fontEntries) {
        // Remove extension
        let baseName = entry.name.replace(/\.[^/.]+$/, "");

        // Heuristic: Remove generated ID suffixes like "-BF652373a5f0580"
        // Looks for a hyphen followed by 8 or more alphanumeric characters at the end
        baseName = baseName.replace(/-[a-zA-Z0-9]{8,}$/, "");

        if (!uniqueFontsMap.has(baseName)) {
          uniqueFontsMap.set(baseName, []);
        }
        uniqueFontsMap.get(baseName)?.push(entry);
      }

      for (const variants of uniqueFontsMap.values()) {
        // Prioritize extensions: otf > ttf > woff2 > woff
        variants.sort((a, b) => {
          const getScore = (name: string) => {
            const ext = name.split(".").pop()?.toLowerCase();

            if (ext === "otf") return 4;
            if (ext === "ttf") return 3;
            if (ext === "woff2") return 2;
            if (ext === "woff") return 1;

            return 0;
          };

          return getScore(b.name) - getScore(a.name);
        });

        const entry = variants[0];
        const fontBuffer = entry.getData();
        const ext = entry.entryName.split(".").pop()?.toLowerCase();
        let mimeType = "application/octet-stream";

        if (ext === "ttf") mimeType = "font/ttf";
        else if (ext === "otf") mimeType = "font/otf";
        else if (ext === "woff") mimeType = "font/woff";
        else if (ext === "woff2") mimeType = "font/woff2";

        const base64 = fontBuffer.toString("base64");

        // Use entry name (filename) as the variant name
        fonts.push({
          name: entry.name,
          url: `data:${mimeType};base64,${base64}`,
        });
      }
    } else {
      // Assume it's a direct font file
      fontBuffer = buffer;
      const ext = url.split(".").pop()?.toLowerCase();

      if (ext === "ttf") mimeType = "font/ttf";
      else if (ext === "otf") mimeType = "font/otf";
      else if (ext === "woff") mimeType = "font/woff";
      else if (ext === "woff2") mimeType = "font/woff2";

      const fileName = url.split("/").pop() || "font";
      const base64 = fontBuffer.toString("base64");

      fonts.push({
        name: fileName,
        url: `data:${mimeType};base64,${base64}`,
      });
    }

    if (fonts.length === 0) {
      return { success: false, error: "No executable font found" };
    }

    return { success: true, fonts };
  } catch (error: any) {
    console.error("Preview Font Error:", error);

    return { success: false, error: error.message };
  }
}

export async function downloadFont(url: string, slug: string) {
  if (!url) throw new Error("No URL provided");

  try {
    // 1. Fetch file server-side
    const response = await fetch(url);

    if (!response.ok)
      throw new Error(`Failed to fetch font file: ${response.statusText}`);

    // 2. Increment tracking count
    if (slug) {
      await incrementDownloadCount(slug);
    }

    // 3. Convert to base64
    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const contentType =
      response.headers.get("content-type") || "application/octet-stream";

    return { success: true, data: base64, type: contentType };
  } catch (error: any) {
    console.error("Download Font Error:", error);

    return { success: false, error: error.message };
  }
}
