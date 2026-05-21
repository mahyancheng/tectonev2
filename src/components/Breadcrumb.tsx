import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Head } from "vite-react-ssg";

interface BreadcrumbProps {
  pageName?: string; // 详情页可传真实产品名 / 文章名
}

/** 是否隐藏 our-product/product 里的中间 "product" 面包屑 */
const HIDE_INTERMEDIATE_PRODUCT = true;

/** 哪些 segment 不允许点击（只显示文字） */
const NON_CLICKABLE_SEGMENTS = new Set<string>([
  "product", // 中间层没有实际页面
]);

/** slug → 显示名映射 */
const breadcrumbMap: Record<string, string> = {
  "about-insect-screen-supplier": "About",
  "our-product": "Products",
  "product": "Product",
  "blog": "Blog",
  "contact-us": "Contact",
  "quote": "Quote",
  "thank-you": "Thank You",
};

/** slug 美化 */
const beautify = (slug: string) =>
  slug
    .split("-")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : ""))
    .join(" ");

const SITE_URL = "https://tectonesteel.com";

const Breadcrumb: React.FC<BreadcrumbProps> = ({ pageName }) => {
  const location = useLocation();
  const segs = location.pathname.split("/").filter(Boolean);

  type Crumb = {
    label: string;
    to?: string;
    clickable: boolean;
    key: string;
  };

  const crumbs: Crumb[] = [];

  /* ---------- Home ---------- */
  crumbs.push({
    label: "Home",
    to: "/",
    clickable: segs.length > 0,
    key: "home",
  });

  /* ---------- Path segments ---------- */
  segs.forEach((seg, idx) => {
    // 隐藏 our-product/product 的中间 product
    if (
      HIDE_INTERMEDIATE_PRODUCT &&
      seg === "product" &&
      segs[idx - 1] === "our-product"
    ) {
      return;
    }

    const isLast = idx === segs.length - 1;
    const mapped = breadcrumbMap[seg];

    const label =
      isLast && pageName ? pageName : mapped || beautify(seg);

    const defaultTo = `/${segs.slice(0, idx + 1).join("/")}`;

    const clickable =
      !isLast && !NON_CLICKABLE_SEGMENTS.has(seg);

    const to =
      seg === "our-product" ? "/our-product" : defaultTo;

    crumbs.push({
      label,
      to: clickable ? to : undefined,
      clickable,
      key: `${idx}-${seg}`,
    });
  });

  /* ---------- BreadcrumbList Schema ---------- */
  const schemaItems = crumbs.map((c, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    name: c.label,
    ...(c.to ? { item: `${SITE_URL}${c.to}` } : {}),
  }));

  return (
    <nav aria-label="Breadcrumb" className="bg-black/40 border-b border-white/5 py-3">
      <Head>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: schemaItems,
          })}
        </script>
      </Head>
      <div className="container mx-auto px-4">
        <div className="flex items-center text-sm flex-wrap gap-x-2 mt-3">
          {crumbs.map((c, i) => {
            const isLast = i === crumbs.length - 1;

            if (!c.clickable || isLast) {
              return (
                <span
                  key={c.key}
                  className="breadcrumb-item font-medium text-white/90"
                >
                  {c.label}
                </span>
              );
            }

            return (
              <Link
                key={c.key}
                to={c.to!}
                className="breadcrumb-item text-white/55 hover:text-white transition-colors"
              >
                {c.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Breadcrumb;
