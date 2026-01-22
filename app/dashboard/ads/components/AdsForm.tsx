"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import { upsertAd } from "@/app/actions/ads";

interface AdsFormProps {
  position: string;
  initialData?: {
    imageUrl: string;
    linkUrl: string | null;
    isActive: boolean;
  } | null;
  previewMaxWidth?: string;
}

export default function AdsForm({
  position,
  initialData,
  previewMaxWidth = "160px",
}: AdsFormProps) {
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
    <form
      className="space-y-4 bg-white dark:bg-neutral-800 p-4 rounded-lg border border-neutral-200 dark:border-neutral-700"
      onSubmit={handleSubmit}
    >
      <div>
        <label
          className="block text-sm font-medium mb-1"
          htmlFor={`imageUrl-${position}`}
        >
          Image URL
        </label>
        <input
          required
          className="w-full px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-600 bg-transparent"
          id={`imageUrl-${position}`}
          placeholder="https://..."
          type="text"
          value={formData.imageUrl}
          onChange={(e) =>
            setFormData({ ...formData, imageUrl: e.target.value })
          }
        />
      </div>

      <div>
        <label
          className="block text-sm font-medium mb-1"
          htmlFor={`linkUrl-${position}`}
        >
          Link URL (Optional)
        </label>
        <input
          className="w-full px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-600 bg-transparent"
          id={`linkUrl-${position}`}
          placeholder="https://..."
          type="text"
          value={formData.linkUrl}
          onChange={(e) =>
            setFormData({ ...formData, linkUrl: e.target.value })
          }
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          checked={formData.isActive}
          className="rounded border-gray-300"
          id={`active-${position}`}
          type="checkbox"
          onChange={(e) =>
            setFormData({ ...formData, isActive: e.target.checked })
          }
        />
        <label className="text-sm" htmlFor={`active-${position}`}>
          Active
        </label>
      </div>

      {/* Preview */}
      {formData.imageUrl && formData.isActive && (
        <div className="mt-4">
          <p className="text-xs text-neutral-500 mb-1">Preview:</p>
          <div className="border border-dashed border-neutral-300 p-2 flex justify-center bg-neutral-100 dark:bg-neutral-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Preview"
              className="h-auto object-contain"
              src={formData.imageUrl}
              style={{ maxWidth: previewMaxWidth }}
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-2">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
          disabled={loading}
          type="submit"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          Save Changes
        </button>
        {message && <span className="text-sm text-green-600">{message}</span>}
      </div>
    </form>
  );
}
