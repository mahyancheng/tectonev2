// src/pages/AdminDashboard.tsx
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Head } from "vite-react-ssg";

import { useContent, BlogPost } from "@/contexts/ContentContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import { PlusCircle, Edit, Trash2, FileText, ArrowLeft } from "lucide-react";

/* ---------- CreatePostForm (Title 与 URL 分离) ---------- */
function CreatePostForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (payload: {
    id: string; // URL slug（Firestore 文档 ID）
    title: string;
    content: string;
    excerpt: string;
    author: string;
    imageUrl?: string;
    tags: string[];
    featured?: boolean;
  }) => Promise<void> | void;
  onCancel?: () => void;
}) {
  const [urlId, setUrlId] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>("");

  const tags = useMemo(
    () => (tagsInput || "").split(",").map((t) => t.trim()).filter(Boolean),
    [tagsInput]
  );

  const slugPreview = useMemo(() => {
    if (!urlId) return "";
    return urlId
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-_]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80);
  }, [urlId]);

  const validate = () => {
    if (!urlId.trim()) return "URL (slug) is required.";
    if (!slugPreview)
      return "URL becomes empty after sanitization. Use letters, numbers, hyphens and underscores.";
    if (!title.trim()) return "Title is required.";
    if (!author.trim()) return "Author is required.";
    if (!content.trim()) return "Content is required.";
    if (imageUrl && !/^https?:\/\//i.test(imageUrl))
      return "Image URL must start with http(s)://";
    return "";
  };

  const handleSubmit = async () => {
    const msg = validate();
    if (msg) return setError(msg);

    setSubmitting(true);
    setError("");
    try {
      await onSubmit({
        id: slugPreview,
        title: title.trim(),
        author: author.trim(),
        content: content.trim(),
        excerpt: (excerpt || content.slice(0, 150) + "...").trim(),
        imageUrl: imageUrl || undefined,
        tags,
        featured: false,
      });
    } catch (e: any) {
      setError(e?.message || "Failed to create post.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="urlId" className="text-white/65">
          URL (slug) *
        </Label>
        <Input
          id="urlId"
          value={urlId}
          onChange={(e) => setUrlId(e.target.value)}
          placeholder="e.g. insect-screen-singapore-guide"
        />
        {urlId && (
          <p className="mt-1 text-xs text-white/45">
            Will save as: <span className="font-mono">{slugPreview}</span>
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title" className="text-white/65">
            Title *
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
          />
        </div>
        <div>
          <Label htmlFor="author" className="text-white/65">
            Author *
          </Label>
          <Input
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author name"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="tags" className="text-white/65">
          Tags (comma separated)
        </Label>
        <Input
          id="tags"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="mosquito-screen, singapore, installation"
        />
      </div>

      <div>
        <Label htmlFor="excerpt" className="text-white/65">
          Excerpt
        </Label>
        <Textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={2}
        />
      </div>

      <div>
        <Label htmlFor="content" className="text-white/65">
          Content *
        </Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageUrl" className="text-white/65">
          Cover Image URL
        </Label>
        <Input
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
        {imageUrl ? (
          <div className="mt-3 rounded-xl overflow-hidden border border-slate-200">
            <img
              src={imageUrl}
              alt="Preview"
              className="w-full max-h-60 object-cover"
            />
          </div>
        ) : null}
      </div>

      {error && <p className="text-sm text-rose-500">{error}</p>}

      <div className="flex gap-3">
        <Button
          onClick={handleSubmit}
          disabled={submitting}
          className="bg-amber-400 text-slate-900 hover:bg-amber-300 w-full rounded-full"
        >
          {submitting ? "Creating..." : "Create Post"}
        </Button>

        {onCancel && (
          <Button
            type="button"
            onClick={onCancel}
            disabled={submitting}
            variant="outline"
            className="border-slate-300 text-white/65 hover:bg-slate-100 w-40 rounded-full"
          >
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}

/* ------------------------------ Admin Page ------------------------------- */
export default function AdminDashboard() {
  const {
    blogPosts,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    setFeaturedPost,
  } = useContent();

  const [isAddingPost, setIsAddingPost] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const handleUpdatePost = async () => {
    if (!editingPost) return;

    const tagsArray = Array.isArray(editingPost.tags)
      ? editingPost.tags
      : (editingPost.tags as unknown as string)
          .toString()
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);

    await updateBlogPost(editingPost.id, {
      title: editingPost.title,
      content: editingPost.content,
      excerpt: editingPost.excerpt,
      author: editingPost.author,
      imageUrl: editingPost.imageUrl,
      tags: tagsArray,
    });

    setEditingPost(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Head>
        <title>Admin · Tectone</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Welcome */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-extrabold tracking-tight">
            Welcome to <span className="text-amber-500">Tectone Renex Steel</span>{" "}
            <span className="text-slate-900">Admin</span>
          </h2>
          <p className="text-white/45 text-lg mt-2">
            Manage your blog content to educate customers about insect screens &amp; window mesh.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="rounded-2xl bg-slate-900 text-white shadow-sm ring-1 ring-slate-900/10">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-amber-300 font-semibold">
                    Total Posts
                  </p>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center">
                    <FileText className="w-4 h-4 text-amber-300" />
                  </div>
                </div>
                <div className="mt-3 text-3xl font-bold">{blogPosts.length}</div>
                <p className="text-sm text-slate-300 mt-1">
                  Articles published for SEO & education
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Header + Add button */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold text-slate-900">
            Manage Blog Posts
          </h3>

          <Dialog open={isAddingPost} onOpenChange={setIsAddingPost}>
            <DialogTrigger asChild>
              <Button className="bg-amber-400 text-slate-900 hover:bg-amber-300 rounded-full">
                <PlusCircle className="w-4 h-4 mr-2" />
                Add New Post
              </Button>
            </DialogTrigger>

            <DialogContent
              className="
                max-w-2xl max-h-[85vh] overflow-y-auto bg-white/[0.03] border border-slate-200 text-slate-900
                [&_input]:text-slate-900 [&_textarea]:text-slate-900
                [&_input]:bg-white/[0.03] [&_textarea]:bg-white
                [&_input]:placeholder:text-slate-400 [&_textarea]:placeholder:text-slate-400
                [&_input]:border-slate-300 [&_textarea]:border-slate-300
                [&_input:focus]:ring-amber-400 [&_textarea:focus]:ring-amber-400
                rounded-2xl
              "
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <DialogHeader>
                <DialogTitle className="text-slate-900">
                  Create New Blog Post
                </DialogTitle>
              </DialogHeader>

              <CreatePostForm
                onSubmit={async (payload) => {
                  await addBlogPost(payload);
                  setIsAddingPost(false);
                }}
                onCancel={() => setIsAddingPost(false)}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Posts list */}
        <div className="grid gap-4">
          {blogPosts.map((post) => (
            <Card key={post.id} className="bg-white/[0.03] border border-slate-200 rounded-2xl">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <CardTitle className="text-lg text-slate-900">
                      {post.title}
                    </CardTitle>
                    <p className="text-sm text-white/45">
                      by {post.author} •{" "}
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString()
                        : "Draft"}
                      {" "}
                      • <span className="font-mono text-xs text-slate-400">/{post.id}</span>
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {(post.tags || []).map((tag) => (
                        <Badge
                          key={tag}
                          className="text-xs bg-amber-100 text-amber-700 border border-amber-200"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {/* Edit */}
                    <Dialog
                      open={editingPost?.id === post.id}
                      onOpenChange={(open) => setEditingPost(open ? post : null)}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-slate-300 text-white/65 hover:bg-slate-100 rounded-full"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>

                      <DialogContent
                        className="
                          max-w-2xl max-h-[80vh] overflow-y-auto bg-white/[0.03] border border-slate-200 text-slate-900
                          [&_input]:text-slate-900 [&_textarea]:text-slate-900
                          [&_input]:bg-white/[0.03] [&_textarea]:bg-white
                          [&_input]:placeholder:text-slate-400 [&_textarea]:placeholder:text-slate-400
                          [&_input]:border-slate-300 [&_textarea]:border-slate-300
                          [&_input:focus]:ring-amber-400 [&_textarea:focus]:ring-amber-400
                          rounded-2xl
                        "
                      >
                        <DialogHeader>
                          <DialogTitle className="text-slate-900">
                            Edit Blog Post
                          </DialogTitle>
                        </DialogHeader>

                        {editingPost && (
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="edit-title" className="text-white/65">
                                Title
                              </Label>
                              <Input
                                id="edit-title"
                                value={editingPost.title || ""}
                                onChange={(e) =>
                                  setEditingPost((p) =>
                                    p ? { ...p, title: e.target.value } : null
                                  )
                                }
                              />
                            </div>

                            <div>
                              <Label htmlFor="edit-author" className="text-white/65">
                                Author
                              </Label>
                              <Input
                                id="edit-author"
                                value={editingPost.author || ""}
                                onChange={(e) =>
                                  setEditingPost((p) =>
                                    p ? { ...p, author: e.target.value } : null
                                  )
                                }
                              />
                            </div>

                            <div>
                              <Label htmlFor="edit-imageUrl" className="text-white/65">
                                Image URL
                              </Label>
                              <Input
                                id="edit-imageUrl"
                                value={editingPost.imageUrl || ""}
                                onChange={(e) =>
                                  setEditingPost((p) =>
                                    p ? { ...p, imageUrl: e.target.value } : null
                                  )
                                }
                              />
                            </div>

                            <div>
                              <Label htmlFor="edit-tags" className="text-white/65">
                                Tags
                              </Label>
                              <Input
                                id="edit-tags"
                                value={
                                  Array.isArray(editingPost.tags)
                                    ? editingPost.tags.join(", ")
                                    : ((editingPost.tags as unknown as string) || "")
                                }
                                onChange={(e) =>
                                  setEditingPost((p) =>
                                    p
                                      ? {
                                          ...p,
                                          tags: e.target.value
                                            .split(",")
                                            .map((t) => t.trim())
                                            .filter(Boolean),
                                        }
                                      : null
                                  )
                                }
                              />
                            </div>

                            <div>
                              <Label htmlFor="edit-excerpt" className="text-white/65">
                                Excerpt
                              </Label>
                              <Textarea
                                id="edit-excerpt"
                                value={editingPost.excerpt || ""}
                                onChange={(e) =>
                                  setEditingPost((p) =>
                                    p ? { ...p, excerpt: e.target.value } : null
                                  )
                                }
                                rows={2}
                              />
                            </div>

                            <div>
                              <Label htmlFor="edit-content" className="text-white/65">
                                Content
                              </Label>
                              <Textarea
                                id="edit-content"
                                value={editingPost.content || ""}
                                onChange={(e) =>
                                  setEditingPost((p) =>
                                    p ? { ...p, content: e.target.value } : null
                                  )
                                }
                                rows={8}
                              />
                            </div>

                            <Button
                              onClick={handleUpdatePost}
                              className="w-full bg-amber-400 text-slate-900 hover:bg-amber-300 rounded-full"
                            >
                              Update Post
                            </Button>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>

                    {/* Delete */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteBlogPost(post.id)}
                      className="border-slate-300 text-rose-600 hover:bg-rose-50 rounded-full"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>

                    {/* Set Featured */}
                    <Button
                      variant={post.featured ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFeaturedPost(post.id)}
                      className={
                        post.featured
                          ? "bg-amber-400 text-slate-900 hover:bg-amber-300 rounded-full"
                          : "border-slate-300 text-amber-700 hover:bg-amber-50 rounded-full"
                      }
                    >
                      {post.featured ? "Featured" : "Set Featured"}
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-white/65">{post.excerpt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
