import { Section } from "@/components/ui/Section";
import { Quote } from "lucide-react";
import testimonials from "@/data/testimonials.json";

export function TestimonialSection() {
  return (
    <Section>
      <div className="text-center mb-16">
        <h2 className="font-serif text-4xl mb-4">Client Stories</h2>
        <div className="w-20 h-0.5 bg-accent mx-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white p-8 md:p-10 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <Quote className="w-8 h-8 text-accent/40 mb-6" />
            <p className="font-serif text-lg text-primary mb-6 italic leading-relaxed">
              "{testimonial.text}"
            </p>
            <div>
              <p className="font-bold text-sm uppercase tracking-wider text-primary">{testimonial.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{testimonial.location}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
