'use server'

import AdmZip from "adm-zip";
import { incrementDownloadCount } from './tracking'

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
        const isZip = url.toLowerCase().endsWith(".zip") ||
            (buffer[0] === 0x50 && buffer[1] === 0x4B);

        if (isZip) {
            const zip = new AdmZip(buffer);
            const entries = zip.getEntries();
            // Find first font file
            const fontEntry = entries.find(e =>
                /\.(ttf|otf|woff|woff2)$/i.test(e.entryName) && !e.entryName.startsWith("__MACOSX")
            );

            if (fontEntry) {
                fontBuffer = fontEntry.getData();
                const ext = fontEntry.entryName.split('.').pop()?.toLowerCase();
                if (ext === "ttf") mimeType = "font/ttf";
                else if (ext === "otf") mimeType = "font/otf";
                else if (ext === "woff") mimeType = "font/woff";
                else if (ext === "woff2") mimeType = "font/woff2";
            }
        } else {
            // Assume it's a direct font file
            fontBuffer = buffer;
            const ext = url.split('.').pop()?.toLowerCase();
            if (ext === "ttf") mimeType = "font/ttf";
            else if (ext === "otf") mimeType = "font/otf";
            else if (ext === "woff") mimeType = "font/woff";
            else if (ext === "woff2") mimeType = "font/woff2";
        }

        if (!fontBuffer) {
            return { success: false, error: "No executable font found" };
        }

        const base64 = fontBuffer.toString("base64");
        return { success: true, url: `data:${mimeType};base64,${base64}` };

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
        if (!response.ok) throw new Error(`Failed to fetch font file: ${response.statusText}`);

        // 2. Increment tracking count
        if (slug) {
            await incrementDownloadCount(slug);
        }

        // 3. Convert to base64
        const arrayBuffer = await response.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString('base64');
        const contentType = response.headers.get("content-type") || "application/octet-stream";

        return { success: true, data: base64, type: contentType };
    } catch (error: any) {
        console.error("Download Font Error:", error);
        return { success: false, error: error.message };
    }
}
