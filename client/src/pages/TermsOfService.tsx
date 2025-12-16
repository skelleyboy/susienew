import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Section className="pt-32 pb-16">
        <div className="max-w-3xl mx-auto prose prose-slate">
          <h1 className="font-serif text-4xl mb-8">Terms of Service</h1>
          <p className="text-muted-foreground mb-4">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-serif mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing or using our website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
          </p>

          <h2 className="text-2xl font-serif mt-8 mb-4">2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials (information or software) on Susie Sharak's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
          </p>

          <h2 className="text-2xl font-serif mt-8 mb-4">3. Disclaimer</h2>
          <p>
            The materials on this website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>

          <h2 className="text-2xl font-serif mt-8 mb-4">4. Limitations</h2>
          <p>
            In no event shall we or our suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on this website.
          </p>

          <h2 className="text-2xl font-serif mt-8 mb-4">5. Accuracy of Materials</h2>
          <p>
            The materials appearing on this website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on its website are accurate, complete, or current. We may make changes to the materials contained on its website at any time without notice.
          </p>

          <h2 className="text-2xl font-serif mt-8 mb-4">6. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of Michigan and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
          </p>
        </div>
      </Section>
      <Footer />
    </div>
  );
}
