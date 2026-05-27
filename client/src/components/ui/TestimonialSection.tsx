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
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="bg-white px-4 sm:px-6 py-4 rounded-xl flex flex-col sm:flex-row items-center gap-4 sm:gap-6 shadow-md border border-gray-100 max-w-full overflow-hidden">
              <img src="/zillow-logo.svg" alt="Zillow" className="h-6 md:h-8 object-contain" />
              <div className="hidden md:block w-px h-10 bg-gray-200"></div>
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="text-sm text-gray-600 mb-1 leading-snug">
                  <span className="font-bold text-gray-900">Susie Sharak Bauer</span> has a 5.0 rating
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-4 h-4 text-[#006AFF] fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-bold text-gray-900">5.0</span>
                  <span className="text-sm text-gray-500 underline cursor-pointer hover:text-[#006AFF] ml-1">on 18 reviews</span>
                </div>
              </div>
            </div>
          </div>
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
                    
                    <div className="flex justify-center gap-1 mb-6">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-5 h-5 text-[#006AFF] fill-current" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <blockquote className="font-serif text-lg sm:text-xl md:text-2xl text-primary leading-relaxed mb-8 font-light max-h-[250px] sm:max-h-[300px] overflow-y-auto pr-2 sm:pr-4 scrollbar-thin">
                      "{testimonial.text}"
                    </blockquote>
                    <div className="flex flex-col items-center justify-center border-t border-gray-200 pt-6 mt-6 max-w-sm mx-auto">
                      <cite className="not-italic font-sans text-sm font-bold text-gray-900 block mb-1">
                        {testimonial.date}
                      </cite>
                      <span className="text-gray-600 text-xs font-medium uppercase tracking-wide">
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
