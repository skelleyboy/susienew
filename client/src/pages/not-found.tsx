import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useSEO } from "@/hooks/use-seo";

export default function NotFound() {
  useSEO({
    title: "Page Not Found | Susie Sharak Real Estate",
    description: "The page you are looking for does not exist.",
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <Section className="flex-grow flex items-center justify-center pt-32 pb-16">
        <div className="text-center max-w-lg mx-auto">
          <h1 className="font-serif text-6xl md:text-8xl mb-6 text-primary">404</h1>
          <h2 className="font-serif text-2xl md:text-3xl mb-6">Page Not Found</h2>
          <p className="text-muted-foreground mb-8 text-lg font-light">
            We couldn't find the page you're looking for. It may have been moved or no longer exists.
          </p>
          <Button asChild className="bg-primary text-white hover:bg-primary/90 rounded-none px-8 py-6 uppercase tracking-[0.2em] text-xs font-medium">
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </Section>
      <Footer />
    </div>
  );
}
