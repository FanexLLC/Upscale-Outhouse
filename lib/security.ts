/**
 * Security utilities for form submissions
 */

// --- Honeypot Validation ---

/** Returns true if the honeypot field was filled (indicating a bot) */
export function isHoneypotTriggered(value?: string): boolean {
  return typeof value === 'string' && value.length > 0;
}

// --- In-Memory Rate Limiter ---

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

/** Clean up expired entries to prevent memory leaks */
function cleanupExpired(now: number) {
  for (const [key, entry] of rateLimitStore) {
    if (now >= entry.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

/**
 * Simple in-memory rate limiter.
 * For production at scale, replace with Redis-backed implementation.
 */
export function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  cleanupExpired(now);

  const entry = rateLimitStore.get(key);

  if (!entry || now >= entry.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  return { allowed: true, remaining: maxRequests - entry.count };
}
