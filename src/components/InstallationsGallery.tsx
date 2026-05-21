import React from "react";
import { Play } from "lucide-react";

import install1 from "@/images/install1.webp";
import install2 from "@/images/install2.webp";
import install3 from "@/images/install3.webp";
import install4 from "@/images/install4.webp";

interface InstallationsGalleryProps {
  productName?: string;
}

/**
 * ✅ Photo Gallery（真实图片）
 */
const photoGallery = [
  { id: 1, src: install1, alt: "HDB installation showcase" },
  { id: 2, src: install2, alt: "Condominium window installation" },
  { id: 3, src: install3, alt: "Landed property security screen" },
  { id: 4, src: install4, alt: "Modern apartment installation" },
];

type VideoItem = {
  id: number;
  title: string;
  embedUrl?: string; // ✅ 有 embedUrl 就用 iframe
  aspect?: "16/9" | "9/16"; // ✅ 控制横/竖比例
};

const videos: VideoItem[] = [
  {
    id: 1,
    title: "Facebook Reel Highlight",
    embedUrl:
      "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1495335274853439%2F&show_text=false&t=0",
    aspect: "9/16",
  },
  {
    id: 2,
    title: "Tectone Project Video",
    embedUrl:
      "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Ftectonerenexsteel%2Fvideos%2F1288018239695245%2F&show_text=false&t=0",
    aspect: "9/16",
  },
];

const InstallationsGallery: React.FC<InstallationsGalleryProps> = ({ productName }) => {
  return (
    <section className="cv-auto py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 md:mb-4 text-foreground">
            Recent HDB & Condominium Installations in Singapore
          </h2>
<p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            See how our {productName || "security screens"} have transformed homes across Singapore
          </p>
        </div>

        {/* ✅ Image Gallery Row */}
        <div className="mb-10">
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-foreground mb-2 md:mb-4">Photo Gallery</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            {photoGallery.map((img) => (
              <div
                key={img.id}
                className="aspect-[4/3] rounded-xl overflow-hidden bg-muted border border-border hover:border-white/40 transition-colors cursor-pointer group"
              >
                {/* ✅ 重要优化：第一张图 eager + high priority，其他 lazy */}
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading={img.id === 1 ? "eager" : "lazy"}
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ✅ Video Gallery Row */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Installation Videos</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {videos.map((video) => {
              const aspectClass = video.aspect === "9/16" ? "aspect-[9/16]" : "aspect-video";

              return (
                <div
                  key={video.id}
                  className="rounded-xl overflow-hidden bg-muted border border-border hover:border-white/40 transition-all group"
                >
                  <div className={`relative w-full ${aspectClass} bg-black`}>
                    {video.embedUrl ? (
                      <>
                        {/* ✅ 重要优化：用 loading lazy 减少第三方 iframe 对首屏影响 */}
                        <iframe
                          src={video.embedUrl}
                          title={video.title}
                          className="absolute inset-0 w-full h-full"
                          style={{ border: "none", overflow: "hidden" }}
                          scrolling="no"
                          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />

                        {/* ✅ 重要优化：给 iframe 一个“遮罩层”避免加载期间白屏闪烁 */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                          <Play className="h-8 w-8 text-white ml-1" fill="white" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <p className="text-foreground text-center text-xs sm:text-sm md:text-base font-semibold">{video.title}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstallationsGallery;
