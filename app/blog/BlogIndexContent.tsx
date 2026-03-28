"use client";

import { useState } from "react";
import BlogPostCard from "@/components/blog/BlogPostCard";
import type { BlogPost } from "@/lib/blog";

const categoryFilters = [
  { label: "All", value: "all" },
  { label: "Tips", value: "tips" },
  { label: "Events", value: "events" },
  { label: "Behind the Scenes", value: "behind-the-scenes" },
  { label: "Industry", value: "industry" },
];

export default function BlogIndexContent({ posts }: { posts: BlogPost[] }) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredPosts =
    activeFilter === "all"
      ? posts
      : posts.filter((p) => p.category === activeFilter);

  return (
    <section className="px-6 pb-section">
      <div className="max-w-6xl mx-auto">
        {/* Category Filters */}
        <nav className="flex gap-2 overflow-x-auto pb-4 mb-12 scrollbar-hide">
          {categoryFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`whitespace-nowrap px-4 py-2 text-small font-body transition-all duration-200 border-b-2 cursor-pointer ${
                activeFilter === filter.value
                  ? "text-gold-primary border-gold-primary"
                  : "text-text-secondary border-transparent hover:text-white hover:border-white/20"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </nav>

        {/* Post Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-text-muted text-body text-center py-16">
            No posts in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}
