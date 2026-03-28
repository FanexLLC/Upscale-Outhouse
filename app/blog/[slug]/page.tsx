import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import OverlineLabel from "@/components/ui/OverlineLabel";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionDivider from "@/components/ui/SectionDivider";
import BlogPostCard from "@/components/blog/BlogPostCard";

const categoryLabels: Record<string, string> = {
  tips: "Tips",
  events: "Events",
  "behind-the-scenes": "Behind the Scenes",
  industry: "Industry",
};

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | Upscale Outhouse Blog`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Upscale Outhouse Blog`,
      description: post.excerpt,
      url: `https://www.upscaleouthouse.com/blog/${slug}`,
      siteName: 'Upscale Outhouse',
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Upscale Outhouse Blog`,
      description: post.excerpt,
      images: ['/twitter-image.png'],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(post.slug, 3);

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Person', name: post.author },
    publisher: { '@type': 'Organization', name: 'Upscale Outhouse' },
  };

  return (
    <main className="min-h-screen bg-bg-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      {/* Header */}
      <section className="pt-32 md:pt-40 pb-8 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-block bg-gold-primary/20 text-gold-primary uppercase text-xs font-semibold tracking-wider px-3 py-1 rounded-full">
            {categoryLabels[post.category] || post.category}
          </span>
          <h1 className="font-display text-h1 text-white">{post.title}</h1>
          <p className="text-text-muted text-small">
            {formattedDate} &middot; {post.readTime} &middot; {post.author}
          </p>
        </div>
      </section>

      {/* Hero Image */}
      <div className="max-w-4xl mx-auto px-6 mb-16">
        <div className="aspect-video bg-bg-secondary rounded-card relative overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 896px"
            priority
          />
        </div>
      </div>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-6 pb-16">
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* Mid-article CTA */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <Card className="text-center py-12 px-8">
          <h2 className="font-display text-h3 text-white mb-4">
            Planning an event?
          </h2>
          <p className="text-text-secondary text-body mb-6">
            Get your instant quote and see how affordable luxury can be.
          </p>
          <Button variant="primary" href="/quote">
            Get Your Instant Quote &rarr;
          </Button>
        </Card>
      </section>

      {/* Author Bio */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <Card>
          <p className="font-display text-h4 text-white mb-2">
            Written by {post.author}
          </p>
          <p className="text-text-secondary text-body">
            Upscale Outhouse is a veteran-owned luxury restroom trailer rental
            company serving Central California. We bring five-star restroom
            experiences to weddings, corporate events, and festivals.
          </p>
        </Card>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <>
          <SectionDivider className="max-w-4xl mx-auto" />
          <section className="max-w-6xl mx-auto px-6 py-16">
            <div className="text-center mb-12">
              <OverlineLabel>Keep Reading</OverlineLabel>
              <h2 className="font-display text-h2 text-white mt-4">
                Related Articles
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((related) => (
                <BlogPostCard key={related.slug} post={related} />
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
}
