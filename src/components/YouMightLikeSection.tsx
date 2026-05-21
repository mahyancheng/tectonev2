import React from "react";
import { Link } from "react-router-dom";
import { productDetails } from "./ProductData";
import { ArrowRight } from "lucide-react";

interface YouMightLikeSectionProps {
  currentProductId?: string;
  maxItems?: number;
}

const YouMightLikeSection: React.FC<YouMightLikeSectionProps> = ({
  currentProductId,
  maxItems = 3,
}) => {
  // Filter out the current product and get random/different products
  const otherProducts = productDetails
    .filter((product) => product.id !== currentProductId)
    .slice(0, maxItems);

  if (otherProducts.length === 0) return null;

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            You Might Also Like
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore more of our premium insect screen solutions for your home
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {otherProducts.map((product) => (
            <Link
              key={product.id}
              to={`/our-product/product/${product.id}`}
              className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl hover:border-white/40 transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-white transition-colors">
                  {product.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                  {product.description.split("\n")[0]}
                </p>
                <span className="inline-flex items-center text-white font-semibold text-sm group-hover:gap-2 transition-all">
                  Learn More <ArrowRight className="h-4 w-4 ml-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default YouMightLikeSection;
