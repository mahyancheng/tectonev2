import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Head } from "vite-react-ssg";

const ThankYouPage: React.FC = () => {
  const canonical = "https://tectonesteel.com/thank-you/";

  return (
    <>
      <Head>
        <title>Thank You | Tectone Renex Steel</title>

        {/* ✅ 建议 Thank You 页不收录 */}

        <meta
          name="description"
          content="Thank you for contacting Tectone Renex Steel. Our team will respond to your request as soon as possible."
        />

        {/* OG */}
        <meta property="og:title" content="Thank You | Tectone Renex Steel" />
        <meta name="robots" content="noindex, follow" />

        <meta
          property="og:description"
          content="We have received your request and will contact you shortly."
        />
        <meta property="og:site_name" content="Tectone Renex Steel Pte Ltd" />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={canonical} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-tectone-gold/10 to-background flex items-center justify-center">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto text-center">
            {/* Success Icon */}
            <div className="mb-8 animate-scale-in" aria-hidden="true">
              <div className="relative mx-auto w-24 h-24 mb-6">
                <CheckCircle className="w-24 h-24 text-green-500 animate-pulse" />
                <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping"></div>
              </div>
            </div>

            {/* Message */}
            <div className="animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Thank You!
              </h1>
              <p className="text-lg text-muted-foreground mb-2">
                Your quote request has been submitted successfully.
              </p>
              <p className="text-sm text-muted-foreground mb-8">
                Our team will contact you within 24 hours with your detailed quote.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Button asChild className="bg-white/[0.03] hover:bg-white/10/90">
                <Link to="/" className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Go to Home
                </Link>
              </Button>

              <Button variant="outline" asChild>
                {/* ✅ 修正：你的产品页是 /our-product */}
                <Link to="/our-product" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Browse Products
                </Link>
              </Button>
            </div>

            {/* Next steps */}
            <div className="mt-12 p-6 bg-card rounded-lg border animate-fade-in text-left">
              <h2 className="font-semibold text-foreground mb-2">What&apos;s Next?</h2>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Our experts will review your requirements</li>
                <li>• You&apos;ll receive a detailed quote via email</li>
                <li>• We&apos;ll schedule a consultation if needed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThankYouPage;
