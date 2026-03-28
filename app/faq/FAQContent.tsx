"use client";

import { useState, useRef } from "react";
import Accordion from "@/components/ui/Accordion";
import type { FAQCategory } from "@/lib/faq-data";

export default function FAQContent({
  categories,
}: {
  categories: FAQCategory[];
}) {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const handleTabClick = (slug: string) => {
    if (activeTab === slug) {
      setActiveTab(null);
      return;
    }
    setActiveTab(slug);
    const el = sectionRefs.current[slug];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const visibleCategories = activeTab
    ? categories.filter((c) => c.slug === activeTab)
    : categories;

  return (
    <section className="px-6 pb-16">
      <div className="max-w-4xl mx-auto">
        {/* Category Navigation */}
        <nav className="flex gap-2 overflow-x-auto pb-4 mb-12 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => handleTabClick(cat.slug)}
              className={`whitespace-nowrap px-4 py-2 text-small font-body transition-all duration-200 border-b-2 cursor-pointer ${
                activeTab === cat.slug
                  ? "text-gold-primary border-gold-primary"
                  : "text-text-secondary border-transparent hover:text-white hover:border-white/20"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </nav>

        {/* FAQ Sections */}
        <div className="space-y-16">
          {visibleCategories.map((category) => (
            <div
              key={category.slug}
              ref={(el) => {
                sectionRefs.current[category.slug] = el;
              }}
              className="scroll-mt-32"
            >
              <h2 className="font-display text-h2 text-white mb-8">
                {category.name}
              </h2>
              <Accordion items={category.items} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
