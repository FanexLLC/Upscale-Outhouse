'use client';

import { useState } from 'react';

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const id = `faq-${index}`;

        return (
          <div
            key={index}
            className="rounded-2xl border border-charcoal/10 shadow-sm hover:shadow-md transition"
          >
            <button
              type="button"
              id={`${id}-trigger`}
              aria-expanded={isOpen}
              aria-controls={`${id}-panel`}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded-2xl"
            >
              <span className="text-lg font-semibold text-gold">{item.question}</span>
              <svg
                className={`h-5 w-5 shrink-0 text-gold transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            <div
              id={`${id}-panel`}
              role="region"
              aria-labelledby={`${id}-trigger`}
              className={`overflow-hidden transition-all duration-200 ${isOpen ? 'max-h-96 pb-5 px-6' : 'max-h-0'}`}
            >
              <p className="text-cream/70">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
