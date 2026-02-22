import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";
import { useLocation } from "react-router-dom";

import CasementWindow48 from "../Icons/casement-window-48.webp";
import CasementWindow96 from "../Icons/casement-window-96.webp";
import FixedScreen48 from "../Icons/fixed-screen-48.webp";
import FixedScreen96 from "../Icons/fixed-screen-96.webp";
import FoldingDoor48 from "../Icons/security-folding-door-48.webp";
import FoldingDoor96 from "../Icons/security-folding-door-96.webp";
import SlidingWindow48 from "../Icons/security-sliding-window-48.webp";
import SlidingWindow96 from "../Icons/security-sliding-window-96.webp";
import SlidingDoor48 from "../Icons/sliding-door-48.webp";
import SlidingDoor96 from "../Icons/sliding-door-96.webp";
import SwingDoor48 from "../Icons/security-swing-door-48.webp";
import SwingDoor96 from "../Icons/security-swing-door-96.webp";
import TopHung48 from "../Icons/top-hung-48.webp";
import TopHung96 from "../Icons/top-hung-96.webp";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { productDetails } from "../components/ProductData";

// 🔥 Firestore 服务
import { getNewQuoteCode, createQuoteDoc } from "@/services/quoteService";

type IconSet = { x1: string; x2: string };

const iconMap: Record<string, IconSet> = {
  "103-security-casement-window": { x1: CasementWindow48, x2: CasementWindow96 },
  "102-fixed-screen": { x1: FixedScreen48, x2: FixedScreen96 },
  "104-security-folding-door": { x1: FoldingDoor48, x2: FoldingDoor96 },
  "106-security-sliding-window": { x1: SlidingWindow48, x2: SlidingWindow96 },
  "105-security-sliding-door": { x1: SlidingDoor48, x2: SlidingDoor96 },
  "107-security-swing-door": { x1: SwingDoor48, x2: SwingDoor96 },
  "108-security-top-hung": { x1: TopHung48, x2: TopHung96 },
};

