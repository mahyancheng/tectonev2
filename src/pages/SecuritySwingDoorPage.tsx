import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import EnhancedQuoteCalculator from "../components/EnhancedQuoteCalculator";
import { Shield, Lock, Wrench, Check, ArrowLeft } from "lucide-react";
import ContactSection from "@/components/ContactSection";
import SwingDoor from "../images/SwingDoor.webp"
const SecuritySwingDoorPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    "Triple locking system for maximum security",
    "Reinforced steel hinges",
    "Emergency release mechanism",
    "Weather-resistant sealing",
    "Anti-drill and anti-pick locks",
    "Custom sizing available"
  ];

  const perfectFor = [
    "Main entrances in HDB flats, condos, and landed homes",
    "Back doors or service yards",
    "Kitchens that need airflow but can't compromise on safety"
  ];

  const specifications = [
    { label: "Material", value: "High-grade steel mesh" },
    { label: "Frame", value: "Powder-coated aluminum" },
    { label: "Thickness", value: "1.2mm - 2.0mm" },
    { label: "Mesh Size", value: "11mm x 11mm" },
    { label: "Warranty", value: "10 years" },
    { label: "Installation", value: "Professional installation included" }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Security Swing Door
              </h1>
              <p className="text-gray-600 mb-6">
                Our premium security swing doors offer uncompromising protection with elegant design.
                Featuring advanced triple locking systems and reinforced construction, these doors
                provide maximum security without sacrificing aesthetics.
              </p>

              {/* Perfect For Section */}
              <div className="mb-6 bg-gray-50 rounded-xl p-5 shadow-inner">
                <h2 className="text-xl font-semibold mb-3 text-gray-800">Perfect For</h2>
                <div className="space-y-3">
                  {perfectFor.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-tectone-gold mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 leading-snug font-semibold">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features Section */}
              <div className="mb-6 bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <h2 className="text-xl font-semibold mb-3 text-gray-800">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-tectone-gold mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 leading-snug font-semibold">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link to="/quote" className="btn-primary">
                  Get Quote
                </Link>
                <Link to="/contact" className="btn-outline">
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={SwingDoor}
                  alt="Tectone Security Swing Door"
                  className="w-full h-full object-cover scale-110 transform transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Technical Specifications</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {specifications.map((spec, index) => (
                  <div key={index} className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-semibold text-gray-700">{spec.label}:</span>
                    <span className="text-gray-600">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Calculator */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Get Your Custom Quote</h2>
            <EnhancedQuoteCalculator />
          </div>
        </div>
      </section>

      {/* Features Detail */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Our Security Swing Doors?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-14 w-14 bg-tectone-gold/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-tectone-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Maximum Security</h3>
              <p className="text-gray-600">
                Triple locking system with reinforced hinges and anti-drill protection
                provides unmatched security for your property.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-14 w-14 bg-tectone-gold/10 rounded-full flex items-center justify-center mb-4">
                <Lock className="h-8 w-8 text-tectone-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Advanced Locking</h3>
              <p className="text-gray-600">
                Multi-point locking system with emergency release ensures both security
                and safety in all situations.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-14 w-14 bg-tectone-gold/10 rounded-full flex items-center justify-center mb-4">
                <Wrench className="h-8 w-8 text-tectone-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Professional Installation</h3>
              <p className="text-gray-600">
                Expert installation by certified technicians ensures perfect fit and
                optimal performance for years to come.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
};

export default SecuritySwingDoorPage;
