import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import OverlineLabel from "@/components/ui/OverlineLabel";
import BlogIndexContent from "./BlogIndexContent";

export const metadata: Metadata = {
  title: "Blog — Event Planning Tips & Industry Insights | Upscale Outhouse",
  description:
    "Read our latest articles on event planning, luxury restroom rentals, and making your events unforgettable. Tips from Fresno's premier restroom trailer company.",
  openGraph: {
    title: 'Blog — Event Planning Tips & Industry Insights | Upscale Outhouse',
    description: "Read our latest articles on event planning, luxury restroom rentals, and making your events unforgettable. Tips from Fresno's premier restroom trailer company.",
    url: 'https://www.upscaleouthouse.com/blog',
    siteName: 'Upscale Outhouse',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog — Event Planning Tips & Industry Insights | Upscale Outhouse',
    description: "Read our latest articles on event planning, luxury restroom rentals, and making your events unforgettable. Tips from Fresno's premier restroom trailer company.",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-bg-primary">
      {/* Header */}
      <section className="pt-32 md:pt-40 pb-8 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <OverlineLabel>Our Blog</OverlineLabel>
          <h1 className="font-display text-h1 text-white">
            Tips, Stories &amp; Insights
          </h1>
          <p className="text-text-secondary text-body max-w-2xl mx-auto">
            Expert advice for planning unforgettable events.
          </p>
        </div>
      </section>

      {/* Blog Content (client for filtering) */}
      <BlogIndexContent posts={posts} />
    </main>
  );
}
