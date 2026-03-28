import Link from "next/link";
import Card from "@/components/ui/Card";
import type { BlogPost } from "@/lib/blog";

const categoryLabels: Record<string, string> = {
  tips: "Tips",
  events: "Events",
  "behind-the-scenes": "Behind the Scenes",
  industry: "Industry",
};

export default function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <Card className="p-0 overflow-hidden h-full">
        {/* TODO: Replace with real post images */}
        <div className="aspect-video bg-bg-elevated flex items-center justify-center">
          <span className="text-text-muted text-small">Featured Image</span>
        </div>
        <div className="p-lg space-y-3">
          <span className="inline-block bg-gold-primary/20 text-gold-primary uppercase text-xs font-semibold tracking-wider px-3 py-1 rounded-full">
            {categoryLabels[post.category] || post.category}
          </span>
          <h3 className="font-display text-h4 text-white group-hover:text-gold-primary transition-colors duration-300 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-text-secondary text-small line-clamp-3">
            {post.excerpt}
          </p>
          <p className="text-text-muted text-small">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            &middot; {post.readTime}
          </p>
        </div>
      </Card>
    </Link>
  );
}
