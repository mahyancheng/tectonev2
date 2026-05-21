
import React from "react";
import { Shield, Check, Wrench, AlertTriangle, Sun, Eye } from "lucide-react";
import EnhancedQuoteCalculator from "../components/EnhancedQuoteCalculator";
import { Link } from "react-router-dom";

const SecurityScreenPage: React.FC = () => {
  const securityProducts = [
    {
      id: "security-swing-door",
      title: "Security Swing Door",
      description: "Heavy-duty swing doors with advanced locking mechanisms",
      href: "/products/security-swing-door",
      icon: Shield,
    },
    {
      id: "sliding-door",
      title: "Sliding Door",
      description: "Space-saving sliding security doors",
      href: "/products/sliding-door",
      icon: Shield,
    },
    {
      id: "casement-window",
      title: "Casement Window",
      description: "Side-hinged security windows",
      href: "/products/casement-window",
      icon: Shield,
    },
    {
      id: "sliding-window",
      title: "Sliding Window",
      description: "Horizontal sliding security windows",
      href: "/products/sliding-window",
      icon: Shield,
    },
    {
      id: "fixed-security-screen",
      title: "Fixed Security Screen",
      description: "Permanent security screening solutions",
      href: "/products/fixed-security-screen",
      icon: Shield,
    },
    {
      id: "top-hung",
      title: "Top Hung",
      description: "Top-hinged security windows",
      href: "/products/top-hung",
      icon: Shield,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Security Screen Solutions
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Protect your home with our premium security screens, doors, and windows. 
            Engineered for maximum protection without compromising on style.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {securityProducts.map((product) => {
            const IconComponent = product.icon;
            return (
              <Link
                key={product.id}
                to={product.href}
                className="group bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-all duration-300 hover:border-white/40"
              >
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 bg-white/10 rounded-full flex items-center justify-center mr-4">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-white transition-colors">
                    {product.title}
                  </h3>
                </div>
                <p className="text-muted-foreground">
                  {product.description}
                </p>
              </Link>
            );
          })}
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            Why Choose Our Security Screens?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "Maximum Security",
                description: "Advanced locking systems and reinforced materials",
              },
              {
                icon: Eye,
                title: "Clear Vision",
                description: "Unobstructed views while maintaining security",
              },
              {
                icon: Sun,
                title: "Weather Resistant",
                description: "Built to withstand harsh weather conditions",
              },
              {
                icon: Wrench,
                title: "Easy Installation",
                description: "Professional installation with minimal disruption",
              },
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="h-16 w-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quote Calculator */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            Get Your Custom Quote
          </h2>
          <EnhancedQuoteCalculator />
        </div>
      </div>
    </div>
  );
};

export default SecurityScreenPage;
