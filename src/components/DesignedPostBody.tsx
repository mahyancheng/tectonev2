// src/components/DesignedPostBody.tsx
import React, { useMemo } from "react";
import DOMPurify from "dompurify";

const ALLOWED_TAGS = [
  "a","p","br","strong","em","ul","ol","li","blockquote","code","pre",
  "h1","h2","h3","h4","h5","h6","img","figure","figcaption","hr",
  "table","thead","tbody","tr","th","td","span","div","mark"
];
const ALLOWED_ATTR = [
  "href","target","rel","title","alt","src","width","height","class","id","style","loading"
];

// 清洗 + 强化（外链、懒加载）
function sanitizeHtml(html?: string) {
  if (!html) return "";
  const safe = DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    FORBID_TAGS: ["script","iframe","object","embed"],
    USE_PROFILES: { html: true },
  });

  if (typeof window === "undefined") return safe;

  const wrap = document.createElement("div");
  wrap.innerHTML = safe;

  wrap.querySelectorAll<HTMLAnchorElement>("a[href]").forEach(a=>{
    const href = a.getAttribute("href") || "";
    if (/^https?:\/\//i.test(href)) {
      a.setAttribute("target","_blank");
      const rel = (a.getAttribute("rel") || "").split(" ").filter(Boolean);
      ["noopener","noreferrer"].forEach(x=>{ if(!rel.includes(x)) rel.push(x); });
      a.setAttribute("rel", rel.join(" "));
    }
  });

  wrap.querySelectorAll<HTMLImageElement>("img").forEach(img=>{
    if (!img.getAttribute("loading")) img.setAttribute("loading","lazy");
  });

  return wrap.innerHTML;
}

type Props = { html?: string };

const DesignedPostBody: React.FC<Props> = ({ html }) => {
  const clean = useMemo(()=>sanitizeHtml(html), [html]);

  return (
    <section className="w-full">
      {/* 居中容器 */}
      <div className="mx-auto max-w-3xl">
        {/* 顶部细分割线 */}
        <hr className="my-6 border-t border-gray-200" />

        {/* 正文：仿截图样式 */}
        <div
          className="
            prose prose-gray max-w-none
            prose-p:leading-7 prose-h2:mt-10 prose-h2:mb-3 prose-h2:leading-tight
            prose-h3:mt-8 prose-h3:mb-2
            prose-hr:my-6
            prose-li:my-1
            prose-strong:text-gray-900
            prose-a:text-tectone-gold hover:prose-a:text-amber-500
          "
        >
          <div dangerouslySetInnerHTML={{ __html: clean }} />
        </div>

        {/* 底部分割线 */}
        <hr className="my-8 border-t border-gray-200" />
      </div>

      {/* 设计补充样式（无需单独 CSS 文件） */}
      <style>{`
        /* 黄色重点引文块：给 blockquote.hl 或 div.quote-hl 使用 */
        .quote-hl, blockquote.hl {
          background: #fff7b0; /* 柔和黄色 */
          padding: 12px 14px;
          border-radius: 6px;
          border-left: 4px solid #e0c73b;
          margin: 10px 0 14px;
        }
        /* 分节标题下的细线（你也可以在内容里放 <hr/>） */
        .rule {
          border: 0; height: 1px; background: #e5e7eb; margin: 18px 0;
        }
        /* mark 高亮（截图里黄色荧光笔效果） */
        mark {
          background: #fff59d;
          padding: 0 .2em;
          border-radius: 2px;
        }
        /* 列表缩进更像文档 */
        .prose ul, .prose ol { padding-left: 1.2em; }
        /* 表格微弱边框 */
        .prose table { border-collapse: collapse; width: 100%; }
        .prose th, .prose td { border: 1px solid #e5e7eb; padding: 8px; }
      `}</style>
    </section>
  );
};

export default DesignedPostBody;
