// src/pages/BlogPage.tsx
import React, { useMemo } from "react";
import { Head } from "vite-react-ssg";
import { Link } from "react-router-dom";
import { useContent } from "@/contexts/ContentContext";
import DesignedPostBody from "@/components/DesignedPostBody";

const BlogPageSkeleton: React.FC = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="h-10 w-56 bg-white/[0.06] rounded mx-auto mb-4" />
          <div className="h-4 w-[520px] max-w-full bg-white/[0.06] rounded mx-auto" />
        </div>

        {/* Featured skeleton */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 bg-white/[0.03] rounded-lg shadow-md overflow-hidden border border-border">
            <div className="lg:col-span-2">
              <div className="relative w-full aspect-[16/10] bg-white/[0.06]" />
            </div>
            <div className="lg:col-span-3 p-6 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="h-6 w-24 bg-white/[0.06] rounded" />
                <div className="h-4 w-28 bg-white/[0.06] rounded" />
              </div>
              <div className="h-7 w-3/4 bg-white/[0.06] rounded" />
              <div className="h-4 w-full bg-white/[0.06] rounded" />
              <div className="h-4 w-5/6 bg-white/[0.06] rounded" />
              <div className="h-4 w-2/3 bg-white/[0.06] rounded" />
              <div className="mt-4 h-5 w-28 bg-white/[0.06] rounded" />
            </div>
          </div>
        </div>

        {/* Cards skeleton */}
        <section className="cv-auto">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white/[0.03] rounded-lg shadow-md overflow-hidden border border-border"
              >
                <div className="relative w-full aspect-[16/9] bg-white/[0.06]" />
                <div className="p-6 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-20 bg-white/[0.06] rounded" />
                    <div className="h-3 w-24 bg-white/[0.06] rounded" />
                  </div>
                  <div className="h-5 w-3/4 bg-white/[0.06] rounded" />
                  <div className="h-4 w-full bg-white/[0.06] rounded" />
                  <div className="h-4 w-5/6 bg-white/[0.06] rounded" />
                  <div className="h-4 w-2/3 bg-white/[0.06] rounded" />
                  <div className="mt-2 h-4 w-24 bg-white/[0.06] rounded" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

const BlogPage: React.FC = () => {
  const { blogPosts } = useContent();

  // ✅ 注意：SSG build 时通常 blogPosts 可能是空（取决于你数据来源）
  const isLoading = !blogPosts || blogPosts.length === 0;

  const sorted = useMemo(() => {
    return [...(blogPosts || [])].sort((a, b) => {
      const ta = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const tb = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return tb - ta;
    });
  }, [blogPosts]);

  const featured = useMemo(() => {
    const explicit = sorted.find((p) => p.featured);
    return explicit || sorted[0];
  }, [sorted]);

  const others = useMemo(
    () => sorted.filter((p) => p.id !== featured?.id),
    [sorted, featured]
  );

  return (
    <>
      {/* ✅ 统一只用 Head（保证 SSG 写进静态 HTML） */}
      <Head>
        <title>Blog | Tectone Renex Steel</title>
        <meta
          name="description"
          content="High-quality insect screens and mosquito netting solutions in Singapore."
        />
        <meta property="og:title" content="Blog | Tectone Renex Steel" />
        <meta
          property="og:description"
          content="Learn more about insect screens and mosquito nets in Singapore."
        />
        <meta property="og:site_name" content="Tectone Renex Steel Pte Ltd" />
        <link rel="canonical" href="https://tectonesteel.com/blog" />

        {/* ✅ featured 有图才 preload（可选，但保留你的逻辑） */}
        {featured?.imageUrl && (
          <link rel="preload" as="image" href={featured.imageUrl} />
        )}
      </Head>

      {/* ✅ 首屏占位，避免 CLS */}
      {isLoading ? (
        <BlogPageSkeleton />
      ) : (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
              <p className="text-white/55 max-w-3xl mx-auto">
                Stay updated with insights about insect screens for Singapore homes.
              </p>
            </div>

            {/* Featured Post */}
            {featured && (
              <div className="mb-16">
                <Link
                  to={`/blog/${featured.id}`}
                  className="grid grid-cols-1 lg:grid-cols-5 bg-white/[0.03] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                >
                  <div className="lg:col-span-2">
                    <div className="relative w-full aspect-[16/10] bg-white/[0.03]">
                      {featured.imageUrl && (
                        <img
                          src={featured.imageUrl}
                          alt={featured.title}
                          className="absolute inset-0 w-full h-full object-cover"
                          loading="eager"
                          decoding="async"
                        />
                      )}
                    </div>
                  </div>

                  <div className="lg:col-span-3 p-6 flex flex-col">
                    <div className="flex items-center mb-2">
                      {featured.tags?.[0] && (
                        <span className="bg-white/10 text-white text-sm px-3 py-1 rounded">
                          {featured.tags[0]}
                        </span>
                      )}
                      <span className="text-white/45 text-sm ml-3">
                        {featured.publishedAt
                          ? new Date(featured.publishedAt).toLocaleDateString()
                          : "Draft"}
                      </span>
                    </div>

                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-4">
                      {featured.title}
                    </h2>

                    <div className="text-xs sm:text-sm md:text-base text-white/55 mb-4 md:mb-6 line-clamp-3">
                      <DesignedPostBody html={featured.excerpt} />
                    </div>

                    <span className="mt-auto text-white font-semibold text-sm">
                      Read More →
                    </span>
                  </div>
                </Link>
              </div>
            )}

            {/* Other Posts */}
            <section className="cv-auto">
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {others.map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.id}`}
                    className="bg-white/[0.03] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition flex flex-col"
                  >
                    <div className="relative w-full aspect-[16/9] bg-white/[0.03]">
                      {post.imageUrl && (
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="absolute inset-0 w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      )}
                    </div>

                    <div className="p-3 sm:p-4 md:p-6 flex flex-col flex-1">
                      <div className="flex items-center mb-2">
                        {post.tags?.[0] && (
                          <span className="bg-white/10 text-white text-xs sm:text-sm px-2.5 py-0.5 rounded">
                            {post.tags[0]}
                          </span>
                        )}
                        <span className="text-white/45 text-[10px] sm:text-xs ml-1.5 sm:ml-2">
                          {post.publishedAt
                            ? new Date(post.publishedAt).toLocaleDateString()
                            : "Draft"}
                        </span>
                      </div>

                      <h3 className="text-sm sm:text-base md:text-lg font-bold mb-2 md:mb-3 line-clamp-2">
                        {post.title}
                      </h3>

                      <div className="text-[11px] sm:text-sm md:text-base text-white/55 line-clamp-3 mb-3 md:mb-4">
                        <DesignedPostBody html={post.excerpt} />
                      </div>

                      <span className="mt-auto text-white font-semibold text-xs sm:text-sm">
                        Read More →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </section>
      )}
    </>
  );
};

export default BlogPage;
