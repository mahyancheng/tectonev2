import React from "react";
import { Building2, Building, Home } from "lucide-react";

interface UseCasesSectionProps {
  productName?: string;
}

const useCases = [
  {
    icon: Building2,
    title: "HDB Apartments",
    description:
      "Many HDB flats have windows that open towards corridors or external air wells. Our products ensure privacy, ventilation, and insect protection — while meeting HDB design requirements.",
  },
  {
    icon: Building,
    title: "Condominiums & Private Flats",
    description:
      "For condo living, where modern architecture values clean aesthetics, slim aluminium frames with unobtrusive mesh complement the design. Large windows with netting allow more light and air — great for living rooms, bedrooms, or kitchens.",
  },
  {
    icon: Home,
    title: "Landed Houses & Terrace Homes",
    description:
      "In landed homes, windows often face gardens or open spaces — where mosquitos are common. Installing aluminium frame products with netting maximises airflow while keeping bugs out.",
  },
];

const UseCasesSection: React.FC<UseCasesSectionProps> = ({ productName = "Our Products" }) => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-foreground">
            Where Can This Be Installed?
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Here are some typical scenarios in Singapore where {productName.toLowerCase()} are especially beneficial:
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto">
          {useCases.map((useCase, index) => {
            const IconComponent = useCase.icon;
            return (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-4 md:p-6 hover:shadow-lg hover:border-tectone-gold transition-all duration-300"
              >
                <div className="h-12 w-12 md:h-16 md:w-16 bg-tectone-gold/10 rounded-full flex items-center justify-center mb-3 md:mb-5 mx-auto">
                  <IconComponent className="h-6 w-6 md:h-8 md:w-8 text-tectone-gold" />
                </div>
                <h3 className="text-sm sm:text-base md:text-xl font-semibold text-foreground mb-2 md:mb-3 text-center">
                  {useCase.title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground text-center leading-relaxed">
                  {useCase.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
