import { Section } from "@/components/ui/Section";
import { Quote } from "lucide-react";
import testimonials from "@/data/testimonials.json";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function TestimonialSection() {
  return (
    <Section className="bg-[#f8f8f8]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-20">
          <span className="text-accent text-xs uppercase tracking-[0.2em] font-medium block mb-6">Client Stories</span>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-primary mb-6">Success Stories</h2>
          <div className="w-24 h-px bg-primary/20 mx-auto" />
        </div>

        <div className="max-w-4xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/1">
                  <div className="text-center px-4 md:px-12 py-4">
                    <Quote className="w-10 h-10 text-accent mx-auto mb-8 opacity-50" />
                    <blockquote className="font-serif text-2xl md:text-3xl text-primary leading-relaxed mb-10 italic font-light">
                      "{testimonial.text}"
                    </blockquote>
                    <div>
                      <cite className="not-italic font-sans text-xs uppercase tracking-[0.2em] font-bold text-primary block mb-2">
                        {testimonial.name}
                      </cite>
                      <span className="text-muted-foreground text-sm font-light tracking-wide">
                        {testimonial.location}
                      </span>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:flex justify-center gap-4 mt-8">
              <CarouselPrevious className="static translate-x-0 translate-y-0 h-12 w-12 border border-primary/10 bg-transparent text-primary hover:bg-primary hover:text-white rounded-none transition-all duration-300" />
              <CarouselNext className="static translate-x-0 translate-y-0 h-12 w-12 border border-primary/10 bg-transparent text-primary hover:bg-primary hover:text-white rounded-none transition-all duration-300" />
            </div>
          </Carousel>
        </div>
      </div>
    </Section>
  );
}
