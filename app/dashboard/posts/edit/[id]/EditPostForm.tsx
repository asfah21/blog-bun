"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Input,
  Button,
  Textarea,
  Switch,
  Card,
  CardBody,
  Spinner,
} from "@heroui/react";
import { ArrowLeft, Save } from "lucide-react";
import axios from "axios";

export default function EditPostForm({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    description: "",
    metaTitle: "",
    metaDescription: "",
    category: "",
    tags: "",
    link: "",
    buy: "",
    published: false,
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/dashboard/posts/${id}`);
        const post = res.data;

        setFormData({
          title: post.title || "",
          slug: post.slug || "",
          content: post.content || "",
          description: post.description || "",
          metaTitle: post.metaTitle || "",
          metaDescription: post.metaDescription || "",
          category: post.category || "",
          tags: post.tags ? post.tags.join(", ") : "",
          link: post.link || "",
          buy: post.buy || "",
          published: post.published || false,
        });
      } catch (err: any) {
        setError(err.response?.data?.error || "Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (name: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const payload = {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };

      await axios.put(`/api/dashboard/posts/${id}`, payload);
      router.push("/dashboard/posts");
      router.refresh();
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to update post");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center gap-4 mb-6">
        <Button isIconOnly variant="light" onPress={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold">Edit Post</h1>
      </div>

      <Card>
        <CardBody className="gap-6">
          {error && (
            <div className="bg-danger-50 text-danger p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                isRequired
                label="Title"
                labelPlacement="outside-top"
                placeholder="Enter post title"
                value={formData.title}
                onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                  e.target.style.outline = "none";
                }}
                onValueChange={(val) => handleChange("title", val)}
              />
              <Input
                isRequired
                label="Slug"
                labelPlacement="outside-top"
                placeholder="post-slug-url"
                value={formData.slug}
                onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                  e.target.style.outline = "none";
                }}
                onValueChange={(val) => handleChange("slug", val)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Category"
                labelPlacement="outside-top"
                placeholder="e.g. Technology"
                value={formData.category}
                onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                  e.target.style.outline = "none";
                }}
                onValueChange={(val) => handleChange("category", val)}
              />
              <Input
                label="Tags"
                labelPlacement="outside-top"
                placeholder="Comma separated tags"
                value={formData.tags}
                onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                  e.target.style.outline = "none";
                }}
                onValueChange={(val) => handleChange("tags", val)}
              />
            </div>

            <Textarea
              label="Description"
              labelPlacement="outside-top"
              placeholder="Short description"
              value={formData.description}
              onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                e.target.style.outline = "none";
              }}
              onValueChange={(val) => handleChange("description", val)}
            />

            <Textarea
              className="min-h-[200px]"
              label="Content"
              labelPlacement="outside-top"
              minRows={10}
              placeholder="Post content (Markdown/HTML)"
              value={formData.content}
              onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                e.target.style.outline = "none";
              }}
              onValueChange={(val) => handleChange("content", val)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Textarea
                label="Download Link"
                labelPlacement="outside-top"
                placeholder="https://..."
                value={formData.link}
                onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                  e.target.style.outline = "none";
                }}
                onValueChange={(val) => handleChange("link", val)}
              />
              <Textarea
                label="Buy Link"
                labelPlacement="outside-top"
                placeholder="https://..."
                value={formData.buy}
                onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                  e.target.style.outline = "none";
                }}
                onValueChange={(val) => handleChange("buy", val)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Meta Title"
                labelPlacement="outside-top"
                placeholder=" SEO Title"
                value={formData.metaTitle}
                onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                  e.target.style.outline = "none";
                }}
                onValueChange={(val) => handleChange("metaTitle", val)}
              />
              <Input
                label="Meta Description"
                labelPlacement="outside-top"
                placeholder="SEO Description"
                value={formData.metaDescription}
                onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                  e.target.style.outline = "none";
                }}
                onValueChange={(val) => handleChange("metaDescription", val)}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-default-100 rounded-lg">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Publish Status</span>
                <span className="text-xs text-default-500">
                  Enable to make this post visible to the public
                </span>
              </div>
              <Switch
                isSelected={formData.published}
                onValueChange={(val) => handleChange("published", val)}
              />
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <Button
                color="danger"
                variant="flat"
                onPress={() => router.back()}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                isLoading={saving}
                startContent={!saving && <Save className="w-4 h-4" />}
                type="submit"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
