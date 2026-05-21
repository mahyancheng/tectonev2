// src/pages/BlogPostDetail.tsx
import React, { useMemo } from "react";
import { Head } from "vite-react-ssg";
import { Link, useParams } from "react-router-dom";
import { useContent } from "@/contexts/ContentContext";
import DesignedPostBody from "@/components/DesignedPostBody";
import NotFound from "./NotFound";

function htmlToPlainText(html?: string, limit?: number) {
  if (!html) return "";
  const text = html.replace(/<[^>]+>/g, "");
  if (limit && text.length > limit) return text.slice(0, limit) + "…";
  return text;
}

const SITE_URL = "https://tectonesteel.com";
const LOGO_URL = `${SITE_URL}/images/logo/logo-schema.webp`;

const BlogPostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { blogPosts } = useContent();

  const post = useMemo(
    () => blogPosts.find((p) => p.id === slug),
    [blogPosts, slug]
  );

  // ✅ 相关帖子先算好（避免 render 抖动）
  const related = useMemo(() => {
    if (!post) return [];
    return blogPosts.filter((p) => p.id !== post.id).slice(0, 3);
  }, [blogPosts, post]);

  // ✅ 让页面先占满高度，footer 不会抢跑
  // 72px 只是估算 navbar 高度，你可以按你项目实际改：例如 64 / 80 / 96
  const PageShell = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-[calc(100vh-72px)]">{children}</div>
  );

  // 404（真实内容不存在）
 if (!post) {
  return <NotFound />;
}

  const seoDescription = post.excerpt
    ? htmlToPlainText(post.excerpt, 160)
    : htmlToPlainText(post.content, 160);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: seoDescription,
    image: post.imageUrl ? [post.imageUrl] : undefined,
    author: {
      "@type": "Organization",
      name: "Tectone Renex Steel Pte Ltd",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Tectone Renex Steel Pte Ltd",
      logo: { "@type": "ImageObject", url: LOGO_URL },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${slug}`,
    },
  };

  return (
    <PageShell>
      <Head>
        <title>{post.title} | Tectone Renex Steel Blog</title>
        <meta name="description" content={seoDescription} />

        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content={`${post.title} | Tectone Renex Steel`}
        />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:site_name" content="Tectone Renex Steel Pte Ltd" />
        <meta property="og:url" content={`${SITE_URL}/blog/${slug}`} />
        {post.imageUrl && <meta property="og:image" content={post.imageUrl} />}

        <link rel="canonical" href={`${SITE_URL}/blog/${slug}`} />

        {/* ✅ 只 preload 封面图（不会造成 CLS，但可加速首屏） */}
        {post.imageUrl && <link rel="preload" as="image" href={post.imageUrl} />}

        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Head>

      <article className="py-12">
        <div className="container mx-auto px-4">
          {/* ✅ Cover：固定高度 + 背景占位，避免图片到位时抖动 */}
          <div className="rounded-lg overflow-hidden shadow-md mb-8 bg-white/[0.03]">
            {post.imageUrl ? (
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover"
                loading="eager"
                decoding="async"
              />
            ) : (
              <div className="w-full h-64 md:h-96" aria-label={post.title} />
            )}
          </div>

          <div className="max-w-3xl mx-auto">
            {/* Meta */}
            <div className="flex items-center gap-3 mb-3">
              {post.tags?.[0] && (
                <span className="bg-white/10 text-white text-xs font-semibold px-2.5 py-1 rounded">
                  {post.tags[0]}
                </span>
              )}
              <span className="text-white/45 text-xs">
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString()
                  : "Draft"}
              </span>
              {post.author && (
                <span className="text-white/45 text-xs">· {post.author}</span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {post.title}
            </h1>

            {(post.excerpt || post.content) && (
              <p className="text-white/55 mb-8">
                {htmlToPlainText(post.excerpt || post.content, 220)}
              </p>
            )}

            {/* ✅ Body：给最小高度，避免正文（尤其含图片）注入时把 footer 往下推 */}
            <div className="mt-12 min-h-[700px]">
              <DesignedPostBody html={post.content} />
            </div>

            {/* ✅ Related：不要用 cv-auto（或给固定占位高度） */}
            {related.length > 0 && (
              <section className="mt-16">
                <h3 className="text-xl font-semibold mb-4">
                  You might also like
                </h3>

                {/* ✅ 预留一个最小高度，避免 related 卡片图片加载时撑开导致 CLS */}
                <div className="min-h-[260px]">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {related.map((rp) => (
                      <Link
                        key={rp.id}
                        to={`/blog/${rp.id}`}
                        className="group rounded-lg overflow-hidden border border-border bg-white/[0.03] hover:shadow-md transition"
                      >
                        {rp.imageUrl ? (
                          <img
                            src={rp.imageUrl}
                            alt={rp.title}
                            className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                            decoding="async"
                          />
                        ) : (
                          <div className="h-40 w-full bg-white/[0.03]" />
                        )}

                        <div className="p-4">
                          {rp.tags?.[0] && (
                            <span className="bg-white/10 text-white text-[11px] font-semibold px-2 py-0.5 rounded">
                              {rp.tags[0]}
                            </span>
                          )}
                          <h4 className="mt-2 font-semibold">{rp.title}</h4>
                          {(rp.excerpt || rp.content) && (
                            <p className="text-sm text-white/55 mt-1 line-clamp-2">
                              {htmlToPlainText(rp.excerpt || rp.content, 110)}
                            </p>
                          )}
                          <span className="mt-3 inline-flex items-center text-white text-sm">
                            Read More →
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            )}

            <div className="mt-10">
              <Link to="/blog" className="text-white underline">
                ← Back to Blog
              </Link>
            </div>
          </div>
        </div>
      </article>
    </PageShell>
  );
};

export default BlogPostDetail;
