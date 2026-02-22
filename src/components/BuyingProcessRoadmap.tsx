
import React from "react";
import { 
  FileText, 
  PhoneOutgoing, 
  Eye, 
  Check, 
  Package, 
  Wrench
} from "lucide-react";

const BuyingProcessRoadmap: React.FC = () => {
  const steps = [
    {
      title: "Submit Quote",
      description: "Fill out our quote calculator with your measurements",
      icon: <FileText className="h-6 w-6 text-tectone-gold" />
    },
    {
      title: "Sales Contact",
      description: "Our team will reach out to discuss your requirements",
      icon: <PhoneOutgoing className="h-6 w-6 text-tectone-gold" />
    },
    {
      title: "On-Site Visit",
      description: "We'll schedule a visit to take precise measurements",
      icon: <Eye className="h-6 w-6 text-tectone-gold" />
    },
    {
      title: "Finalized Quote",
      description: "Receive your detailed quote with all specifications",
      icon: <Check className="h-6 w-6 text-tectone-gold" />
    },
    {
      title: "Installation",
      description: "Professional installation by our expert team",
      icon: <Package className="h-6 w-6 text-tectone-gold" />
    },
    {
      title: "After-Sales Service",
      description: "Ongoing support and maintenance when needed",
      icon: <Wrench className="h-6 w-6 text-tectone-gold" />
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Process
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Experience a seamless journey from quote to installation with our simple step-by-step process
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Vertical connecting line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-200 z-0"></div>
            
            <div className="space-y-12">
              {steps.map((step, index) => (
                <div key={index} className="relative flex items-start animate-on-scroll">
                  <div className="h-16 w-16 rounded-full bg-white shadow-md flex items-center justify-center mr-6 z-10 border-2 border-tectone-gold">
                    {step.icon}
                  </div>
                  <div className="pt-3">
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyingProcessRoadmap;
