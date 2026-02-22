import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Head } from "vite-react-ssg";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, follow" />
      </Head>
      <main className="min-h-[75vh] flex items-center justify-center bg-muted/30 px-6">
        <div className="max-w-xl w-full text-center">
          {/* 404 数字 */}
          <p className="text-7xl font-bold tracking-tight text-primary/20">
            404
          </p>

          {/* 标题 */}
          <h1 className="mt-4 text-2xl sm:text-3xl font-semibold">
            Page not found
          </h1>

          {/* 描述 */}
          <p className="mt-3 text-muted-foreground leading-relaxed">
            The page{" "}
            <span className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">
              {location.pathname}
            </span>{" "}
            doesn&apos;t exist or may have been moved.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {/* 主 CTA */}
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow hover:opacity-90 transition"
            >
              Back to Home
            </Link>

            {/* 次 CTA */}
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center rounded-md border px-5 py-2.5 text-sm font-medium hover:bg-muted transition"
            >
              Go Back
            </button>
          </div>

          {/* 辅助引导（可选） */}
          <p className="mt-6 text-xs text-muted-foreground">
            Or explore our <Link to="/our-product" className="underline">products</Link> or{" "}
            <Link to="/contact-us" className="underline">contact us</Link>.
          </p>
        </div>
      </main>
    </>
  );
};

export default NotFound;
