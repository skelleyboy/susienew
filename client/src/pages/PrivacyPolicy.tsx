import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Section className="pt-32 pb-16">
        <div className="max-w-3xl mx-auto prose prose-slate">
          <h1 className="font-serif text-4xl mb-8">Privacy Policy</h1>
          <p className="text-muted-foreground mb-4">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-serif mt-8 mb-4">1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you fill out a contact form, sign up for our newsletter, or request a home valuation. This information may include your name, email address, phone number, and property details.
          </p>

          <h2 className="text-2xl font-serif mt-8 mb-4">2. How We Use Your Information</h2>
          <p>
            We use the information we collect to provide, maintain, and improve our services, including to:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Respond to your comments, questions, and requests</li>
            <li>Send you technical notices, updates, security alerts, and support messages</li>
            <li>Communicate with you about products, services, offers, and events</li>
            <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
          </ul>

          <h2 className="text-2xl font-serif mt-8 mb-4">3. Information Sharing</h2>
          <p>
            We do not share your personal information with third parties except as described in this policy or with your consent. We may share your information with professional advisors, such as lawyers, auditors, and insurers, when necessary in the course of the professional services that they render to us.
          </p>

          <h2 className="text-2xl font-serif mt-8 mb-4">4. Security</h2>
          <p>
            We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.
          </p>

          <h2 className="text-2xl font-serif mt-8 mb-4">5. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at susie@propertypro1.com.
          </p>
        </div>
      </Section>
      <Footer />
    </div>
  );
}
