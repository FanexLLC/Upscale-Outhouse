export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: 'tips' | 'events' | 'behind-the-scenes' | 'industry';
  image: string;
  tags: string[];
}

let postsCache: BlogPost[] | null = null;

async function loadPosts(): Promise<BlogPost[]> {
  if (postsCache) return postsCache;
  const { blogPosts } = await import('@/content/blog/posts');
  postsCache = blogPosts;
  return postsCache;
}

export function getAllPosts(): BlogPost[] {
  // Use require for synchronous access (posts are static data)
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { blogPosts } = require('@/content/blog/posts');
  return (blogPosts as BlogPost[]).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter((post) => post.category === category);
}

export function getRelatedPosts(
  currentSlug: string,
  limit: number = 3
): BlogPost[] {
  const current = getPostBySlug(currentSlug);
  if (!current) return [];

  const allPosts = getAllPosts().filter((p) => p.slug !== currentSlug);

  // Score by shared tags and same category
  const scored = allPosts.map((post) => {
    let score = 0;
    if (post.category === current.category) score += 2;
    const sharedTags = post.tags.filter((t) => current.tags.includes(t));
    score += sharedTags.length;
    return { post, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.post);
}

export { loadPosts };
