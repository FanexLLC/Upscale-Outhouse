'use client';

import { useState, useEffect, useCallback } from 'react';

const testimonials = [
  {
    quote:
      "Upscale Outhouse made our wedding day perfect. Our guests couldn't stop talking about how nice the facilities were!",
    author: 'Sarah M.',
    event: 'Wedding',
    location: 'Clovis, CA',
    rating: 5,
  },
  {
    quote:
      'Professional service from start to finish. The trailer was immaculate and our corporate event was elevated because of it.',
    author: 'Michael T.',
    event: 'Corporate Event',
    location: 'Fresno, CA',
    rating: 5,
  },
  {
    quote:
      "We've used Upscale Outhouse for three events now. Always reliable, always spotless. Highly recommend!",
    author: 'Jennifer L.',
    event: 'Birthday Party',
    location: 'Visalia, CA',
    rating: 5,
  },
  {
    quote:
      'The luxury trailer was the highlight of our outdoor reception. Guests felt like they were in a five-star hotel, not at a vineyard.',
    author: 'David & Karen R.',
    event: 'Wedding',
    location: 'Madera, CA',
    rating: 5,
  },
  {
    quote:
      'Setup was seamless and the team was incredibly professional. Our graduation party felt so much more upscale with this addition.',
    author: 'Rosa P.',
    event: 'Graduation Party',
    location: 'Merced, CA',
    rating: 5,
  },
  {
    quote:
      'We hosted 200 guests at our ranch and the restroom trailer handled everything perfectly. Clean, spacious, and elegant.',
    author: 'James W.',
    event: 'Private Ranch Event',
    location: 'Bakersfield, CA',
    rating: 5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`h-5 w-5 ${star <= rating ? 'text-gold' : 'text-charcoal/20'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [paused, next]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
      }
    },
    [prev, next]
  );

  return (
    <div
      className="relative max-w-3xl mx-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Testimonials carousel"
      aria-roledescription="carousel"
    >
      {/* Cards */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 px-4"
              role="group"
              aria-roledescription="slide"
              aria-label={`Testimonial ${index + 1} of ${testimonials.length}`}
            >
              <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gold/10 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-between mb-5">
                  <StarRating rating={testimonial.rating} />
                  <span className="text-gold/30 text-5xl leading-none select-none font-serif">&ldquo;</span>
                </div>
                <p className="text-charcoal/80 text-lg leading-relaxed mb-6 italic">
                  {testimonial.quote}
                </p>
                <div className="border-t border-charcoal/10 pt-5">
                  <p className="text-charcoal-dark font-semibold">
                    {testimonial.author}
                  </p>
                  <p className="text-charcoal/60 text-sm">
                    {testimonial.event}
                    {testimonial.location && (
                      <span className="text-charcoal/40"> &bull; {testimonial.location}</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-6 w-10 h-10 rounded-full bg-white shadow-md border border-gold/20 flex items-center justify-center text-charcoal hover:text-gold hover:border-gold transition-colors"
        aria-label="Previous testimonial"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-6 w-10 h-10 rounded-full bg-white shadow-md border border-gold/20 flex items-center justify-center text-charcoal hover:text-gold hover:border-gold transition-colors"
        aria-label="Next testimonial"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-0 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className="py-3 px-1.5 group"
            aria-label={`Go to testimonial ${index + 1}`}
          >
            <span
              className={`block h-2.5 rounded-full transition-all duration-300 ${
                index === current
                  ? 'bg-gold w-6'
                  : 'bg-charcoal/20 group-hover:bg-charcoal/40 w-2.5'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
