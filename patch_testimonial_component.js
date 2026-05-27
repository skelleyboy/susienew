import fs from 'fs';
const file = 'client/src/components/ui/TestimonialSection.tsx';
let content = fs.readFileSync(file, 'utf-8');

// Update styling to better match Zillow's review style and show dates/stars
const replacement = `
                    <div className="flex justify-center gap-1 mb-6">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-5 h-5 text-[#006AFF] fill-current" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <blockquote className="font-serif text-xl md:text-2xl text-primary leading-relaxed mb-8 font-light max-h-[300px] overflow-y-auto pr-4 scrollbar-thin">
                      "{testimonial.text}"
                    </blockquote>
                    <div className="flex flex-col items-center justify-center border-t border-gray-200 pt-6 mt-6 max-w-sm mx-auto">
                      <cite className="not-italic font-sans text-sm font-bold text-gray-900 block mb-1">
                        {testimonial.date} • {testimonial.name}
                      </cite>
                      <span className="text-gray-600 text-xs font-medium uppercase tracking-wide">
                        {testimonial.location}
                      </span>
                    </div>
`;

content = content.replace(
  '<Quote className="w-10 h-10 text-accent mx-auto mb-8 opacity-50" />\n                    <blockquote className="font-serif text-2xl md:text-3xl text-primary leading-relaxed mb-10 italic font-light">\n                      "{testimonial.text}"\n                    </blockquote>\n                    <div>\n                      <cite className="not-italic font-sans text-xs uppercase tracking-[0.2em] font-bold text-primary block mb-2">\n                        {testimonial.name}\n                      </cite>\n                      <span className="text-muted-foreground text-sm font-light tracking-wide">\n                        {testimonial.location}\n                      </span>\n                    </div>',
  replacement
);

// Add zillow badge at the top
content = content.replace(
  '<div className="text-center mb-20">',
  `<div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="bg-white px-6 py-4 rounded-xl flex flex-col md:flex-row items-center gap-6 shadow-md border border-gray-100">
              <img src="/zillow-logo.svg" alt="Zillow" className="h-6 md:h-8 object-contain" />
              <div className="hidden md:block w-px h-10 bg-gray-200"></div>
              <div className="flex flex-col items-center md:items-start">
                <div className="text-sm text-gray-600 mb-1">
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
                  <span className="text-sm text-gray-500 underline cursor-pointer hover:text-[#006AFF] ml-1">on 22 reviews</span>
                </div>
              </div>
            </div>
          </div>`
);

fs.writeFileSync(file, content);
