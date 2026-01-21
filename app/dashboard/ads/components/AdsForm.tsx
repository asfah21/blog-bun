"use client";

import { upsertAd } from "@/app/actions/ads";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface AdsFormProps {
    position: string;
    initialData?: {
        imageUrl: string;
        linkUrl: string | null;
        isActive: boolean;
    } | null;
    previewMaxWidth?: string;
}

export default function AdsForm({ position, initialData, previewMaxWidth = "160px" }: AdsFormProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        imageUrl: initialData?.imageUrl || "",
        linkUrl: initialData?.linkUrl || "",
        isActive: initialData?.isActive ?? true,
    });
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const res = await upsertAd(position, {
            imageUrl: formData.imageUrl,
            linkUrl: formData.linkUrl || undefined,
            isActive: formData.isActive,
        });

        if (res.success) {
            setMessage("Saved successfully!");
        } else {
            setMessage("Failed to save.");
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-neutral-800 p-4 rounded-lg border border-neutral-200 dark:border-neutral-700">
            <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-600 bg-transparent"
                    placeholder="https://..."
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Link URL (Optional)</label>
                <input
                    type="text"
                    value={formData.linkUrl}
                    onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-600 bg-transparent"
                    placeholder="https://..."
                />
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id={`active-${position}`}
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="rounded border-gray-300"
                />
                <label htmlFor={`active-${position}`} className="text-sm">Active</label>
            </div>

            {/* Preview */}
            {formData.imageUrl && (
                <div className="mt-4">
                    <p className="text-xs text-neutral-500 mb-1">Preview:</p>
                    <div className="border border-dashed border-neutral-300 p-2 flex justify-center bg-neutral-100 dark:bg-neutral-900">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={formData.imageUrl}
                            alt="Preview"
                            className="h-auto object-contain"
                            style={{ maxWidth: previewMaxWidth }}
                        />
                    </div>
                </div>
            )}

            <div className="flex items-center justify-between pt-2">
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                >
                    {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                    Save Changes
                </button>
                {message && <span className="text-sm text-green-600">{message}</span>}
            </div>
        </form>
    );
}
