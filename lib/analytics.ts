declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_EVENTS = {
  HERO_CTA_CLICKED: 'hero_cta_clicked',
  QUOTE_STEP_COMPLETED: 'quote_step_completed',
  QUOTE_SUBMITTED: 'quote_submitted',
  PHONE_NUMBER_CLICKED: 'phone_number_clicked',
  GALLERY_IMAGE_VIEWED: 'gallery_image_viewed',
  GALLERY_VIDEO_PLAYED: 'gallery_video_played',
  EVENT_PAGE_VIEWED: 'event_page_viewed',
  LANGUAGE_TOGGLED: 'language_toggled',
  BLOG_POST_READ: 'blog_post_read',
  FAQ_EXPANDED: 'faq_expanded',
  CONTACT_FORM_SUBMITTED: 'contact_form_submitted',
} as const;

export function trackEvent(eventName: string, params?: Record<string, string | number>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
}