import React from "react";
import { Leaf } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}

export interface AnimatedTestimonialsProps {
  testimonials: Testimonial[];
}

export const AnimatedTestimonials: React.FC<AnimatedTestimonialsProps> = ({ testimonials }) => {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[350px] md:w-[450px] p-4"
          >
            <blockquote className="bg-white/80 backdrop-blur-sm rounded-[20px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-gray-100 p-8 h-full flex flex-col transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
              <div className="absolute top-4 right-4 text-green-200 opacity-30">
                <Leaf className="w-16 h-16" />
              </div>

              <div className="relative z-10">
                <div className="mb-4">
                  <svg width="32" height="28" viewBox="0 0 32 28" fill="none" className="opacity-40">
                    <path d="M0 14.5C0 7.5 3.5 0 12 0V4C7 4 4 8.5 4 14.5C4 16.5 4.5 18 6 18C8.5 18 10 16 10 13.5C10 11 8.5 9 6 9C5.5 9 5 9.1 4.5 9.3C5 5.3 7.5 2.5 12 2V0C3.5 0 0 7.5 0 14.5ZM18 14.5C18 7.5 21.5 0 30 0V4C25 4 22 8.5 22 14.5C22 16.5 22.5 18 24 18C26.5 18 28 16 28 13.5C28 11 26.5 9 24 9C23.5 9 23 9.1 22.5 9.3C23 5.3 25.5 2.5 30 2V0C21.5 0 18 7.5 18 14.5Z" fill="#16a34a"/>
                  </svg>
                </div>

                <p className="text-gray-700 text-base leading-relaxed flex-grow font-light tracking-wide">
                  {testimonial.quote}
                </p>

                <footer className="mt-8 pt-6 border-t border-green-100 flex items-center">
                  <div className="relative">
                    <img
                      className="w-14 h-14 rounded-full object-cover border-2 border-green-100 shadow-md"
                      src={testimonial.src}
                      alt={testimonial.name}
                    />
                    <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                      <Leaf className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="font-bold text-gray-900 text-base">{testimonial.name}</p>
                    <p className="text-sm text-gray-500 font-light mt-0.5">{testimonial.designation}</p>
                  </div>
                </footer>
              </div>
            </blockquote>
          </div>
        ))}
      </div>
    </div>
  );
};
