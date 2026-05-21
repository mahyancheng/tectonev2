
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import emailjs from 'emailjs-com';

interface ProductQuoteCalculatorProps {
  productType: string;
}

const ProductQuoteCalculator: React.FC<ProductQuoteCalculatorProps> = ({ productType }) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    height: "",
    width: "",
    girth: "",
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [successData, setSuccessData] = useState({
    name: "",
    email: "",
    phone: "",
    price: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (
      step === 1 &&
      (!formData.height || !formData.width || !formData.girth)
    ) {
      toast({
        title: "All measurements are required",
        variant: "destructive",
      });
      return;
    }

    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const priceRateMap = {
    'Security Screen': 0.025,
    'Insect Screen': 0.015,
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, phone, height, width, girth } = formData;

    const h = parseFloat(height);
    const w = parseFloat(width);
    const g = parseFloat(girth);

    if (isNaN(h) || isNaN(w) || isNaN(g)) {
      toast({
        title: "Please enter valid numbers for height, width, and girth.",
        variant: "destructive",
      });
      return;
    }
    const rate = priceRateMap[productType] || 0.02;

    const volume = h * w * g;
    const price = volume * rate;
    console.log("Rate used:", rate, "for", productType);

    setIsSubmitting(true);

    try {
      await emailjs.send(
        'service_5ml6fvh',
        'template_iy2rocf', // 👈 your template name
        {
          name,
          email,
          phone,
          height: h,
          width: w,
          girth: g,
          price: `RM ${price.toFixed(2)}`,
        },
        'makf8-_rqWVLQl3ro' // 👈 your public key
      );

      // ✅ Save details for dialog display
      setSuccessData({
        name,
        email,
        phone,
        price: `RM ${price.toFixed(2)}`,
      });

      setShowSuccessDialog(true);

      setFormData({
        name: '',
        email: '',
        phone: '',
        height: '',
        width: '',
        girth: '',
      });
      setStep(1);
    } catch (error) {
      console.error('Email send failed:', error);
      toast({
        title: "Failed to send quote",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false);
  };


  return (
    <div className="bg-card p-6 rounded-lg shadow-md animate-on-scroll border border-border">
      <h2 className="text-2xl font-semibold mb-4">Get Your {productType} Quote</h2>
      <div className="mb-6 relative flex justify-between">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.03] text-white font-semibold z-10">
          1
        </div>
        <div className={`h-1 absolute top-4 left-0 right-0 z-0 ${step > 1 ? "bg-white/[0.03] border border-white/10" : "bg-white/[0.08]"}`}></div>
        <div className={`flex items-center justify-center w-8 h-8 rounded-full text-white font-semibold z-10 ${step > 1 ? "bg-white/[0.03] border border-white/10" : "bg-white/[0.08]"
          }`}>
          2
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-lg font-semibold mb-2">Step 1: Enter Measurements</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="height" className="block text-sm font-semibold text-foreground mb-1">
                  Height (cm)
                </label>
                <input
                  type="number"
                  id="height"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  placeholder="Enter height"
                  className="input-field"
                  min="1"
                />
              </div>
              <div>
                <label htmlFor="width" className="block text-sm font-semibold text-foreground mb-1">
                  Width (cm)
                </label>
                <input
                  type="number"
                  id="width"
                  name="width"
                  value={formData.width}
                  onChange={handleChange}
                  placeholder="Enter width"
                  className="input-field"
                  min="1"
                />
              </div>
              <div>
                <label htmlFor="girth" className="block text-sm font-semibold text-foreground mb-1">
                  Girth (cm)
                </label>
                <input
                  type="number"
                  id="girth"
                  name="girth"
                  value={formData.girth}
                  onChange={handleChange}
                  placeholder="Enter girth"
                  className="input-field"
                  min="1"
                />
              </div>
            </div>
            <div className="mt-6">
              <button
                type="button"
                onClick={nextStep}
                className="btn-primary w-full"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-lg font-semibold mb-2">Step 2: Your Contact Details</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                  className="input-field"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <button
                type="button"
                onClick={prevStep}
                className="btn-outline"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
              >
                {isSubmitting ? "Sending..." : "Get Quote"}
              </button>
            </div>
          </div>
        )}
      </form>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={handleCloseSuccessDialog}>
        <DialogContent className="bg-card border-border text-foreground">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold mb-2">Quote Request Submitted!</DialogTitle>
            <DialogDescription className="text-white/55">
              Thank you, <strong>{successData.name}</strong>. We've received your request and emailed your custom quote.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-secondary/50 p-4 rounded-md mt-4 space-y-2 text-sm">
            <p><strong>Name:</strong> {successData.name}</p>
            <p><strong>Email:</strong> {successData.email}</p>
            <p><strong>Phone:</strong> {successData.phone}</p>
            <p><strong>Estimated Price:</strong> {successData.price}</p>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleCloseSuccessDialog}
              className="btn-primary px-4 py-2"
            >
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductQuoteCalculator;