const EnhancedQuoteCalculator: React.FC = () => {
  const { toast } = useToast();
  const location = useLocation();

  const formatPrice = (value: number) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "SGD",
      minimumFractionDigits: 2,
    });
  };

  const pathProductType = location.pathname.split("/").pop();
  const initialProduct = productDetails.find((p) => p.id === pathProductType);
  const initialProductType = initialProduct?.id || "";

  const [step, setStep] = useState(initialProductType ? 2 : 1);
  const [formData, setFormData] = useState({
    productType: initialProductType,
    width: "",
    height: "",
    name: "",
    email: "",
    phone: "",
    postcode: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [successData, setSuccessData] = useState({
    name: "",
    email: "",
    phone: "",
    postcode: "",
    price: "",
  });

  useEffect(() => {
    if (initialProductType) {
      setFormData((prev) => ({ ...prev, productType: initialProductType }));
      setStep(2);
    }
  }, [initialProductType]);

  const productTypes = productDetails.map((p) => ({
    value: p.id,
    label: p.title,
    icon: iconMap[p.id], // {x1, x2} 或 undefined
  }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const normalized = value.startsWith(".") ? `0${value}` : value;
    setFormData((prev) => ({ ...prev, [name]: normalized }));
  };

  const nextStep = () => {
    if (step === 1 && !formData.productType) {
      toast({ title: "Please select a product type", variant: "destructive" });
      return;
    }
    if (step === 2 && (!formData.width || !formData.height)) {
      toast({ title: "Please enter both width and height measurements", variant: "destructive" });
      return;
    }
    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const calculatePrice = () => {
    const w = parseFloat(formData.width);
    const h = parseFloat(formData.height);
    const area = (isNaN(w) ? 0 : w) * (isNaN(h) ? 0 : h);
    const selectedProduct = productDetails.find((p) => p.id === formData.productType);
    const baseRate = selectedProduct?.pricePerInch || 0;
    return (area * baseRate).toFixed(2);
  };

  const restrictInvalidNumberInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const invalidChars = ["e", "E", "+", "-", "*", "%", ","];
    if (invalidChars.includes(e.key)) e.preventDefault();
  };

  const handleCloseSuccessDialog = () => setShowSuccessDialog(false);

  const getProductLabel = (value: string) =>
    productTypes.find((p) => p.value === value)?.label || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.postcode) {
      toast({ title: "All fields are required", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    try {
      const price = calculatePrice();
      const formattedPrice = formatPrice(parseFloat(price));

      // 1) 发送到 Pabbly（保留你现有流程）
      await fetch(
        "https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjYwNTZiMDYzMDA0MzY1MjZmNTUzNDUxMzIi_pc",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_email: formData.email,
            name: formData.name,
            phone: formData.phone,
            postcode: formData.postcode,
            product_type: formData.productType,
            width: formData.width,
            height: formData.height,
            price: formattedPrice,
          }),
        }
      );

      // 2) Firestore：生成编号 + 写入 quotes 集合
      const quoteCode = await getNewQuoteCode(formData.productType);

      await createQuoteDoc({
        quoteCode,
        productType: formData.productType,
        priceFormatted: formattedPrice,
      });

      // ✅ 3) 生成 PDF：用到才加载 jsPDF（关键性能优化）
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF();

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("Tectone Renex Steel Pte Ltd", 20, 40);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.text("1 Woodlands Cl, #04-40 Woodlands 11, Singapore", 20, 47);
      doc.text("737853", 20, 54);
      doc.text("Phone: +65 9677 1199", 20, 61);

      doc.setDrawColor(0);
      doc.line(20, 67, 190, 67);

      let y = 75;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.text(quoteCode, 20, y);
      y += 8;

      doc.setFontSize(12);
      doc.text("Customer Details", 20, y);
      y += 8;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text(`Name:`, 20, y);
      doc.setFont("helvetica", "normal");
      doc.text(`${formData.name}`, 50, y);
      y += 7;

      doc.setFont("helvetica", "bold");
      doc.text(`Phone Number:`, 20, y);
      doc.setFont("helvetica", "normal");
      doc.text(`${formData.phone}`, 50, y);
      y += 7;

      doc.setFont("helvetica", "bold");
      doc.text(`Email:`, 20, y);
      doc.setFont("helvetica", "normal");
      doc.text(`${formData.email}`, 50, y);
      y += 7;

      doc.setFont("helvetica", "bold");
      doc.text(`Postcode:`, 20, y);
      doc.setFont("helvetica", "normal");
      doc.text(`${formData.postcode}`, 50, y);
      y += 10;

      doc.line(20, y, 190, y);
      y += 8;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text("Product", 20, y);
      doc.text("Pricing (SGD)", 150, y);
      y += 7;

      doc.setFont("helvetica", "normal");
      const productLabel = getProductLabel(formData.productType);
      doc.text(`${productLabel}`, 20, y);
      doc.text(
        `SGD ${parseFloat(price).toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
        150,
        y
      );
      y += 7;

      const formattedWidth = formData.width.startsWith(".") ? `0${formData.width}` : formData.width;
      const formattedHeight = formData.height.startsWith(".") ? `0${formData.height}` : formData.height;
      doc.text(`${formattedWidth}w x ${formattedHeight}h`, 20, y);
      y += 8;

      doc.setFont("helvetica", "italic");
      doc.setFontSize(11);
      doc.setTextColor(100);
      doc.text("We thank you for your enquiry! We will contact you shortly.", 20, y);
      y += 6;
      doc.text("If you have any questions about this quotation, please contact", 20, y);
      y += 10;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(0);
      doc.text("Charlie Lau", 20, y);
      y += 6;
      doc.text("+65 9677 1199", 20, y);

      const pdfBlob = doc.output("blob");
      const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(url);

      setSuccessData({ ...formData, price: formattedPrice });
      setShowSuccessDialog(true);

      setFormData({
        productType: "",
        width: "",
        height: "",
        name: "",
        email: "",
        phone: "",
        postcode: "",
      });
      setStep(1);
    } catch (error) {
      console.error("Submit failed:", error);
      toast({
        title: "Failed to send quote",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card p-6 rounded-lg shadow-md border border-border">
      <h2 className="text-2xl font-semibold mb-4">
        Get Your Custom Quote{formData.productType && ` for ${getProductLabel(formData.productType)}`}
      </h2>

      {/* Stepper */}
      <div className="relative mb-8">
        <div className="absolute top-1/2 left-4 right-4 h-1 bg-gray-200 z-0 transform -translate-y-1/2" />
        <div className="flex justify-between relative z-10 px-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shadow-md ${step >= s ? "bg-tectone-gold text-white" : "bg-gray-300 text-white"
                  }`}
              >
                {s}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Step 1: Choose Product Type</h3>

            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              {productTypes.map(({ value, label, icon }) => (
                <label
                  key={value}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${formData.productType === value
                      ? "border-tectone-gold bg-tectone-gold/5"
                      : "border-gray-300 hover:border-tectone-gold/50"
                    }`}
                >
                  <input
                    type="radio"
                    name="productType"
                    value={value}
                    checked={formData.productType === value}
                    onChange={handleChange}
                    className="sr-only"
                  />

                  <div className="flex items-center">
                    <div className="h-12 w-12 bg-tectone-gold/10 rounded-full flex items-center justify-center mr-3">
                      {icon ? (
                        <img
                          src={icon.x1}
                          srcSet={`${icon.x1} 1x, ${icon.x2} 2x`}
                          width={24}
                          height={24}
                          alt=""
                          className="h-6 w-6 object-contain icon-outline"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : null}
                    </div>

                    <span className="font-semibold">{label}</span>
                  </div>
                </label>
              ))}
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={nextStep}
                className="btn-primary w-full flex items-center justify-center"
              >
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Step 2: Enter Your Measurements</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                name="width"
                value={formData.width}
                onChange={handleChange}
                min="0"
                placeholder="Width (in)"
                type="number"
                className="input-field"
                onKeyDown={restrictInvalidNumberInput}
              />
              <input
                name="height"
                value={formData.height}
                onChange={handleChange}
                placeholder="Height (in)"
                type="number"
                className="input-field"
                onKeyDown={restrictInvalidNumberInput}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <button type="button" onClick={prevStep} className="btn-outline">
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="btn-primary flex items-center justify-center"
              >
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Step 3: Fill Up Form</h3>
            {["name", "email", "phone", "postcode"].map((field) => (
              <input
                key={field}
                name={field}
                value={(formData as any)[field]}
                onChange={handleChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="input-field"
              />
            ))}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <button type="button" onClick={prevStep} className="btn-outline">
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary flex items-center justify-center"
              >
                {isSubmitting ? "Sending..." : "Get My Quote Now"}
              </button>
            </div>
          </div>
        )}
      </form>

      <Dialog open={showSuccessDialog} onOpenChange={handleCloseSuccessDialog}>
        <DialogContent className="bg-white rounded-lg shadow-lg text-center max-w-md mx-auto border border-gray-200">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Quote Request Submitted!</DialogTitle>
            <DialogDescription className="text-gray-600 mt-2">
              Thank you, <strong>{successData.name}</strong>. We'll contact you shortly.
            </DialogDescription>
          </DialogHeader>

          <div className="bg-gray-100 p-4 rounded-md mt-4 text-left text-sm space-y-2">
            <p>
              <strong>Name:</strong> {successData.name}
            </p>
            <p>
              <strong>Email:</strong> {successData.email}
            </p>
            <p>
              <strong>Phone:</strong> {successData.phone}
            </p>
            <p>
              <strong>ZIP Code:</strong> {successData.postcode}
            </p>
          </div>

          <div className="mt-4 text-left px-4">
            <p className="text-sm font-semibold text-yellow-600">Total Quote:</p>
            <p className="text-3xl font-bold text-yellow-600">{successData.price}</p>
          </div>

          <div className="mt-6 flex justify-center">
            <a
              href={pdfUrl || "#"}
              download="quote.pdf"
              className="px-5 py-2 bg-black text-white rounded-md hover:bg-gray-800 text-sm font-semibold shadow-md"
            >
              📄 Download
            </a>
          </div>

          <div className="mt-4 flex justify-end px-6">
            <button
              onClick={handleCloseSuccessDialog}
              className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 text-sm font-semibold"
            >
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EnhancedQuoteCalculator;
