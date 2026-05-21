
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Shield, Bug } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription
} from "@/components/ui/dialog";

const QuoteCalculator: React.FC = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    productType: "",
    height: "",
    width: "",
    girth: "",
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (step === 1 && !formData.productType) {
      toast({
        title: "Please select a product type",
        variant: "destructive",
      });
      return;
    }

    if (
      step === 2 &&
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "All contact details are required",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Here you would send the quote request to your server
      // For now, we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Show success dialog
      setShowSuccessDialog(true);
      
      // Reset form
      setFormData({
        productType: "",
        height: "",
        width: "",
        girth: "",
        name: "",
        email: "",
        phone: "",
      });
      setStep(1);
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error processing your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false);
  };

  return (
    <div className="bg-card p-6 rounded-lg shadow-md animate-on-scroll border border-border">
      <h2 className="text-2xl font-semibold mb-4">Get Your Custom Quote</h2>
      <div className="mb-6 relative flex justify-between">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.03] text-white font-semibold z-10">
          1
        </div>
        <div className={`h-1 absolute top-4 left-0 right-0 z-0 ${step > 1 ? "bg-white/[0.03] border border-white/10" : "bg-white/[0.08]"}`}></div>
        <div className={`flex items-center justify-center w-8 h-8 rounded-full text-white font-semibold z-10 ${
          step > 1 ? "bg-white/[0.03] border border-white/10" : "bg-white/[0.08]"
        }`}>
          2
        </div>
        <div className={`h-1 absolute top-4 left-0 right-0 z-0 ${step > 2 ? "bg-white/[0.03] border border-white/10" : "bg-white/[0.08]"}`}></div>
        <div className={`flex items-center justify-center w-8 h-8 rounded-full text-white font-semibold z-10 ${
          step > 2 ? "bg-white/[0.03] border border-white/10" : "bg-white/[0.08]"
        }`}>
          3
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-lg font-semibold mb-2">Step 1: Select Product Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className={`border rounded-lg p-4 cursor-pointer transition-all ${
                formData.productType === "security-screen"
                  ? "border-white/40 bg-white/5"
                  : "border-white/12 hover:border-white/40/50"
              }`}>
                <input
                  type="radio"
                  name="productType"
                  value="security-screen"
                  checked={formData.productType === "security-screen"}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className="flex flex-col items-center">
                  <div className="h-20 w-20 bg-white/[0.03] rounded-full flex items-center justify-center mb-3">
                    <Shield className="h-10 w-10 text-white" />
                  </div>
                  <span className="font-semibold">Security Screen</span>
                </div>
              </label>

              <label className={`border rounded-lg p-4 cursor-pointer transition-all ${
                formData.productType === "insect-screen"
                  ? "border-white/40 bg-white/5"
                  : "border-white/12 hover:border-white/40/50"
              }`}>
                <input
                  type="radio"
                  name="productType"
                  value="insect-screen"
                  checked={formData.productType === "insect-screen"}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className="flex flex-col items-center">
                  <div className="h-20 w-20 bg-white/[0.03] rounded-full flex items-center justify-center mb-3">
                    <Bug className="h-10 w-10 text-white" />
                  </div>
                  <span className="font-semibold">Insect Screen</span>
                </div>
              </label>
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
            <h3 className="text-lg font-semibold mb-2">Step 2: Enter Measurements</h3>
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
            <div className="grid grid-cols-2 gap-4 mt-6">
              <button
                type="button"
                onClick={prevStep}
                className="btn-outline"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="btn-primary"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-lg font-semibold mb-2">Step 3: Your Contact Details</h3>
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
            <DialogDescription className="text-white/65">
              Thank you for your quote request. We've received your details and will prepare a custom quote shortly.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-secondary/50 p-4 rounded-md mt-2">
            <p className="text-sm mb-2">
              <span className="text-white">✓</span> Your quote has been sent successfully
            </p>
            <p className="text-sm">
              <span className="text-white">✓</span> Please check your email for the quote details
            </p>
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

export default QuoteCalculator;
