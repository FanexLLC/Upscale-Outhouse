/**
 * reCAPTCHA v3 verification utility
 */

interface RecaptchaResponse {
  success: boolean;
  score: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
}

/**
 * Verify a reCAPTCHA v3 token with Google.
 * Falls back to success in development when RECAPTCHA_SECRET_KEY is not set.
 */
export async function verifyRecaptcha(
  token: string
): Promise<{ success: boolean; score: number }> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  // Graceful fallback for development
  if (!secretKey) {
    console.warn('RECAPTCHA_SECRET_KEY not set — skipping verification');
    return { success: true, score: 1.0 };
  }

  try {
    const response = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: secretKey,
          response: token,
        }),
      }
    );

    const data: RecaptchaResponse = await response.json();
    return { success: data.success, score: data.score ?? 0 };
  } catch (error) {
    console.error('reCAPTCHA verification failed:', error);
    return { success: false, score: 0 };
  }
}
