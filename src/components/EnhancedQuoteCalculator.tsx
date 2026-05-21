import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { useLocation } from "react-router-dom";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { productDetails } from "../components/ProductData";
import { getNewQuoteCode, createQuoteDoc } from "@/services/quoteService";

/* ════════════════════════════════════════════════════
   Motion variants — small, calm transitions
   ════════════════════════════════════════════════════ */
const stepVariants = {
  enter: { opacity: 0, x: 24 },
  center: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, x: -24, transition: { duration: 0.3, ease: [0.4, 0, 1, 1] } },
};

const imageVariants = {
  initial: { opacity: 0, scale: 1.02 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.3 } },
};

const EnhancedQuoteCalculator: React.FC = () => {
  const { toast } = useToast();
  const location = useLocation();

  const formatPrice = (value: number) =>
    value.toLocaleString("en-US", { style: "currency", currency: "SGD", minimumFractionDigits: 2 });

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
      setFormData((p) => ({ ...p, productType: initialProductType }));
      setStep(2);
    }
  }, [initialProductType]);

  const selectedProduct = useMemo(
    () => productDetails.find((p) => p.id === formData.productType),
    [formData.productType]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const normalized = value.startsWith(".") ? `0${value}` : value;
    setFormData((prev) => ({ ...prev, [name]: normalized }));
  };

  /** Picking a product auto-advances to step 2 — no Continue button needed. */
  const handlePickProduct = (id: string) => {
    setFormData((p) => ({ ...p, productType: id }));
    // Small delay so the user sees the selection state register before sliding away.
    window.setTimeout(() => setStep(2), 180);
  };

  const nextStep = () => {
    if (step === 2 && (!formData.width || !formData.height)) {
      toast({ title: "Please enter both width and height measurements", variant: "destructive" });
      return;
    }
    setStep((p) => p + 1);
  };
  const prevStep = () => setStep((p) => p - 1);

  const calculatePrice = () => {
    const w = parseFloat(formData.width);
    const h = parseFloat(formData.height);
    const area = (isNaN(w) ? 0 : w) * (isNaN(h) ? 0 : h);
    const baseRate = selectedProduct?.pricePerInch || 0;
    return (area * baseRate).toFixed(2);
  };

  const restrictInvalidNumberInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const invalid = ["e", "E", "+", "-", "*", "%", ","];
    if (invalid.includes(e.key)) e.preventDefault();
  };

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

      // Pabbly webhook (existing flow preserved)
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

      const quoteCode = await getNewQuoteCode(formData.productType);
      await createQuoteDoc({
        quoteCode,
        productType: formData.productType,
        priceFormatted: formattedPrice,
      });

      // Lazy-load jsPDF
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
      const rows: Array<[string, string]> = [
        ["Name:", formData.name],
        ["Phone Number:", formData.phone],
        ["Email:", formData.email],
        ["Postcode:", formData.postcode],
      ];
      rows.forEach(([k, v]) => {
        doc.setFont("helvetica", "bold");
        doc.text(k, 20, y);
        doc.setFont("helvetica", "normal");
        doc.text(v, 50, y);
        y += 7;
      });
      y += 3;
      doc.line(20, y, 190, y);
      y += 8;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text("Product", 20, y);
      doc.text("Pricing (SGD)", 150, y);
      y += 7;
      doc.setFont("helvetica", "normal");
      doc.text(selectedProduct?.title || "", 20, y);
      doc.text(
        `SGD ${parseFloat(price).toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
        150,
        y
      );
      y += 7;
      const w = formData.width.startsWith(".") ? `0${formData.width}` : formData.width;
      const h = formData.height.startsWith(".") ? `0${formData.height}` : formData.height;
      doc.text(`${w}w x ${h}h`, 20, y);
      y += 10;
      doc.setFont("helvetica", "italic");
      doc.setTextColor(100);
      doc.text("We thank you for your enquiry! We will contact you shortly.", 20, y);
      y += 6;
      doc.text("If you have any questions about this quotation, please contact", 20, y);
      y += 10;
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0);
      doc.text("Charlie Lau", 20, y);
      y += 6;
      doc.text("+65 9677 1199", 20, y);

      const pdfBlob = doc.output("blob");
      setPdfUrl(URL.createObjectURL(pdfBlob));

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

  /* ════════════════════════════════════════════════════
     Render
     ════════════════════════════════════════════════════ */
  return (
    <div className="surface-card overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-0 min-h-[320px]">
        {/* ──────────── LEFT: preview ──────────── */}
        <div className="relative bg-black overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10 min-h-[160px] lg:min-h-full">
          {/* Subtle mesh texture, always present */}
          <div className="absolute inset-0 mesh-bg opacity-30 pointer-events-none" />

          <AnimatePresence mode="wait">
            {selectedProduct ? (
              <motion.img
                key={selectedProduct.id}
                src={selectedProduct.image}
                alt={selectedProduct.title}
                variants={imageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute inset-0 w-full h-full object-cover opacity-70"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="text-center px-6">
                  <p className="eyebrow mb-3">Step 1 of 3</p>
                  <p className="font-serif text-lg md:text-2xl text-white/85 leading-tight max-w-xs mx-auto">
                    Pick a product. Quote in under a minute.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {selectedProduct && (
            <div className="absolute bottom-0 inset-x-0 p-5 md:p-6 bg-gradient-to-t from-black via-black/85 to-transparent">
              <p className="eyebrow mb-1">Selected product</p>
              <p className="font-serif text-lg md:text-xl text-white tracking-tight leading-tight">
                {selectedProduct.title}
              </p>
              {formData.width && formData.height && (
                <p className="text-xs text-white/55 mt-1">
                  {formData.width}" wide × {formData.height}" tall
                </p>
              )}
            </div>
          )}
        </div>

        {/* ──────────── RIGHT: controls ──────────── */}
        <div className="p-4 md:p-6 flex flex-col">
          {/* Stepper */}
          <div className="mb-4">
            <div className="flex items-center gap-2.5">
              {[1, 2, 3].map((s, i) => (
                <div key={s} className="contents">
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{
                        backgroundColor: step >= s ? "#ffffff" : "rgba(255,255,255,0.08)",
                        color: step >= s ? "#000000" : "rgba(255,255,255,0.5)",
                        scale: step === s ? 1.05 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                      className="h-7 w-7 rounded-full flex items-center justify-center text-xs font-medium"
                    >
                      {step > s ? <Check className="h-3.5 w-3.5" /> : s}
                    </motion.div>
                    <span
                      className={`text-xs uppercase tracking-[0.18em] hidden sm:inline ${
                        step >= s ? "text-white/85" : "text-white/35"
                      }`}
                    >
                      {s === 1 ? "Product" : s === 2 ? "Size" : "You"}
                    </span>
                  </div>
                  {i < 2 && (
                    <div className="flex-1 h-px bg-white/10 relative overflow-hidden">
                      <motion.div
                        initial={false}
                        animate={{ width: step > s ? "100%" : "0%" }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-y-0 left-0 bg-white/85"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step body */}
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step-1"
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex-1 flex flex-col"
                >
                  <p className="eyebrow mb-1.5">Step 1 · Product</p>
                  <h3 className="font-serif text-lg md:text-xl tracking-tight text-white mb-3">
                    What are you covering?
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                    {productDetails.map((p) => {
                      const active = formData.productType === p.id;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => handlePickProduct(p.id)}
                          className={`group text-left rounded border transition-all duration-200 px-3 py-2 flex items-center justify-between gap-2 ${
                            active
                              ? "border-white/60 bg-white/[0.06]"
                              : "border-white/10 bg-white/[0.02] hover:border-white/30 hover:bg-white/[0.04]"
                          }`}
                        >
                          <span className="text-[13px] font-medium text-white tracking-tight leading-tight">
                            {p.title}
                          </span>
                          <ArrowRight
                            className={`h-3 w-3 flex-shrink-0 transition-all duration-200 ${
                              active
                                ? "text-white translate-x-0.5"
                                : "text-white/25 group-hover:text-white/70 group-hover:translate-x-0.5"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>

                  <p className="text-[11px] text-white/40 mt-2.5">
                    Tap a product — we jump to the next step automatically.
                  </p>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step-2"
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex-1 flex flex-col"
                >
                  <p className="eyebrow mb-2">Step 2 · Dimensions</p>
                  <h3 className="font-serif text-xl md:text-2xl tracking-tight text-white mb-1">
                    What size do you need?
                  </h3>
                  <p className="text-xs text-white/55 mb-5">
                    Measure the opening in inches. We'll fine-tune on the site visit.
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="qc-width"
                        className="block text-xs font-medium text-white/65 mb-1.5 uppercase tracking-wider"
                      >
                        Width
                      </label>
                      <div className="relative">
                        <input
                          id="qc-width"
                          name="width"
                          type="number"
                          inputMode="decimal"
                          value={formData.width}
                          onChange={handleChange}
                          onKeyDown={restrictInvalidNumberInput}
                          placeholder="36"
                          className="input-field pr-10"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/40">
                          in
                        </span>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="qc-height"
                        className="block text-xs font-medium text-white/65 mb-1.5 uppercase tracking-wider"
                      >
                        Height
                      </label>
                      <div className="relative">
                        <input
                          id="qc-height"
                          name="height"
                          type="number"
                          inputMode="decimal"
                          value={formData.height}
                          onChange={handleChange}
                          onKeyDown={restrictInvalidNumberInput}
                          placeholder="80"
                          className="input-field pr-10"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/40">
                          in
                        </span>
                      </div>
                    </div>
                  </div>

                  {formData.width && formData.height && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 p-4 rounded-md border border-white/10 bg-white/[0.03]"
                    >
                      <p className="eyebrow mb-1">Estimated</p>
                      <p className="font-serif text-2xl text-white tracking-tight">
                        {formatPrice(parseFloat(calculatePrice()))}
                      </p>
                      <p className="text-xs text-white/45 mt-1">
                        Indicative only · Final quote confirmed after on-site measurement
                      </p>
                    </motion.div>
                  )}

                  <div className="mt-auto pt-8 grid grid-cols-2 gap-3">
                    <button type="button" onClick={prevStep} className="btn-outline">
                      <ArrowLeft className="mr-1.5 h-4 w-4" />
                      Back
                    </button>
                    <button type="button" onClick={nextStep} className="btn-primary">
                      Continue
                      <ArrowRight className="ml-1.5 h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step-3"
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex-1 flex flex-col"
                >
                  <p className="eyebrow mb-2">Step 3 · You</p>
                  <h3 className="font-serif text-xl md:text-2xl tracking-tight text-white mb-1">
                    Where should we send the quote?
                  </h3>
                  <p className="text-xs text-white/55 mb-5">
                    A real PDF lands in your inbox — no calls you didn't ask for.
                  </p>

                  {/* Order summary — confirms what they're about to submit */}
                  <div className="rounded-lg border border-white/10 bg-white/[0.03] divide-y divide-white/10 mb-6">
                    <div className="flex items-baseline justify-between px-4 py-3">
                      <span className="eyebrow">Product</span>
                      <span className="text-sm text-white font-medium tracking-tight text-right max-w-[60%]">
                        {selectedProduct?.title || "—"}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between px-4 py-3">
                      <span className="eyebrow">Dimensions</span>
                      <span className="text-sm text-white/85 font-medium tabular-nums">
                        {formData.width || "—"}" wide × {formData.height || "—"}" tall
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between px-4 py-3.5 bg-white/[0.02]">
                      <span className="eyebrow">Estimated</span>
                      <span className="font-serif text-xl text-white tracking-tight tabular-nums">
                        {formatPrice(parseFloat(calculatePrice()))}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3.5">
                    {[
                      { name: "name", label: "Your name", placeholder: "Jason Tan", type: "text" },
                      { name: "email", label: "Email", placeholder: "you@example.com", type: "email" },
                      { name: "phone", label: "Phone", placeholder: "9123 4567", type: "tel" },
                      { name: "postcode", label: "Postal code", placeholder: "737853", type: "text" },
                    ].map((f) => (
                      <div key={f.name}>
                        <label
                          htmlFor={`qc-${f.name}`}
                          className="block text-xs font-medium text-white/65 mb-1.5 uppercase tracking-wider"
                        >
                          {f.label}
                        </label>
                        <input
                          id={`qc-${f.name}`}
                          name={f.name}
                          value={(formData as any)[f.name]}
                          onChange={handleChange}
                          placeholder={f.placeholder}
                          type={f.type}
                          className="input-field"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-8 grid grid-cols-2 gap-3">
                    <button type="button" onClick={prevStep} className="btn-outline">
                      <ArrowLeft className="mr-1.5 h-4 w-4" />
                      Back
                    </button>
                    <button type="submit" disabled={isSubmitting} className="btn-primary">
                      {isSubmitting ? "Sending…" : "Get My Quote"}
                      {!isSubmitting && <ArrowRight className="ml-1.5 h-4 w-4" />}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>

      {/* ──────────── Success dialog (re-themed) ──────────── */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="bg-black/95 backdrop-blur-xl border border-white/15 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl tracking-tight text-white">
              Quote request received
            </DialogTitle>
            <DialogDescription className="text-white/60 mt-1.5">
              Thank you, <strong className="text-white">{successData.name}</strong>. A PDF copy is
              ready below — we'll be in touch shortly.
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-md border border-white/10 bg-white/[0.03] p-4 mt-2 space-y-1.5 text-sm">
            <p className="flex justify-between">
              <span className="text-white/55">Email</span>
              <span className="text-white/90">{successData.email}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-white/55">Phone</span>
              <span className="text-white/90">{successData.phone}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-white/55">Postcode</span>
              <span className="text-white/90">{successData.postcode}</span>
            </p>
          </div>

          <div className="mt-4">
            <p className="eyebrow">Total estimate</p>
            <p className="font-serif text-3xl text-white tracking-tight mt-1">
              {successData.price}
            </p>
          </div>

          <div className="mt-6 flex gap-3">
            <a
              href={pdfUrl || "#"}
              download="tectone-quote.pdf"
              className="btn-primary flex-1 text-center"
            >
              Download PDF
            </a>
            <button
              onClick={() => setShowSuccessDialog(false)}
              className="btn-outline flex-1"
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
